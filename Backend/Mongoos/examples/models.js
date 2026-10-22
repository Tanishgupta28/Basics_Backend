import { User } from '../models/todos/user.models.js';
import { Todo } from '../models/todos/todo.models.js';
import { SubTodo } from '../models/todos/subTodo.models.js';

// Added revision example: creates and validates documents in memory only.
const user = new User({
  username: 'chai_student',
  email: 'Student@Example.com',
  password: 'fictional-demo-only',
});
const subTodo = new SubTodo({ content: 'Revise Mongoose schemas', createdBy: user._id });
const todo = new Todo({
  content: 'YouTube study',
  createdBy: user._id,
  subTodos: [subTodo._id],
});

for (const doc of [user, todo, subTodo]) {
  await doc.validate();
  const output = doc.toObject();
  if ('password' in output) output.password = '[demo password omitted]';
  console.log(doc.constructor.modelName, doc.constructor.collection.name, output);
}
console.log('Validated offline. Nothing saved; timestamps are assigned on writes.');
