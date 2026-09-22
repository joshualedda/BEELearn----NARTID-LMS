---
name: database
description: Design, review, debug, and modify the Supabase PostgreSQL database for the Next.js LMS. Use for schemas, tables, relationships, migrations, SQL queries, Row Level Security, indexes, constraints, and database performance.
---

# LMS Database

Use this skill whenever working with the LMS database.

Follow the project's `AGENTS.md` and existing database conventions.

The primary database is Supabase PostgreSQL.

## Core Principles

Always prioritize:

1. Data integrity
2. Security
3. Authorization
4. Existing schema compatibility
5. Simple database design
6. Performance
7. Maintainability

Do not make destructive database changes without clearly identifying
their impact first.

## Before Making Database Changes

Before modifying the database:

1. Read `AGENTS.md`.
2. Inspect the existing schema.
3. Inspect existing migrations.
4. Inspect related application code.
5. Inspect existing RLS policies.
6. Identify tables affected by the change.
7. Identify existing relationships and constraints.
8. Determine whether existing structures can support the requirement.

Do not create a new table or column if an existing structure already
provides the required functionality.

## LMS Domain Model

Common LMS entities may include:

- users
- profiles
- roles
- courses
- course_instructors
- modules
- lessons
- enrollments
- assignments
- submissions
- quizzes
- questions
- quiz_attempts
- answers
- grades
- course_progress
- certificates
- notifications

Do not assume these exact tables exist.

Always inspect the actual database before designing changes.

## Schema Design

When creating or modifying tables:

- Use clear and consistent names.
- Follow existing project naming conventions.
- Use appropriate PostgreSQL data types.
- Use primary keys.
- Add foreign keys where relationships exist.
- Add NOT NULL constraints when values are required.
- Add UNIQUE constraints when uniqueness is a business rule.
- Add CHECK constraints when appropriate.
- Define sensible delete behavior.
- Add timestamps when useful.

Avoid storing duplicate data when the value can reliably be derived.

Do not over-normalize simple data without a practical reason.

## Relationships

Explicitly identify relationships such as:

- one-to-one
- one-to-many
- many-to-many

Use junction tables for many-to-many relationships.

Example:

courses
    |
    +---- enrollments ---- users
    |
    +---- modules
             |
             +---- lessons

Use foreign keys to enforce relationships whenever appropriate.

## Foreign Keys

Before creating a foreign key, determine:

- parent table
- child table
- expected delete behavior
- whether cascading deletion is safe

Do not automatically use:

ON DELETE CASCADE

Consider whether deleting the parent should:

- delete children
- restrict deletion
- set the reference to NULL

For important LMS records such as:

- grades
- submissions
- quiz attempts
- certificates

be especially careful with cascading deletes.

## Supabase Authentication

When application users are linked to Supabase Auth, follow the existing
project pattern.

Do not duplicate authentication credentials in application tables.

Never store passwords manually when Supabase Auth is responsible for
authentication.

Never expose privileged authentication information to the client.

## Row Level Security

RLS is critical.

For tables containing user-specific or protected LMS data, inspect whether
RLS should be enabled.

Consider access for:

- ADMIN
- INSTRUCTOR
- STUDENT

RLS policies must enforce actual database access rules.

Do not rely only on:

- hidden UI elements
- client-side role checks
- route protection
- JavaScript conditions

Server-side authorization and database policies should work together.

## Student Access

Students should normally only access records they are authorized to access.

Examples include:

- their own profile
- their enrollments
- courses available to them
- their submissions
- their quiz attempts
- their grades
- their progress
- their certificates

Never assume a supplied `user_id` belongs to the authenticated user.

Prefer deriving identity from the authenticated session when possible.

## Instructor Access

Instructor permissions should be scoped appropriately.

For example, an instructor should not automatically be able to modify
another instructor's course simply because they know its ID.

When applicable, verify course ownership or instructor assignment.

## Admin Access

Administrative privileges must be explicitly verified.

Do not treat a client-provided role such as:

ADMIN

as trusted authorization.

## IDOR Protection

Pay particular attention to IDs supplied by the client.

Examples:

course_id
assignment_id
submission_id
student_id
quiz_id
attempt_id

A valid ID does not mean the authenticated user is authorized to access
that record.

Verify ownership, enrollment, assignment, or role as appropriate.

## SQL Queries

When writing SQL:

- Prefer explicit queries.
- Avoid unnecessary complexity.
- Avoid SELECT * when only a few fields are required.
- Use joins appropriately.
- Avoid repeated queries when one query can safely retrieve the data.
- Parameterize user-controlled values.
- Avoid dynamic SQL unless necessary.

Do not optimize prematurely.

## Supabase Queries

When using the Supabase client:

- Select only required columns when practical.
- Handle errors.
- Handle missing records.
- Verify authorization.
- Avoid unnecessary round trips.
- Avoid exposing privileged clients to the browser.

