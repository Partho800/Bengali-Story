# Bengali Publishing Platform

A modern monorepo for a full-featured Bengali story publishing and reading platform.

## Technology Stack

### 2.1 Frontend Website
- **Framework**: Next.js (App Router) with React Server Components
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms & Validation**: React Hook Form with Zod
- **Rich-Text Editor**: Tiptap
- **Media**: Cloudinary
- **Responsibilities**:
  - Public website pages
  - Reader interface
  - User registration and login interfaces
  - User dashboard
  - Story and chapter submission interfaces
  - Search and discovery
  - API integration

### 2.2 Backend API
- **Runtime & Framework**: Node.js, Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma ORM
- **Auth**: Secure JWT authentication and session management
- **Architecture**: REST API architecture
- **Responsibilities**:
  - Authentication and authorization
  - Database operations
  - Story and chapter management
  - Submission and approval workflows
  - Likes, comments, bookmarks, and follows
  - Notifications
  - Search
  - File upload authorization (Cloudinary)
  - Administrative operations

### 2.3 Admin Panel
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Forms & Validation**: React Hook Form with Zod
- **Responsibilities**:
  - Administrative login
  - Dashboard and analytics
  - User management
  - Story and chapter approval
  - Content moderation
  - Category management
  - Report management
  - Platform configuration

### 2.4 Supporting Services
- **Database**: PostgreSQL
- **ORM**: Prisma (centralized in `packages/database`)
- **Image Storage**: Cloudinary
- **Rich-text Editor**: Tiptap

---

## Monorepo Structure

```
bengali-publishing-platform/
├── apps/
│   ├── frontend/        # Next.js Public & Reader Web App
│   ├── backend/         # Express.js REST API
│   └── admin/           # Next.js Admin Panel
└── packages/
    ├── database/        # Centralized Prisma schema, migrations, seed
    ├── shared-types/    # Shared TypeScript interfaces & types
    ├── validation/      # Shared Zod validation schemas
    ├── eslint-config/   # Shared ESLint configuration
    └── typescript-config/ # Shared tsconfig bases
```
