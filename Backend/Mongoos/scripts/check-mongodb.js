import mongoose from 'mongoose';

// Verification helper added for this project, not a transcript CRUD example.
// Read-only ping; autoCreate/autoIndex disabled so no collections are created.
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017', {
  serverSelectionTimeoutMS: 3000,
  autoCreate: false,
  autoIndex: false,
});
try {
  await connection.asPromise();
  await connection.db.admin().ping();
  console.log('Local MongoDB is reachable at 127.0.0.1:27017.');
} catch (error) {
  console.error('Local MongoDB is unavailable:', error.message);
  console.error('npm start, npm run example:syntax and npm test still work offline.');
  process.exitCode = 1;
} finally {
  await connection.close();
}
