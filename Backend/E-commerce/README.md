# Backend course: E-commerce and hospital data modeling

This project reconstructs the complete supplied `tutorial_transcript.txt` (**3:06:31–3:55:44**, 360 lines). The instructor builds four E-commerce models and then four hospital-management models using JavaScript and Mongoose. Both exercises are kept here, inside the existing E-commerce directory.

The runnable result is a **data-modeling project**. At 3:54:56–3:55:12 the instructor explicitly says database connections, controllers and routes have not yet been taught. There is no Express app, HTTP endpoint, frontend, authentication flow, cart or payment implementation in this excerpt. `npm start` runs a terminal demonstration and exits successfully; it does not listen on a port.

## Technologies and dependencies

- Node.js 22.18.0 or newer, JavaScript ES modules, npm.
- Runtime: `mongoose` (installed 9.11.4).
- Development only: `mongodb-memory-server` (installed 11.3.0), which runs an actual temporary MongoDB process for integration verification.
- Node's built-in test runner, assertions, filesystem APIs and environment-file support. No Express, dotenv, testing framework or upload SDK is needed for this lesson.
- Exact direct and transitive versions are recorded in `package-lock.json`; `npm ls --all` lists every installed dependency.

Package versions were selected for this reconstruction; the transcript does not specify versions or show installation commands.

## Run in the VS Code terminal

```powershell
Set-Location 'C:\Users\skg21\Documents\Backend\Backend\E-commerce'
npm ci
npm start
npm run demo:alternatives
npm run check
npm test
```

Dependencies are already installed in this workspace. Use `npm ci` for a fresh checkout. The default demo builds synthetic documents for all eight models, validates them, and prints their shapes and collection names. It hides the disposable password value and does not connect to MongoDB. No real user or patient data is included.

## Database verification and environment configuration

The default database test needs no credentials and does not need a separately installed database:

```powershell
npm run test:db
```

On first use this downloads a MongoDB binary into the ignored `.cache/mongodb-binaries` directory (the Windows 8.2.6 archive is approximately 781 MiB). It starts a local process on an available port, exercises the models, removes its temporary database and stops that process. Later runs reuse the cached binary. Dependency installation itself skips this binary download.

To use an existing local MongoDB service instead:

```powershell
# On a fresh checkout only; do not overwrite an existing .env:
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
npm run test:db:configured
```

`.env` is already configured in this workspace with `MONGODB_URI=mongodb://127.0.0.1:27017`, and the local MongoDB service was tested successfully. On another machine, start your MongoDB service first or use the temporary-server command above. A hosted URI belongs only in `.env`; never paste credentials into a model or commit them. A hosted account would need permission to create and drop the temporary verification database.

Both database commands override any database name from the URI with a unique `course_verify_*` name. They save only synthetic fixtures and drop only the database created by that run. Existing application databases are not seeded, cleared or modified. Failure returns a nonzero exit status without printing the configured URI. A cleanup failure reports the generated temporary database name.

The connection script, fixtures, `populate()` queries and tests are supporting verification requested for this reconstruction; they are **not claimed as code demonstrated in the transcript**.

## Project structure

```text
E-commerce/
├── tutorial_transcript.txt                 # Original, unchanged
├── README.md
├── CONCEPTS_EXPLAINED.md
├── IMPLEMENTATION_CHECKLIST.md
├── TRANSCRIPT_COVERAGE.md
├── VERIFICATION.md
├── .env                                   # Local only, ignored
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── models/
│   ├── index.js
│   ├── ecommerce/
│   │   ├── user.models.js
│   │   ├── category.models.js
│   │   ├── product.models.js
│   │   └── order.models.js
│   └── hospital-management/
│       ├── medical-record.models.js
│       ├── patient.models.js
│       ├── doctor.models.js
│       └── hospital.models.js
├── examples/
│   └── schema-alternatives.js
├── scripts/
│   ├── fixtures.js
│   ├── demo.js
│   ├── check-syntax.js
│   └── verify-database.js
└── tests/
    └── models.test.js
```

`node_modules/` and `.cache/` are generated locally and ignored. No previous tutorial project is changed.

## Model reference

All eight models have `createdAt` and `updatedAt` timestamps. Each exported model name matches its Mongoose registration name.

| Model | Fields and behavior |
|---|---|
| User | Required username/email strings, lowercased and uniquely indexed; required password string |
| Category | Required name string |
| Product | Required name, description, Category reference; image URL string; price/stock default 0; optional User owner reference |
| Order | Required orderPrice and address; User customer reference; embedded orderItems with Product productId and required quantity; Pending/Cancelled/Delivered status, default Pending |
| MedicalRecord | Empty timestamped schema, exactly as far as the lesson develops it |
| Patient | Required name, diagnosedWith, address, age, bloodGroup and gender; gender M/F/Others; Hospital admittedIn reference |
| Doctor | Required name, numeric salary and qualifications string; experienceInYears default 0; Hospital references in worksInHospitals |
| Hospital | Required name, addressLine1, city, pincode strings; optional addressLine2; specializedIn string array |

Some speech does not uniquely determine the original spelling, casing or required flags. See the explicit assumptions in [TRANSCRIPT_COVERAGE.md](TRANSCRIPT_COVERAGE.md), especially doctor salary and the missing hospital-name segment.

The password field reproduces the course schema; no hashing or login behavior is taught here. Use only disposable synthetic values. References are not database-enforced foreign keys. The lesson also does not add minimum prices, integer quantities, nonempty item arrays, email-format validation, automatic totals, stock deduction or status-transition rules. These limitations are preserved and explained rather than silently changing the exercise.

## Commands and endpoints

| Command | Result |
|---|---|
| `npm start` / `npm run demo` | Offline demonstration of all eight models |
| `npm run demo:alternatives` | Eight isolated examples of discussed schema alternatives |
| `npm run check` | Parse every project JavaScript source file |
| `npm test` | Offline model behavior tests |
| `npm run test:db` | Integration checks using temporary real MongoDB |
| `npm run test:db:configured` | Same checks using the URI in `.env` and an isolated database |

**API endpoints: none in this transcript.** HTTP response tests are therefore not applicable. Read [VERIFICATION.md](VERIFICATION.md) for actual test results and [CONCEPTS_EXPLAINED.md](CONCEPTS_EXPLAINED.md) for the learning walkthrough.

## Transcript fidelity and Git

The main models follow the instructor's sequence. Alternative image representations, currency prices, inline order items, structured addresses, seat enums, doctor qualifications/salary, hospital hours and likes remain in a separate executable example. Optional fields merely suggested in passing are documented without expanding the final models.

No exact diagram, diagram public URL or source-code screenshot is included in the transcript. A reconstructed relationship diagram is provided in the concepts document. MedicalRecord fields and future lessons are not invented.

This folder belongs to the repository rooted at `C:\Users\skg21\Documents\Backend`, branch `main`. GitHub confirmed that the existing `Tanishgupta28/javascript` remote redirects to `Tanishgupta28/Basics_Backend`; its configuration is preserved. Only this E-commerce directory is included in this implementation's commit.
