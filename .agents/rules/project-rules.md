# Project Rules: Frameworks, Styling, Fonts, Themes, Icons, Media & Languages

---

## 1. Approved Frameworks & Libraries
- **Frontend**: Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui, React Hook Form, Zod, Tiptap, `lucide-react`.
- **Backend**: Node.js, Express.js, TypeScript, PostgreSQL, Prisma ORM, JWT, Cloudinary.
- **Admin**: Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui, `lucide-react`.
- **Strictly Forbidden**: No custom CSS files/modules, Bootstrap, Material UI, Styled Components, Axios, or direct database imports outside `apps/backend`.

## 2. 100% Pure Tailwind CSS Only
- Absolutely NO custom `.css` or `.module.css` files.
- Absolutely NO inline `style={{ ... }}` objects.
- All layouts, cards, typography, animations, and transitions must use Tailwind utility classes.
- `src/app/globals.css` only holds `@tailwind base; @tailwind components; @tailwind utilities;` and HSL CSS theme tokens.

## 3. Typography Rules
- **English Font**: `Outfit` (loaded via next/font/google, variable `--font-outfit`).
- **Bengali Font**: `Hind Siliguri` (loaded via next/font/google, variable `--font-hind-siliguri`).
- Font family fallback: `var(--font-outfit), var(--font-hind-siliguri), system-ui, sans-serif`.
- Tailwind utility classes: `font-sans` (default auto fallback), `font-outfit`, `font-bengali`.

## 4. Theme & Color System
- **Default Theme**: **Light Mode (White `#ffffff`)** with `#242424` text.
- **Dark Mode**: **Base `#242424`** with `#ffffff` text, `#2b2b2b` cards, `#3d3d3d` borders.
- Never use unapproved random dark colors like `#0f172a`, `#111827`, `#000000`.

## 5. Iconography Rules: Lucide React Only (No Text Icons or Emojis)
- **Official Icon Library**: **`lucide-react`** exclusively.
- **Strict Prohibition**: Absolutely **NO emojis** (☀️, 🌙, 📖, ❤️, 🔍) or text symbols used as UI icons.
- Every icon must be imported from `lucide-react` and styled with Tailwind classes (e.g. `<Search className="w-4 h-4 text-muted-foreground" />`).

## 6. Media Database & File Storage: Cloudinary Only
- All story covers, chapter images, author avatars, and banners must be hosted on **Cloudinary**.
- Direct uploads must be authorized via backend-signed upload parameters (`/api/v1/uploads/signature`).
- Never store raw image files on the local disk or in the database.

## 7. Bilingual System (i18n)
- Two languages: **Bangla (`bn` - Default)** and **English (`en`)**.
- Zero hardcoded text: Every UI string must use `t('namespace.key')`.
- Persistent: Language choice is saved in `localStorage` and `cookie` (`bengali_story_locale`) and stays consistent across all page navigations.
