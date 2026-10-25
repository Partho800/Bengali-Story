# Bengali Story & Novel Publishing Platform
## Detailed Software Development Requirements Document (DRD)

---

## 1. System Overview & Monorepo Architecture

A modern, scalable digital publishing platform for Bengali literature inspired by Pratilipi, built with original branding, a clean aesthetic, and high-performance architecture.

```
bengali-publishing-platform/
├── apps/
│   ├── frontend/         # Next.js App Router (Public, Reader & Writer Portal)
│   ├── backend/          # Node.js + Express.js REST API
│   └── admin/            # Next.js App Router (Back-office & Moderation Portal)
└── packages/
    ├── database/         # Centralized Prisma ORM, migrations, seed
    ├── shared-types/     # Shared TypeScript interfaces & DTOs
    ├── validation/       # Shared Zod validation schemas
    ├── eslint-config/    # Shared linting configs
    └── typescript-config/# Shared tsconfig bases
```

### Core Architecture Principles
- **Monorepo Independence**: The three apps (`frontend`, `backend`, `admin`) run independently while sharing database models, validation schemas, and TypeScript interfaces.
- **Single Source of Truth**: The Backend API is the **only** entity with database access. Frontend and Admin communicate strictly via secure HTTPS REST APIs.
- **Typography & Theming**:
  - **Bilingual Typography**: English rendered in **Outfit**, Bengali rendered in **Hind Siliguri**.
  - **Color Palette**: Base dark **`#242424`** and **White (`#ffffff`)**, with default Light Mode and persistent Dark Mode.
  - **Persistent Language**: User's language choice (`bn` / `en`) persists across all page navigations and sessions.

---

## 2. Frontend Application Requirements (`apps/frontend`)

The Frontend is the primary public-facing portal catering to readers, casual visitors, and self-publishing writers.

### 2.1 Public Pages & Navigation
- **Global Header**:
  - Logo with branding.
  - Primary navigation links: Stories, Categories, Authors, Rankings, Write.
  - Search trigger with live suggestions dropdown.
  - Language Switcher (`বাং / EN`) and Theme Toggle (☀️ / 🌙).
  - Auth CTA: "Login / Register" or User Profile dropdown when authenticated.
- **Homepage (`/`)**:
  - **Hero Banner**: Engaging headline, quick start actions ("Read Stories", "Write Story").
  - **Trending Stories**: Algorithmic carousel based on reads, likes, and comments within the last 7 days.
  - **Popular Novels & Series**: Long-form multi-chapter serialized stories.
  - **Recently Published**: Real-time feed of newly published works.
  - **Featured Authors**: Verified and top-ranked writers with follow buttons.
  - **Category Grid**: Visual cards linking to romance, thriller, horror, sci-fi, poetry, etc.
  - **Footer**: About, Contact, Terms of Service, Privacy Policy, Copyright.

### 2.2 Story Discovery & Listings
- **Browse & Filter (`/stories`)**:
  - Filter by category, tags, status (ongoing/completed), story length (short story vs novel).
  - Sort by: Most Popular, Newest, Highest Rated, Trending.
  - Server-side pagination with clean URLs (`?page=1&sort=popular`).
- **Category Archive (`/categories/[slug]`)**:
  - Category header with description and banner.
  - Story cards with cover images, author name, rating, views, and chapter count.
- **Search Results (`/search`)**:
  - Real-time search query matching titles, descriptions, author names, and tags.
  - Empty-state recommendations and popular search suggestions.
- **Rankings (`/rankings`)**:
  - Top daily, weekly, monthly, and all-time leaderboards.

### 2.3 Story Details & Chapter Reader
- **Story Details Page (`/stories/[slug]`)**:
  - High-resolution story cover image (Cloudinary CDN).
  - Story title, synopsis, author attribution, genres, tags, publication date.
  - Aggregate statistics: Total reads, likes, bookmarks, comments, chapters.
  - Interactive actions: "Start Reading", "Bookmark", "Share", "Like", "Follow Author".
  - Chapter list table/accordion with read indicators and release dates.
  - User reviews and discussion comments.
