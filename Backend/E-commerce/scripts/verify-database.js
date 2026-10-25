import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import mongoose from 'mongoose';
import * as models from '../models/index.js';
import { buildFixtures } from './fixtures.js';

// Verification support, not a database-connection lesson from this transcript.
// Both modes use a new isolated database. Never operate on an existing app database.
const databaseName = `course_verify_${randomUUID().replaceAll('-', '')}`;
const configured = process.argv.includes('--configured');
let server;
let connected = false;

try {
  let uri;
  if (configured) {
    uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is missing; set it in .env.');
  } else {
    const downloadDir = resolve('.cache/mongodb-binaries');
    mkdirSync(downloadDir, { recursive: true });
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    server = await MongoMemoryServer.create({ binary: { downloadDir }, instance: { ip: '127.0.0.1' } });
    uri = server.getUri();
  }

  await mongoose.connect(uri, { dbName: databaseName, serverSelectionTimeoutMS: 5000 });
  connected = true;
  const buildInfo = await mongoose.connection.db.admin().command({ buildInfo: 1 });
  console.log(`Connected to ${configured ? 'configured' : 'temporary'} MongoDB ${buildInfo.version}; isolated verification database.`);
  await Promise.all(Object.values(models).map(model => model.init()));

  const fixture = buildFixtures();
  for (const document of Object.values(fixture)) {
    await document.save();
    assert.ok(document.createdAt instanceof Date);
    assert.ok(document.updatedAt instanceof Date);
    const stored = await document.constructor.findById(document._id);
    assert.ok(stored);
  }
  console.log('PASS: saved and read all eight models; timestamps persisted.');

  const storedProduct = await models.Product.findById(fixture.product._id).populate('category').populate({ path: 'owner', select: 'username' });
  assert.equal(storedProduct.category.name, fixture.category.name);
  assert.equal(storedProduct.owner.username, fixture.user.username);
  const storedOrder = await models.Order.findById(fixture.order._id)
    .populate({ path: 'customer', select: 'username' }).populate('orderItems.productId');
  assert.equal(storedOrder.customer.username, fixture.user.username);
  assert.equal(storedOrder.orderItems[0].productId.name, fixture.product.name);
  assert.equal(storedOrder.orderItems[0].quantity, 2);
  assert.equal(storedOrder.orderItems[0].createdAt, undefined);
  console.log('PASS: product category/owner and order customer/items resolve with populate.');

  const secondHospital = await models.Hospital.create({
    name: 'Second example hospital', addressLine1: 'Example street', city: 'Example city', pincode: 'SW1A 1AA',
  });
  fixture.doctor.worksInHospitals.push(secondHospital._id);
  await fixture.doctor.save();
  const doctor = await models.Doctor.findById(fixture.doctor._id).populate('worksInHospitals');
  assert.equal(doctor.worksInHospitals.length, 2);
  assert.equal(doctor.worksInHospitals[1].pincode, 'SW1A 1AA');
  const patient = await models.Patient.findById(fixture.patient._id).populate('admittedIn');
  assert.equal(patient.admittedIn.name, fixture.hospital.name);
  console.log('PASS: patient admission and doctor references to multiple hospitals.');

  await assert.rejects(models.User.create({
    username: fixture.user.username.toUpperCase(), email: `other-${randomUUID()}@example.com`, password: randomUUID(),
  }), error => error.code === 11000 && Boolean(error.keyPattern.username));
  await assert.rejects(models.User.create({
    username: `other-${randomUUID()}`, email: fixture.user.email.toUpperCase(), password: randomUUID(),
  }), error => error.code === 11000 && Boolean(error.keyPattern.email));
  console.log('PASS: actual MongoDB unique indexes reject duplicate username and email after lowercasing.');

  await assert.rejects(models.Order.create({ orderPrice: 1, address: 'Example', status: 'Shipped' }),
    error => error.name === 'ValidationError' && error.errors.status.kind === 'enum');
  await assert.rejects(models.Order.create({ orderPrice: 1, address: 'Example', orderItems: [{}] }),
    error => Boolean(error.errors?.['orderItems.0.quantity']));
  await assert.rejects(models.Order.updateOne({ _id: fixture.order._id }, { status: 'Typo' }, { runValidators: true }),
    error => error.name === 'ValidationError');

  const createdAt = fixture.order.createdAt.getTime();
  const previousUpdate = fixture.order.updatedAt.getTime();
  fixture.order.status = 'Delivered';
  await fixture.order.save();
  const updated = await models.Order.findById(fixture.order._id);
  assert.equal(updated.status, 'Delivered');
  assert.equal(updated.createdAt.getTime(), createdAt);
  assert.ok(updated.updatedAt.getTime() > previousUpdate);
  console.log('PASS: invalid saves/updates rejected; valid status update preserves createdAt and advances updatedAt.');

  const collections = (await mongoose.connection.db.listCollections().toArray()).map(item => item.name).sort();
  assert.deepEqual(collections, ['categories', 'doctors', 'hospitals', 'medicalrecords', 'orders', 'patients', 'products', 'users']);
  assert.equal(await models.Order.countDocuments(), 1);
  assert.equal(await models.User.countDocuments(), 1);
  console.log('PASS: eight named collections; embedded items create no separate collection; rejected writes did not persist.');
} catch (error) {
  // Do not echo connection URIs, error values, passwords, or hosted credentials.
  console.error(`Database verification FAILED (${error.name}).`);
  console.error(configured
    ? 'Check MongoDB availability, .env and permission to create/drop a temporary course_verify_* database. No URI was printed.'
    : 'Check network access for the MongoDB binary download and permission to start the local MongoDB process.');
  process.exitCode = 1;
} finally {
  try {
    if (connected) {
      // Guard before deletion: this name was generated by this run, never read from .env.
      assert.equal(mongoose.connection.name, databaseName);
      assert.match(databaseName, /^course_verify_[a-f0-9]{32}$/);
      await mongoose.connection.dropDatabase();
      console.log('Removed only this run\'s temporary verification database.');
    }
  } catch {
    console.error(`Cleanup failed for temporary database ${databaseName}.`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    if (server) await server.stop();
  }
}
