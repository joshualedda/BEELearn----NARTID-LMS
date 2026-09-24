LOGIN AND REGISTRATION

Finish implementing login and registration for my Next.js LMS app using Supabase Auth.

Context:
- Next.js App Router project
- Supabase project already set up with a `profiles` table (id, full_name, role, created_at)
- A database trigger auto-creates a `profiles` row (default role: 'student') whenever a 
  new user signs up via Supabase Auth
- Supabase client utilities already exist:
  - utils/supabase/client.js (for Client Components)
  - utils/supabase/server.js (for Server Components)
- I already have login and register UI/forms built, but the submit logic isn't 
  connected to Supabase yet

Requirements:

1. REGISTER FORM
   - On submit, call supabase.auth.signUp() with email, password, and full_name 
     (passed via options.data so the trigger can use it)
   - Show a loading state while submitting
   - Handle and display errors (e.g., "email already registered", weak password)
   - On success, redirect to a confirmation message or directly to /login 
     (tell me which Supabase email confirmation setting I should use: 
     auto-confirm or require email verification)

2. LOGIN FORM
   - On submit, call supabase.auth.signInWithPassword() with email and password
   - Show a loading state while submitting
   - Handle and display errors (e.g., "invalid credentials")
   - On success, redirect to the appropriate dashboard based on the user's role 
     from the `profiles` table (student → /dashboard, instructor → /instructor, 
     admin → /admin)

3. SESSION HANDLING
   - Make sure the session persists across page reloads and works correctly with 
     both Server and Client Components
   - Add a middleware.js (or update if it exists) to refresh the Supabase session 
     on every request

4. LOGOUT
   - Add a logout function that calls supabase.auth.signOut() and redirects to 
     the login page

5. PROTECTED ROUTES
   - Prevent logged-out users from accessing /dashboard, /instructor, /admin 
     — redirect them to /login if no valid session exists

Please write the actual code for each of these (forms' submit handlers, 
middleware.js, and a simple auth-check helper), matching the file structure 
I already have. Ask me for my current form component code if you need to see 
it before editing.




NEXT PROMPT:Implement course enrollment  

Implement course enrollment for my Next.js LMS app using Supabase.

Context:
- Next.js App Router project with Supabase already connected
- Supabase client utilities exist:
  - utils/supabase/client.js (for Client Components)
  - utils/supabase/server.js (for Server Components)
- Database tables already exist:
  - profiles (id, full_name, role, created_at)
  - courses (id, title, description, instructor_id, created_at)
  - enrollments (id, user_id, course_id, status, enrolled_at)
- I have a course page at app/courses/[id]/page.js that displays course 
  title/description and has a placeholder "Enroll in this course" button 
  (not yet functional)
- User authentication is working (login/register via Supabase Auth)

Requirements:

1. ENROLL BUTTON LOGIC
   - Must be a Client Component (since it needs onClick + auth state)
   - On click, check if the user is logged in:
     - If not logged in, redirect to /login (optionally with a redirect-back 
       parameter so they return to this course after logging in)
     - If logged in, insert a row into `enrollments` with user_id, course_id, 
       and status = 'active'
   - Prevent duplicate enrollment — check if a row already exists for this 
     user_id + course_id combo before inserting; if it does, show "Already 
     enrolled" instead of the Enroll button
   - Show a loading state while the enrollment request is processing
   - Show a success message or automatically update the button to "Enrolled ✓" 
     after successful enrollment
   - Handle and display errors if the insert fails

2. SERVER-SIDE CHECK (on the course page itself)
   - Before rendering the button, check server-side whether the current user 
     is already enrolled in this course, and pass that status down to the 
     button component so it renders correctly on first load (not just after 
     a click)

3. RLS CONSIDERATION
   - Assume Row Level Security will be enabled on `enrollments` later — write 
     the insert so it relies on the authenticated user's own ID (via 
     supabase.auth.getUser()), not a manually passed user_id, so it stays 
     secure once RLS policies are added

Please write the actual code:
- An EnrollButton Client Component (separate file, e.g. 
  components/EnrollButton.js)
- The updated course page (app/courses/[id]/page.js) that checks enrollment 
  status server-side and passes it to the button

Ask me for my current course page code first if you need to see the existing 
structure before editing.