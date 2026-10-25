import { buildFixtures } from './fixtures.js';

console.log('Course data-model demonstration (offline; nothing is persisted).');
for (const document of Object.values(buildFixtures())) {
  await document.validate();
  const value = document.toObject();
  delete value.password;
  console.log(`\n${document.constructor.modelName} -> ${document.collection.name}`);
  console.log(JSON.stringify(value, null, 2));
}
console.log('\nAll eight models validated. Timestamps are assigned when documents are saved.');
console.log('Use npm run test:db to verify persistence against temporary real MongoDB.');
