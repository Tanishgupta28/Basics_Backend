import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import * as models from '../models/index.js';
import { buildFixtures } from '../scripts/fixtures.js';
import { buildAlternativeDocuments, inlineOrderSchema, seatSchema } from '../examples/schema-alternatives.js';

async function validationErrors(document) {
  try {
    await document.validate();
  } catch (error) {
    assert.equal(error.name, 'ValidationError');
    return error.errors;
  }
  assert.fail('Expected document validation to reject this input');
}

test('all eight models import and validate representative documents', async () => {
  assert.equal(Object.keys(models).length, 8);
  for (const document of Object.values(buildFixtures())) await document.validate();
});

test('username and email are lowercased and all user fields are required', async () => {
  const user = new models.User({ username: 'LEARNER', email: 'LEARNER@EXAMPLE.COM', password: 'synthetic-only' });
  assert.equal(user.username, 'learner');
  assert.equal(user.email, 'learner@example.com');
  assert.deepEqual(Object.keys(await validationErrors(new models.User())).sort(), ['email', 'password', 'username']);
  assert.equal(models.User.schema.path('username').options.unique, true);
  assert.equal(models.User.schema.path('email').options.unique, true);
});

test('Category requires a name and uses the categories collection', async () => {
  assert.ok((await validationErrors(new models.Category())).name);
  assert.equal(models.Category.collection.name, 'categories');
});

test('Product requires name, description and category; zero defaults survive validation', async () => {
  assert.deepEqual(Object.keys(await validationErrors(new models.Product())).sort(), ['category', 'description', 'name']);
  const product = new models.Product({ name: 'Example', description: 'Example', category: new mongoose.Types.ObjectId() });
  await product.validate();
  assert.equal(product.price, 0);
  assert.equal(product.stock, 0);
  assert.equal(product.owner, undefined);
});

test('URLs stay strings and Mongoose casts numeric input or reports invalid numbers', async () => {
  const { product } = buildFixtures();
  assert.equal(typeof product.productImage, 'string');
  product.price = '125';
  assert.equal(product.price, 125);
  product.stock = 'not-a-number';
  assert.equal((await validationErrors(product)).stock.name, 'CastError');
});

test('Order requires its price, address and each embedded quantity', async () => {
  const order = new models.Order({ orderItems: [{}] });
  assert.deepEqual(Object.keys(await validationErrors(order)).sort(), ['address', 'orderItems.0.quantity', 'orderPrice']);
});

test('each item keeps its own product and quantity, distinct from inventory stock', async () => {
  const { order, product } = buildFixtures();
  const secondProductId = new mongoose.Types.ObjectId();
  order.orderItems.push({ productId: secondProductId, quantity: 5 });
  await order.validate();
  assert.equal(order.orderItems[0].quantity, 2);
  assert.equal(order.orderItems[1].quantity, 5);
  assert.equal(order.orderItems[1].productId.toString(), secondProductId.toString());
  assert.equal(product.stock, 10);
  assert.ok(order.orderItems[0]._id);
  assert.equal(order.orderItems[0].createdAt, undefined);
});

test('status defaults to Pending and accepts only the three exact choices', async () => {
  const { order } = buildFixtures();
  assert.equal(order.status, 'Pending');
  for (const status of ['Pending', 'Cancelled', 'Delivered']) {
    order.status = status;
    await order.validate();
  }
  for (const status of ['pending', 'Delivred', 'Shipped']) {
    order.status = status;
    assert.equal((await validationErrors(order)).status.kind, 'enum');
  }
});

test('the course enum alone is not required; empty item arrays also remain permitted', async () => {
  const order = new models.Order({ orderPrice: 0, address: 'Example', status: null });
  await order.validate();
  assert.deepEqual(order.orderItems.toObject(), []);
});

