# MASTER PROMPT 1: BACKEND API DEVELOPMENT
## Project: Bengali Story & Novel Publishing Platform (`apps/backend` & `packages/database`)

---

### PROMPT INSTRUCTIONS (Copy & Paste to AI / Developer):

```markdown
You are a Senior Backend Architect & Database Engineer specializing in Node.js, Express.js, TypeScript, PostgreSQL, and Prisma ORM.

### Project Context
We are developing the Backend API for a production-ready Bengali literature publishing platform (inspired by Pratilipi). 
- Root Directory: `d:/Bengali Story`
- Backend Directory: `apps/backend`
- Database Directory: `packages/database`
- Shared Types & Validation: `packages/shared-types` & `packages/validation`
- The backend is the ONLY application in this monorepo with direct database access. Frontend (`apps/frontend`, port 3000) and Admin (`apps/admin`, port 3001) communicate strictly through this REST API.

### Technical Stack & Rules
- Runtime & Framework: Node.js, Express.js, TypeScript (TSX for development runner)
- Database & ORM: PostgreSQL with Prisma ORM located in `packages/database/prisma/schema.prisma`
- Auth: JWT (15-min Access Token & 7-day Refresh Token in secure HTTP-only cookies) + bcryptjs
- Security: Helmet, CORS (allowing port 3000 & 3001), express-rate-limit, cookie-parser
- Media Storage: Cloudinary (signed direct uploads & asset management)
- Validation: Zod schemas for all request bodies and queries

---

### Step-by-Step Implementation Roadmap

#### Step 1: Database Setup & Prisma Schema (`packages/database`)
1. Implement the complete Prisma schema in `packages/database/prisma/schema.prisma` with:
   - `User` (id, email, passwordHash, username, displayName, bio, avatarUrl, role [USER, WRITER, MODERATOR, ADMIN], isVerified, isBanned)
   - `Story` (id, slug, title, synopsis, coverImageUrl, status [DRAFT, PENDING, PUBLISHED, REJECTED], authorId, categoryId, viewCount, publishedAt)
   - `Chapter` (id, storyId, chapterNumber, title, content [Text], status, rejectionReason, publishedAt)
   - `Category` (id, slug, nameBn, nameEn, description, imageUrl, sortOrder)
   - `Tag` (id, name)
   - `Comment` (id, content, userId, storyId, chapterId, parentId [for replies])
   - `Like` (id, userId, storyId, chapterId) [unique per user + target]
   - `Bookmark` (id, userId, storyId)
   - `ReadingProgress` (id, userId, storyId, chapterId, scrollPercent, isCompleted)
   - `Follow` (id, followerId, followingId)
   - `Notification` (id, userId, title, message, link, isRead)
   - `Report` (id, reporterId, storyId, reason, status [PENDING, RESOLVED, DISMISSED])
   - `ModerationLog` (id, moderatorId, action, targetType, targetId, notes)
2. Create database seed script in `packages/database/prisma/seed.ts` to insert initial categories (রোমান্স, থ্রিলার, ভৌতিক, কল্পবিজ্ঞান, কবিতা ইত্যাদি), default Admin user, and sample verified authors.

#### Step 2: Server Foundation, Configuration & Security Middleware (`apps/backend/src`)
1. Create `src/config/environment.ts` loading and validating environment variables (PORT, DATABASE_URL, JWT_SECRET, REFRESH_SECRET, CLOUDINARY_*, FRONTEND_URL, ADMIN_URL).
2. Configure Express server in `src/app.ts`:
   - Helmet headers
   - CORS middleware with credentials enabled for `FRONTEND_URL` and `ADMIN_URL`
   - Express JSON parser with reasonable limit (10mb for rich text)
   - Cookie parser
   - Rate limiting middleware (100 req/15min for general APIs, 10 req/15min for auth routes)
3. Centralized Error Handler in `src/middleware/error.middleware.ts` producing consistent JSON responses: `{ success: false, message: string, errors?: any }`.
4. Create entrypoint `src/server.ts` listening on configured port (e.g., 5000) with graceful shutdown hooks.

#### Step 3: Authentication & User Management Module (`src/modules/auth` & `src/modules/users`)
1. Implement JWT helpers (token generation, cookie options with `httpOnly: true`, `sameSite: 'lax'`, `secure: production`).
2. Authentication Routes & Controllers:
   - `POST /api/v1/auth/register` (Zod validation: email, username, password, displayName)
   - `POST /api/v1/auth/login` (verify credentials, set access & refresh cookies)
   - `POST /api/v1/auth/refresh` (validate refresh token, issue new access token)
   - `POST /api/v1/auth/logout` (clear auth cookies)
3. Auth Middleware in `src/middleware/auth.middleware.ts`:
   - `authenticate`: verifies access token and attaches user payload.
   - `authorize(...roles)`: RBAC guard (checks USER, WRITER, MODERATOR, ADMIN).
4. User Routes & Controllers:
   - `GET /api/v1/users/me` (current authenticated user profile & permissions)
   - `PATCH /api/v1/users/me` (update displayName, bio, avatarUrl)
   - `GET /api/v1/users/:username` (public author profile with story counts and followers)
   - `POST /api/v1/users/:username/follow` (toggle follow status)

#### Step 4: Stories & Chapters Module (`src/modules/stories` & `src/modules/chapters`)
1. Story Routes & Business Logic:
   - `GET /api/v1/stories`: Public listing with pagination, search query, category filter, sorting (trending, newest, popular).
   - `GET /api/v1/stories/:slug`: Public story detail (increments view count asynchronously, loads published chapters).
   - `POST /api/v1/stories`: Create new story draft [Auth: USER/WRITER].
   - `PATCH /api/v1/stories/:id`: Update story blurb, category, cover [Auth: Owner/Admin].
   - `DELETE /api/v1/stories/:id`: Soft-delete or archive story [Auth: Owner/Admin].
2. Chapter Routes & Business Logic:
   - `GET /api/v1/stories/:slug/chapters/:chapterNumber`: Read public chapter.
   - `POST /api/v1/stories/:id/chapters`: Create new chapter draft [Auth: Owner].
   - `PATCH /api/v1/chapters/:id`: Auto-save & edit chapter text [Auth: Owner].
   - `POST /api/v1/chapters/:id/submit`: Submit chapter for admin review (status -> PENDING).

#### Step 5: Engagement & Reader Progress (`src/modules/comments`, `src/modules/likes`, etc.)
1. Bookmarks: `POST /api/v1/stories/:id/bookmark` (toggle bookmark) & `GET /api/v1/users/me/library`.
2. Likes: `POST /api/v1/stories/:id/like` and `POST /api/v1/chapters/:id/like`.
3. Comments: Threaded comment tree creation & retrieval for stories and chapters.
4. Reading Progress: `PUT /api/v1/reading-progress` (sync scroll depth & mark chapter completed) & `GET /api/v1/users/me/history`.
5. Notifications: `GET /api/v1/notifications` & `PATCH /api/v1/notifications/:id/read`.

#### Step 6: Cloudinary Uploads & Admin Review Endpoints (`src/modules/uploads` & `src/modules/admin`)
1. Upload signature route: `POST /api/v1/uploads/signature` (generates signed params for direct Cloudinary upload of story covers & avatars).
2. Admin Submissions Queue:
   - `GET /api/v1/admin/submissions` (pending stories & chapters)
   - `POST /api/v1/admin/submissions/:chapterId/approve` (status -> PUBLISHED, notify author & followers)
   - `POST /api/v1/admin/submissions/:chapterId/reject` (status -> REJECTED, record feedback note)
3. Admin Moderation & User Management:
   - `GET /api/v1/admin/users`, `PATCH /api/v1/admin/users/:id/role`, `PATCH /api/v1/admin/users/:id/ban`
   - `GET /api/v1/admin/reports`, `POST /api/v1/admin/reports/:id/resolve`
   - `POST /api/v1/admin/categories` (create/reorder categories)

#### Step 7: Testing & Verification
- Ensure all endpoints return appropriate HTTP status codes (200, 201, 400, 401, 403, 404, 500).
- Validate that no confidential fields (e.g. `passwordHash`) are ever returned in JSON payloads.
```
