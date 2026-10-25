# Implementation checklist

Source: all 360 lines of `tutorial_transcript.txt`, read in order, from **3:06:31 to 3:55:44**. The transcript is preserved unchanged. This is a data-modeling lesson, including a hospital-management exercise, rather than an HTTP application lesson.

Legend: `[x]` implemented and verified; `[ ]` pending or explicitly blocked. Discussion-only material is identified separately. Exact field spellings and ambiguous choices are recorded in `TRANSCRIPT_COVERAGE.md`.

## Instructor's implementation, in sequence

- [x] 3:06:48–3:08:33: Explain requirements-first modeling and the two exercises.
- [x] 3:08:42–3:10:21: Create consistent `models/ecommerce/*.models.js` files for User, Category, Product, Order.
- [x] 3:10:29–3:12:00: Import Mongoose, construct User schema with timestamps, export named User model.
- [x] 3:12:08–3:13:33: Required string username/email with unique indexes and lowercase; required string password.
- [x] 3:13:50–3:14:29: Explain creating independent models before dependent models.
- [x] 3:14:36–3:17:17: Category schema, timestamps, required string name; singular model name, matching export and reference, plural collection naming.
- [x] 3:17:25–3:19:50: Product schema/model with required description and name strings.
- [x] 3:19:58–3:22:06: Product image URL string; explain binary storage, local public files, S3/Cloudinary, and image variants. No upload service is configured in the lesson.
- [x] 3:22:14–3:23:03: Product price and stock numbers default to zero.
- [x] 3:23:10–3:25:22: Required Category ObjectId reference; owner User ObjectId reference.
- [x] 3:25:30–3:25:44: Preserve the optional INR/USD pricing idea separately from the final Product model.
- [x] 3:26:08–3:28:35: Order model/timestamps, required numeric orderPrice and customer User reference.
- [x] 3:28:43–3:32:37: Local orderItemSchema with Product reference and required numeric quantity, embedded in orderItems array, without child timestamps.
- [x] 3:32:45–3:34:09: Preserve/explain inline object-array syntax versus separate schema, and optional separate-file organization. Prior Todo code is only referenced, not recreated or edited.
- [x] 3:34:17–3:34:48: Required address string and separate structured-address alternative.
- [x] 3:34:56–3:37:36: Order status enum Pending/Cancelled/Delivered, default Pending; demonstrate invalid choices. Preserve airplane-seat analogy as an isolated example.
- [x] 3:37:44–3:42:24: Create Doctor, Patient, Hospital, MedicalRecord schemas/models with timestamps; check copied model/schema names.
- [x] 3:42:32–3:44:26: Patient required name, diagnosedWith, address strings and age number.
- [x] 3:44:26–3:44:50: Patient bloodGroup string and discuss optional enum.
- [x] 3:44:50–3:45:32: Required patient gender enum M/F/Others, without default.
- [x] 3:45:32–3:46:27: Patient admittedIn Hospital ObjectId reference; explain domain-specific user fields and optional photo idea.
- [x] 3:46:35–3:47:58: Doctor name, salary and qualifications; document salary ambiguity and separate qualifications-array alternative.
- [x] 3:48:05–3:48:30: Numeric experienceInYears default zero.
- [x] 3:48:30–3:49:54: Doctor worksInHospitals ObjectId array referencing singular Hospital; preserve the typo correction in explanation.
- [x] 3:50:01–3:50:42: Separate illustrative hospital-hours subdocument alternative.
- [x] 3:50:50–3:52:26: Hospital name, addressLine1 required, addressLine2 optional, city and string pincode; document missing speech around name and inferred field spellings.
- [x] 3:52:35–3:53:07: Hospital specializedIn string array using `[{ type: String }]` syntax.
- [x] 3:53:07–3:53:31: Explain likes/dislikes as user-ID arrays using an isolated schema example.
- [x] 3:39:18–3:40:41, 3:54:23–3:54:31: Preserve MedicalRecord as the timestamped empty schema actually shown; explain embedded subdocuments.
- [x] 3:53:40–3:55:44: Record missing public diagram URL, later-lesson validation/connection/controller topics, and transcript gaps without inventing implementations.

## Verification and workspace support (requested by user, not coded in lesson)

- [x] Read the full transcript and inspect workspace/repository before coding.
- [x] Set up an isolated JavaScript ES-module npm package and lockfile inside E-commerce.
- [x] Add `.env`, safe `.env.example`, and local `.gitignore`; never use real account credentials in examples.
- [x] Add a runnable terminal demo of all eight models and isolated schema alternatives.
- [x] Check every JavaScript file's syntax and run offline behavior tests for validation, defaults, casing, arrays, references, and model registration.
- [x] Run real MongoDB integration checks for persistence, unique indexes, timestamps, references, and nested order items using an isolated temporary database.
- [x] Provide an opt-in configured-database check; clearly report whether a user-managed MongoDB was tested.
- [x] Write README, beginner concept explanations, timestamp coverage, assumptions, and verification results.
- [ ] Review changed/staged files and transcript hash, confirm repository identity/current branch, commit only E-commerce files and push without force.

## Explicit boundaries

Express, HTTP endpoints, frontend, authentication/password hashing, cart/payments, CRUD controllers, actual image uploads, custom validators, and deployment are not implemented in this excerpt. MedicalRecord domain fields are never specified. The missing diagram's original layout/public link cannot be recovered from the transcript; a local relationship diagram can describe the reconstructed models.
