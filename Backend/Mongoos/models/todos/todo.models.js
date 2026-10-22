import mongoose from 'mongoose';

// 2:51:48–3:02:12: the outer todo card and its references.
const todoSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    complete: { type: Boolean, default: false },
    // No required constraint was stated for the creator reference.
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // These are IDs of separate SubTodo documents, not embedded documents.
    subTodos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubTodo' }],
  },
  { timestamps: true },
);

export const Todo = mongoose.model('Todo', todoSchema);
