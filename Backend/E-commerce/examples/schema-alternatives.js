import mongoose from 'mongoose';
import { pathToFileURL } from 'node:url';

// Illustrations of alternatives discussed aloud, not changes to the final course models.
// Field names inside these sketches are reconstructed where no exact code was dictated.
export const imageVariantsSchema = new mongoose.Schema({
  productImage: [{ name: String, url: String }], // 3:21:27–3:21:51
});

export const currencyPricesSchema = new mongoose.Schema({
  pricing: { INR: Number, USD: Number }, // 3:25:30–3:25:44
});

export const inlineOrderSchema = new mongoose.Schema({
  orderItems: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
  }], // 3:33:16–3:34:09: equivalent to a separately declared item schema
});

const addressSchema = new mongoose.Schema({ pincode: String, state: String });
export const structuredAddressSchema = new mongoose.Schema({
  address: addressSchema, // 3:34:24–3:34:40
});

export const seatSchema = new mongoose.Schema({
  seat: { type: String, enum: ['Aisle', 'Middle', 'Window'] }, // 3:35:27–3:35:35
});

export const doctorAlternativesSchema = new mongoose.Schema({
  salary: String, // 3:47:00–3:47:24: permits a currency label
  qualifications: [String], // 3:47:49–3:47:58
});

const hospitalHoursSchema = new mongoose.Schema({
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  hours: Number,
});
export const hospitalHoursAlternativeSchema = new mongoose.Schema({
  worksInHospitals: [hospitalHoursSchema], // 3:50:01–3:50:26
});

export const likesSchema = new mongoose.Schema({
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // 3:53:07–3:53:31
});

export function buildAlternativeDocuments() {
  const id = new mongoose.Types.ObjectId();
  const examples = [
    ['ImageVariantsExample', imageVariantsSchema, { productImage: [{ name: '1x', url: 'https://example.com/product.jpg' }] }],
    ['CurrencyPricesExample', currencyPricesSchema, { pricing: { INR: 100, USD: 1.2 } }],
    ['InlineOrderExample', inlineOrderSchema, { orderItems: [{ productId: id, quantity: 2 }] }],
    ['StructuredAddressExample', structuredAddressSchema, { address: { pincode: '00123', state: 'Example state' } }],
    ['SeatExample', seatSchema, { seat: 'Window' }],
    ['DoctorAlternativesExample', doctorAlternativesSchema, { salary: 'INR 50000', qualifications: ['MBBS', 'MD'] }],
    ['HospitalHoursExample', hospitalHoursAlternativeSchema, { worksInHospitals: [{ hospital: id, hours: 4 }] }],
    ['LikesExample', likesSchema, { likes: [id] }],
  ];
  // Separate Mongoose instance prevents these illustrative models polluting the course registry.
  const sandbox = new mongoose.Mongoose();
  return examples.map(([name, schema, data]) => new (sandbox.model(name, schema))(data));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  for (const document of buildAlternativeDocuments()) {
    await document.validate();
    console.log(document.constructor.modelName, JSON.stringify(document.toObject(), null, 2));
  }
  console.log('All discussion alternatives validated locally. Nothing was saved.');
}
