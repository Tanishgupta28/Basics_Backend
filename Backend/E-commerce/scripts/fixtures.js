import { randomUUID } from 'node:crypto';
import { User, Category, Product, Order, Hospital, Patient, Doctor, MedicalRecord } from '../models/index.js';

// Synthetic examples for verification, not seed data supplied by the instructor.
export function buildFixtures() {
  const tag = randomUUID();
  const user = new User({
    username: `Learner-${tag}`,
    email: `Learner-${tag}@example.com`,
    // Random disposable placeholder, never an actual credential or displayed by the demo.
    password: randomUUID(),
  });
  const category = new Category({ name: 'Learning supplies' });
  const product = new Product({
    name: 'Notebook', description: 'Synthetic model demonstration',
    productImage: 'https://example.com/notebook.jpg', price: 100, stock: 10,
    category: category._id, owner: user._id,
  });
  const order = new Order({
    orderPrice: 200, customer: user._id,
    orderItems: [{ productId: product._id, quantity: 2 }],
    address: 'Example address, Example city',
  });
  const hospital = new Hospital({
    name: 'Example teaching hospital', addressLine1: 'Example street',
    city: 'Example city', pincode: '00123', specializedIn: ['Eyes', 'Heart'],
  });
  const patient = new Patient({
    name: 'Example patient', diagnosedWith: 'Synthetic training diagnosis',
    address: 'Example address', age: 30, bloodGroup: 'O+', gender: 'Others',
    admittedIn: hospital._id,
  });
  const doctor = new Doctor({
    name: 'Example doctor', salary: 50000, qualifications: 'MBBS, MD',
    worksInHospitals: [hospital._id],
  });
  const medicalRecord = new MedicalRecord();
  return { user, category, product, order, hospital, patient, doctor, medicalRecord };
}
