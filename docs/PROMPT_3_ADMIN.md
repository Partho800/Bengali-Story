# MASTER PROMPT 3: ADMIN PANEL DEVELOPMENT
## Project: Bengali Story & Novel Publishing Platform (`apps/admin`)

---

### PROMPT INSTRUCTIONS (Copy & Paste to AI / Developer):

```markdown
You are a Senior Full-Stack Engineer & Internal Tools Architect specializing in Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Administrative Dashboard systems.

### Project Context
We are developing the separate, dedicated Administrative & Moderation Web Application for the Bengali Publishing Platform.
- Application Path: `apps/admin`
- Backend API Base URL: `http://localhost:5000/api/v1`
- Dev Server Port: 3001
- Target Audience: Platform Administrators and Content Moderators.

---

### MANDATORY DESIGN TOKENS, STYLING & I18N RULES (STRICT & NON-NEGOTIABLE)

1. **NO CUSTOM CSS FILES — 100% PURE TAILWIND CSS ONLY**:
   - Absolutely NO custom `.css` or `.module.css` files, NO raw CSS rules, and NO inline `style={{ ... }}` objects.
   - Every single table, badge, modal, sidebar, header, button, and input element MUST be styled exclusively using **Tailwind CSS utility classes**.
   - The only CSS file is `src/app/globals.css` which solely imports Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`) and defines HSL CSS theme variables.

2. **FONT FAMILY SYSTEM (Hind Siliguri + Outfit)**:
   - **English Font**: `Outfit` (loaded via `next/font/google` in `layout.tsx`, variable: `--font-outfit`).
   - **Bengali Font**: `Hind Siliguri` (loaded via `next/font/google` in `layout.tsx`, variable: `--font-hind-siliguri`).
   - Tailwind font configuration: `font-sans: ['var(--font-outfit)', 'var(--font-hind-siliguri)', 'system-ui', 'sans-serif']`. English renders in Outfit, Bengali content automatically renders in Hind Siliguri.

3. **THEME MODES & BASE COLORS (White & #242424)**:
   - **Default Mode**: **Light Mode (White)** — Background: `#ffffff`, Text / Primary: `#242424`.
   - **Dark Mode**: **Base `#242424`** — Background: `#242424`, Text: `#ffffff`, Cards/Surfaces: `#2b2b2b`, Borders: `#3d3d3d`.
   - Setup via `ThemeProvider` (`attribute="class"`, `defaultTheme="light"`, `enableSystem={false}`).
   - Interactive `ThemeToggle` button (☀️ / 🌙) switching classes with Tailwind transition utilities (`transition-colors duration-200`).

4. **BILINGUAL LANGUAGE SYSTEM (Bangla & English)**:
   - Supported Languages: **Bangla (`bn` - Default)** and **English (`en`)**.
   - **Persistent across all pages**: Language choice is permanently stored in `localStorage` and cookies (`bengali_story_admin_locale`).
   - `LanguageToggle` (`বাং / EN`) in the admin topbar allows immediate switching between Bengali and English.
   - All dashboard labels, table headers, action buttons, and modal dialogs MUST use the `t(...)` translation helper from `LanguageProvider`.

5. **ICONOGRAPHY RULES (`lucide-react` Only — ZERO Text Icons or Emojis)**:
   - Absolutely **NO emojis** or raw Unicode/text characters used as UI icons in any table, action button, or sidebar item.
   - Every icon MUST be imported from **`lucide-react`** as vector SVG components and styled with Tailwind utility classes (e.g. `<ShieldCheck className="w-5 h-5 text-emerald-500" />`, `<Trash2 className="w-4 h-4 text-destructive" />`, `<CheckCircle className="w-4 h-4" />`, `<XCircle className="w-4 h-4" />`).

6. **MEDIA & IMAGE DATABASE (Cloudinary Only)**:
   - Story covers, submission previews, and author avatars MUST be pulled and transformed through **Cloudinary CDN**.

---

### Step-by-Step Implementation Roadmap

#### Step 1: Admin Authentication & Security Guard (`src/app/login` & Middleware)
1. Administrative Login Screen (`src/app/login/page.tsx`):
   - Secure login form (email & password) styled with pure Tailwind CSS.
   - Communicates with `POST /api/v1/auth/login`.
   - On success, verifies that the user role is `ADMIN` or `MODERATOR`.
   - If user role is `USER` or `WRITER`, shows 403 Forbidden alert: "Access Denied: You do not have administrative privileges."
2. Route Protection / Middleware:
   - All routes under `/(protected)` or `/dashboard` require a valid admin JWT cookie.
   - Redirect unauthenticated users to `/login`.

