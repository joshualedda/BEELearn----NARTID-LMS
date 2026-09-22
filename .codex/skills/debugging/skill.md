---
name: debugging
description: Systematically investigate and fix bugs in the Next.js LMS. Use for runtime errors, build errors, TypeScript errors, UI bugs, Supabase/database issues, authentication problems, API failures, and unexpected application behavior.
---

# LMS Debugging

Use this skill when investigating bugs or unexpected behavior.

Always follow the project's `AGENTS.md`.

The goal is to identify the root cause and make the smallest safe fix.

Do not blindly modify code until the problem is understood.

## Core Debugging Principles

Follow this order:

1. Understand the reported problem.
2. Reproduce the problem when possible.
3. Gather evidence.
4. Trace the execution path.
5. Identify the root cause.
6. Determine the smallest appropriate fix.
7. Implement the fix.
8. Verify the fix.
9. Check for regressions.

Do not use trial-and-error changes without evidence.

## Before Changing Code

Before modifying anything:

- Read `AGENTS.md`.
- Read the reported error carefully.
- Inspect the relevant files.
- Inspect related components and utilities.
- Inspect recent changes or git diff when relevant.
- Check existing implementation patterns.
- Check logs and stack traces when available.

Do not assume the file where the error appears is necessarily where the
bug originates.

## Understand the Problem

Determine:

### Expected Behavior

What should happen?

### Actual Behavior

What actually happens?

### Trigger

What action causes the problem?

### Scope

Determine whether the issue affects:

- all users
- admins
- instructors
- students
- one page
- one feature
- development only
- production only

### Frequency

Determine whether the issue is:

- consistent
- intermittent
- data-dependent
- environment-dependent

Do not invent missing information.

## Reproduce First

When possible, reproduce the problem before fixing it.

Use the smallest reproducible path.

Example:

1. Sign in as STUDENT.
2. Open enrolled course.
3. Open assignment.
4. Submit assignment.
5. Observe server error.

A successful reproduction provides a baseline for verifying the fix.

If the issue cannot be reproduced, inspect available evidence before
changing code.

## Read Error Messages Completely

Inspect:

- error message
- stack trace
- file name
- line number
- HTTP status
- database error
- Supabase error
- browser console
- server console
- network response
- build output

Do not fix only the visible symptom.

Trace where the incorrect value or behavior originated.

## Trace the Data Flow

For application bugs, trace data through the full path when necessary:

User action
    ↓
Component
    ↓
Server Action / Route Handler
    ↓
Validation
    ↓
Authentication
    ↓
Authorization
    ↓
Database query
    ↓
Response
    ↓
UI

Determine exactly where expected behavior diverges from actual behavior.

## Next.js Debugging

Check for common Next.js issues:

- incorrect Server/Client Component boundaries
- unnecessary `"use client"`
- browser APIs used in Server Components
- server-only modules imported by client code
- incorrect Server Actions
- incorrect Route Handlers
- serialization problems
- hydration mismatches
- incorrect caching
- stale data
- missing revalidation
- incorrect redirects
- environment variable problems
- dynamic route parameter issues

Do not convert components to Client Components merely to make an error
disappear unless client-side behavior is actually required.

## React Debugging

Check for:

- incorrect state updates
- stale closures
- missing dependencies
- excessive effects
- infinite render loops
- incorrect keys
- controlled/uncontrolled input problems
- incorrect event handling
- state derived unnecessarily from other state
- asynchronous race conditions

Avoid adding `useEffect` as a generic fix.

Understand why synchronization is needed first.

## TypeScript Errors

Do not fix TypeScript errors using:

any

or unsafe assertions merely to silence the compiler.

Instead:

1. Determine the actual data shape.
2. Find where the incorrect type originates.
3. Correct the type or implementation.
4. Handle null/undefined appropriately.

Avoid:

```ts
value as any