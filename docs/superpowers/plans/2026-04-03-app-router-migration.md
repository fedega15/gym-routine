# SSA Estudio — App Router Migration Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate SSA Estudio from Next.js 14 Pages Router to Next.js 15 App Router with TypeScript, Tailwind CSS, and componentized architecture.

**Architecture:** Single-page architecture split into 10 isolated components with typed data layer. One central scroll hook shared across client components. Server Components by default, client only where interactivity is needed.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, next/font/google, next/image

**Spec:** `docs/superpowers/specs/2026-04-03-app-router-migration-design.md`

---

## Chunk 1: Project Setup

### Task 1: Upgrade dependencies and add TypeScript + Tailwind

**Files:**
- Modify: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`

- [ ] **Step 1: Install Next.js 15, React 19, TypeScript, Tailwind CSS**

```bash
npm install next@latest react@latest react-dom@latest
npm install -D typescript @types/react @types/node tailwindcss @tailwindcss/postcss postcss
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `postcss.config.mjs`**

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
```

- [ ] **Step 4: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#F7F4EE', alt: '#EEEAE0' },
        text: { DEFAULT: '#18160E', muted: '#6B6860' },
        green: { DEFAULT: '#3A5740', dark: '#2D4533' },
        warm: '#B4834A',
        border: '#DDD9CE',
        white: '#FEFCF8',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tsconfig.json tailwind.config.ts postcss.config.mjs
git commit -m "chore: upgrade to Next.js 15 + React 19, add TypeScript and Tailwind CSS"
```

---

### Task 2: Create App Router skeleton and globals.css

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Modify: `next.config.js` → `next.config.ts`

- [ ] **Step 1: Create `next.config.ts`**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ssa-arquitectos.vercel.app',
        pathname: '/images/**',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 2: Create `app/globals.css`**

```css
@import 'tailwindcss';

@theme {
  --color-bg: #F7F4EE;
  --color-bg-alt: #EEEAE0;
  --color-text: #18160E;
  --color-text-muted: #6B6860;
  --color-green: #3A5740;
  --color-green-dark: #2D4533;
  --color-warm: #B4834A;
  --color-border: #DDD9CE;
  --color-white: #FEFCF8;

  --font-serif: var(--font-cormorant), serif;
  --font-sans: var(--font-dm-sans), sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-text);
  overflow-x: hidden;
}
```

- [ ] **Step 3: Create `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SSA Estudio — Santiago Semino Arquitectura',
  description:
    'Estudio de arquitectura y diseño enfocado en la sustentabilidad. Proyectos de cualquier tipología, escala y tamaño. Rosario, Argentina.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 4: Create placeholder `app/page.tsx`**

```tsx
export default function Home() {
  return <main>SSA Estudio — migrating...</main>
}
```

- [ ] **Step 5: Delete old Pages Router files and old config**

```bash
rm -rf pages/ styles/
rm next.config.js
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```

Expected: App loads at localhost:3000 with "SSA Estudio — migrating..." text on beige background with correct fonts.

- [ ] **Step 7: Commit**

```bash
git add app/ next.config.ts
git add -u
git commit -m "feat: create App Router skeleton with layout, fonts, and Tailwind globals"
```

---

## Chunk 2: Types and Data Layer

### Task 3: Create type definitions

**Files:**
- Create: `types/index.ts`

- [ ] **Step 1: Create `types/index.ts`**

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

- [ ] **Step 2: Commit**

```bash
git add types/
git commit -m "feat: add type definitions for project data"
```

---

### Task 4: Create data files

**Files:**
- Create: `data/categories.ts`
- Create: `data/projects.ts`
- Create: `data/services.ts`
- Create: `data/team.ts`

- [ ] **Step 1: Create `data/categories.ts`**

The `BASE` constant for image URLs should be defined here and re-exported.

```ts
import type { Category } from '@/types'

export const IMAGE_BASE = 'https://ssa-arquitectos.vercel.app/images/gallery'

export const categories: Category[] = [
  { image: `${IMAGE_BASE}/SSA-CABA%C3%91AS.jpg`, count: '20 proyectos', name: 'Arquitectura', description: 'Viviendas, edificios, comerciales, urbanismo y paisajismo.' },
  { image: `${IMAGE_BASE}/SSA-BAGLIETT.jpg`, count: '8 proyectos', name: 'Módulos', description: 'Estructuras habitables y transportables. Generan energía propia.' },
  { image: `${IMAGE_BASE}/05.jpg`, count: '8 proyectos', name: 'Módulos', description: 'Para locales, hoteles, viviendas u oficinas. En cualquier terreno.' },
  { image: `${IMAGE_BASE}/Mobiliario.jpg`, count: '12 proyectos', name: 'Mobiliario', description: 'Muebles sustentables y objetos de diseño junto a cada proyecto.' },
  { image: `${IMAGE_BASE}/Mobile.jpg`, count: '6 proyectos', name: 'Mobile', description: 'Motorhomes, foodtrucks, barras, DJ stands y vehículos transformados.' },
  { image: `${IMAGE_BASE}/g6.jpg`, count: '5 proyectos', name: 'Concursos', description: 'Concursos de arquitectura nacionales e internacionales.' },
]
```

- [ ] **Step 2: Create `data/projects.ts`**

```ts
import type { Project } from '@/types'
import { IMAGE_BASE } from './categories'