- **Chapter Reader (`/stories/[slug]/chapters/[chapterNumber]`)**:
  - **Long-form Bengali Typography**: Clean paragraph spacing, line height (1.8), optimized for Hind Siliguri.
  - **Reader Customization Drawer**:
    - Font-size adjuster (A- / A+).
    - Reader theme switcher: Light (White), Dark (`#242424`), and Sepia.
  - **Sticky Reading Progress Bar**: Real-time percentage indicator.
  - **Auto Progress Tracking**: Automatically records reading progress at 25%, 50%, 75%, and 100% scroll depth.
  - **Navigation**: Seamless "Previous Chapter" and "Next Chapter" sticky bottom controls.
  - **In-Chapter Engagement**: End-of-chapter like button, chapter comments, and "Add to Library" prompt.

---

## 3. User & Writer Ecosystem Requirements

Every registered user can seamlessly enjoy content as a reader and publish original works as a writer without requiring separate accounts.

### 3.1 Authentication & Profile Lifecycle
- **Guest Experience**:
  - Full reading access to published chapters.
  - Can browse categories, search, and view author profiles.
  - Prompted to log in when trying to like, bookmark, comment, or write.
- **Auth Flows (`(auth)/`)**:
  - Email/Password login and registration with validation.
  - Email verification workflow with time-limited tokens.
  - Forgot password and reset password with secure reset tokens.
  - Session handling with HTTP-only, secure JWT access & refresh cookies.
- **Public Author Profile (`/profile/[username]`)**:
  - Avatar, display name, handle (`@username`), bio, social links.
  - Public bibliography: Published stories, total followers, total reads.
  - Follow / Unfollow toggle button with live count update.
- **User Profile Settings (`/dashboard/settings` / `/profile/edit`)**:
  - Update display name, bio, avatar, and social links.
  - Change username (enforcing unique handle check).
  - Password change and notification preferences.

### 3.2 Reader Dashboard (`/dashboard`)
- **Reading History (`/dashboard/history`)**: Chronological list of previously read stories with "Continue Reading" shortcuts.
- **Personal Library & Bookmarks (`/dashboard/library`)**: Saved stories organized into "Want to Read", "Currently Reading", and "Finished".
- **Following Feed (`/dashboard/following`)**: Updates and new chapter notifications from followed authors.
- **Notifications Hub (`/dashboard/notifications`)**: Alerts for new chapters, comments on written stories, likes, and platform announcements.

### 3.3 Writing Studio (`/write`)
- **Story Creation (`/write/stories/new`)**:
  - Title, blurb/synopsis, primary category, secondary tags.
  - Story cover upload with Cloudinary cropping/aspect-ratio helper (2:3 book ratio).
  - Content rating / age advisories if applicable.
- **Chapter Management (`/write/stories/[storyId]/chapters`)**:
  - Reorder chapters via drag-and-drop or order index.
  - Status indicators: Draft, Pending Review, Published, Rejected.
- **Tiptap Rich-Text Editor (`/write/chapters/[chapterId]/edit`)**:
  - Formatting tools: Headings, Bold, Italic, Blockquotes, Text alignment, Bullet lists.
  - Word count and estimated read-time calculator.
  - Auto-save drafts every 15 seconds to cloud backend.
- **Submission & Publishing Flow**:
  - "Save Draft" vs "Submit for Publication".
  - Submission preview modal mimicking actual reader view.
  - View rejection feedback and admin notes for resubmission.
- **Writer Analytics (`/write/analytics`)**:
  - Total story views, chapter reads, unique readers.
  - Engagement metrics (like-to-read ratio, follower growth).

---

## 4. Backend API Requirements (`apps/backend`)

Central server built on Node.js and Express.js with TypeScript and PostgreSQL, exposing a secure REST API.

### 4.1 Architecture & Middleware Stack
- **Router Layer**: Modular routes mapped to respective controllers and services.
- **Security Middleware**:
  - `helmet`: Secure HTTP response headers.
  - `cors`: Strict origin validation allowing only `frontend` and `admin` origins.
  - `express-rate-limit`: Brute-force protection for auth and comment endpoints.
  - `cookie-parser`: Secure HTTP-only cookie extraction.