#### Step 2: Admin Layout & Dashboard Shell (`src/app/(protected)/layout.tsx`)
1. Collapsible Sidebar Navigation:
   - Styled with Tailwind: `w-64 border-r border-border bg-card flex flex-col justify-between p-4`
   - Brand logo and Admin badge.
   - Navigation Items:
     - Dashboard Overview (`/dashboard`)
     - Submissions & Approvals (`/submissions`) [with badge counter of pending items]
     - Stories Management (`/stories`)
     - Chapters Management (`/chapters`)
     - User Management (`/users`)
     - Categories & Taxonomy (`/categories`)
     - Comments & Reports (`/reports` & `/moderation`)
     - Analytics & Reports (`/analytics`)
     - Platform Settings (`/settings`)
2. Admin Header Topbar:
   - Mobile sidebar toggle.
   - Quick search for users or stories.
   - Language Switcher (`বাং / EN`) and Theme Toggle (☀️ / 🌙).
   - Admin user profile dropdown with role badge (e.g. `[ADMIN]`) and Logout action.

#### Step 3: Admin Overview Dashboard (`src/app/(protected)/dashboard/page.tsx`)
1. Metric KPI Cards:
   - Pure Tailwind cards: Total Published Stories, Total Chapters, Total Registered Users, Total Monthly Reads.
   - Pending Submissions Alert card (highlighted in amber).
2. Recent Submissions Table:
   - Top 5 pending stories/chapters waiting for approval with quick "Review" button.
3. System Health & Activity Feed:
   - Log of recent moderator actions and new user signups.

#### Step 4: Content Approval & Review Center (`src/app/(protected)/submissions/page.tsx`)
1. Submissions Queue Table & Filters:
   - Filter by Type (New Story vs New Chapter) and Status (Pending, Approved, Rejected).
   - Story cover thumbnail, story title, chapter title, author name, submission timestamp.
2. Comprehensive Review Modal / Detail View:
   - **Left Column**: Story Metadata, synopsis, genres/tags, author details, cover image inspection.
   - **Right Column**: Chapter text reader view rendered with optimized Bengali typography (Hind Siliguri) for readability.
   - Word count and automated basic checks (empty content, banned words).
3. Review Actions:
   - **Approve Button**: Calls `POST /api/v1/admin/submissions/:chapterId/approve`.
     - Transitions status to `PUBLISHED`.
     - Dispatches notification to author and followers.
     - Updates UI list seamlessly.
   - **Reject Button**: Opens modal prompting for a mandatory rejection reason/guideline note.
     - Calls `POST /api/v1/admin/submissions/:chapterId/reject`.
     - Sends feedback note directly to writer's dashboard.

#### Step 5: User Management & Moderation Center (`/users`, `/moderation`, `/reports`)
1. User Management Table (`/users/page.tsx`):
   - Search bar by username, display name, or email.
   - Role dropdown filter: All, User, Writer, Moderator, Admin.
   - Table columns: Avatar, Name, Email, Role, Stories Count, Status (Active/Banned), Join Date, Actions.
   - Actions Dropdown:
     - Change Role (promote/demote to Writer, Moderator, User).
     - Ban / Unban user with confirmation dialog.
2. Reported Content & Moderation Hub (`/reports/page.tsx` & `/moderation/page.tsx`):
   - List of user-submitted reports on comments or stories.
   - Reason for report (Spam, Harassment, Inappropriate Content, Copyright Violation).
   - Direct link to preview reported content.
   - Actions: Delete reported comment/chapter, Issue warning to user, or Dismiss report as false alarm.
   - Audit trail of moderation decisions.

#### Step 6: Taxonomy & Category Manager (`/categories/page.tsx`)
1. Category Grid / Table:
   - List of all platform categories showing Bengali Name (`nameBn`), English Name (`nameEn`), Slug, and Story Count.
   - Reorder display order (drag-and-drop or order number).
2. Create & Edit Category Modal:
   - Input fields: English Name, Bengali Name, URL Slug (auto-generated), Description, and Image/Icon URL.
   - Save & Update with instant cache invalidation.

#### Step 7: Platform Settings (`/settings/page.tsx`)
1. Publishing Mode Settings:
   - Manual Review Mode (default: all submissions require admin approval).
   - Auto-Approval Mode (allow verified writers to publish chapters instantly).
2. System Announcements:
   - Set global banner message (displayed across frontend header) for maintenance or events.
3. Feature Toggles:
   - Enable/Disable user registrations.
   - Enable/Disable comments platform-wide.
```
