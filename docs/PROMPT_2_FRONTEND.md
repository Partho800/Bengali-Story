# MASTER PROMPT 2: FRONTEND APPLICATION DEVELOPMENT
## Project: Bengali Story & Novel Publishing Platform (`apps/frontend`)

---

### PROMPT INSTRUCTIONS (Copy & Paste to AI / Developer):

```markdown
You are a Principal Frontend Engineer & Design Systems Specialist with expertise in Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Tiptap rich-text editing.

### Project Context
We are developing the public-facing Frontend Website for the Bengali Story & Novel Publishing Platform (inspired by Pratilipi, with original branding).
- Application Path: `apps/frontend`
- Backend API Base URL: `http://localhost:5000/api/v1`
- Dev Server Port: 3000

---

### MANDATORY DESIGN TOKENS, STYLING & I18N RULES (STRICT & NON-NEGOTIABLE)

1. **NO CUSTOM CSS FILES — 100% PURE TAILWIND CSS ONLY**:
   - Absolutely NO custom `.css` or `.module.css` files, NO raw CSS rules, and NO inline `style={{ ... }}` objects.
   - All layouts, animations, transitions, card styles, and component aesthetics MUST be constructed exclusively using **Tailwind CSS utility classes**.
   - The only CSS file is `src/app/globals.css` which solely imports Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`) and defines HSL CSS theme variables.

2. **FONT FAMILY SYSTEM (Hind Siliguri + Outfit)**:
   - **English Font**: `Outfit` (loaded via `next/font/google` in `layout.tsx`, variable: `--font-outfit`).
   - **Bengali Font**: `Hind Siliguri` (loaded via `next/font/google` in `layout.tsx`, variable: `--font-hind-siliguri`).
   - **Tailwind Font Config**:
     - `font-sans`: `['var(--font-outfit)', 'var(--font-hind-siliguri)', 'system-ui', 'sans-serif']` (Default: English renders in Outfit, Bengali characters automatically fall back to Hind Siliguri).
     - Explicit Tailwind classes: `font-outfit` and `font-bengali`.

3. **THEME MODES & BASE COLORS (White & #242424)**:
   - **Default Mode**: **Light Mode (White)** — Background: `#ffffff`, Text / Primary: `#242424`.
   - **Dark Mode**: **Base `#242424`** — Background: `#242424`, Text: `#ffffff`, Cards/Surfaces: `#2b2b2b`, Borders: `#3d3d3d`.
   - Setup via `ThemeProvider` (`attribute="class"`, `defaultTheme="light"`, `enableSystem={false}`).
   - Interactive `ThemeToggle` button (☀️ / 🌙) switching classes with Tailwind transition utilities (`transition-colors duration-200`).

4. **BILINGUAL LANGUAGE SYSTEM (Bangla & English)**:
   - Supported Languages: **Bangla (`bn` - Default)** and **English (`en`)**.
   - **Persistent across all pages**: Once a user switches to Bengali or English via `LanguageToggle`, it is permanently saved in `localStorage` and cookies (`bengali_story_locale`). Navigating to any page or refreshing stays in the selected language.
   - Every text label, button, navigation link, card description, and placeholder MUST use the `t(...)` translation helper from `LanguageProvider`.

5. **ICONOGRAPHY RULES (`lucide-react` Only — ZERO Text Icons or Emojis)**:
   - Absolutely **NO emojis** or raw Unicode/text characters used as UI icons anywhere on the platform.
   - All icons MUST be imported from **`lucide-react`** as vector SVG components and sized/colored via Tailwind utility classes (e.g. `<Sun className="w-5 h-5 text-amber-400" />`, `<Moon className="w-5 h-5" />`, `<Globe className="w-4 h-4" />`, `<Search className="w-4 h-4" />`).

