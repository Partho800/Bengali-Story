# AGENT DEVELOPMENT RULES & SYSTEM BOUNDARIES
## Bengali Story & Novel Publishing Platform

> **CRITICAL DIRECTIVE FOR ALL AI AGENTS & DEVELOPERS**  
> Read this file before generating, modifying, or refactoring ANY code in this repository. You MUST adhere 100% strictly to the frameworks, design tokens, color palette, typography, modes, and internationalization rules listed below. **Do NOT introduce unauthorized libraries, arbitrary colors, unapproved fonts, or custom CSS.**

---

## 1. Approved Technology Stack (Strict Boundaries)

Only the following libraries and frameworks are permitted. **Do not install or use alternatives:**

| Domain | Approved Stack | Strictly Forbidden |
| :--- | :--- | :--- |
| **Frontend Website** (`apps/frontend`) | Next.js 14 (App Router), TypeScript, React Server Components | Pages Router, Vue, Angular, Svelte |
| **Admin Panel** (`apps/admin`) | Next.js 14 (App Router), TypeScript | Any third-party admin template (e.g. CoreUI, AdminLTE) |
| **Backend API** (`apps/backend`) | Node.js, Express.js, TypeScript, TSX | NestJS, Fastify, Python, Go |
| **Database & ORM** (`packages/database`) | PostgreSQL, Prisma ORM (`@prisma/client`) | TypeORM, Sequelize, Mongoose, Drizzle |
| **Styling** | **100% Pure Tailwind CSS Only** + `shadcn/ui` + `tailwindcss-animate` | **NO custom `.css` files**, NO CSS Modules, NO inline `style={{}}`, NO Bootstrap, NO Material UI, NO Styled Components |
| **Typography** | `next/font/google`: **Outfit** (English) & **Hind Siliguri** (Bengali) | Inter, Roboto, Arial, Times New Roman |
| **Form & Validation** | `react-hook-form`, `@hookform/resolvers`, `zod` | Formik, Yup, Joi |
| **Rich-Text Editor** | Tiptap (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/pm`) | TinyMCE, CKEditor, Quill |
| **Icon Library** | **`lucide-react` Only** | **NO raw emojis, NO text-based icons**, FontAwesome, React Icons |
| **Media & Storage** | **Cloudinary Only** (Signed direct uploads) | AWS S3 (unless explicitly instructed), local filesystem uploads |
| **Authentication** | JWT (`jsonwebtoken`) in secure HTTP-only cookies + `bcryptjs` | NextAuth/Auth.js (backend is the single source of truth for auth) |

---

## 2. Styling Constraint: Pure Tailwind CSS Only

- **Zero Custom CSS**: Under no circumstances should you create `.css`, `.scss`, `.sass`, or `.module.css` files.
- **Zero Inline Styles**: Do NOT write `style={{ color: '...', backgroundColor: '...' }}`.
- **The Only Permitted CSS File**: `src/app/globals.css`, which contains ONLY:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
  plus the HSL color variables for the design tokens.
- **Components Styling**: Every component, modal, table, card, button, and layout MUST be composed exclusively using Tailwind CSS utility classes (e.g., `bg-background text-foreground border border-border rounded-xl p-4 transition-colors`).

---

## 3. Typography Rules: Hind Siliguri & Outfit

All typography must adhere to the dual-font strategy:

```typescript
// tailwind.config.ts
fontFamily: {
  sans: ['var(--font-outfit)', 'var(--font-hind-siliguri)', 'system-ui', 'sans-serif'],
  outfit: ['var(--font-outfit)', 'sans-serif'],
  bengali: ['var(--font-hind-siliguri)', 'sans-serif'],
}
```

1. **English Font**: Always **`Outfit`** (`subsets: ['latin']`, variable: `--font-outfit`).
2. **Bengali Font**: Always **`Hind Siliguri`** (`subsets: ['bengali']`, variable: `--font-hind-siliguri`).
3. **Automatic Fallback**: The default `font-sans` places `var(--font-outfit)` first and `var(--font-hind-siliguri)` second. English text automatically renders in Outfit; Bengali characters automatically fall back to Hind Siliguri.
4. **Utility Classes**: Use `font-outfit` when explicitly enforcing English typography; use `font-bengali` when explicitly enforcing Bengali typography.

---

## 4. Theme Modes & Color System: White & #242424

The color system is strictly constrained to **White** and **`#242424`**:

| Token | Light Mode (Default) | Dark Mode (`.dark`) | Usage |
| :--- | :--- | :--- | :--- |
| **`--background`** | `0 0% 100%` (`#ffffff`) | `0 0% 14.12%` (**`#242424`**) | Main page background |
| **`--foreground`** | `0 0% 14.12%` (**`#242424`**) | `0 0% 100%` (`#ffffff`) | Main body & heading text |
| **`--card`** | `0 0% 100%` (`#ffffff`) | `0 0% 17%` (`#2b2b2b`) | Elevated card surfaces |
| **`--border`** | `0 0% 89%` (`#e3e3e3`) | `0 0% 24%` (`#3d3d3d`) | Element borders & dividers |
| **`--muted`** | `0 0% 96%` (`#f5f5f5`) | `0 0% 20%` (`#333333`) | Secondary backgrounds |
| **`--muted-foreground`** | `0 0% 45%` (`#737373`) | `0 0% 68%` (`#adadad`) | Subtitles & helper text |
| **`--primary`** | `0 0% 14.12%` (**`#242424`**) | `0 0% 100%` (`#ffffff`) | Primary buttons & highlights |
| **`--primary-foreground`** | `0 0% 100%` (`#ffffff`) | `0 0% 14.12%` (**`#242424`**) | Text inside primary buttons |

### Theme Rules:
- **Default Theme**: Must be **Light Mode (`#ffffff`)**. Set via `defaultTheme="light"` in `ThemeProvider`.
- **Forbidden Colors**: Do NOT introduce random dark colors like `#0f172a`, `#111827`, `#000000`, or `#1e293b`. Dark mode MUST strictly be anchored to **`#242424`**.
- **Smooth Transition**: Always apply `transition-colors duration-200` to prevent abrupt flashing during theme switching.

---

## 5. Bilingual System: Bangla & English with Persistence

The platform is 100% bilingual:

1. **Supported Locales**:
   - **`bn` (Bangla)**: **Default locale**.
   - **`en` (English)**: Secondary locale.
2. **Zero Hardcoded Strings**:
   - Every single text string displayed to the user MUST be accessed via the translation hook:
     ```tsx
     const { t, locale, isBn } = useLanguage();
     <h1>{t('home.heroTitle')}</h1>
     ```
   - All dictionaries live in `src/lib/i18n/translations.ts`. When creating new components, add corresponding keys to BOTH `bn` and `en` dictionaries.
3. **Persistent Language Switcher**:
   - Use the shared `<LanguageToggle />` component.
   - When a user changes the language, it MUST be saved to `localStorage` (`bengali_story_locale`) and a matching cookie.
   - The selected language must remain unchanged across all page navigations and browser refreshes until the user explicitly toggles it again.

---

## 6. Monorepo Architecture & Database Access Rules

```
bengali-publishing-platform/
├── apps/
│   ├── frontend/        (Port 3000 - Public, Reader, Writer)
│   ├── backend/         (Port 5000 - REST API, Database single source of truth)
│   └── admin/           (Port 3001 - Back-office & Moderation)
└── packages/
    ├── database/        (Prisma schema & migrations)
    ├── shared-types/    (TypeScript interfaces)
    └── validation/      (Zod schemas)
```

1. **NO Direct Database Access in Frontend or Admin**:
   - `apps/frontend` and `apps/admin` MUST NEVER import `@prisma/client` or connect to PostgreSQL directly.
   - ALL database mutations and queries MUST go through the backend REST API (`apps/backend`).
2. **Role-Based Access Control (RBAC)**:
   - Backend enforces 4 roles: `USER`, `WRITER`, `MODERATOR`, `ADMIN`.
   - Access to `/api/v1/admin/*` is strictly validated by backend JWT claims, never trust client-side state alone.
3. **No Fake Implementations or Broken Buttons**:
   - Do NOT leave placeholder buttons or fake handlers (e.g. `onClick={() => alert('coming soon')}`) in features described as complete. All features built must be fully functional.

---

## 7. Iconography Rules: `lucide-react` Only (Zero Text Icons or Emojis)

- **Official Icon Library**: **`lucide-react`** exclusively.
- **Strict Prohibition on Text Icons & Emojis**:
  - Absolutely **NO emojis** (such as ☀️, 🌙, 📖, ❤️, 🔍, ⚙️) or raw Unicode characters used as UI icons.
  - Every icon must be imported as a component from `lucide-react` (e.g. `<Sun />`, `<Moon />`, `<Globe />`, `<Search />`, `<Bookmark />`, `<Heart />`, `<Share2 />`, `<Eye />`, `<User />`).
- **Styling**: Always control icon dimensions and colors using Tailwind utility classes:
  ```tsx
  import { Search, Heart } from 'lucide-react';
  <Search className="w-4 h-4 text-muted-foreground" />
  <Heart className="w-5 h-5 text-red-500 hover:scale-110 transition-transform" />
  ```

---

## 8. Media Database: Cloudinary Only

- All story cover images, chapter illustrations, author avatars, and banners MUST be hosted on **Cloudinary**.
- Uploads must use backend-signed upload parameters (`POST /api/v1/uploads/signature`) for direct, secure, client-to-Cloudinary uploads.
- Images must utilize Cloudinary automatic format (`f_auto`) and quality (`q_auto`) transformations to serve WebP/AVIF formats.
- NEVER store image binaries in the local repository or database.

---

## Summary Checklist for Agents Before Delivering Code

- [ ] Is styling 100% pure Tailwind CSS without custom CSS files or inline styles?
- [ ] Are English texts in **Outfit** and Bengali texts in **Hind Siliguri**?
- [ ] Is Light Mode using white (`#ffffff`) and Dark Mode using **`#242424`**?
- [ ] Is the default theme Light Mode?
- [ ] Are all UI texts wrapped with `t(...)` supporting both Bangla and English?
- [ ] Does the language state persist across page reloads?
- [ ] Are all icons imported exclusively from **`lucide-react`** with zero emojis or text-based icons?
- [ ] Is all image/media storage routed exclusively through **Cloudinary**?
- [ ] Is database access restricted solely to `apps/backend`?
