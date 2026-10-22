# Transcript walkthrough

Source: the complete local `tutorial_transcript.txt`, from the opening greeting
and first timestamp **2:10:26** through **3:06:24**. The source is intentionally
excluded from Git. This is a reconstruction from narration, not a copy of unseen
screen code. Timestamps below preserve the tutorial order.

| Time | Explanation or practical activity | Local equivalent |
| --- | --- | --- |
| 2:10:26–2:14:44 | Start with the data to store, before controllers, login or database choice. | These notes; no server required. |
| 2:14:51–2:18:45 | Introduces Moon Modeler and Eraser; opens an existing entity diagram and its source editor. | Mermaid files in `diagrams/`. The stock diagram's complete fields are not narrated, so it cannot be reproduced exactly. |
| 2:18:53–2:21:50 | Sketches registration with username, email, password and submit; considers photo/DOB; contrasts login's existing email/password. | `diagrams/planning.md`, first diagram. Optional ideas stay out of the final model. |
| 2:21:58–2:27:38 | Sketches outer todo cards (YouTube/gym), child content, done marker, creation date, optional colors, creator and sub-todo list. | `diagrams/planning.md`, second diagram. This is exploratory modelling, before the final schema. |
| 2:27:46–2:29:47 | Explains Mongoose as a modelling helper; visits documentation for types and models. | README concepts and source links. No Prisma or extra database installed. |
| 2:29:55–2:33:50 | Chooses a StackBlitz Express starter, adjusts editor font, installs Mongoose; explicitly sets aside the server. | Local Node ES modules and `npm install` in VS Code's terminal. No Express dependency or account needed. |
| 2:33:57–2:37:05 | Creates `models/todos` and three consistently named model files; imports Mongoose. | `models/todos/*.models.js`. |
| 2:37:14–2:41:28 | Builds `new mongoose.Schema(...)`, exports `mongoose.model(name, schema)`, explains collection naming. | User model, offline collection-name tests. |
| 2:41:37–2:43:18 | Demonstrates shorthand String fields and Boolean `isActive`. | `examples/schema-syntax.js`; intermediate schema only. |
| 2:43:25–2:47:21 | Switches to field option objects; username required; email required/unique/lowercase; password required. | `user.models.js`. See missing username passage below. |
| 2:47:29–2:48:52 | Reads validation docs, demonstrates required with a custom message, then reverts to `true`. | Separate custom-message example; final password remains `required: true`. Numeric min/max are mentioned without a complete domain example, so no invented numeric field. |
| 2:48:59–2:51:41 | Adds schema options `{ timestamps: true }`. | All three models; timestamp verification. |
| 2:51:48–2:55:29 | Creates Todo/SubTodo boilerplate, corrects accidentally misplaced User code. | Three correctly separated model files. |
| 2:55:36–2:59:38 | Adds Todo content, complete default false, creator ObjectId and `ref` to User. | `todo.models.js`. |
| 2:59:45–3:02:12 | Adds an array of ObjectId references to SubTodo. | `Todo.subTodos`; final model diagram. |
| 3:02:21–3:05:13 | Adds SubTodo content/title, complete default false, creator reference. | `subTodo.models.js`. |
| 3:05:22–3:06:24 | Ends the lesson; postpones ecommerce and hospital modelling; mentions library, society and LMS as later exercises. | No schemas invented for these domains. |

## Reconstruction decisions and limits

- At 2:15:08–2:15:24, patients, doctors, hospitals and medical histories illustrate
  choosing entities and fields. No concrete fields or relationships are supplied
  for those entities. String, Number, Date, Buffer, Boolean and Mixed are also
  mentioned during the documentation overview, without complete examples for each.
- The jump from **2:44:23 to 2:45:04** omits the username-options discussion.
  Its String type and required constraint are clear; unique/lowercase/trim are
  not recoverable and have not been guessed.
- Several phrases are garbled (including the creator field around 2:25:09,
  2:57:54 and 3:04:16). `createdBy`, `subTodos` and PascalCase model names are
  consistent local spellings for the clearly described roles, not claims of
  character-for-character screen transcription.
- At 3:02:46–3:03:03 the instructor permits content or title for the child.
  This project uses `content` on both models.
- The initial sketch omits completion on the outer card; the later coding adds
  it. Final models follow the later code. Colors, photo and DOB remain sketch
  ideas; `isActive` remains a shorthand example.
- Automatic completion of the outer card when every child is complete is an
  idea at 2:57:07, not implemented logic in this segment.
- No MongoDB shell operations, database connection or CRUD sequence is actually
  demonstrated. The runnable samples and database tests are local verification
  additions. They do not expand the three model schemas.

## Accuracy notes for revision

Mongoose compiles models in JavaScript; an export does not create a database or
enforce a server-side collection schema. The familiar lowercase/plural default
collection naming is Mongoose behavior. Schema validation and casting happen
through Mongoose, not automatically for every possible MongoDB client.

`unique: true` declares an index, not a validator. An ObjectId can exist without
`ref`; `ref` tells Mongoose which model to use for population. Neither verifies
that the target exists, enforces ownership, or prevents a SubTodo being linked
from multiple Todos. These schemas do not establish SQL foreign-key constraints.
Timestamps are maintained by Mongoose writes, not populated merely by `new`.

References: [Mongoose schemas](https://mongoosejs.com/docs/guide.html),
[validation](https://mongoosejs.com/docs/validation.html),
[population](https://mongoosejs.com/docs/populate.html),
[timestamps](https://mongoosejs.com/docs/timestamps.html).
