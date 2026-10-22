import mongoose from 'mongoose';

// 2:54:24–2:55:29 and 3:02:21–3:05:13.
// The narration allows either "content" or "title"; use content consistently.
const subTodoSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    complete: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export const SubTodo = mongoose.model('SubTodo', subTodoSchema);
