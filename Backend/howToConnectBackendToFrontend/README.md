# Backend to frontend integration

Implementation of the supplied Hindi transcript for [Chai aur Code, 1:21:00–2:13:00](https://youtu.be/7fjOw8ApZ1I?t=4860).

## Run locally

Use Node.js 22.12+ (tested with 22.18.0) and npm. Open two terminals in this project folder.

Backend:

```powershell
cd backend
npm ci
npm start
```

Frontend:

```powershell
cd frontend
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`. The page shows **Chai and full stack**, **Jokes: 5**, and all five joke titles and contents.

The Express server listens on `process.env.PORT || 3000`. It returns an array of five `{ id, title, content }` objects at `http://localhost:3000/api/jokes`. The frontend uses Axios, `useState([])`, `useEffect(..., [])`, and `map()` with an implicit JSX return and stable ID keys.

Vite forwards `/api` requests to `http://localhost:3000`. If you change the backend port, update that target in `frontend/vite.config.js` and restart Vite. `PORT` is read from the process environment; this project does not install a `.env` loader.

## Build and verify

In `frontend`, run:

```powershell
npm run build
npx playwright install chromium
npm test
```

The build goes to `frontend/dist`. Tests start and stop their own backend and Vite processes, so stop manual servers on ports 3000 and 5173 first. Tests check the API data, proxy forwarding, all five jokes rendered in a real browser, browser errors, and the production build served by Express. They temporarily copy the build into `backend/dist`, then remove only that test-created copy. They refuse to overwrite an existing `backend/dist`.

On Windows, tests can use an existing Microsoft Edge installation instead of downloading Chromium:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm test
```

Playwright and these tests are verification support added for this task, not tutorial application features.

## Static-build demonstration (2:02:26–2:08:35)

The transcript builds the frontend, copies `dist` into the backend, and adds `app.use(express.static('dist'))`. The same middleware is implemented with an absolute path resolved from `server.js`, so it also works when launched from another directory.

To reproduce manually, start with no existing `backend/dist`. From the project folder:

```powershell
cd frontend
npm run build
cd ..
Copy-Item -LiteralPath frontend/dist -Destination backend/dist -Recurse
cd backend
npm start
```

Open `http://localhost:3000`. Express serves the built page and `/api/jokes` from the same origin. Editing frontend source does not update this copied build: rebuild, replace the old `backend/dist` with the newly generated build, and restart the server. That repeated manual copying is the problem demonstrated in the tutorial. Remove the copied `backend/dist` afterwards to return to separate frontend/backend development, as at 2:08:35. Generated builds are excluded from Git.

The Vite development proxy is **not embedded in the production bundle**. With separate production hosting, configure the host/reverse proxy to forward `/api` to the backend. Serving the build from Express works because the page and API share an origin. See the [Vite server options](https://vite.dev/config/server-options.html#server-proxy) and [Express static-file documentation](https://expressjs.com/en/starter/static-files/).

## Transcript coverage and limits

| Transcript section | Implementation / outcome |
| --- | --- |
| 1:21:00–1:24:24 | Missing from the provided transcript; no unseen steps inferred. |
| 1:24:25–1:30:40 | Separate directories; Express server; ES-module imports and `type: module`; `npm start`; environment port with fallback. |
| 1:30:47–1:33:51 | Five jokes with ID, title, and content. The initial readiness route is retained as a comment because the instructor comments it out. |
| 1:34:00–1:44:57 | React/Vite JavaScript app; heading, joke count and list; Axios request and promise error logging; state and effect. |
| 1:45:14–1:59:51 | CORS discussion; final `/api/jokes` route; relative client URL; Vite proxy. CORS middleware and CRA's package.json proxy are discussed alternatives, not installed in the demonstrated Vite solution. |
| 1:59:59–2:01:37 | Corrected `map()` callback returns JSX through parentheses; empty effect dependency array avoids a fetch loop. |
| 2:02:26–2:08:35 | Production build, copy into backend, static serving, stale-build/rebuild explanation, and return to separate projects. |
| 2:08:43–2:10:08 | Recap and closing remarks; no additional application code. |
| 2:10:17–2:13:00 | Data-modelling introduction: clarify stored fields and their formats before writing controllers. No concrete schema, database connection, or authentication implementation is specified yet, so none is invented. |

The whole supplied transcript was read, including its last line at 2:13:06. It contains timestamp gaps and transcription errors. Dependency versions, original generated Vite assets/styles, exact joke strings, and the heading change around 2:07:37–2:08:28 are not fully transcribed. This project uses compatible dependency versions with lockfiles, minimal CSS, the clearly stated heading, and simple placeholder text matching the described jokes. The instructor explicitly permits supplying the joke text around 1:33:43. No unseen code was reconstructed from guesses.

The repository's other projects are independent. Run installs and commands inside this project's `backend` and `frontend` directories.