- **Error Handling**: Centralized error middleware returning structured JSON error responses with status codes.
- **Validation**: Strict input validation using Zod schemas on all incoming requests.

### 4.2 Module Breakdown
| Module | Primary Responsibilities |
| :--- | :--- |
| **Auth** | User signup, login, refresh token rotation, logout, email verification, password reset. |
| **Users** | Profile retrieval, settings update, avatar upload, follow/unfollow system. |
| **Stories** | Story CRUD, slug generation, category/tag association, popularity score calculations. |
| **Chapters** | Chapter CRUD, versioning, reordering, draft auto-save, publish triggers. |
| **Categories & Tags** | Category retrieval, slug verification, tag autocomplete and creation. |
| **Comments & Likes** | Threaded comments, comment moderation flags, story & chapter likes toggle. |
| **Library & History** | Bookmark management, scroll-depth reading progress persistence. |
| **Notifications** | Event-driven notifications (new chapter alert, comment notification, follow alert). |
| **Submissions & Moderation** | Submission queue, approval/rejection workflows, review comments. |
| **Uploads** | Cloudinary signature generation for secure direct client uploads or server uploads. |
| **Analytics** | Read event ingestion, aggregation jobs, daily/weekly stats generation. |

---

## 5. Admin Panel Requirements (`apps/admin`)

Dedicated internal back-office application built with Next.js App Router for administrators and content moderators.

### 5.1 Admin Authentication & Role Enforcement
- Dedicated administrative login screen (`/login`).
- Access strictly validated by backend JWT claims (`role: ADMIN` or `role: MODERATOR`).
- Non-admin tokens are automatically rejected with 403 Forbidden.

### 5.2 Content Approval & Submissions Hub (`/submissions`)
- **Review Queue**:
  - Filter by pending stories and pending chapters.
  - Story cover check, title, synopsis, and genre classification.
  - Reader preview of the submitted chapter text.
- **Review Actions**:
  - **Approve**: Immediately transitions status to `PUBLISHED` and notifies author & followers.
  - **Reject**: Prompts for a mandatory rejection reason/guideline note delivered to author.
  - **Request Revisions**: Allows author to edit specific flagged issues.

### 5.3 User & Moderation Center (`/users`, `/moderation`, `/reports`)
- **User Management**:
  - Search users by username, email, or role.
  - View user statistics (published stories, reports received, ban status).
  - Role management: Promote user to Moderator or Writer.
  - Account actions: Suspend, Ban, or Reinstate account.
- **Content Moderation & Reports Queue**:
  - List of reported comments, chapters, and stories with report reasons (spam, abuse, copyright).
  - Action options: Delete comment, unpublish story/chapter, warn user, dismiss report.

### 5.4 Taxonomy & Platform Configuration (`/categories`, `/settings`)
- **Category Manager**:
  - Add new categories with English name, Bengali name, slug, and cover/icon.
  - Edit existing categories and reorder homepage display order.
- **Platform Settings**:
  - Global announcement banner toggle.
  - Moderation mode: Manual approval vs auto-approval for verified authors.
  - Site maintenance mode toggle.

---

## 6. Centralized Database Schema (`packages/database`)