export const projects: Project[] = [
  { slug: 'casa-cabanas', category: 'Arquitectura', name: 'Casa Cabañas', description: 'Vivienda unifamiliar contemporánea con envolvente de madera, grandes superficies vidriadas e integración al paisaje.', image: `${IMAGE_BASE}/SSA-CABA%C3%91AS.jpg`, thumbnail: `${IMAGE_BASE}/00.jpg`, reversed: false },
  { slug: 'bagliett-modulos', category: 'Módulos', name: 'Bagliett Módulos', description: 'Conjunto de módulos habitables en altura con decks y terrazas. Transportable, autosustentable e integrado al bosque.', image: `${IMAGE_BASE}/SSA-BAGLIETT.jpg`, thumbnail: `${IMAGE_BASE}/05.jpg`, reversed: true },
  { slug: 'coleccion-terrazzo', category: 'Mobiliario', name: 'Colección Terrazzo', description: 'Línea de mesas de terrazzo sobre bases de acero negro forjado. Diseño sustentable, fabricación artesanal.', image: `${IMAGE_BASE}/Mobiliario.jpg`, thumbnail: `${IMAGE_BASE}/e1.jpg`, reversed: false },
  { slug: 'vw-motorhome', category: 'Mobile', name: 'VW Motorhome', description: 'Volkswagen T2 intervenido como motorhome de diseño. Interior a medida con materiales naturales.', image: `${IMAGE_BASE}/Mobile.jpg`, thumbnail: `${IMAGE_BASE}/g71.jpg`, reversed: true },
  { slug: 'music-art-walk', category: 'Concurso Internacional · London', name: 'The Music & Art Walk', description: 'Pabellón cultural en Hyde Park. Cubierta paramétrica en cobre y madera laminada.', image: `${IMAGE_BASE}/g6.jpg`, thumbnail: `${IMAGE_BASE}/04.jpg`, reversed: false },
]
```

- [ ] **Step 3: Create `data/services.ts`**

```ts
import type { Service } from '@/types'

export const services: Service[] = [
  { number: '01', title: 'Proyectos de Arquitectura', description: 'A medida: viviendas, edificios, comerciales, urbanismo y paisajismo. Sustentabilidad desde los primeros bocetos.' },
  { number: '02', title: 'Gestión y Dirección de Obras', description: 'Planificación, dirección y ejecución de cualquier escala. Control de calidad y coordinación diaria de contratistas.' },
  { number: '03', title: 'Diseño de Productos', description: 'Muebles y objetos con materiales sustentables. El mobiliario nace junto al proyecto, estudiando cada detalle.' },
  { number: '04', title: 'Estructuras Modulares', description: 'Módulos transportables para hoteles, viviendas y oficinas. Cualquier terreno, generan energía propia.' },
]
```

- [ ] **Step 4: Create `data/team.ts`**

```ts
import type { TeamMember } from '@/types'

export const team: TeamMember[] = [
  { name: 'Santiago Semino', role: 'Arquitecto · Fundador' },
  { name: 'Lucia S. Degano', role: 'Arquitecta' },
  { name: 'María E. Narvaez', role: 'Arquitecta' },
  { name: 'Renata Nanni', role: 'Diseño Industrial' },
  { name: 'Fernando Fola', role: 'MMO' },
  { name: 'Jeremias Nolli', role: 'MMO' },
  { name: 'Luisina Viglione', role: 'Administración' },
  { name: 'SSA Estudio', role: 'Rosario · Argentina' },
]
```

- [ ] **Step 5: Commit**

```bash
git add data/ types/
git commit -m "feat: add typed data layer for categories, projects, services, and team"
```

---

## Chunk 3: Shared Components and Hook

### Task 5: Create `useScrollAnimations` hook

**Files:**
- Create: `hooks/useScrollAnimations.ts`

- [ ] **Step 1: Create the hook**

```ts
'use client'

import { useState, useEffect, useCallback } from 'react'

interface ScrollState {
  scrollY: number
  scrollProgress: number
  isNavSolid: boolean
}

export function useScrollAnimations(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    isNavSolid: false,
  })

  const handleScroll = useCallback(() => {
    const sy = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? sy / docHeight : 0

    setState({
      scrollY: sy,
      scrollProgress: Math.min(1, Math.max(0, progress)),
      isNavSolid: sy > 60,
    })
  }, [])

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  return state
}
```

- [ ] **Step 2: Commit**

```bash
git add hooks/
git commit -m "feat: add useScrollAnimations hook with RAF-throttled scroll listener"
```

---

### Task 6: Create `RevealOnScroll` component

**Files:**
- Create: `components/RevealOnScroll.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealOnScrollProps {
  children: React.ReactNode
  delay?: number
  threshold?: number
  className?: string
}

