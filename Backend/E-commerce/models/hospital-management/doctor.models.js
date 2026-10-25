import mongoose from 'mongoose';

// 3:46:35–3:49:54. Salary is ambiguous in the speech: use Number; see coverage notes.
const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    salary: { type: Number, required: true },
    qualifications: { type: String, required: true },
    experienceInYears: { type: Number, default: 0 },
    worksInHospitals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' }],
  },
  { timestamps: true },
);

export const Doctor = mongoose.model('Doctor', doctorSchema);