Never put a service-role key in:

- Client Components
- public JavaScript
- NEXT_PUBLIC_* variables
- browser requests

Service-role credentials are server-only.

## Migrations

Prefer database changes through migrations when the project uses migrations.

Each migration should represent a clear database change.

Before creating a migration:

1. Inspect previous migrations.
2. Follow existing naming conventions.
3. Check whether the change already exists.
4. Consider compatibility with existing data.

A migration should be reproducible.

Do not modify old applied migrations unless the project's workflow
explicitly requires it.

Prefer creating a new migration.

## Destructive Changes

Treat these as potentially destructive:

DROP TABLE
DROP COLUMN
TRUNCATE
DELETE without appropriate filtering
changing primary keys
changing foreign keys
changing column types
removing constraints
changing RLS policies
large data migrations

Before performing destructive operations:

1. Explain what will change.
2. Identify affected application code.
3. Identify possible data loss.
4. Consider existing production data.
5. Provide a safer migration path when possible.

Do not perform destructive operations merely to simplify development.

## Existing Data

When adding a required column to a table containing existing records,
consider migration compatibility.

For example, avoid blindly doing:

ALTER TABLE users
ADD COLUMN department_id uuid NOT NULL;

if existing rows cannot satisfy the constraint.

Instead consider a staged migration when necessary:

1. Add the nullable column.
2. Backfill existing data.
3. Validate the data.
4. Add the NOT NULL constraint.

Choose the approach appropriate to the actual database.

## Indexes

Consider indexes for:

- foreign keys
- frequently filtered columns
- frequently joined columns
- frequently sorted columns
- uniqueness requirements

Do not add indexes blindly.

Remember that indexes improve reads but add storage and write overhead.

Use evidence from actual query patterns when possible.

## Performance

Check for meaningful issues such as:

- N+1 queries
- unnecessary database round trips
- missing useful indexes
- retrieving excessive data
- inefficient joins
- repeated aggregation
- expensive queries executed frequently

Do not introduce complex optimization without evidence that it is useful.

## Transactions

Use transactions when multiple database operations must succeed or fail
together.

Examples may include:

- enrollment plus related initialization
- assignment submission plus related records
- grade updates affecting multiple tables

Avoid leaving partially completed operations when atomicity is required.

## Data Validation

Database constraints should protect important invariants where appropriate.

Application validation alone may not be sufficient.

Examples:

- unique enrollment per student/course
- valid score ranges
- valid status values
- required relationships

Example:

UNIQUE (student_id, course_id)

could prevent duplicate enrollment if that matches the LMS business rules.

## Timestamps

Follow the existing project's timestamp conventions.

Common fields include:

created_at
updated_at

Prefer timezone-aware timestamps when appropriate.

Do not add timestamp columns to every table automatically if they provide
no value.

## Soft Delete

Do not automatically implement soft deletion.

Use it when the business requirements require retaining records.

For important LMS historical data such as:

- submissions
- grades
- attempts
- certificates

consider whether historical retention is required before deleting records.

## Database Types

If the project generates TypeScript types from Supabase, keep them
synchronized after schema changes.

Do not manually duplicate database types unnecessarily if generated types
already exist.

## Database Review

When asked to review the database, check:

1. Tables
2. Relationships
3. Foreign keys
4. Constraints
5. RLS
6. Policies
7. Indexes
8. Duplicate data
9. Query patterns
10. Data integrity
11. Security
12. Migration history

Report confirmed issues separately from suggestions.

## When MCP Is Available

If a Supabase MCP server or other approved database tool is available,
use it to inspect the actual database when appropriate.

Do not assume database structures based only on feature names.

Prefer actual schema information.

Do not execute destructive operations without explicit approval.

## Proposed Database Changes

Before significant schema changes, provide:

### Current State

Relevant existing tables and relationships.

### Proposed Change

What should be added, modified, or removed.

### Reason

Why the change is needed.

### Security Impact

Any effect on:

- RLS
- roles
- permissions
- ownership
- protected data

### Migration Impact

How existing records will be handled.

### Application Impact

Which Next.js code may need to change.

For significant or destructive changes, wait for approval before applying
the migration.

## Verification

After database changes:

1. Verify the migration succeeds.
2. Verify foreign keys.
3. Verify constraints.
4. Verify RLS.
5. Test authorized access.
6. Test unauthorized access.
7. Check affected application queries.
8. Run relevant project checks.

When available:

npm run lint
npm run typecheck
npm run test
npm run build

Only run scripts that actually exist in `package.json`.

## Important

Never:

- expose service-role credentials
- trust client-provided roles
- trust client-provided user IDs
- bypass RLS without a justified server-side reason
- remove security policies just to make a query work
- disable security to fix an application bug
- perform destructive schema changes without understanding their impact

Prefer the smallest database change that correctly solves the requirement.