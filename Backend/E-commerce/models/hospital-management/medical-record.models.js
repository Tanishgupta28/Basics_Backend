import mongoose from 'mongoose';

// 3:39:18–3:40:41. Only this boilerplate is shown; no clinical fields are specified.
const medicalRecordSchema = new mongoose.Schema({}, { timestamps: true });

export const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