test('every reference names a registered model, including singular Hospital', () => {
  const refs = [
    [models.Product, 'category', 'Category'], [models.Product, 'owner', 'User'],
    [models.Order, 'customer', 'User'], [models.Order, 'orderItems.productId', 'Product'],
    [models.Patient, 'admittedIn', 'Hospital'],
  ];
  for (const [model, path, target] of refs) {
    assert.equal(model.schema.path(path).options.ref, target);
    assert.equal(mongoose.model(target).modelName, target);
  }
  assert.equal(models.Doctor.schema.path('worksInHospitals').getEmbeddedSchemaType().options.ref, 'Hospital');
});

test('malformed ObjectIds fail casting, but references alone do not verify existence', async () => {
  const { product } = buildFixtures();
  product.category = 'not-an-id';
  assert.equal((await validationErrors(product)).category.name, 'CastError');
  const other = new models.Product({ name: 'Example', description: 'Example', category: new mongoose.Types.ObjectId() });
  await other.validate(); // No database lookup is performed by ref.
});

test('Patient has required domain fields and exact gender choices without default', async () => {
  assert.deepEqual(Object.keys(await validationErrors(new models.Patient())).sort(),
    ['address', 'age', 'bloodGroup', 'diagnosedWith', 'gender', 'name']);
  const { patient } = buildFixtures();
  for (const gender of ['M', 'F', 'Others']) { patient.gender = gender; await patient.validate(); }
  patient.gender = 'unknown';
  assert.equal((await validationErrors(patient)).gender.kind, 'enum');
  assert.equal(new models.Patient().gender, undefined);
});

test('Doctor defaults experience to zero and accepts multiple hospitals', async () => {
  const { doctor } = buildFixtures();
  doctor.worksInHospitals.push(new mongoose.Types.ObjectId());
  await doctor.validate();
  assert.equal(doctor.experienceInYears, 0);
  assert.equal(doctor.worksInHospitals.length, 2);
  assert.equal(typeof doctor.salary, 'number');
  assert.deepEqual(Object.keys(await validationErrors(new models.Doctor())).sort(), ['name', 'qualifications', 'salary']);
});

test('Hospital permits missing addressLine2, preserves postal strings and stores specializations', async () => {
  const { hospital } = buildFixtures();
  assert.equal(hospital.addressLine2, undefined);
  assert.equal(hospital.pincode, '00123');
  hospital.pincode = 'SW1A 1AA';
  await hospital.validate();
  assert.equal(hospital.pincode, 'SW1A 1AA');
  assert.deepEqual(hospital.specializedIn.toObject(), ['Eyes', 'Heart']);
  assert.deepEqual(Object.keys(await validationErrors(new models.Hospital())).sort(), ['addressLine1', 'city', 'name', 'pincode']);
});

test('all top-level models have timestamps but the order child does not', () => {
  for (const model of Object.values(models)) {
    assert.equal(model.schema.options.timestamps, true);
    assert.ok(model.schema.path('createdAt'));
    assert.ok(model.schema.path('updatedAt'));
  }
  assert.equal(models.Order.schema.path('orderItems').schema.path('createdAt'), undefined);
});

test('MedicalRecord stays a timestamped empty schema, without invented clinical fields', async () => {
  const record = new models.MedicalRecord({ diagnosis: 'not part of the transcript' });
  await record.validate();
  assert.equal(record.toObject().diagnosis, undefined);
  assert.deepEqual(Object.keys(models.MedicalRecord.schema.paths).sort(), ['__v', '_id', 'createdAt', 'updatedAt']);
});

test('all isolated discussion alternatives validate without registering course models', async () => {
  const before = mongoose.modelNames().sort();
  const examples = buildAlternativeDocuments();
  assert.equal(examples.length, 8);
  for (const example of examples) await example.validate();
  assert.deepEqual(mongoose.modelNames().sort(), before);
});

test('inline order syntax still validates child quantity; seat enum rejects other values', async () => {
  const sandbox = new mongoose.Mongoose();
  const Inline = sandbox.model('InlineTest', inlineOrderSchema);
  const Seat = sandbox.model('SeatTest', seatSchema);
  assert.ok((await validationErrors(new Inline({ orderItems: [{}] })))['orderItems.0.quantity']);
  assert.equal((await validationErrors(new Seat({ seat: 'Roof' }))).seat.kind, 'enum');
});