```prisma
// packages/database/prisma/schema.prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  USER
  WRITER
  MODERATOR
  ADMIN
}

enum ContentStatus {
  DRAFT
  PENDING
  PUBLISHED
  REJECTED
  ARCHIVED
}

enum ReportStatus {
  PENDING
  REVIEWED
  RESOLVED
  DISMISSED
}

model User {
  id              String           @id @default(uuid())
  email           String           @unique
  passwordHash    String
  username        String           @unique
  displayName     String
  bio             String?          @db.Text
  avatarUrl       String?
  role            Role             @default(USER)
  isVerified      Boolean          @default(false)
  isBanned        Boolean          @default(false)
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  // Relationships
  stories         Story[]
  comments        Comment[]
  likes           Like[]
  bookmarks       Bookmark[]
  readingProgress ReadingProgress[]
  followers       Follow[]         @relation("Following")
  following       Follow[]         @relation("Follower")
  notifications   Notification[]
  reportsFiled    Report[]         @relation("Reporter")
  moderationLogs  ModerationLog[]
}

model Story {
  id              String           @id @default(uuid())
  slug            String           @unique
  title           String
  synopsis        String           @db.Text
  coverImageUrl   String?
  status          ContentStatus    @default(DRAFT)
  authorId        String
  author          User             @relation(fields: [authorId], references: [id], onDelete: Cascade)
  categoryId      String
  category        Category         @relation(fields: [categoryId], references: [id])
  tags            Tag[]
  chapters        Chapter[]
  bookmarks       Bookmark[]
  likes           Like[]
  comments        Comment[]
  readingProgress ReadingProgress[]
  reports         Report[]

  viewCount       Int              @default(0)
  publishedAt     DateTime?
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
}

model Chapter {
  id              String           @id @default(uuid())
  storyId         String
  story           Story            @relation(fields: [storyId], references: [id], onDelete: Cascade)
  chapterNumber   Int
  title           String
  content         String           @db.Text
  status          ContentStatus    @default(DRAFT)
  rejectionReason String?          @db.Text

  likes           Like[]
  comments        Comment[]
  readingProgress ReadingProgress[]

  publishedAt     DateTime?
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt

  @@unique([storyId, chapterNumber])
}

model Category {
  id              String           @id @default(uuid())
  slug            String           @unique
  nameBn          String
  nameEn          String
  description     String?          @db.Text
  imageUrl        String?
  sortOrder       Int              @default(0)
  stories         Story[]
}

model Tag {
  id              String           @id @default(uuid())
  name            String           @unique
  stories         Story[]
}

model Comment {
  id              String           @id @default(uuid())
  content         String           @db.Text
  userId          String
  user            User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  storyId         String?
  story           Story?           @relation(fields: [storyId], references: [id], onDelete: Cascade)
  chapterId       String?
  chapter         Chapter?         @relation(fields: [chapterId], references: [id], onDelete: Cascade)
  parentId        String?
  parent          Comment?         @relation("CommentReplies", fields: [parentId], references: [id], onDelete: Cascade)
  replies         Comment[]        @relation("CommentReplies")
  createdAt       DateTime         @default(now())
}

model Like {
  id              String           @id @default(uuid())
  userId          String
  user            User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  storyId         String?
  story           Story?           @relation(fields: [storyId], references: [id], onDelete: Cascade)
  chapterId       String?
  chapter         Chapter?         @relation(fields: [chapterId], references: [id], onDelete: Cascade)
  createdAt       DateTime         @default(now())

  @@unique([userId, storyId, chapterId])
}

model Bookmark {
  id              String           @id @default(uuid())
  userId          String
  user            User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  storyId         String
  story           Story            @relation(fields: [storyId], references: [id], onDelete: Cascade)
  createdAt       DateTime         @default(now())

  @@unique([userId, storyId])
}

model ReadingProgress {
  id              String           @id @default(uuid())
  userId          String
  user            User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  storyId         String
  story           Story            @relation(fields: [storyId], references: [id], onDelete: Cascade)
  chapterId       String
  chapter         Chapter          @relation(fields: [chapterId], references: [id], onDelete: Cascade)
  scrollPercent   Float            @default(0)
  isCompleted     Boolean          @default(false)
  updatedAt       DateTime         @updatedAt

  @@unique([userId, storyId])
}

model Follow {
  id              String           @id @default(uuid())
  followerId      String
  follower        User             @relation("Follower", fields: [followerId], references: [id], onDelete: Cascade)
  followingId     String
  following       User             @relation("Following", fields: [followingId], references: [id], onDelete: Cascade)
  createdAt       DateTime         @default(now())

  @@unique([followerId, followingId])
}

model Notification {
  id              String           @id @default(uuid())
  userId          String
  user            User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  title           String
  message         String
  link            String?
  isRead          Boolean          @default(false)
  createdAt       DateTime         @default(now())
}

model Report {
  id              String           @id @default(uuid())
  reporterId      String
  reporter        User             @relation("Reporter", fields: [reporterId], references: [id], onDelete: Cascade)
  storyId         String?
  story           Story?           @relation(fields: [storyId], references: [id], onDelete: Cascade)
  reason          String           @db.Text
  status          ReportStatus     @default(PENDING)
  createdAt       DateTime         @default(now())
}

model ModerationLog {
  id              String           @id @default(uuid())
  moderatorId     String
  moderator       User             @relation(fields: [moderatorId], references: [id], onDelete: Cascade)
  action          String
  targetType      String
  targetId        String
  notes           String?          @db.Text
  createdAt       DateTime         @default(now())
}
```

