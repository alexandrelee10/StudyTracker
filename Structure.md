Goal:

This is a basic app that will track study progress. It will have a basic front end ui, utilize POST and GET api's to create, retrieve, and delete progress. It's basic and will require users to sign in or sign up to access the dashboard. 

File Directory:

studytracker/
│
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   ├── sign-up/
│   │   │   └── page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── courses/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── calendar/
│   │   │   └── page.tsx
│   │   └── study-session/
│   │       └── page.tsx
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/
│   │   │   │   └── route.ts
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── logout/
│   │   │   │   └── route.ts
│   │   │
│   │   ├── users/
│   │   │   └── route.ts
│   │   │
│   │   ├── study-sessions/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   │
│   │   ├── courses/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── lib/
│   ├── prisma.ts          ← DB connection (adapter + PrismaClient)
│   ├── auth.ts            ← 🔥 auth helpers (important)
│   ├── utils.ts
│   └── validations/
│       └── auth.ts        ← zod schemas (login/signup)
│
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── cards/
│   └── forms/
│
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
├── public/
│
├── styles/
│
├── types/
│
├── .env
├── package.json
└── tsconfig.json

1. Project setup

Get the app running first.

create Next.js app
install Prisma
connect Postgres
make sure npm run dev works
make sure Prisma can connect
2. Database schema

Define your core models before touching auth UI.

Start with:

User
StudySession
later Session for auth

So basically:

write schema.prisma
run migration
generate Prisma client
3. Prisma connection

Set up:

lib/prisma.ts

This is your database access layer.

Make sure you can do a simple test query without errors.

4. Seed the database

Before building full features, make sure Prisma can actually create records.

make prisma/seed.ts
seed one user
seed one or two study sessions

This proves:

DB works
relations work
Prisma works
5. Auth backend first

Do not start with auth pages first.

Start with backend logic:

signup route
login route
password hashing with bcrypt

Order inside auth backend:

signup route
login route
session model
logout route
lib/auth.ts
6. Session system

After signup/login works, make the app remember the user.

Build:

Session model
create session on login
store cookie
read cookie in auth.ts

This is the point where auth becomes “real.”

7. Protected auth helpers

Now make reusable helpers in:

lib/auth.ts

Functions like:

getCurrentUser()
requireUser()

This lets you protect API routes and pages cleanly.

8. Auth UI pages

Only now make:

sign up page
sign in page

Why now?
Because the backend already works, so the UI is just sending data to working routes.

9. Study session API

Once auth works, build the main feature backend.

Make:

create study session
get user’s study sessions
delete study session
update study session later if needed

These routes should use the logged-in user from auth.ts.

10. Dashboard UI

Now connect the frontend to real data.

Build:

dashboard page
fetch sessions
render sessions
create session form/button
delete session button
11. Protect dashboard routes

Now that auth and dashboard both exist, protect the private area.

For example:

redirect if no user
block session routes if not logged in
12. Validation and cleanup

After everything works, clean it up.

Add:

Zod validation
better error messages
loading states
nicer folder organization
Super simple version

If you want the shortest version:

setup project
schema
prisma connection
seed
signup backend
login backend
session + cookies
auth helpers
auth pages
study session API
dashboard UI
cleanup
For your exact reset project, I’d do this:
Phase 1: foundation
setup app
schema
prisma
seed
Phase 2: auth
signup route
login route
session model
auth.ts
sign in / sign up pages
Phase 3: feature
study session routes
dashboard page
create/view/delete sessions
Phase 4: polish
validation
error handling
styling
route protection cleanup