export default function RevealOnScroll({
  children,
  delay = 0,
  threshold = 0.1,
  className = '',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-9'
      } ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/RevealOnScroll.tsx
git commit -m "feat: add RevealOnScroll component with IntersectionObserver"
```

---

### Task 7: Create `ScrollProgress` component

**Files:**
- Create: `components/ScrollProgress.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'

import { useScrollAnimations } from '@/hooks/useScrollAnimations'

export default function ScrollProgress() {
  const { scrollProgress } = useScrollAnimations()

  return (
    <div
      className="fixed top-0 left-0 h-0.5 bg-warm z-[200]"
      style={{ width: `${scrollProgress * 100}%` }}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ScrollProgress.tsx
git commit -m "feat: add ScrollProgress bar component"
```

---

### Task 8: Create `WhatsAppFloat` component

**Files:**
- Create: `components/WhatsAppFloat.tsx`

- [ ] **Step 1: Create the component**

```tsx
const WA_URL =
  'https://api.whatsapp.com/send/?phone=543415488993&text=Hola%2C+quisiera+consultar+sobre+un+proyecto&type=phone_number&app_absent=0'

export default function WhatsAppFloat() {
  return (
    <a
      className="fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center z-90 shadow-[0_4px_24px_rgba(37,211,102,0.4)] transition-transform duration-300 hover:scale-110"
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="white" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.108.548 4.09 1.508 5.814L.057 23.196a.75.75 0 00.917.917l5.382-1.451A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.94-1.346l-.354-.21-3.664.989.989-3.664-.21-.354A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" fill="white" />
      </svg>
    </a>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/WhatsAppFloat.tsx
git commit -m "feat: add WhatsAppFloat component"
```

---

## Chunk 4: Nav, Hero, About

### Task 9: Create `Nav` component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create the component**

The Nav uses the scroll hook to toggle between transparent and solid backgrounds. Contains the SSA logo SVG, nav links, and contact CTA.

```tsx
'use client'

import { useScrollAnimations } from '@/hooks/useScrollAnimations'

export default function Nav() {
  const { isNavSolid } = useScrollAnimations()

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between transition-all duration-500 ${
        isNavSolid
          ? 'bg-bg/95 backdrop-blur-lg py-4 px-14 shadow-[0_1px_0_var(--color-border)]'
          : 'py-7 px-14'
      }`}
    >
      <a href="#" className="no-underline">
        <svg viewBox="0 0 155 80" width={120} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 16L34 16L34 27L15 27L34 53L34 64L3 64L3 53L22 53L3 27Z" fill="#2A2826" />
          <path d="M45 16L76 16L76 27L57 27L76 53L76 64L45 64L45 53L64 53L45 27Z" fill="#2A2826" />
          <path d="M90 64L107 16L118 16L101 64Z" fill="#2A2826" />
          <rect x="96" y="42" width="39" height="8" fill="#2A2826" />
          <path d="M118 16L151 64L140 64L107 16Z" fill="#6DC030" />
        </svg>
      </a>
      <ul className="hidden md:flex gap-10 list-none">
        {[
          { href: '#about', label: 'Estudio' },
          { href: '#proyectos', label: 'Proyectos' },
          { href: '#servicios', label: 'Servicios' },
          { href: '#equipo', label: 'Equipo' },
        ].map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-[0.72rem] font-normal tracking-[0.14em] uppercase text-text no-underline opacity-60 transition-opacity duration-300 hover:opacity-100"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#contacto"
        className="text-[0.72rem] font-normal tracking-[0.1em] uppercase text-white bg-green no-underline py-2.5 px-6 rounded-sm transition-colors duration-300 hover:bg-green-dark"
      >
        Contacto
      </a>
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: add Nav component with scroll-based solid state"
```

---

### Task 10: Create `Hero` component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create the component**

Client component with parallax effect on the hero image. Uses `next/image` with `priority` for LCP optimization.

```tsx
'use client'

import Image from 'next/image'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'
import { IMAGE_BASE } from '@/data/categories'

export default function Hero() {
  const { scrollY } = useScrollAnimations()
  const parallaxY = scrollY < (typeof window !== 'undefined' ? window.innerHeight : 1000)
    ? scrollY * 0.12
    : 0

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-[52%_48%]" id="inicio">
      <div className="flex flex-col justify-end px-8 pt-28 pb-16 md:px-16 md:pt-36 md:pb-20 md:pr-16">
        <p className="text-[0.68rem] tracking-[0.22em] uppercase text-warm font-light mb-7">
          Rosario · Argentina · Desde 2013
        </p>
        <h1 className="font-serif text-[clamp(3.8rem,5.5vw,6.5rem)] font-light leading-[0.95] tracking-tight text-text mb-10">
          Diseño<br />que <em className="italic text-green">habita</em><br />el futuro
        </h1>
        <p className="text-sm font-light leading-relaxed text-text-muted max-w-[360px] mb-12">
          Estudio de arquitectura y diseño con foco en sustentabilidad. Proyectos de cualquier tipología, escala y tamaño.
        </p>
        <div className="flex gap-7 items-center mb-16">
          <a
            href="#proyectos"
            className="inline-flex items-center text-xs font-normal tracking-[0.12em] uppercase text-white bg-green no-underline py-4 px-8 rounded-sm transition-all duration-300 hover:bg-green-dark hover:-translate-y-px"
          >
            Ver proyectos →
          </a>
          <a
            href="#contacto"
            className="text-xs font-light tracking-[0.08em] text-text no-underline border-b border-border pb-0.5 transition-colors duration-300 hover:border-text"
          >
            Hablemos
          </a>
        </div>
        <div className="flex gap-12 pt-10 border-t border-border">
          {[
            { num: '51', lbl: 'Proyectos' },
            { num: '13', lbl: 'Años' },
            { num: '5', lbl: 'Disciplinas' },
          ].map((s) => (
            <div key={s.lbl}>
              <div className="font-serif text-[2.8rem] font-light text-text leading-none">{s.num}</div>
              <div className="text-[0.65rem] font-light tracking-[0.12em] uppercase text-text-muted mt-1">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden hidden md:block">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-bg to-transparent to-35%" />
        <div
          className="w-full h-full"
          style={{ transform: `scale(1.05) translateY(${parallaxY}px)` }}
        >
          <Image
            src={`${IMAGE_BASE}/SSA-CABA%C3%91AS.jpg`}
            alt="SSA Estudio"
            fill
            className="object-cover"
            priority
            sizes="48vw"
          />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero component with parallax and next/image"
```

---

### Task 11: Create `About` component

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Create the component**

Server component — no interactivity. Uses `RevealOnScroll` for reveal animations and `next/image`.

```tsx
import Image from 'next/image'
import RevealOnScroll from './RevealOnScroll'
import { IMAGE_BASE } from '@/data/categories'

export default function About() {
  return (
    <section className="py-28 px-8 md:px-14" id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        <div>
          <RevealOnScroll>
            <div className="w-9 h-px bg-warm mb-5" />
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[0.65rem] font-normal tracking-[0.28em] uppercase text-warm mb-3.5">
              Santiago Semino Arquitectura
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.12}>
            <blockquote className="font-serif text-[clamp(1.6rem,2.5vw,2.5rem)] font-light italic leading-snug text-text mb-8">
              &ldquo;Buscamos fusionar la arquitectura y el diseño en todas sus áreas.&rdquo;
            </blockquote>
          </RevealOnScroll>
          <RevealOnScroll delay={0.24}>
            <p className="text-sm font-light leading-relaxed text-text-muted mb-5">
              Somos un estudio multidisciplinar compuesto por arquitectos, ingenieros, interioristas y diseñadores industriales. La sustentabilidad guía cada decisión, desde el primer boceto hasta la entrega final.
            </p>
            <p className="text-sm font-light leading-relaxed text-text-muted">
              Fundado en 2013 por Santiago Semino —egresado de la UNR con posgrado en Diseño Sustentable— participamos en concursos nacionales e internacionales y fabricamos mobiliario sostenible.
            </p>
          </RevealOnScroll>
        </div>
        <RevealOnScroll delay={0.12} className="relative order-first md:order-last">
          <div className="relative h-[560px]">
            <Image
              src={`${IMAGE_BASE}/00.jpg`}
              alt="SSA Módulo"
              fill
              className="object-cover"
              loading="lazy"
              sizes="50vw"
            />
          </div>
          <div className="absolute -bottom-6 left-8 bg-white border border-border py-4 px-6">
            <strong className="block font-serif text-lg font-normal text-text mb-0.5">Santiago Semino</strong>
            <span className="text-[0.7rem] font-light tracking-[0.06em] text-text-muted">
              Arquitecto · Fundador · ssaestudio.com
            </span>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/About.tsx
git commit -m "feat: add About component with RevealOnScroll and next/image"
```

---

## Chunk 5: HorizontalScroll and FeaturedProjects

### Task 12: Create `HorizontalScroll` component

**Files:**
- Create: `components/HorizontalScroll.tsx`

- [ ] **Step 1: Create the component**

Client component — scroll-driven horizontal translation. Receives categories as props.

```tsx
'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import type { Category } from '@/types'

interface HorizontalScrollProps {
  categories: Category[]
}

export default function HorizontalScroll({ categories }: HorizontalScrollProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const maxXRef = useRef(0)

  const calcMaxX = useCallback(() => {
    if (!trackRef.current) return
    const mob = window.innerWidth < 900
    const cardW = mob ? 300 : 400
    const gap = mob ? 16 : 28
    const padX = mob ? 64 : 112
    const n = trackRef.current.children.length
    maxXRef.current = Math.max(0, n * cardW + (n - 1) * gap + padX - window.innerWidth)
  }, [])

  useEffect(() => {
    let ticking = false

    const updateHScroll = () => {
      const outer = outerRef.current
      const track = trackRef.current
      if (!outer || !track) return

      const rect = outer.getBoundingClientRect()
      const scrollable = outer.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))
      track.style.transform = `translateX(${(-progress * maxXRef.current).toFixed(1)}px)`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateHScroll)
        ticking = true
      }
    }

    calcMaxX()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', calcMaxX)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', calcMaxX)
    }
  }, [calcMaxX])

  return (
    <section id="proyectos">
      <div ref={outerRef} className="h-[380vh] relative bg-bg">
        <div className="sticky top-0 h-screen flex flex-col">
          <div className="shrink-0 flex items-end justify-between px-8 pt-12 pb-10 md:px-14 md:pt-[4.5rem]">
            <div>
              <div className="w-9 h-px bg-warm mb-3" />
              <p className="text-[0.65rem] font-normal tracking-[0.28em] uppercase text-warm mb-3.5">
                Nuestro trabajo
              </p>
              <h2 className="font-serif text-[clamp(2.2rem,3.5vw,3.8rem)] font-light leading-tight text-text">
                Cinco disciplinas,<br />
                <em className="font-serif italic">una sola visión</em>
              </h2>
            </div>
            <span className="hidden md:flex text-[0.62rem] tracking-[0.18em] uppercase text-text-muted items-center gap-3 before:content-[''] before:w-[30px] before:h-px before:bg-border before:block">
              Scrolleá para explorar
            </span>
          </div>
          <div className="flex-1 overflow-hidden flex items-stretch">
            <div
              ref={trackRef}
              className="flex gap-4 md:gap-7 px-8 pb-6 md:px-14 shrink-0 will-change-transform items-stretch"
            >
              {categories.map((c, i) => (
                <div
                  key={i}
                  className="flex-none w-[300px] md:w-[400px] relative overflow-hidden cursor-pointer group"
                >
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
                    loading="lazy"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,3,0.88)] via-[rgba(10,8,3,0.06)_55%] to-transparent flex flex-col justify-end p-9 transition-all duration-500 group-hover:from-[rgba(36,57,41,0.92)]">
                    <span className="text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.5)] mb-2">
                      {c.count}
                    </span>
                    <h3 className="font-serif text-[2.4rem] font-light text-white leading-none mb-4">
                      {c.name}
                    </h3>
                    <p className="text-[0.8rem] font-light leading-relaxed text-[rgba(255,255,255,0.72)] max-w-[280px] opacity-0 translate-y-3 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
                      {c.description}
                    </p>
                    <span className="mt-5 text-[0.68rem] tracking-[0.12em] uppercase text-[rgba(255,255,255,0.75)] flex items-center gap-2 opacity-0 transition-opacity duration-350 group-hover:opacity-100 after:content-['→'] after:text-sm">
                      Ver proyectos
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/HorizontalScroll.tsx
git commit -m "feat: add HorizontalScroll component with scroll-driven translation"
```

---

### Task 13: Create `FeaturedProjects` component

**Files:**
- Create: `components/FeaturedProjects.tsx`

- [ ] **Step 1: Create the component**

Client component — scale animation based on viewport proximity. Receives projects as props.

```tsx
'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import type { Project } from '@/types'
import RevealOnScroll from './RevealOnScroll'

interface FeaturedProjectsProps {
  projects: Project[]
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const bigRefs = useRef<(HTMLDivElement | null)[]>([])

  const updateScaleAnimations = useCallback(() => {
    const vh = window.innerHeight
    bigRefs.current.forEach((el) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const mid = r.top + r.height * 0.5
      let scale: number
      if (mid > vh * 1.1) {
        scale = 0.88
      } else if (mid < -r.height * 0.5) {
        scale = 1.0
      } else {
        const dist = Math.abs(mid - vh * 0.5)
        scale = Math.max(0.88, 1.0 - (dist / (vh * 0.7)) * 0.12)
      }
      el.style.transform = `scale(${scale.toFixed(4)})`
    })
  }, [])

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScaleAnimations()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateScaleAnimations()

    return () => window.removeEventListener('scroll', onScroll)
  }, [updateScaleAnimations])

  return (
    <section className="bg-bg-alt pt-24" id="destacados">
      <div className="text-center px-8 pb-20 md:px-14">
        <RevealOnScroll className="mx-auto">
          <div className="w-9 h-px bg-warm mx-auto mb-5" />
        </RevealOnScroll>
        <RevealOnScroll>
          <p className="text-[0.65rem] font-normal tracking-[0.28em] uppercase text-warm mb-3.5">
            Selección de obras
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.12}>
          <h2 className="font-serif text-[clamp(3.5rem,8vw,9rem)] font-light leading-[0.9] text-text mt-2">
            Proyectos<br /><em className="italic text-green">destacados</em>
          </h2>
        </RevealOnScroll>
      </div>

      {projects.map((p, i) => (
        <article key={p.slug} className={`block ${i > 0 ? 'mt-2' : ''}`} style={i === projects.length - 1 ? { paddingBottom: '4rem' } : {}}>
          <div
            ref={(el) => { bigRefs.current[i] = el }}
            className="w-full h-[50vh] md:h-[68vh] overflow-hidden relative origin-center transition-transform duration-150 ease-out"
          >
            <Image
              src={p.image}
              alt={p.name}
              fill
              className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.04]"
              loading="lazy"
              sizes="100vw"
            />
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-[42%_58%] min-h-[300px] ${p.reversed ? 'md:grid-cols-[58%_42%]' : ''}`}>
            {p.reversed ? (
              <>
                <div className="flex flex-col justify-center py-10 px-8 md:py-16 md:px-20 bg-bg-alt order-1">
                  <span className="text-[0.65rem] tracking-[0.22em] uppercase text-warm mb-5 block">{p.category}</span>
                  <h3 className="font-serif text-[clamp(2.2rem,4vw,4.5rem)] font-light text-text leading-[0.95] mb-6">{p.name}</h3>
                  <p className="text-sm font-light leading-relaxed text-text-muted max-w-[380px]">{p.description}</p>
                </div>
                <div className="overflow-hidden h-[220px] md:h-auto order-0 md:order-2">
                  <Image src={p.thumbnail} alt="" fill className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.05]" loading="lazy" sizes="42vw" />
                </div>
              </>
            ) : (
              <>
                <div className="overflow-hidden relative h-[220px] md:h-auto">
                  <Image src={p.thumbnail} alt="" fill className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.05]" loading="lazy" sizes="42vw" />
                </div>
                <div className="flex flex-col justify-center py-10 px-8 md:py-16 md:px-20 bg-bg">
                  <span className="text-[0.65rem] tracking-[0.22em] uppercase text-warm mb-5 block">{p.category}</span>
                  <h3 className="font-serif text-[clamp(2.2rem,4vw,4.5rem)] font-light text-text leading-[0.95] mb-6">{p.name}</h3>
                  <p className="text-sm font-light leading-relaxed text-text-muted max-w-[380px]">{p.description}</p>
                </div>
              </>
            )}
          </div>
        </article>
      ))}
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/FeaturedProjects.tsx
git commit -m "feat: add FeaturedProjects component with scroll-based scale animation"
```

---

## Chunk 6: Services, Team, Contact, Footer

### Task 14: Create `Services` component

**Files:**
- Create: `components/Services.tsx`

- [ ] **Step 1: Create the component**

Server component. Receives services data as props.

```tsx
import type { Service } from '@/types'
import RevealOnScroll from './RevealOnScroll'

