---
name: code-review
description: Review code changes in the Next.js LMS for bugs, security issues, authorization problems, regressions, maintainability, and unnecessary complexity. Use when reviewing code, pull requests, diffs, completed features, or before committing changes.
---

# Code Review

Review code carefully before suggesting or making changes.

Follow the project's `AGENTS.md` and existing architecture.

## Review Goals

Prioritize findings in this order:

1. Security vulnerabilities
2. Authentication and authorization problems
3. Data exposure or privacy issues
4. Functional bugs
5. Database and data-integrity problems
6. Breaking changes and regressions
7. TypeScript and runtime errors
8. Performance problems
9. Maintainability problems
10. Unnecessary complexity
11. Code duplication
12. Style issues

Do not recommend refactoring working code solely for stylistic preference.

## Review Process

### 1. Understand the Change

Before reviewing:

- Read `AGENTS.md`.
- Inspect the relevant files.
- Understand what the feature or change is supposed to do.
- Inspect related existing implementations.
- Check the current git diff when available.

Do not review individual files in isolation when their behavior depends on
other parts of the application.

### 2. Check Correctness

Look for:

- Incorrect business logic
- Missing conditions
- Incorrect state updates
- Race conditions
- Incorrect async/await usage
- Unhandled promises
- Missing error handling
- Incorrect null/undefined handling
- Broken navigation
- Incorrect form behavior
- Edge cases
- Invalid assumptions about data

Determine whether the implementation actually satisfies the requested
behavior.

### 3. Check Next.js Architecture

Check for:

- Correct App Router usage
- Appropriate Server and Client Component boundaries
- Unnecessary `"use client"`
- Server-only code imported into Client Components
- Secrets exposed to the browser
- Incorrect Route Handler usage
- Incorrect Server Action usage
- Missing loading/error handling where appropriate
- Unnecessary client-side data fetching
- Incorrect caching or revalidation behavior

Prefer Server Components unless client-side interactivity is required.

### 4. Check Authentication and Authorization

This is critical for the LMS.

Verify that protected operations enforce authorization on the server.

Check roles such as:

- ADMIN
- INSTRUCTOR
- STUDENT

Look for:

- Client-only authorization
- Missing role checks
- Users accessing another user's records
- Students modifying grades
- Students accessing instructor/admin functionality
- Instructors modifying courses they do not own
- Unauthorized enrollment changes
- Unauthorized assignment or quiz access
- Unauthorized certificate generation
- IDOR vulnerabilities

Never assume hiding a button provides authorization.

### 5. Check Supabase and Database Code

When Supabase or database code is involved, check:

- Row Level Security
- Database permissions
- Query filters
- Foreign-key relationships
- Data validation
- Missing constraints
- Incorrect joins
- Excessive queries
- N+1 queries
- Unsafe updates or deletes
- Missing ownership checks
- Service-role key exposure

Verify that database access follows the principle of least privilege.

Never expose a Supabase service-role key to client-side code.

### 6. Check Input Validation

Treat all external input as untrusted.

Review:

- Forms
- URL parameters
- Search parameters
- Route parameters
- Server Actions
- API requests
- File uploads
- Database IDs

Check that validation happens server-side where security or data integrity
depends on it.

### 7. Check LMS Business Rules

When relevant, verify behavior involving:

- Courses
- Modules
- Lessons
- Enrollments
- Assignments
- Submissions
- Quizzes
- Attempts
- Grades
- Progress tracking
- Certificates
- Notifications

Look for ways users could bypass expected LMS workflows.

Example:

A student should not be able to submit work for a course in which they are
not enrolled simply by changing a course or assignment ID.

### 8. Check TypeScript

Look for:

- `any`
- Unsafe type assertions
- Incorrect types
- Missing null handling
- Duplicated types
- Incorrect API response types
- Types that disagree with database data

Prefer existing shared types when available.

### 9. Check Performance

Only report meaningful performance issues.

Look for:

- N+1 database queries
- Repeated database requests
- Unnecessary client-side JavaScript
- Excessive re-renders
- Large unnecessary dependencies
- Expensive operations inside render paths
- Loading significantly more data than required

Do not recommend premature optimization.

### 10. Check Maintainability

Look for:

- Duplicate logic
- Very large components
- Functions doing unrelated work
- Dead code
- Unused dependencies
- Hardcoded values that should use existing constants
- Reimplementation of existing utilities
- Unnecessary abstractions

Prefer existing project functionality before introducing new abstractions.

## Git Diff Review

When reviewing completed work, inspect the git diff when available.

Focus primarily on code changed by the current task.

Also inspect surrounding code when necessary to determine whether the
change causes a regression.

Do not modify unrelated code just because you notice stylistic differences.

## Finding Severity

Classify findings as:

### Critical

Security vulnerabilities, serious authorization bypasses, destructive data
issues, exposed secrets, or issues that can seriously compromise the LMS.

### High

Major functional bugs, incorrect permissions, significant data-integrity
problems, or likely production failures.

### Medium

Real bugs or maintainability problems that should be fixed but do not
normally compromise the entire application.

### Low

Minor issues with limited impact.

Do not exaggerate severity.

## Reporting Findings

For every finding provide:

- Severity
- File/location
- Problem
- Why it matters
- Recommended fix

Prefer specific findings over generic advice.

Example:

### High — Missing enrollment authorization

**Location:** `src/app/api/assignments/[id]/route.ts`

The route verifies that the user is authenticated but does not verify that
the student is enrolled in the course containing the assignment.

A logged-in student could potentially access another course's assignment by
changing the assignment ID.

**Recommended fix:** Verify the assignment's course and confirm an active
enrollment for the authenticated student before returning assignment data.

## Avoid False Positives

Before reporting an issue:

1. Inspect related code.
2. Check whether protection already exists elsewhere.
3. Confirm the issue is reachable.
4. Check existing middleware, RLS policies, validation, and shared utilities.

Do not report hypothetical vulnerabilities as confirmed vulnerabilities.

If something cannot be verified, clearly state that it requires verification.

## After Review

End with:

- Critical findings
- High findings
- Medium findings
- Low findings
- Verification/testing gaps

If no meaningful issues are found, say so.

Do not invent findings merely to produce a longer review.

## Making Fixes

By default, review and report findings first.

Do not modify code unless the user explicitly asks to fix the findings.

When asked to fix them:

1. Fix the highest-impact issues first.
2. Make the smallest reasonable changes.
3. Preserve existing architecture.
4. Avoid unrelated refactoring.
5. Run relevant verification commands.

When available, run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build