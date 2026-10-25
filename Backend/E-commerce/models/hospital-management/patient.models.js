import mongoose from 'mongoose';

// 3:42:32–3:46:27. Required bloodGroup is inferred from the copied field definition.
const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    diagnosedWith: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    bloodGroup: { type: String, required: true },
    gender: { type: String, enum: ['M', 'F', 'Others'], required: true },
    admittedIn: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
  },
  { timestamps: true },
);

export const Patient = mongoose.model('Patient', patientSchema);
