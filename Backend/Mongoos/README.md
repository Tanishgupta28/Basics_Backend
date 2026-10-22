# MongoDB and Mongoose data modelling

Local VS Code companion to the supplied Chai aur Code Hindi transcript
(2:10:26–3:06:24). Covers modelling data before controllers, schemas versus
models, String/Boolean/ObjectId types, required validation, lowercase conversion,
unique indexes, defaults, timestamps, collection naming and model references.

Read [the chronological walkthrough](docs/tutorial-walkthrough.md) for timestamps,
intermediate examples, transcript gaps and the distinction between teaching
explanations and practical work.

## Structure and models

```text
models/todos/           User, Todo and SubTodo model files
examples/              Offline model and schema-syntax demonstrations
diagrams/              Planning sketches and final models in Mermaid Markdown
scripts/               Read-only local MongoDB connectivity check
tests/                 Offline tests and optional live database verification
docs/                  Timestamped walkthrough and verification results
```

`User` requires username, email and password; email is lowercase with a unique
index. `Todo` and `SubTodo` require content, default complete to false, and each
has an optional `createdBy` ObjectId referencing User. Todo also stores a
`subTodos` array of SubTodo IDs. All three use timestamps. References do not
enforce target existence or ownership. Passwords are only modelled strings in
this lesson; examples use fictional data, with no authentication implementation.

## Run in VS Code's integrated terminal

Open this `Mongoos` folder and choose **Terminal > New Terminal**. Use Node.js 22
or newer. Mongoose is the only runtime dependency; the lockfile pins the install.

```powershell
npm ci
npm start
npm run example:syntax
npm test
npm run db:check
npm run test:db
```

The first three execution commands work entirely offline. `db:check` performs
a read-only ping at `127.0.0.1:27017`. `test:db` uses the same local server,
creates a randomly named `mongoose_tutorial_verify_*` database, tests persistence,
unique email, population and timestamp updates, then drops only that run's
database. It does not use your existing databases. If the server is unavailable,
the live test explicitly reports a skip; that is not proof of database behavior.
No account, cloud service, `.env`, or database installation is needed for offline work.

See [verification results](docs/verification.md) for what was actually checked.

## View diagrams

Open [planning.md](diagrams/planning.md) or [models.md](diagrams/models.md), then
use **Markdown: Open Preview to the Side** (`Ctrl+K V`). VS Code 1.121 and later
include Mermaid support. Older installations can use **Markdown Preview Mermaid
Support** (`bierner.markdown-mermaid`); its [Marketplace page](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)
explains its inclusion in VS Code. The source stays local; no diagramming account
is required.

## Scope and limitations

The transcript builds only the three todo models. Hospital, ecommerce, library,
society and LMS examples are future work, without sufficient schemas here.
Moon Modeler/Eraser and the registration/todo sketches are represented by local
Mermaid equivalents; exact visual reproduction is not possible from narration.
StackBlitz is replaced by this local Node project; its unused Express starter
and editor font changes are not application features.

Some passages are missing or garbled, especially username options at
2:44:23–2:45:04. Only supported constraints are implemented. Photo, DOB and color
are exploratory ideas, not final fields. The shorthand `isActive` and temporary
custom required message are separate runnable examples. Database tests and
sample data are verification additions; the instructor does not perform CRUD
in this segment.

Technical reference: [Mongoose schemas](https://mongoosejs.com/docs/guide.html)
and [validation, including unique indexes](https://mongoosejs.com/docs/validation.html).
