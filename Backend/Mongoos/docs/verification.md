# Verification record

Checked on 2026-10-22 with Node.js 22.18.0, npm 10.9.3 and Mongoose 9.11.3.

| Check | Observed result |
| --- | --- |
| Dependency installation | Mongoose installed; package-lock.json generated; npm reported zero vulnerabilities for the project install. |
| `npm start` | Three sample documents validate offline; normalized email, defaults, IDs and collection names printed. Nothing saved. |
| `npm run example:syntax` | Shorthand schema validates; missing password emits the expected custom message. |
| `npm test` | 11 tests passed, zero failures or skips. |
| `npm run db:check` | Local MongoDB service reachable at 127.0.0.1:27017. |
| `npm run test:db` | Four live checks plus their parent test passed (Node reports 5), zero failures or skips. Temporary database removed. |
| Mermaid syntax | All three fenced diagrams parsed successfully with Mermaid 12.2.0 using temporary, Git-ignored tooling. |
| Documentation | Local links resolve; Mermaid source reviewed against the narrated fields. VS Code preview layout was not visually inspected. |

Offline tests cover required fields, lowercase email, the unique index
declaration, defaults, ObjectId casting/rejection, registered reference targets,
timestamps, collection names, and temporary syntax examples. Duplicate values
passing offline validation explicitly demonstrate that uniqueness needs MongoDB.

Live checks cover saved documents, unique email rejection, both creator references,
the sub-todo array using nested population, and creation/update timestamps. They
also verify that completing a child does not silently complete the outer card.
The scripts are supplemental verification, not reconstructed tutorial CRUD.

The initial offline run exposed Mongoose's deprecation warning for
`validateSync()`. The examples/tests now use `await validate()` and the affected
checks were rerun without that warning.

No paid service, external account, cloud database, controller or HTTP server was
needed. Missing transcript material and exact visual fidelity limits are listed
in [the walkthrough](tutorial-walkthrough.md).
