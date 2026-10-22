import mongoose from 'mongoose';

// 2:37:05–2:51:41: import -> Schema -> named model export.
// The username options between 2:44:23 and 2:45:04 are missing from
// the transcript. Only its explicitly stated type/required are reproduced.
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true, // Declares a MongoDB unique index; not a validator.
      lowercase: true,
    },
    // This lesson only models a string. Authentication/hashing is not taught.
    // Use fictional sample passwords only; this is not a login implementation.
    password: { type: String, required: true },
  },
  { timestamps: true }, // Mongoose maintains createdAt/updatedAt on writes.
);

export const User = mongoose.model('User', userSchema);
