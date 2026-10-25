import mongoose from 'mongoose';

// 3:14:36–3:17:17. Mongoose maps Category to the categories collection.
const categorySchema = new mongoose.Schema(
  { name: { type: String, required: true } },
  { timestamps: true },
);

export const Category = mongoose.model('Category', categorySchema);
