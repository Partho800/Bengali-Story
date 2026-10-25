# Bengali Publishing Platform — Development & Agent Guide

This guide defines the explicit technical specifications and design boundaries for all developers and AI coding agents working on the **Bengali Story & Novel Publishing Platform**.

---

## Quick Reference Summary

| Specification | Approved Value | Strict Restrictions |
| :--- | :--- | :--- |
| **Frontend Framework** | **Next.js 14 (App Router)** + TypeScript | No Pages Router |
| **Backend Framework** | **Node.js + Express.js** + TypeScript | No Python/Go/NestJS |
| **Admin Framework** | **Next.js 14 (App Router)** + TypeScript | No external templates |
| **Database & ORM** | **PostgreSQL** + **Prisma ORM** | Single source in `apps/backend` |
| **Styling Engine** | **100% Pure Tailwind CSS Only** | **NO custom CSS, NO inline styles** |
| **English Font** | **Outfit** (`--font-outfit`) | No Roboto/Inter/Arial |
| **Bengali Font** | **Hind Siliguri** (`--font-hind-siliguri`) | No SolaimanLipi/Kalpurush |
| **Default Theme** | **Light Mode (White `#ffffff`)** | Always defaults to White |
| **Dark Mode** | **Base `#242424`** | No `#0f172a`, `#111827`, `#000000` |
| **Languages** | **Bangla (`bn` - Default)** & **English (`en`)** | Must use `t(...)`, zero hardcoded text |
| **Language Storage** | **`localStorage` + Cookie** | Must persist across all routes/refreshes |
| **Rich-Text Editor** | **Tiptap** | No Quill/TinyMCE/CKEditor |
| **Icon Library** | **`lucide-react` Only** | **NO raw emojis, NO text-based icons** |
| **Image & Media DB** | **Cloudinary Only** (Signed direct uploads) | No local uploads, no raw S3 |

---

## Cross-Referenced Files

- Universal Rules for AI Agents: [`AGENTS.md`](file:///d:/Bengali%20Story/AGENTS.md)
- Workspace Rules for IDE: [`.agents/rules/project-rules.md`](file:///d:/Bengali%20Story/.agents/rules/project-rules.md)
- Complete Development Requirements: [`docs/DEVELOPMENT_REQUIREMENTS.md`](file:///d:/Bengali%20Story/docs/DEVELOPMENT_REQUIREMENTS.md)
- Master Development Prompts: [`docs/DEVELOPMENT_PROMPTS.md`](file:///d:/Bengali%20Story/docs/DEVELOPMENT_PROMPTS.md)
  - [PROMPT 1: Backend](file:///d:/Bengali%20Story/docs/PROMPT_1_BACKEND.md)
  - [PROMPT 2: Frontend](file:///d:/Bengali%20Story/docs/PROMPT_2_FRONTEND.md)
  - [PROMPT 3: Admin](file:///d:/Bengali%20Story/docs/PROMPT_3_ADMIN.md)
