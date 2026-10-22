import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import test from 'node:test';
import mongoose from 'mongoose';
import { User } from '../models/todos/user.models.js';
import { Todo } from '../models/todos/todo.models.js';
import { SubTodo } from '../models/todos/subTodo.models.js';

// Additional verification, not a claim that CRUD/populate was taught here.
// Each run owns a new random database. Never drop a user-provided database.
test('local MongoDB persistence, unique index, populate and timestamp lifecycle', async (t) => {
  const dbName = `mongoose_tutorial_verify_${randomUUID().replaceAll('-', '')}`;
  const connection = mongoose.createConnection('mongodb://127.0.0.1:27017', {
    dbName,
    serverSelectionTimeoutMS: 3000,
  });
  try {
    await connection.asPromise();
    await connection.db.admin().ping();
  } catch (error) {
    await connection.close();
    t.skip(`Local MongoDB unavailable; persistence was NOT verified: ${error.message}`);
    return;
  }

  try {
    const DbUser = connection.model('User', User.schema);
    const DbTodo = connection.model('Todo', Todo.schema);
    const DbSubTodo = connection.model('SubTodo', SubTodo.schema);
    await Promise.all([DbUser.init(), DbTodo.init(), DbSubTodo.init()]);
    const user = await DbUser.create({ username: 'student', email: 'Student@Example.com', password: 'fictional-demo-only' });
    const child = await DbSubTodo.create({ content: 'Revise references', createdBy: user._id });
    const todo = await DbTodo.create({ content: 'Study', createdBy: user._id, subTodos: [child._id] });

    await t.test('documents persist with defaults, normalized email and timestamps', async () => {
      assert.equal((await DbUser.findById(user._id)).email, 'student@example.com');
      for (const doc of [user, todo, child]) {
        assert.ok(doc.createdAt instanceof Date);
        assert.ok(doc.updatedAt instanceof Date);
      }
      assert.equal(todo.complete, false);
      assert.equal(child.complete, false);
    });

    await t.test('unique email index rejects a duplicate after lowercase conversion', async () => {
      await assert.rejects(
        DbUser.create({ username: 'another', email: 'STUDENT@EXAMPLE.COM', password: 'fictional-demo-only' }),
        (error) => error.code === 11000,
      );
    });

    await t.test('creator and array references populate from separate collections', async () => {
      const loaded = await DbTodo.findById(todo._id)
        .populate('createdBy', 'username')
        .populate({ path: 'subTodos', populate: { path: 'createdBy', select: 'username' } });
      assert.equal(loaded.createdBy.username, 'student');
      assert.equal(loaded.subTodos[0].content, 'Revise references');
      assert.ok(loaded.subTodos[0].createdBy._id.equals(user._id));
    });

    await t.test('updating a child preserves createdAt and advances updatedAt', async () => {
      const originalCreated = child.createdAt.getTime();
      const originalUpdated = child.updatedAt.getTime();
      await new Promise((resolve) => setTimeout(resolve, 20));
      child.complete = true;
      await child.save();
      const saved = await DbSubTodo.findById(child._id);
      assert.equal(saved.complete, true);
      assert.equal(saved.createdAt.getTime(), originalCreated);
      assert.ok(saved.updatedAt.getTime() > originalUpdated);
      // Auto-completing the outer card was discussed, but never implemented.
      assert.equal((await DbTodo.findById(todo._id)).complete, false);
    });
  } finally {
    try {
      assert.equal(connection.name, dbName);
      await connection.dropDatabase();
      console.log('Removed this run\'s temporary verification database.');
    } finally {
      await connection.close();
    }
  }
});
