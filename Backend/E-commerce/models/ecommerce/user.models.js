import mongoose from 'mongoose';

// 3:10:29–3:13:33. This is the course's data model, not an authentication system.
// Password hashing is not taught here. Never put real passwords in this exercise.
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