---

## 7. REST API Endpoints Specification

### 7.1 Authentication & Profile (`/api/v1/auth`, `/api/v1/users`)
- `POST /api/v1/auth/register` - Create account (User/Writer).
- `POST /api/v1/auth/login` - Authenticate & issue HTTP-only JWT cookies.
- `POST /api/v1/auth/refresh` - Rotate refresh token.
- `POST /api/v1/auth/logout` - Invalidate active session.
- `GET /api/v1/users/me` - Get current authenticated user profile.
- `PATCH /api/v1/users/me` - Update profile details & settings.
- `POST /api/v1/users/:username/follow` - Follow/unfollow author toggle.

### 7.2 Stories & Chapters (`/api/v1/stories`, `/api/v1/chapters`)
- `GET /api/v1/stories` - Browse published stories (filters: category, sort, search, page).
- `GET /api/v1/stories/:slug` - Get public story details & chapter list.
- `POST /api/v1/stories` - Create new story draft [Auth: Writer].
- `PATCH /api/v1/stories/:id` - Update story metadata & cover [Auth: Writer/Owner].
- `GET /api/v1/stories/:slug/chapters/:chapterNumber` - Get chapter reader content.
- `POST /api/v1/stories/:id/chapters` - Create new chapter draft [Auth: Writer/Owner].
- `PATCH /api/v1/chapters/:id` - Edit chapter content & auto-save [Auth: Writer/Owner].
- `POST /api/v1/chapters/:id/submit` - Submit chapter for review [Auth: Writer/Owner].

### 7.3 Engagement & Reader Features (`/api/v1/engagement`)
- `POST /api/v1/stories/:id/bookmark` - Toggle story bookmark.
- `POST /api/v1/stories/:id/like` - Toggle like on story or chapter.
- `GET /api/v1/stories/:id/comments` - Fetch threaded comments.
- `POST /api/v1/stories/:id/comments` - Post comment on story/chapter.
- `PUT /api/v1/reading-progress` - Sync scroll depth & chapter progress.
- `GET /api/v1/notifications` - Fetch user notifications feed.

### 7.4 Admin & Moderation Endpoints (`/api/v1/admin`)
- `GET /api/v1/admin/submissions` - List pending submissions [Auth: Admin/Moderator].
- `POST /api/v1/admin/submissions/:chapterId/approve` - Approve chapter [Auth: Admin/Moderator].
- `POST /api/v1/admin/submissions/:chapterId/reject` - Reject chapter with feedback [Auth: Admin/Moderator].
- `GET /api/v1/admin/users` - Paginated user management table [Auth: Admin].
- `PATCH /api/v1/admin/users/:id/role` - Update user role [Auth: Admin].
- `POST /api/v1/admin/categories` - Create/reorder categories [Auth: Admin].
- `GET /api/v1/admin/analytics/overview` - Platform analytics & metrics [Auth: Admin].

---

## 8. Summary of Technical Tokens & Design System

- **Styling Architecture**: **100% Pure Tailwind CSS Only** (No custom `.css` files, no CSS modules, no inline styles)
- **English Font**: Outfit (`subsets: ['latin']`, variable: `--font-outfit`)
- **Bengali Font**: Hind Siliguri (`subsets: ['bengali']`, variable: `--font-hind-siliguri`)
- **Light Mode Base (Default)**: Background `#ffffff`, Text `#242424`
- **Dark Mode Base**: Background `#242424`, Text `#ffffff`, Cards `#2b2b2b`, Borders `#3d3d3d`
- **Supported Locales**: `bn` (Bangla - Default), `en` (English) with persistent toggle
- **Image Provider**: Cloudinary CDN with responsive transformations
- **Rich Text Engine**: Tiptap headless editor with custom Bengali typography rules
