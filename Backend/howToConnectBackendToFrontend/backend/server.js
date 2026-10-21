import express from 'express';
import { fileURLToPath } from 'node:url';

const app = express();

// The initial "Server is ready" route is commented out in the tutorial.
// app.get('/', (req, res) => res.send('Server is ready'));

// 2:05:15: serve the copied frontend build for the static-files demonstration.
// With no backend/dist folder, the frontend and backend remain separate.
// Resolve relative to this file so starting from another directory also works.
app.use(express.static(fileURLToPath(new URL('./dist', import.meta.url))));

// The tutorial first uses /jokes, then standardizes it to /api/jokes.
app.get('/api/jokes', (req, res) => {
  const jokes = [
    { id: 1, title: 'A joke', content: 'This is a joke' },
    { id: 2, title: 'Another joke', content: 'This is another joke' },
    { id: 3, title: 'Third joke', content: 'This is the third joke' },
    { id: 4, title: 'Fourth joke', content: 'This is the fourth joke' },
    { id: 5, title: 'Fifth joke', content: 'This is the fifth joke' },
  ];

  res.send(jokes);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