6. **MEDIA & IMAGE DATABASE (Cloudinary Only)**:
   - Story covers, chapter images, author avatars, and banners MUST be stored exclusively on **Cloudinary**.
   - Direct uploads must be authorized via backend-signed upload parameters (`/api/v1/uploads/signature`) with automated WebP/AVIF format optimization.

---

### Step-by-Step Implementation Roadmap

#### Step 1: Core Layout, UI Primitives & Global Shell (`src/app` & `src/components`)
1. Wrap `src/app/layout.tsx` with:
   - `ThemeProvider` (`attribute="class"`, `defaultTheme="light"`, `enableSystem={false}`, `disableTransitionOnChange`)
   - `LanguageProvider` (`defaultLocale="bn"`)
2. Build shadcn/ui components in `src/components/ui` using pure Tailwind utility classes:
   - Button (`bg-primary text-primary-foreground hover:opacity-90 rounded-xl px-4 py-2 transition-all`)
   - Input (`border-border bg-card text-foreground focus:ring-2 focus:ring-primary rounded-xl`)
   - Textarea, Dialog, DropdownMenu, Avatar, Badge, Tabs, Toast/Toaster
3. Global Navigation Header (`src/components/layout/header.tsx`):
   - Styled with Tailwind: `border-b border-border bg-card/70 backdrop-blur-md sticky top-0 z-50`
   - Brand logo with Bengali & English tags
   - Links: Stories (`গল্পসমূহ`), Categories (`বিভাগ`), Authors (`লেখকবৃন্দ`), Rankings (`র‌্যাঙ্কিং`), Write (`লিখুন`)
   - Integrated `LanguageToggle` (`বাং / EN`) and `ThemeToggle` (☀️ / 🌙)
   - User dropdown (Avatar, Profile, Library, Dashboard, Logout) or "Login" CTA button.
4. Global Footer (`src/components/layout/footer.tsx`):
   - Platform bio, quick links, category tags, legal links, copyright notice (pure Tailwind styling).

#### Step 2: Homepage Experience (`src/app/(public)/page.tsx`)
1. Hero Section:
   - Styled with Tailwind: centered flex layout, responsive typography (`text-4xl sm:text-6xl font-bold tracking-tight text-foreground`), action buttons.
2. Trending Stories Carousel / Grid:
   - Story cards: `p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all shadow-sm`
   - Cover image (2:3 aspect ratio), title, author avatar, genre badge, views, like counts.
3. Popular Novels & Series Section:
   - Multi-chapter serialized stories with chapter count pills.
4. Category Visual Grid:
   - Cards with hover micro-animations (`hover:-translate-y-1 hover:shadow-md transition-all`).
5. Featured Authors Grid:
   - Author avatar, follower count, published stories count, and follow CTA button.
6. Recently Published Stories Feed with "Load More" pagination.

#### Step 3: Story Discovery & Listings (`src/app/stories`, `/categories`, `/search`, `/rankings`)
1. Story Archive Page (`/stories/page.tsx`):
   - Pure Tailwind filter bar: Category, Status (Ongoing/Completed), Sort (Trending, Newest, Popular, Top Rated).
   - Responsive story grid (`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6`) and pagination.
2. Category Archive (`/categories/[slug]/page.tsx`):
   - Category banner, title, description, and filtered story cards.
3. Search Results Page (`/search/page.tsx`):
   - Debounced search input, tab filters (Stories, Authors, Tags), keyword highlighting.