interface ServicesProps {
  services: Service[]
}

export default function Services({ services }: ServicesProps) {
  return (
    <section className="py-28 px-8 md:px-14" id="servicios">
      <RevealOnScroll>
        <div className="w-9 h-px bg-warm mb-5" />
      </RevealOnScroll>
      <RevealOnScroll>
        <p className="text-[0.65rem] font-normal tracking-[0.28em] uppercase text-warm mb-3.5">
          Qué hacemos
        </p>
      </RevealOnScroll>
      <RevealOnScroll delay={0.12}>
        <h2 className="font-serif text-[clamp(2.2rem,3.5vw,3.8rem)] font-light leading-tight text-text">
          Servicios
        </h2>
      </RevealOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-border mt-14">
        {services.map((s, i) => (
          <RevealOnScroll key={s.number} delay={Math.min(i * 0.12, 0.24)}>
            <div
              className={`py-14 border-b border-border grid grid-cols-[52px_1fr] gap-6 items-start ${
                i % 2 === 0
                  ? 'md:pr-20 md:border-r md:border-border'
                  : 'md:pl-[4.5rem]'
              }`}
            >
              <div className="font-serif text-lg font-light text-warm mt-1">{s.number}</div>
              <div>
                <h3 className="font-serif text-[1.65rem] font-normal text-text mb-4 leading-snug">
                  {s.title}
                </h3>
                <p className="text-[0.85rem] font-light leading-relaxed text-text-muted">
                  {s.description}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Services.tsx
git commit -m "feat: add Services component"
```

---

### Task 15: Create `Team` component

**Files:**
- Create: `components/Team.tsx`

- [ ] **Step 1: Create the component**

Server component. Receives team data as props.

```tsx
import type { TeamMember } from '@/types'
import RevealOnScroll from './RevealOnScroll'

interface TeamProps {
  members: TeamMember[]
}

export default function Team({ members }: TeamProps) {
  return (
    <section className="py-28 px-8 md:px-14 bg-bg-alt" id="equipo">
      <RevealOnScroll>
        <div className="w-9 h-px bg-warm mb-5" />
      </RevealOnScroll>
      <RevealOnScroll>
        <p className="text-[0.65rem] font-normal tracking-[0.28em] uppercase text-warm mb-3.5">
          Las personas detrás del estudio
        </p>
      </RevealOnScroll>
      <RevealOnScroll delay={0.12}>
        <h2 className="font-serif text-[clamp(2.2rem,3.5vw,3.8rem)] font-light leading-tight text-text">
          El equipo
        </h2>
      </RevealOnScroll>
      <RevealOnScroll delay={0.24}>
        <p className="text-sm font-light leading-relaxed text-text-muted max-w-[580px] mt-6">
          Arquitectos, ingenieros, interioristas y diseñadores que trabajan conjuntamente desde los primeros bocetos hasta la entrega final.
        </p>
      </RevealOnScroll>
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-border mt-14">
        {members.map((m, i) => (
          <RevealOnScroll key={m.name}>
            <div
              className={`py-8 px-6 border-b border-border ${
                i === members.length - 1 ? '' : 'border-r'
              } ${i % 4 === 3 ? 'md:border-r-0' : 'md:border-r'}`}
            >
              <div className="font-serif text-lg font-normal text-text mb-1">{m.name}</div>
              <div className="text-[0.65rem] tracking-[0.12em] uppercase text-warm">{m.role}</div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Team.tsx
git commit -m "feat: add Team component"
```

---

### Task 16: Create `Contact` component

**Files:**
- Create: `components/Contact.tsx`

- [ ] **Step 1: Create the component**

Client component — handles form submit state.

```tsx
'use client'

import { useRef } from 'react'

const WA_URL =
  'https://api.whatsapp.com/send/?phone=543415488993&text=Hola%2C+quisiera+consultar+sobre+un+proyecto&type=phone_number&app_absent=0'

export default function Contact() {
  const btnRef = useRef<HTMLButtonElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const btn = btnRef.current
    if (!btn) return
    btn.textContent = '✓ Enviado — te contactamos pronto'
    btn.style.background = '#25D366'
    btn.style.color = '#fff'
    btn.disabled = true
    setTimeout(() => {
      btn.textContent = 'Enviar consulta →'
      btn.style.background = ''
      btn.style.color = ''
      btn.disabled = false
      ;(e.target as HTMLFormElement).reset()
    }, 4000)
  }

  const inputClasses =
    'bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.14)] text-white py-3.5 px-4 font-sans text-sm font-light outline-none rounded-sm transition-all duration-300 focus:border-[rgba(255,255,255,0.4)] focus:bg-[rgba(255,255,255,0.1)] placeholder:text-[rgba(255,255,255,0.25)] appearance-none'

  return (
    <section className="py-28 px-8 md:px-14 bg-green" id="contacto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-28 items-start">
        <div>
          <div className="w-9 h-px bg-[rgba(255,255,255,0.3)] mb-5" />
          <p className="text-[0.65rem] font-normal tracking-[0.28em] uppercase text-[rgba(255,255,255,0.45)] mb-3.5">
            Hablemos
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,3.5vw,4.5rem)] font-light leading-tight text-white mb-7">
            ¿Tenés un proyecto en mente?
          </h2>
          <p className="text-sm font-light leading-relaxed text-[rgba(255,255,255,0.65)] mb-10 max-w-[400px]">
            Nos encanta escuchar nuevas ideas. Contanos sobre tu proyecto y encontremos la mejor solución de diseño.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[0.8rem] font-normal tracking-[0.1em] uppercase text-green bg-white no-underline py-4 px-8 rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.108.548 4.09 1.508 5.814L.057 23.196a.75.75 0 00.917.917l5.382-1.451A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.94-1.346l-.354-.21-3.664.989.989-3.664-.21-.354A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" fill="#25D366" />
            </svg>
            Escribinos por WhatsApp
          </a>
          <div className="mt-10 pt-10 border-t border-[rgba(255,255,255,0.12)]">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.4)] mb-2">Email directo</p>
            <a href="mailto:santiagosemino@ssaestudio.com" className="text-[rgba(255,255,255,0.75)] no-underline text-sm font-light transition-colors duration-300 hover:text-white">
              santiagosemino@ssaestudio.com
            </a>
          </div>
          <div className="mt-10 pt-10 border-t border-[rgba(255,255,255,0.12)]">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.4)] mb-2">Instagram</p>
            <a href="https://instagram.com/santiagosemino" target="_blank" rel="noopener noreferrer" className="text-[rgba(255,255,255,0.75)] no-underline text-sm font-light transition-colors duration-300 hover:text-white">
              @santiagosemino
            </a>
          </div>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.45)]">Nombre</label>
              <input type="text" placeholder="Tu nombre" required className={inputClasses} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.45)]">Teléfono</label>
              <input type="tel" placeholder="+54 341 000 0000" className={inputClasses} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.45)]">Email</label>
            <input type="email" placeholder="tu@email.com" required className={inputClasses} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.45)]">Servicio de interés</label>
            <select className={inputClasses}>
              <option value="">Seleccioná una opción</option>
              <option>Proyectos de Arquitectura</option>
              <option>Gestión y Dirección de Obras</option>
              <option>Módulos Habitables</option>
              <option>Mobiliario y Diseño</option>
              <option>Mobile</option>
              <option>Concursos</option>
              <option>Consulta general</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.45)]">Mensaje</label>
            <textarea placeholder="Contanos sobre tu proyecto..." className={`${inputClasses} resize-y min-h-[110px]`} />
          </div>
          <button
            ref={btnRef}
            type="submit"
            className="self-start font-sans text-xs font-normal tracking-[0.12em] uppercase text-green bg-white border-none py-4 px-8 rounded-sm cursor-pointer transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
          >
            Enviar consulta →
          </button>
        </form>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Contact.tsx
