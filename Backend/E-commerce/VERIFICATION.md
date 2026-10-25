# Verification record

Implementation verified on Windows with Node.js **22.18.0**, npm **10.9.3**, Mongoose **9.11.4**, and mongodb-memory-server **11.3.0**. These are observed results, not a claim that the instructor ran these checks.

| Check | Result |
|---|---|
| Read entire transcript | All 360 lines, 3:06:31–3:55:44 |
| `npm install mongoose` and development dependency installation | Successful; npm reported zero vulnerabilities across 57 audited packages |
| `npm ci --offline --cache .cache/npm` | Clean installation from the lockfile succeeded, using cached packages; no MongoDB post-install download |
| `npm start` | All eight models validate; synthetic documents and collection names printed; no password value printed |
| `npm run demo:alternatives` | All eight discussion examples validate without changing the course model registry |
| `npm run check` | All 15 JavaScript files pass syntax parsing |
| `npm test` | 18 passed, 0 failed, 0 skipped; final run has no deprecation warnings |
| `npm run test:db:configured` | Passed against the existing local MongoDB **8.0.12** service |
| `npm run test:db` | Passed against temporary real MongoDB **8.2.6**; downloaded binary cached locally |
| Invalid configured URI | Expected exit code 1 / MongoParseError; configured URI not echoed |
| Git ignore rules | `.env`, `node_modules/` and `.cache/` are ignored; `.env.example` is included |
| Transcript preservation | SHA-256 remains `CCA730CC323232098DF5910F4BA975F71E08DB41A74832256B8474285782A743` |
| Repository identity | Local root is `C:/Users/skg21/Documents/Backend`, current branch `main`; both GitHub names resolve to `Tanishgupta28/Basics_Backend` |
| Implementation commit and push | `364cdee` committed 25 E-commerce files and pushed successfully to `Basics_Backend/main` through the unchanged redirected origin |

The initial temporary MongoDB download was denied by the execution sandbox. It was retried with network permission and completed successfully. This is resolved, not an outstanding database blocker.

## Offline behavior covered

- All required fields; username/email lowercase transformations.
- Category collection naming, Product price/stock defaults and numeric casting.
- Multiple embedded order items, individual quantities and separation from stock.
- Required nested quantities, default status and exact accepted/rejected status choices.
- The distinction between enum and required; the original schema's permissive empty item arrays.
- Every reference points to the intended registered model; invalid ObjectId input is rejected.
- Reference existence is not incorrectly treated as an offline validation guarantee.
- Patient gender enum/no default, doctor experience default and multiple hospitals.
- Optional addressLine2, leading-zero/alphanumeric postal strings and string specialization arrays.
- All top-level timestamp options, absent child timestamps, empty MedicalRecord schema.
- Every discussion alternative; negative tests for inline quantities and seat choices.

## Real MongoDB behavior covered in both modes

1. Create and read documents for all eight models.
2. Persist `createdAt` and `updatedAt`.
3. Populate Product Category and owner references.
4. Populate Order customer and embedded items' Product references.
5. Resolve Patient admittedIn and Doctor worksInHospitals, including two hospitals.
6. Build actual unique indexes and reject duplicate usernames and emails after case normalization, with error 11000.
7. Reject invalid status and missing nested quantity on saves; reject invalid status updates with `runValidators: true`.
8. Persist a Delivered status update, preserve createdAt and advance updatedAt.
9. Confirm exactly eight collections, with no separate order-item collection and no rejected documents persisted.
10. Remove only the randomly named verification database; disconnect clients and stop the temporary server.

Configured mode uses `MONGODB_URI` only as the server connection, overrides the database with a generated `course_verify_*` name, and guards that name before dropping it. The existing local MongoDB service remains running; it is not stopped or reconfigured.

## Not claimed as tested or reconstructed

- HTTP endpoints: not applicable; none are taught or implemented.
- Authentication/password hashing, uploads, payment/cart, business-rule controllers: not taught in this excerpt.
- Atlas/cloud credentials and cloud uploads: not configured or needed; image URLs are illustrative.
- Original public diagram/share link and exact lost on-screen text: absent from transcript. Local diagram and assumptions are explicitly labeled in `TRANSCRIPT_COVERAGE.md`.
- MedicalRecord clinical fields: never specified; only the shown timestamped boilerplate is reproduced.

The implementation commit and push above were confirmed before marking the checklist complete. A follow-up documentation commit records that completed result; the final delivery message identifies the final branch tip.