4. Leaderboard Page (`/rankings/page.tsx`):
   - Daily, Weekly, and All-Time top-ranked stories and authors with rank badges (#1, #2, #3).

#### Step 4: Story Details Page (`/stories/[slug]/page.tsx`)
1. Story Header Hero:
   - Book cover (2:3 aspect ratio), title, author link, synopsis, category and tag pills.
   - Aggregate stats bar (Reads, Likes, Bookmarks, Chapters).
   - Actions: "Read Chapter 1", "Bookmark (Add to Library)", "Like Story", "Share".
2. Chapter List View:
   - Clean list/accordion with chapter number, title, release date, and reading status indicator.
3. Reviews & Comments Section:
   - Reader comments list with like and reply capability, and post-comment box for authenticated users.
4. Related Stories recommendations carousel.

#### Step 5: Chapter Reader (`/stories/[slug]/chapters/[chapterNumber]/page.tsx`)
1. Reader Container & Typography:
   - Focused, distraction-free reading canvas (`max-w-3xl mx-auto px-6 py-12`).
   - Long-form typography: `text-lg sm:text-xl leading-[2.1] font-sans text-foreground`.
2. Reader Control Drawer / Floating Header:
   - Font Size adjuster: Small (`text-base`), Normal (`text-lg`), Large (`text-xl`), Extra Large (`text-2xl`).
   - Reader Mode: Light (White), Dark (`bg-[#242424] text-white`), and Warm Sepia (`bg-[#fbf0d9] text-[#433422]`).
3. Reading Progress Tracking:
   - Sticky top progress bar showing scroll percentage (`bg-primary h-1 fixed top-0 left-0 z-50`).
   - Auto-sync: Send reading progress API request (`PUT /api/v1/reading-progress`) upon scrolling past 50% and 100%.
4. Chapter Navigation:
   - Sticky bottom navigation: "Previous Chapter" (disabled on Chapter 1) and "Next Chapter" / "Finished".
5. In-Reader Engagement:
   - End-of-chapter like button, comment drawer, author follow CTA, and next chapter suggestion.

#### Step 6: User Dashboard & Library (`src/app/dashboard`)
1. Dashboard Overview (`/dashboard/page.tsx`):
   - Welcome banner, continue reading banner (with quick resume button), recent activity summary.
2. Library & Bookmarks (`/dashboard/library/page.tsx`):
   - Saved stories categorized into tabs: "Currently Reading", "Saved for Later", "Completed".
3. Reading History (`/dashboard/history/page.tsx`):
   - Chronological list of read chapters with completion progress and remove action.
4. Following Feed (`/dashboard/following/page.tsx`):
   - Stream of newly released chapters from authors the user follows.
5. Notifications Center (`/dashboard/notifications/page.tsx`):
   - Unread and read alerts for new chapters, comments, and approvals.

#### Step 7: Writer Studio & Tiptap Editor (`src/app/write`)
1. Writer Dashboard (`/write/page.tsx`):
   - Overview of published stories, drafts, and pending submissions.
   - Quick action: "Create New Story".
2. Story Creator & Metadata (`/write/stories/page.tsx` or `/write/stories/new`):
   - Form with title, synopsis, category dropdown, tag picker.
   - Story Cover Image upload: Integrated with Cloudinary signed upload with preview and 2:3 aspect ratio crop.
3. Chapter Manager (`/write/chapters/page.tsx`):
   - List all chapters for a story, order index, status badge (Draft, Pending Review, Published, Rejected).
   - Rejection feedback display with revision notes.
4. Tiptap Rich-Text Editor (`/write/chapters/[chapterId]/page.tsx`):
   - Formatter bar: H2, H3, Bold, Italic, Quote, Bullet list, Alignment (styled via Tailwind).
   - Live word count and estimated reading time.
   - Background auto-save every 15 seconds to backend draft endpoint.
   - Action buttons: "Save Draft" and "Submit for Review".
   - Preview modal displaying the chapter exactly as readers will experience it.

#### Step 8: Authentication & Profiles (`src/app/(auth)` & `/profile/[username]`)
1. Auth Pages:
   - `/login`: Email & password form with "Remember Me" and validation errors.
   - `/register`: Display name, username, email, password, and terms checkbox.
   - `/forgot-password` and `/reset-password`.
2. Public Author Profile (`/profile/[username]/page.tsx`):
   - Author avatar, display name, `@username`, bio, social handles.
   - Follower count, total reads count, and list of published stories.
   - Follow / Unfollow interactive button.
```