git commit -m "feat: add Contact component with form state management"
```

---

### Task 17: Create `Footer` component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create the component**

Server component.

```tsx
export default function Footer() {
  return (
    <footer className="bg-[#110F08] py-10 px-8 md:px-14 flex flex-col md:flex-row items-center justify-between gap-4">
      <svg viewBox="0 0 155 80" width={90} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 16L34 16L34 27L15 27L34 53L34 64L3 64L3 53L22 53L3 27Z" fill="rgba(255,255,255,0.3)" />
        <path d="M45 16L76 16L76 27L57 27L76 53L76 64L45 64L45 53L64 53L45 27Z" fill="rgba(255,255,255,0.3)" />
        <path d="M90 64L107 16L118 16L101 64Z" fill="rgba(255,255,255,0.3)" />
        <rect x="96" y="42" width="39" height="8" fill="rgba(255,255,255,0.3)" />
        <path d="M118 16L151 64L140 64L107 16Z" fill="rgba(100,180,50,0.5)" />
      </svg>
      <p className="text-[0.72rem] font-light text-[rgba(255,255,255,0.35)]">
        © 2025 SSA Estudio · Santiago Semino Arquitectura · Rosario, Argentina
      </p>
      <ul className="flex gap-9 list-none">
        {[
          { href: 'https://instagram.com/santiagosemino', label: 'Instagram' },
          { href: 'mailto:santiagosemino@ssaestudio.com', label: 'Email' },
          { href: 'https://api.whatsapp.com/send/?phone=543415488993', label: 'WhatsApp' },
        ].map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-[0.65rem] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.35)] no-underline transition-colors duration-300 hover:text-[rgba(255,255,255,0.8)]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Chunk 7: Wire Everything Together

### Task 18: Compose all sections in `page.tsx` and update `layout.tsx`

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update `app/layout.tsx`** to include Nav, Footer, WhatsAppFloat, ScrollProgress

```tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import ScrollProgress from '@/components/ScrollProgress'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SSA Estudio — Santiago Semino Arquitectura',
  description:
    'Estudio de arquitectura y diseño enfocado en la sustentabilidad. Proyectos de cualquier tipología, escala y tamaño. Rosario, Argentina.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <ScrollProgress />
        <WhatsAppFloat />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Update `app/page.tsx`** to compose all sections with data

```tsx
import Hero from '@/components/Hero'
import About from '@/components/About'
import HorizontalScroll from '@/components/HorizontalScroll'
import FeaturedProjects from '@/components/FeaturedProjects'
import Services from '@/components/Services'
import Team from '@/components/Team'
import Contact from '@/components/Contact'
import { categories } from '@/data/categories'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { team } from '@/data/team'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <HorizontalScroll categories={categories} />
      <FeaturedProjects projects={projects} />
      <Services services={services} />
      <Team members={team} />
      <Contact />
    </>
  )
}
```

- [ ] **Step 3: Verify dev server**

```bash
npm run dev
```

Expected: Full site loads at localhost:3000 with all sections, animations, parallax, horizontal scroll, and form working identically to the original.

- [ ] **Step 4: Commit**

```bash
git add app/
git commit -m "feat: wire all sections together in App Router layout and page"
```

---

### Task 19: Visual QA and final cleanup

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: No TypeScript errors, no build warnings. Build succeeds.

- [ ] **Step 2: Run production server**

```bash
npm run start
```

Expected: Site loads at localhost:3000 identically to dev mode.

- [ ] **Step 3: Visual comparison** — scroll through every section and verify:
  - Nav transitions from transparent to solid on scroll
  - Progress bar tracks scroll position
  - Hero parallax works
  - Horizontal scroll translates on scroll
  - Featured projects scale on scroll proximity
  - RevealOnScroll animations trigger on all sections
  - Contact form submit/reset cycle works
  - WhatsApp float button visible and clickable
  - Mobile responsive (resize to <900px)

- [ ] **Step 4: Delete any remaining old files** if not already deleted

```bash
rm -f next.config.js
```

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final cleanup after App Router migration"
```
