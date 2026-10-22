import assert from 'node:assert/strict';
import test from 'node:test';
import mongoose from 'mongoose';
import { User } from '../models/todos/user.models.js';
import { Todo } from '../models/todos/todo.models.js';
import { SubTodo } from '../models/todos/subTodo.models.js';

const validUser = () => ({ username: 'student', email: 'Student@Example.com', password: 'demo-only' });

async function validationError(doc) {
  let failure;
  try {
    await doc.validate();
  } catch (error) {
    failure = error;
  }
  assert.ok(failure, 'Expected document validation to fail');
  return failure;
}

test('User requires username, email and password', async () => {
  for (const field of ['username', 'email', 'password']) {
    for (const missing of [undefined, '']) {
      const doc = new User({ ...validUser(), [field]: missing });
      assert.equal((await validationError(doc)).errors[field].kind, 'required');
    }
  }
});

test('email is lowercased and valid data passes async validation', async () => {
  const doc = new User(validUser());
  await doc.validate();
  assert.equal(doc.email, 'student@example.com');
});

test('email uniqueness is an index, not offline duplicate validation', async () => {
  assert.ok(User.schema.indexes().some(([keys, options]) => keys.email === 1 && options.unique));
  await new User(validUser()).validate();
  await new User(validUser()).validate();
});

test('both todo models require content and default to incomplete', async () => {
  for (const Model of [Todo, SubTodo]) {
    assert.equal((await validationError(new Model())).errors.content.kind, 'required');
    assert.equal((await validationError(new Model({ content: '' }))).errors.content.kind, 'required');
    const doc = new Model({ content: 'Revise' });
    await doc.validate(); // createdBy is optional in the demonstrated schema.
    assert.equal(doc.complete, false);
    assert.equal(new Model({ content: 'Done', complete: true }).complete, true);
  }
  assert.deepEqual(new Todo({ content: 'Study' }).subTodos.toObject(), []);
});

test('ObjectId strings cast to references and invalid IDs fail', async () => {
  const id = new mongoose.Types.ObjectId();
  for (const Model of [Todo, SubTodo]) {
    const doc = new Model({ content: 'Study', createdBy: id.toHexString() });
    await doc.validate();
    assert.ok(doc.createdBy.equals(id));
    assert.equal((await validationError(new Model({ content: 'Study', createdBy: 'bad-id' }))).errors.createdBy.name, 'CastError');
  }
  const todo = new Todo({ content: 'Study', subTodos: [id.toHexString()] });
  assert.ok(todo.subTodos[0].equals(id));
  await validationError(new Todo({ content: 'Study', subTodos: ['bad-id'] }));
});

test('reference names resolve to registered models', () => {
  for (const Model of [Todo, SubTodo]) {
    const ref = Model.schema.path('createdBy').options.ref;
    assert.equal(ref, 'User');
    assert.equal(mongoose.model(ref), User);
  }
  const ref = Todo.schema.path('subTodos').getEmbeddedSchemaType().options.ref;
  assert.equal(ref, 'SubTodo');
  assert.equal(mongoose.model(ref), SubTodo);
});

test('references alone do not require target existence', async () => {
  await new Todo({
    content: 'Reference shape only',
    createdBy: new mongoose.Types.ObjectId(),
    subTodos: [new mongoose.Types.ObjectId()],
  }).validate();
});

test('timestamps are configured on all models, without inventing creation times', () => {
  for (const Model of [User, Todo, SubTodo]) {
    assert.equal(Model.schema.options.timestamps, true);
    assert.equal(Model.schema.path('createdAt').instance, 'Date');
    assert.equal(Model.schema.path('updatedAt').instance, 'Date');
    assert.equal(new Model().createdAt, undefined);
  }
});

test('model names map to default lowercase plural collection names', () => {
  assert.equal(User.collection.name, 'users');
  assert.equal(Todo.collection.name, 'todos');
  assert.equal(SubTodo.collection.name, 'subtodos');
});

test('exploratory fields do not silently become final requirements', () => {
  assert.equal(User.schema.path('isActive'), undefined);
  assert.equal(User.schema.path('photo'), undefined);
  assert.equal(User.schema.path('dateOfBirth'), undefined);
  assert.equal(Todo.schema.path('color'), undefined);
  assert.equal(User.schema.path('username').options.unique, undefined);
});

test('custom required message and shorthand examples work', async () => {
  const { shorthandSchema, customMessageSchema } = await import('../examples/schema-syntax.js');
  assert.equal(shorthandSchema.path('isActive').instance, 'Boolean');
  const Demo = mongoose.model('CustomMessageTest', customMessageSchema);
  assert.equal((await validationError(new Demo())).errors.password.message, 'Password is required');
});
