# SSA Estudio — App Router Migration Design

## Overview

Migrate the SSA Estudio website from Next.js 14 Pages Router to Next.js 15 App Router with TypeScript, Tailwind CSS, and a componentized architecture ready for scaling.

The site must look and behave exactly as it does today.

## Stack

- Next.js 15 (App Router, React 19, Turbopack)
- TypeScript
- Tailwind CSS (replacing vanilla CSS)
- `next/font/google` (replacing `<link>` in `_document`)
- `next/image` with `remotePatterns`

## File Structure

```
ssa-next/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata, nav, footer)
│   ├── page.tsx            # Home — composes all sections
│   └── globals.css         # Tailwind directives + body/html base styles
├── components/
│   ├── Nav.tsx             # Navbar with scroll-based solid state (client)
│   ├── Hero.tsx            # Hero section with parallax (client)
│   ├── About.tsx           # About section (server)
│   ├── HorizontalScroll.tsx # Category cards with horizontal scroll (client)
│   ├── FeaturedProjects.tsx # Featured projects with scale animation (client)
│   ├── Services.tsx        # Services grid (server)
│   ├── Team.tsx            # Team grid (server)
│   ├── Contact.tsx         # Contact section with form (client)
│   ├── Footer.tsx          # Footer (server)
│   ├── WhatsAppFloat.tsx   # Floating WhatsApp button (server)
│   ├── ScrollProgress.tsx  # Top progress bar (client)
│   └── RevealOnScroll.tsx  # Reusable reveal wrapper with IntersectionObserver (client)
├── hooks/
│   └── useScrollAnimations.ts  # Central hook: one RAF listener, exposes scrollY, scrollProgress, isNavSolid
├── data/
│   ├── projects.ts         # Typed array of featured projects
│   ├── categories.ts       # Horizontal scroll categories
│   ├── services.ts         # Services list
│   └── team.ts             # Team members
├── types/
│   └── index.ts            # Project, Category, Service, TeamMember interfaces
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## Types

```ts
export interface Project {
  slug: string
  name: string
  category: string
  description: string
  image: string
  thumbnail: string
  reversed: boolean
}

export interface Category {
  name: string
  image: string
  count: string
  description: string
}

export interface Service {
  number: string
  title: string
  description: string
}

export interface TeamMember {
  name: string
  role: string
}
```

## Component Architecture

### Server Components (no JS shipped to client)

- `layout.tsx` — loads fonts via `next/font/google`, sets metadata, renders Nav, Footer, WhatsAppFloat
- `page.tsx` — imports data from `data/*.ts`, passes as props to section components
- `About.tsx`, `Services.tsx`, `Team.tsx`, `Footer.tsx`, `WhatsAppFloat.tsx` — static content, receive data as props

### Client Components (`"use client"`)

- `Nav.tsx` — listens to scroll for `solid` class toggle
- `Hero.tsx` — parallax on hero image
- `ScrollProgress.tsx` — top progress bar
- `HorizontalScroll.tsx` — translateX based on scroll position
- `FeaturedProjects.tsx` — scale animation based on viewport proximity
- `Contact.tsx` — form with submit state management
- `RevealOnScroll.tsx` — generic wrapper, IntersectionObserver, one-shot reveal

### Hook: `useScrollAnimations`

- Registers a single `scroll` listener with `requestAnimationFrame`
- Exposes: `scrollY`, `scrollProgress` (0-1), `isNavSolid`
- Each client component consumes it and calculates its own animation
- One RAF, zero listener duplication

### RevealOnScroll

- Props: `delay` (seconds), `threshold` (default 0.1), `className` (passthrough), `children`
- Applies `opacity-0 translate-y-9` to `opacity-100 translate-y-0` with CSS transition
- One-shot: once visible, stays visible
- Each instance creates its own IntersectionObserver entry

## Tailwind Configuration

```ts
// tailwind.config.ts
colors: {
  bg:     { DEFAULT: '#F7F4EE', alt: '#EEEAE0' },
  text:   { DEFAULT: '#18160E', muted: '#6B6860' },
  green:  { DEFAULT: '#3A5740', dark: '#2D4533' },
  warm:   '#B4834A',
  border: '#DDD9CE',
  white:  '#FEFCF8',
},
fontFamily: {
  serif: ['Cormorant Garamond', 'serif'],
  sans:  ['DM Sans', 'sans-serif'],
}
```

Fonts loaded via `next/font/google` in `layout.tsx` — no render-blocking `<link>` tags.

## Image Strategy

- All images use `next/image` with `remotePatterns` for `ssa-arquitectos.vercel.app`
- Hero image: `priority={true}`, `sizes="48vw"`
- Horizontal scroll cards: `loading="lazy"`, `sizes="400px"`
- Featured projects big image: `loading="lazy"`, `sizes="100vw"`
- Featured projects thumbnail: `loading="lazy"`, `sizes="42vw"`
- About image: `loading="lazy"`, `sizes="50vw"`
- All use `fill` + `object-cover` within Tailwind-dimensioned containers

## Data Flow

```
data/*.ts (typed constants) → page.tsx (import) → props → components
```

Adding a project = adding an object to the array in `data/projects.ts`. Zero component changes.

## Migration Notes

- Delete `pages/` directory after migration
- Delete `styles/globals.css` (replaced by `app/globals.css` with Tailwind)
- `next.config.js` becomes `next.config.ts`
- `_document.js` and `_app.js` replaced by `app/layout.tsx`
