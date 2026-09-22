---
name: lms-feature
description: Plan, implement, and verify features for the Next.js LMS. Use when creating or modifying courses, lessons, modules, enrollments, assignments, quizzes, grades, progress tracking, certificates, dashboards, notifications, reports, or other LMS functionality.
---

# LMS Feature Development

Use this skill when implementing or significantly modifying an LMS feature.

Always follow the project's `AGENTS.md`.

The goal is to build the smallest complete solution that fits the existing
architecture, security model, UI patterns, and database design.

Do not immediately start writing code.

## Core Workflow

Follow this order:

1. Understand the requirement.
2. Inspect the existing implementation.
3. Identify reusable code.
4. Identify affected roles.
5. Identify database impact.
6. Identify security requirements.
7. Create a small implementation plan.
8. Implement the feature.
9. Verify the feature.
10. Review the final diff.

For large or risky features, present the plan before making significant
changes.

For small and well-defined features, proceed directly when safe.

## 1. Understand the Requirement

Determine:

- What should the feature do?
- Who can use it?
- What data does it require?
- What data does it modify?
- What existing features does it interact with?
- What should happen on success?
- What should happen on failure?
- What edge cases matter?

Do not invent complex requirements that were not requested.

If an ambiguity could significantly affect the database, security,
authorization, or architecture, clarify it before making destructive or
high-impact changes.

## 2. Inspect Before Creating

Before adding new code, inspect:

- `AGENTS.md`
- related routes
- related components
- existing utilities
- existing hooks
- existing Server Actions
- existing Route Handlers
- existing database queries
- existing validation
- existing types
- existing authentication
- existing authorization
- existing UI patterns

Search the repository before creating something new.

Prefer:

reuse existing code
    ↓
extend existing code
    ↓
use framework/platform functionality
    ↓
use an existing dependency
    ↓
write new code

Do not duplicate functionality that already exists.

## 3. Identify Affected Roles

Consider LMS roles such as:

- ADMIN
- INSTRUCTOR
- STUDENT

Do not assume all roles should have the same permissions.

Define who can:

- view
- create
- edit
- delete
- publish
- submit
- grade
- approve
- enroll
- export

Authorization must be enforced server-side.

Client-side visibility is not authorization.

## 4. Identify LMS Relationships

Consider relevant relationships between:

users
    ↓
roles

courses
    ↓
modules
    ↓
lessons

courses
    ↓
enrollments
    ↓
students

courses
    ↓
assignments
    ↓
submissions
    ↓
grades

courses
    ↓
quizzes
    ↓
questions
    ↓
attempts

courses
    ↓
progress
    ↓
certificates

Do not assume these exact tables exist.

Inspect the actual project and database structure.

## 5. Database Impact

Before modifying the database, determine whether the feature requires:

- new table
- new column
- relationship
- foreign key
- constraint
- index
- RLS policy
- migration
- data backfill

Use the `database` skill for significant database work.

Do not modify the database simply because it makes implementation easier.

Prefer using the existing schema when it correctly supports the feature.

## 6. Security

Every feature must consider:

### Authentication

Does the user need to be signed in?

### Authorization

Is the authenticated user allowed to perform the action?

### Ownership

Does the resource belong to the user or a resource they manage?

### Enrollment

For student operations, does the student have access to the course?

### Instructor Assignment

For instructor operations, is the instructor assigned to the relevant
course?

### Role

Does the operation require a specific role?

Never trust authorization information supplied only by the browser.

## 7. IDOR Protection

Treat client-provided IDs as untrusted.

Examples:

- user_id
- student_id
- course_id
- lesson_id
- assignment_id
- submission_id
- quiz_id
- attempt_id
- certificate_id

A valid ID does not prove access.

Verify the authenticated user's relationship to the requested resource.

Example:

A student submitting:

assignment_id = abc123

must not automatically be allowed to submit.

Verify:

authenticated student
    ↓
active enrollment
    ↓
course
    ↓
assignment

## 8. Input Validation

Validate external input.

This includes:

- forms
- Server Actions
- API requests
- URL parameters
- search parameters
- uploaded files
- IDs
- quiz answers
- grades
- assignment submissions

Use existing project validation patterns.

Do not introduce another validation library if the project already has one
that is suitable.

Server-side validation is required when security or data integrity depends
on the input.

## 9. Next.js Architecture

Follow the project's existing Next.js architecture.

Prefer Server Components by default.

Use Client Components when necessary for:

- interactivity
- browser APIs
- client-side state
- event handlers

Do not add `"use client"` to large component trees unnecessarily.

Keep server-only logic server-side.

Never expose secrets to Client Components.

## 10. Server Actions and Route Handlers

Use the pattern already established in the project.

For server-side mutations:

- authenticate
- authorize
- validate
- execute
- handle errors
- revalidate or redirect when appropriate

Do not create API routes when an existing Server Action pattern is more
appropriate.

Likewise, do not force Server Actions where a Route Handler is required.

Follow existing architecture.

## 11. Components

Before creating a component:

1. Search for an existing equivalent.
2. Determine whether an existing component can be extended.
3. Follow the project's UI conventions.

Keep components focused.

Avoid giant components containing:

- database logic
- authorization
- validation
- presentation
- unrelated state

Separate concerns only when doing so provides meaningful clarity.

Do not create abstractions merely for abstraction's sake.

## 12. UI and UX

For user-facing features, consider:

- loading states
- empty states
- error states
- success feedback
- disabled states
- validation messages
- responsive layout
- accessibility

Reuse existing:

- buttons
- forms
- dialogs
- tables
- cards
- alerts
- notifications
- layouts

Maintain visual consistency with the existing LMS.

## 13. Accessibility

When creating UI:

- use semantic HTML
- provide labels for inputs
- maintain keyboard accessibility
- provide accessible names for controls
- avoid relying only on color
- use buttons for actions
- use links for navigation

Do not sacrifice accessibility for visual styling.

## 14. Courses

When modifying course functionality, consider:

- ownership
- instructor assignment
- publication status
- enrollment
- modules
- lessons
- visibility
- completion requirements

Do not allow unauthorized users to modify course content.

## 15. Enrollment

For enrollment features, consider:

- duplicate enrollment
- enrollment status
- course availability
- user role
- enrollment dates
- withdrawal/completion state

When appropriate, enforce uniqueness at the database level.

Do not rely exclusively on UI checks to prevent duplicate enrollment.

## 16. Assignments

Consider:

- course access
- assignment availability
- due dates
- submission status
- resubmission rules
- instructor ownership
- grading permissions

Students must not be able to submit work for courses they cannot access.

## 17. Quizzes

Consider:

- quiz availability
- attempts allowed
- start/end dates
- question visibility
- answer validation
- scoring
- attempt ownership
- result visibility

Never send protected correct answers to the browser before they should be
available.

Scoring that affects official results should not rely solely on client-side
logic.

## 18. Grades

Grades are sensitive LMS data.

Check:

- who may create grades
- who may modify grades
- who may view grades
- course ownership
- student ownership
- audit/history requirements

A student must not be able to modify their own grade.

Do not trust grade values sent from unauthorized clients.

## 19. Progress Tracking

Define what counts as completion.

Examples may include:

- lesson viewed
- lesson completed
- assignment submitted
- quiz passed
- module completed

Avoid storing duplicate progress information when it can reliably be
derived.

If progress is stored for performance or business reasons, ensure updates
are consistent.

## 20. Certificates

Before issuing a certificate, verify required completion rules server-side.

Do not allow certificate eligibility to depend only on client state.

Consider:

- course completion
- required assessments
- passing grade
- certificate ownership
- duplicate issuance

Follow actual project requirements.

## 21. File Uploads

For assignment files, course resources, profile images, or other uploads:

- validate file type
- validate size
- validate authorization
- use safe storage paths
- avoid trusting file names
- consider private vs public storage

Do not expose private student submissions through public storage unless the
project explicitly requires it.

## 22. Error Handling

Handle expected errors intentionally.

Examples:

- unauthenticated
- unauthorized
- invalid input
- resource not found
- duplicate enrollment
- expired quiz
- submission closed
- database failure

Do not expose sensitive internal error details to users.

Do not silently swallow errors.

## 23. Performance

Consider performance when relevant, but do not optimize prematurely.

Look for:

- N+1 queries
- excessive data fetching
- unnecessary client JavaScript
- repeated database calls
- unnecessarily large payloads

Prefer simple, correct implementations first.

## 24. Dependencies

Before adding a dependency:

1. Check whether the project already has a suitable dependency.
2. Check whether Next.js/React/browser functionality can solve it simply.
3. Determine whether the new dependency is actually necessary.

Do not install packages for trivial functionality.

## 25. Implementation Order

For substantial features, prefer:

Requirement
    ↓
Existing architecture
    ↓
Database/schema
    ↓
Types
    ↓
Server logic
    ↓
Authentication
    ↓
Authorization
    ↓
Validation
    ↓
UI
    ↓
Loading/error states
    ↓
Tests
    ↓
Review

Adjust this order when the existing project architecture requires it.

## 26. Testing

Test behavior relevant to the feature.

Consider:

### Authorized behavior

Does the correct role successfully perform the action?

### Unauthorized behavior

Can another user or role access it?

### Validation

What happens with invalid data?

### Edge cases

What happens when data is missing, duplicated, expired, or unavailable?

Do not test only the happy path.

## 27. Verification

After implementation, run relevant project checks.

Inspect `package.json` first.

When available:

npm run lint
npm run typecheck
npm run test
npm run build

Only run commands that actually exist.

Do not claim a check passed if it was not run.

## 28. Final Code Review

After implementing a substantial feature, use the `code-review` skill or
apply its review principles.

Inspect the final git diff.

Check for:

- security issues
- authorization problems
- regressions
- duplicate code
- unnecessary complexity
- accidental unrelated changes
- TypeScript problems
- database problems

Fix issues introduced by the feature.

Do not use the review as an excuse to refactor unrelated code.

## 29. Debugging

If the implementation produces unexpected behavior, use the `debugging`
skill.

Do not start random trial-and-error modifications.

Find the root cause.

## 30. Reporting Completion

After completing a feature, summarize:

### Implemented

What was added or changed.

### Files Changed

Important files affected.

### Database Changes

Any migrations, tables, columns, policies, or constraints changed.

If none, say none.

### Security

Important authentication/authorization decisions.

### Verification

Commands and tests actually run.

### Remaining Work

Anything intentionally left incomplete or requiring user action.

Keep the report concise.

## Important Rules

Never:

- disable authentication to make a feature work
- disable authorization
- disable RLS to bypass database errors
- expose service-role credentials
- trust client-provided roles
- trust client-provided ownership
- use `any` just to silence TypeScript
- swallow errors
- remove tests because they fail
- rewrite unrelated working functionality
- create unnecessary abstractions
- add dependencies without justification
- make destructive database changes without understanding their impact

Prefer the smallest complete implementation that correctly solves the
requested LMS feature.