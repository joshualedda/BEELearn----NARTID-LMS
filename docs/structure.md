# Project structure

This is the current source and configuration layout of the BEELearn Next.js application. The tree omits generated and local-only directories such as `.git/`, `.next/`, `node_modules/`, `.codex/`, `supabase/.temp/`, and the TypeScript build cache. The `md/` directory is currently empty.

```text
BEELearn/
├── docs/
│   ├── core-lms.md
│   ├── structure.md
│   └── supabase-integration.md
├── md/                             # Empty directory
├── public/
│   └── images/
│       ├── landing/
│       │   └── hero-beekeeping.svg
│       ├── file.svg
│       ├── globe.svg
│       ├── next.svg
│       ├── vercel.svg
│       └── window.svg
├── src/
│   ├── app/                        # Next.js App Router routes
│   │   ├── (auth)/                  # Auth route group; parentheses are not in URLs
│   │   │   ├── forgot-password/page.tsx
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   ├── actions.ts
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── admin/
│   │   │   │   ├── courses/page.tsx
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── instructors/page.tsx
│   │   │   │   ├── reports/page.tsx
│   │   │   │   ├── students/page.tsx
│   │   │   │   ├── users/
│   │   │   │   │   ├── actions.ts
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── instructor/
│   │   │   │   ├── assignments/page.tsx
│   │   │   │   ├── courses/
│   │   │   │   │   ├── [courseId]/
│   │   │   │   │   │   ├── lessons/page.tsx
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── actions.ts
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── grades/page.tsx
│   │   │   │   ├── students/page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── learner/
│   │   │   │   ├── assignments/page.tsx
│   │   │   │   ├── courses/
│   │   │   │   │   ├── [courseId]/page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── grades/page.tsx
│   │   │   │   ├── profile/page.tsx
│   │   │   │   └── layout.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── attendance/route.ts
│   │   │   ├── og/route.tsx
│   │   │   └── webhooks/supabase/route.ts
│   │   ├── auth/
│   │   │   ├── access-error/page.tsx
│   │   │   ├── complete/page.tsx
│   │   │   └── confirm/route.ts
│   │   ├── courses/
│   │   │   ├── [courseId]/page.tsx
│   │   │   ├── actions.ts
│   │   │   ├── layout.tsx
│   │   │   ├── lms-actions.ts
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── favicon.ico
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   └── LogoutButton.tsx
│   │   ├── dashboard/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboardCharts.tsx
│   │   │   │   ├── DashboardParts.tsx
│   │   │   │   └── sample-data.ts
│   │   │   ├── sidebar/
│   │   │   │   ├── AdminSidebar.ts
│   │   │   │   ├── InstructorSidebar.ts
│   │   │   │   ├── LearnerSidebar.ts
│   │   │   │   └── types.ts
│   │   │   ├── AccountMenu.tsx
│   │   │   └── DashboardShell.tsx
│   │   ├── features/
│   │   │   ├── assignments/.gitkeep
│   │   │   ├── courses/
│   │   │   │   ├── .gitkeep
│   │   │   │   ├── AssignmentForm.tsx
│   │   │   │   ├── AttendanceTracker.tsx
│   │   │   │   ├── CourseDetails.tsx
│   │   │   │   ├── CourseGrid.tsx
│   │   │   │   ├── CourseLearning.tsx
│   │   │   │   ├── LocalDateTime.tsx
│   │   │   │   ├── QuizBuilder.tsx
│   │   │   │   ├── QuizForm.tsx
│   │   │   │   └── SubmissionForm.tsx
│   │   │   ├── enrollments/
│   │   │   │   ├── .gitkeep
│   │   │   │   └── EnrollButton.tsx
│   │   │   ├── grades/.gitkeep
│   │   │   ├── lessons/.gitkeep
│   │   │   ├── quizzes/.gitkeep
│   │   │   └── users/
│   │   │       ├── .gitkeep
│   │   │       └── UserList.tsx
│   │   ├── forms/
│   │   │   ├── .gitkeep
│   │   │   └── input-error.tsx
│   │   ├── icons/BeeIcon.tsx
│   │   ├── landing/
│   │   │   ├── CTASection.tsx
│   │   │   ├── FeaturedCoursesSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── LandingSectionHeader.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── StatisticsSection.tsx
│   │   │   ├── TrustedBySection.tsx
│   │   │   └── WhyBeeLearnSection.tsx
│   │   ├── layout/.gitkeep
│   │   └── ui/
│   │       ├── .gitkeep
│   │       ├── alert.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── dropdown.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── modal.tsx
│   │       ├── motion.tsx
│   │       ├── nav-link.tsx
│   │       ├── pagination.tsx
│   │       ├── simple-chart.tsx
│   │       └── table.tsx
│   ├── constants/
│   │   ├── course-status.ts
│   │   └── roles.ts
│   ├── hooks/
│   │   ├── use-course-progress.ts
│   │   └── use-user.ts
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   ├── config.ts
│   │   │   ├── proxy.ts
│   │   │   └── server.ts
│   │   ├── auth.ts
│   │   ├── courses.ts
│   │   └── storage.ts
│   ├── locales/
│   │   ├── en/.gitkeep
│   │   ├── ilo/.gitkeep
│   │   └── tl/.gitkeep
│   ├── providers/
│   │   ├── auth-provider.tsx
│   │   └── theme-provider.tsx
│   ├── styles/globals.css
│   ├── templates/
│   │   ├── AuthTemplate.tsx
│   │   ├── CourseTemplate.tsx
│   │   ├── DashboardTemplate.tsx
│   │   └── LandingTemplate.tsx
│   ├── types/
│   │   ├── assignment.ts
│   │   ├── course.ts
│   │   ├── database.types.ts
│   │   ├── enrollment-result.ts
│   │   ├── enrollment.ts
│   │   ├── grade.ts
│   │   ├── lms.ts
│   │   └── user.ts
│   ├── utils/
│   │   ├── auth-errors.ts
│   │   ├── formatDate.ts
│   │   ├── formatFileSize.ts
│   │   └── permissions.ts
│   ├── validations/
│   │   ├── assignment.schema.ts
│   │   ├── auth.schema.ts
│   │   ├── course.schema.ts
│   │   ├── grade.schema.ts
│   │   └── user.schema.ts
│   └── proxy.ts
├── supabase/
│   └── migrations/
│       ├── 202609240001_signup_profile.sql
│       └── 202609250001_secure_core_lms.sql
├── tests/
│   ├── helpers/load-ts.mjs
│   ├── auth.test.mjs
│   ├── enrollment.test.mjs
│   ├── lms.test.mjs
│   ├── login.test.mjs
│   ├── proxy.test.mjs
│   └── register.test.mjs
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── DESIGN.md
├── eslint.config.mjs
├── landingPage.md
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── PROMPT.MD
├── README.md
└── tsconfig.json
```

`src/app/` holds pages, layouts, route handlers, and colocated server actions. `src/components/` holds reusable UI and feature components. `src/lib/` contains application services and Supabase clients; `src/validations/` contains input schemas. Database migrations are under `supabase/migrations/`, and automated tests are under `tests/`. Files named `.gitkeep` mark directories reserved for future content.
