import { test, expect } from '@playwright/test';
import { cp, rm, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const expectedJokes = [
  { id: 1, title: 'A joke', content: 'This is a joke' },
  { id: 2, title: 'Another joke', content: 'This is another joke' },
  { id: 3, title: 'Third joke', content: 'This is the third joke' },
  { id: 4, title: 'Fourth joke', content: 'This is the fourth joke' },
  { id: 5, title: 'Fifth joke', content: 'This is the fifth joke' },
];

async function expectJokesInBrowser(page, url) {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  // Avoid an unrelated missing-favicon request in the minimal tutorial page.
  await page.route('**/favicon.ico', (route) => route.fulfill({ status: 204 }));
  const responsePromise = page.waitForResponse((response) =>
    response.url() === new URL('/api/jokes', url).href,
  );
  await page.goto(url);
  const response = await responsePromise;
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual(expectedJokes);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Chai and full stack');
  await expect(page.getByText('Jokes: 5', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(5);
  for (const joke of expectedJokes) {
    await expect(page.getByRole('heading', { name: joke.title, exact: true })).toBeVisible();
    await expect(page.getByText(joke.content, { exact: true })).toBeVisible();
  }
  expect(errors).toEqual([]);
}

test('Express returns five jokes and Vite forwards the same JSON', async ({ request }) => {
  for (const url of ['http://localhost:3000/api/jokes', '/api/jokes']) {
    const response = await request.get(url);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(await response.json()).toEqual(expectedJokes);
  }
  expect((await request.get('http://localhost:3000/jokes')).status()).toBe(404);
});

test('React fetches and renders every joke through the development proxy', async ({ page }) => {
  await expectJokesInBrowser(page, 'http://localhost:5173');
});

test('production build runs from Express, then copied assets are removed', async ({ page, request }) => {
  const build = fileURLToPath(new URL('../dist/', import.meta.url));
  const copiedBuild = fileURLToPath(new URL('../../backend/dist/', import.meta.url));
  await access(new URL('../dist/index.html', import.meta.url));
  // Never replace a user's existing copied build.
  try {
    await access(copiedBuild);
    throw new Error('backend/dist already exists; move it before running this test.');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  try {
    await cp(build, copiedBuild, { recursive: true, force: false, errorOnExist: true });
    await expectJokesInBrowser(page, 'http://localhost:3000');
  } finally {
    // Fixed project-local path; remove only the build created by this test.
    await rm(copiedBuild, { recursive: true, force: true });
  }
  expect((await request.get('http://localhost:3000/')).status()).toBe(404);
});
