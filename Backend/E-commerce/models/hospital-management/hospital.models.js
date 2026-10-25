import mongoose from 'mongoose';

// 3:50:50–3:53:07. Name is inferred across a transcript gap; spelling is documented.
const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    specializedIn: [{ type: String }],
  },
  { timestamps: true },
);

export const Hospital = mongoose.model('Hospital', hospitalSchema);
