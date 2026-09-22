
# LMS Project — Codex Instructions

## Project Overview

This project is a Learning Management System built with Next.js.

Before making changes:

1. Inspect the existing project structure.
2. Understand existing patterns and conventions.
3. Reuse existing components and utilities where possible.
4. Do not rewrite working functionality unnecessarily.

## Technology Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- PostgreSQL

## Next.js Rules

- Use the App Router.
- Prefer Server Components.
- Use Client Components only when interactivity or browser APIs are required.
- Use Server Actions or Route Handlers for server-side operations.
- Keep secrets and service-role credentials server-side.
- Never expose sensitive environment variables to the client.

## TypeScript

- Use strict TypeScript.
- Avoid `any`.
- Create reusable types where appropriate.
- Validate external/user input.

## LMS Architecture

Main LMS domains may include:

- Authentication
- Users
- Students
- Instructors
- Administrators
- Courses
- Lessons
- Modules
- Enrollments
- Assessments
- Quizzes
- Assignments
- Grades
- Certificates
- Notifications
- Reports

Keep domain logic separated when possible.

## Components

Reusable UI components belong in:

src/components/

Feature-specific components should stay close to their feature when appropriate.

Do not create duplicate components if an existing component can be reused.

## Database

- Use Supabase/PostgreSQL.
- Follow the existing database schema.
- Do not delete or rename database fields without checking their usage.
- Use proper foreign-key relationships.
- Consider Row Level Security when accessing Supabase data.
- Keep database queries organized and reusable.

## Security

Always consider:

- Authentication
- Authorization
- Role-based access
- Input validation
- Database permissions
- Row Level Security
- Server/client boundaries

Never trust role information supplied only by the browser.

## Roles

Typical roles:

ADMIN
INSTRUCTOR
STUDENT

Authorization must be enforced server-side.

## Code Quality

- Keep functions focused.
- Avoid unnecessary duplication.
- Use descriptive variable and function names.
- Keep components reasonably small.
- Add comments only where they provide useful context.
- Do not over-engineer simple features.

## When Fixing Bugs

Before modifying code:

1. Identify the root cause.
2. Inspect related files.
3. Make the smallest reasonable fix.
4. Avoid unrelated refactoring.
5. Check for regressions.

## Before Completing a Task

When appropriate, run:

npm run lint
npm run typecheck
npm run build

Fix errors introduced by your changes.

Do not modify unrelated files just to make checks pass.

## Important

If requirements are unclear or a change could significantly affect the
database, authentication, authorization, or existing architecture, explain
the issue before making a destructive change.
