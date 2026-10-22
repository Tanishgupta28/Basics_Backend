import mongoose from 'mongoose';

// 2:42:20–2:43:18: an intermediate syntax demonstration, not the final User.
export const shorthandSchema = new mongoose.Schema({
  username: String,
  email: String,
  isActive: Boolean,
});

// 2:47:29–2:48:52: required can accept [boolean, custom message].
// The instructor later reverts to required: true in the final model.
export const customMessageSchema = new mongoose.Schema({
  password: { type: String, required: [true, 'Password is required'] },
});

// Separate model names keep these temporary examples out of the final User.
const ShorthandExample = mongoose.model('ShorthandExample', shorthandSchema);
const CustomMessageExample = mongoose.model('CustomMessageExample', customMessageSchema);
await new ShorthandExample({ username: 'student', isActive: true }).validate();
console.log('Shorthand schema validated offline.');
try {
  await new CustomMessageExample().validate();
} catch (error) {
  console.log('Expected custom validation error:', error.errors.password.message);
}
