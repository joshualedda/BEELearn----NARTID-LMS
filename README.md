This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase setup

Copy `.env.example` to `.env.local` if you do not already have it, then fill in your project's values:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

The browser, server, and session-refresh clients all use these two variables. Keep project values in the ignored `.env.local` file; never use a secret or service-role key in a `NEXT_PUBLIC_` variable. Restart `npm run dev` after changing the environment file.

### Verify the connection

- Open `/register` and `/login` and confirm both forms render without Supabase configuration errors. See [Supabase integration setup](docs/supabase-integration.md) for email confirmation, database policies, enrollment constraints, and verification steps.
- Without signing in, visit `/learner/dashboard`, `/instructor/dashboard`, and `/admin/dashboard`. Each should redirect to `/login` with a `next` query parameter.
- For a read-only API check, load `.env.local` using `loadEnvConfig(process.cwd())` from `@next/env` in a local Node script. Send GET requests to `/auth/v1/settings` and `/rest/v1/<table>?select=*&limit=0` on the Supabase URL, with the publishable key in the `apikey` header. Check `profiles`, `courses`, `enrollments`, `attendance_logs`, `assignments`, and `submissions`. Log only statuses, not credentials or response data.
- HTTP 200 confirms endpoint connectivity. Zero-row anonymous queries do not verify authenticated row-level permissions or registration/profile creation. Do not disable RLS to make a check pass.
- Run `npm run lint`, `npx tsc --noEmit`, and `npm run build` for local validation.
