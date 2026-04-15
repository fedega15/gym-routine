# Gym Routine App Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the cannabis product site into a personal gym routine viewer with PPL routine data, exercise images, and dark theme with day-tabs navigation.

**Architecture:** Hybrid approach — keep generic UI components (RevealOnScroll, ScrollToTop, ScrollProgress), create new gym-domain components (DayTabs, ExerciseCard, ExerciseGrid, etc.), delete cannabis-specific components, and replace the data layer with Routine/Day/Exercise model. Single-page tab layout per routine.

**Tech Stack:** Next.js 16, React 19, Tailwind 4, TypeScript 6

---

## Chunk 1: Foundation — Theme, Types, Data, and Cleanup

### Task 1: Update theme to dark gym aesthetic

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace globals.css with dark gym theme**

Replace the entire content of `app/globals.css`:

```css
@import 'tailwindcss';

@theme {
  --color-bg: #0d0d0d;
  --color-bg-alt: #111111;
  --color-card: #181818;
  --color-text: #efefef;
  --color-text-muted: #666666;
  --color-accent: #e05020;
  --color-accent-dark: #c04018;
  --color-border: #242424;
  --color-white: #ffffff;

  --color-push: #e03030;
  --color-pull: #2090e0;
  --color-legs: #20c050;
  --color-rest: #666666;

  --font-heading: 'Bebas Neue', sans-serif;
  --font-body: 'Barlow', sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  font-weight: 300;
  background-color: var(--color-bg);
  color: var(--color-text);
  overflow-x: hidden;
  min-height: 100vh;
}

/* Scrollbar */
::-webkit-scrollbar { height: 3px; width: 3px; }
::-webkit-scrollbar-track { background: #111; }
::-webkit-scrollbar-thumb { background: #333; }
```

- [ ] **Step 2: Update tailwind.config.ts**

Replace the entire content:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0d0d0d', alt: '#111111' },
        card: '#181818',
        text: { DEFAULT: '#efefef', muted: '#666666' },
        accent: { DEFAULT: '#e05020', dark: '#c04018' },
        border: '#242424',
        white: '#ffffff',
        push: '#e03030',
        pull: '#2090e0',
        legs: '#20c050',
        rest: '#666666',
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Barlow"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 3: Update layout.tsx — fonts, metadata, remove cannabis components**

Replace `app/layout.tsx` with:
- Import Bebas Neue + Barlow from `next/font/google`
- Update metadata to "Gym Routine — PPL Fuerza & Volumen"
- Remove WhatsAppFloat import
- Keep Nav, Footer, ScrollProgress
- Update html lang and font variables

```typescript
import type { Metadata } from 'next'
import { Bebas_Neue, Barlow } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import './globals.css'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-barlow',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gym Routine — PPL Fuerza & Volumen',
  description: 'Rutina de entrenamiento PPL (Push/Pull/Legs) para fuerza y volumen. 5 días activos con progresión semanal.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${barlow.variable}`}>
      <body>
        <ScrollProgress />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add app/globals.css tailwind.config.ts app/layout.tsx
git commit -m "feat: update theme to dark gym aesthetic with Bebas Neue + Barlow"
```

### Task 2: Define types and routine data

**Files:**
- Rewrite: `types/index.ts`
- Create: `data/routines/ppl-fuerza.ts`
- Create: `data/routines/index.ts`

- [ ] **Step 1: Replace types/index.ts**

```typescript
export interface Exercise {
  id: string
  name: string
  target: string
  sets: number
  reps: string
  rest: string
  image: string
  description?: string
}

export interface Day {
  id: string
  dayLabel: string
  name: string
  color: string
  exercises: Exercise[]
  tip?: string
}

export interface Routine {
  slug: string
  name: string
  description: string
  tags: string[]
  days: Day[]
}
```

- [ ] **Step 2: Create data/routines/ppl-fuerza.ts**

Full routine data extracted from the HTML. All 5 active days + rest day. Each exercise has: id, name, target, sets, reps, rest, image (placeholder path for now), description.

```typescript
import type { Routine } from '@/types'

export const pplFuerza: Routine = {
  slug: 'ppl-fuerza',
  name: 'PPL Fuerza & Volumen',
  description: 'Push · Pull · Legs — 5 días activos con progresión semanal +2.5kg',
  tags: ['20 ejercicios', '4 sets / ejercicio', '8–15 reps', 'Progresión semanal', '+2.5kg cada semana'],
  days: [
    {
      id: 'push-a',
      dayLabel: 'LUN',
      name: 'PUSH A',
      color: '#e03030',
      tip: 'Protocolo: Calentamiento 5 min + 2 series de activación ligeras antes de press. Tempo 3-0-1 en todos los ejercicios.',
      exercises: [
        { id: 'flat-db-bench', name: 'Flat DB Bench Press', target: 'PECHO TOTAL', sets: 4, reps: '8-10', rest: '90s', image: '/images/exercises/flat-db-bench-press.jpg', description: 'Principal de pecho. Bajá lento 3 seg, explosivo al subir. Rango completo.' },
        { id: 'incline-db-press', name: 'Incline DB Press', target: 'PECHO SUPERIOR', sets: 4, reps: '10-12', rest: '75s', image: '/images/exercises/incline-db-press.jpg', description: 'Banco 30°. Clave para el pecho alto. Codos a 75°, no abiertos.' },
        { id: 'smith-bench', name: 'Smith Machine Bench', target: 'PECHO TOTAL', sets: 3, reps: '10-12', rest: '60s', image: '/images/exercises/smith-machine-bench.jpg', description: 'Prensa con guía para mayor estabilidad. Ideal para maximizar el peso.' },
        { id: 'seated-db-ohp', name: 'Seated DB Overhead Press', target: 'FRONT+LAT DELTS', sets: 4, reps: '10-12', rest: '75s', image: '/images/exercises/seated-db-overhead-press.jpg', description: 'Base del hombro. Sentado para aislar. No bloquear codos arriba.' },
        { id: 'seated-lateral-raise', name: 'Seated Lateral Raise', target: 'LATERAL DELTS', sets: 4, reps: '12-15', rest: '45s', image: '/images/exercises/seated-lateral-raise.jpg', description: 'Codo ligeramente doblado, pulgar abajo. No superar el nivel del hombro.' },
        { id: 'db-pullover', name: 'DB Pullover', target: 'PECHO INFERIOR', sets: 3, reps: '12-15', rest: '60s', image: '/images/exercises/db-pullover.jpg', description: 'Finalización. Banco transversal. Estira al máximo la línea inferior.' },
      ],
    },
    {
      id: 'pull-a',
      dayLabel: 'MAR',
      name: 'PULL A',
      color: '#2090e0',
      tip: 'Protocolo: Cada jalón empieza con la retracción escapular. Si no sentís la espalda, bajá el peso.',
      exercises: [
        { id: 'std-lat-pulldown', name: 'Standard Grip Lat Pulldown', target: 'LATS OVERALL', sets: 4, reps: '10-12', rest: '75s', image: '/images/exercises/lat-pulldown.jpg', description: 'Agarre ancho al hombro. El más completo. Llevá la barra al pecho alto.' },
        { id: 'wide-lat-pulldown', name: 'Wide Grip Lat Pulldown', target: 'UPPER LATS', sets: 3, reps: '10-12', rest: '60s', image: '/images/exercises/wide-grip-lat-pulldown.jpg', description: 'Amplitud de espalda. Agarre más abierto. Imagina empujar los codos al piso.' },
        { id: 'reverse-grip-pulldown', name: 'Reverse Grip Pulldown', target: 'LOWER LATS', sets: 3, reps: '10-12', rest: '60s', image: '/images/exercises/reverse-grip-pulldown.jpg', description: 'Empuñadura supina. Trabaja lats inferiores + bíceps. Gran compuesto.' },
        { id: 'seated-cable-row', name: 'Seated Cable Row', target: 'LATS / GROSOR', sets: 4, reps: '10-12', rest: '75s', image: '/images/exercises/seated-cable-row.jpg', description: 'Agarre neutro o cerrado. Apretá omóplatos al llegar al pecho. Grosor clave.' },
        { id: 'incline-db-curl', name: 'Incline DB Curl', target: 'LONG HEAD', sets: 4, reps: '10-12', rest: '60s', image: '/images/exercises/incline-db-curl.jpg', description: 'Banco inclinado. Brazo colgando atrás. Máximo estiramiento del bíceps.' },
        { id: 'hammer-curl', name: 'Hammer Curl', target: 'BRACHIALIS', sets: 3, reps: '12-15', rest: '45s', image: '/images/exercises/hammer-curl.jpg', description: 'Agarre neutro. Trabaja el braquial — empuja el bíceps hacia arriba.' },
      ],
    },
    {
      id: 'legs',
      dayLabel: 'MIÉ',
      name: 'LEGS',
      color: '#20c050',
      tip: 'Protocolo: Warm-up obligatorio — 5 min bike + 2 series de sentadilla vacía. Nunca arrancar pesado en piernas.',
      exercises: [
        { id: 'barbell-squat', name: 'Barbell Squat', target: 'CUÁDRICEPS', sets: 4, reps: '6-8', rest: '2min', image: '/images/exercises/barbell-squat.jpg', description: 'Rey de las piernas. Profundidad mínima paralelo. Espalda recta, rodillas hacia afuera.' },
        { id: 'leg-press', name: 'Leg Press', target: 'CUÁD + GLÚTEOS', sets: 4, reps: '10-12', rest: '90s', image: '/images/exercises/leg-press.jpg', description: 'Pies altos = más glúteos. Pies bajos = más cuádriceps. Rango completo.' },
        { id: 'romanian-deadlift', name: 'Romanian Deadlift', target: 'ISQUIOS + GLÚT', sets: 4, reps: '10-12', rest: '90s', image: '/images/exercises/romanian-deadlift.jpg', description: 'Caderas atrás, espalda recta. El estiramiento en isquios es el objetivo.' },
        { id: 'lying-leg-curl', name: 'Lying Leg Curl', target: 'ISQUIOTIBIALES', sets: 3, reps: '12-15', rest: '60s', image: '/images/exercises/lying-leg-curl.jpg', description: 'Finalización de isquios. Contraé fuerte arriba, bajá lento (3 seg).' },
        { id: 'standing-calf-raise', name: 'Standing Calf Raise', target: 'GEMELOS', sets: 4, reps: '15-20', rest: '45s', image: '/images/exercises/standing-calf-raise.jpg', description: 'Rango completo. Abajo = estiramiento máximo. Arriba = contracción 1 seg.' },
      ],
    },
    {
      id: 'push-b',
      dayLabel: 'JUE',
      name: 'PUSH B',
      color: '#d06010',
      tip: 'Protocolo: Día enfocado en hombros. Más volumen en laterales. Drop set en el último set de laterales.',
      exercises: [
        { id: 'seated-db-ohp-b', name: 'Seated DB Overhead Press', target: 'FRONT+LAT DELTS', sets: 4, reps: '8-10', rest: '90s', image: '/images/exercises/seated-db-overhead-press.jpg', description: 'Arrancar el día con empuje pesado de hombro. Construye volumen real.' },
        { id: 'seated-front-press', name: 'Seated Front Press', target: 'FRONT DELTS', sets: 3, reps: '12-15', rest: '60s', image: '/images/exercises/seated-front-press.jpg', description: 'Empuje frontal con ambas manos. Aísla el deltoides anterior.' },
        { id: 'seated-lateral-raise-b', name: 'Seated Lateral Raise', target: 'LATERAL DELTS', sets: 4, reps: '15-20', rest: '45s', image: '/images/exercises/seated-lateral-raise.jpg', description: 'Volumen alto en lateral delts. Drop set en el último set.' },
        { id: 'rear-delt-fly', name: 'Bent Over Rear Delt Fly', target: 'REAR DELTS', sets: 4, reps: '12-15', rest: '45s', image: '/images/exercises/bent-over-rear-delt-fly.jpg', description: 'Inclinado 90°. Peso ligero, forma perfecta. Equilibrio del hombro.' },
        { id: 'incline-db-press-b', name: 'Incline DB Press', target: 'PECHO SUPERIOR', sets: 3, reps: '12-15', rest: '60s', image: '/images/exercises/incline-db-press.jpg', description: 'Segundo pase al incline con menos peso, más reps. Congestión máxima.' },
      ],
    },
    {
      id: 'pull-b',
      dayLabel: 'VIE',
      name: 'PULL B',
      color: '#1050c0',
      tip: 'Protocolo: Más bíceps hoy. Foco en la conexión mente-músculo. Bajá peso si no sentís el bíceps.',
      exercises: [
        { id: 'seated-row-close', name: 'Seated Row — Close Grip', target: 'LOWER LATS', sets: 4, reps: '8-10', rest: '90s', image: '/images/exercises/seated-row-close-grip.jpg', description: 'Agarre corto, codos pegados al cuerpo. Máximo grosor inferior de espalda.' },
        { id: 'std-lat-pulldown-b', name: 'Standard Lat Pulldown', target: 'LATS OVERALL', sets: 4, reps: '10-12', rest: '75s', image: '/images/exercises/lat-pulldown.jpg', description: 'Segunda sesión de pulldown. Foco en el recorrido completo.' },
        { id: 'reverse-grip-pulldown-b', name: 'Reverse Grip Pulldown', target: 'LOWER LATS+BÍC', sets: 3, reps: '10-12', rest: '60s', image: '/images/exercises/reverse-grip-pulldown.jpg', description: 'Lats inferiores + bíceps en un solo movimiento. Muy eficiente.' },
        { id: 'incline-db-curl-b', name: 'Incline DB Curl', target: 'LONG HEAD', sets: 3, reps: '10-12', rest: '60s', image: '/images/exercises/incline-db-curl.jpg', description: 'Long head para el pico del bíceps. Posición inclinada clave.' },
        { id: 'concentration-curl', name: 'Concentration Curl', target: 'SHORT HEAD', sets: 3, reps: '12-15', rest: '45s', image: '/images/exercises/concentration-curl.jpg', description: 'Aísla el bíceps completamente. Codo apoyado en muslo, supina arriba.' },
        { id: 'hammer-curl-b', name: 'Hammer Curl', target: 'BRACHIALIS', sets: 3, reps: '12-15', rest: '45s', image: '/images/exercises/hammer-curl.jpg', description: 'Grosor total del brazo. Agarre neutro hasta el final.' },
      ],
    },
    {
      id: 'rest',
      dayLabel: 'SÁB',
      name: 'REST',
      color: '#666666',
      exercises: [],
      tip: 'Descanso activo. Caminata, stretching, foam roller. La recuperación es parte del entrenamiento.',
    },
  ],
}
```

- [ ] **Step 3: Create data/routines/index.ts**

```typescript
import { pplFuerza } from './ppl-fuerza'
import type { Routine } from '@/types'

export const routines: Routine[] = [pplFuerza]

export function getRoutineBySlug(slug: string): Routine | undefined {
  return routines.find((r) => r.slug === slug)
}
```

- [ ] **Step 4: Commit**

```bash
git add types/index.ts data/routines/
git commit -m "feat: add gym types and PPL routine data"
```

### Task 3: Delete cannabis-specific files

**Files to delete:**
- `components/About.tsx`
- `components/HorizontalScroll.tsx`
- `components/FeaturedProjects.tsx`
- `components/Services.tsx`
- `components/Team.tsx`
- `components/Contact.tsx`
- `components/WhatsAppFloat.tsx`
- `components/UrloLogo.tsx`
- `components/project/AboutSection.tsx`
- `components/project/FeatureSection.tsx`
- `components/project/GallerySection.tsx`
- `components/project/LocationSection.tsx`
- `components/project/ParallaxSection.tsx`
- `components/project/ProjectHero.tsx`
- `components/project/StorySection.tsx`
- `components/project/TripleSection.tsx`
- `components/project/ZoomImage.tsx`
- `data/projects.ts`
- `data/projectDetails.ts`
- `data/categories.ts`
- `data/services.ts`
- `data/team.ts`
- `app/proyectos/[slug]/page.tsx`
- All files in `public/images/` (cannabis product images)

- [ ] **Step 1: Delete all cannabis components, data, and images**

```bash
rm components/About.tsx components/HorizontalScroll.tsx components/FeaturedProjects.tsx \
   components/Services.tsx components/Team.tsx components/Contact.tsx \
   components/WhatsAppFloat.tsx components/UrloLogo.tsx
rm -r components/project/
rm data/projects.ts data/projectDetails.ts data/categories.ts data/services.ts data/team.ts
rm -r app/proyectos/
rm public/images/*.png public/images/*.jpeg public/images/*.jpg
```

- [ ] **Step 2: Create public/images/exercises/ directory**

```bash
mkdir -p public/images/exercises
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove cannabis-specific components, data, and images"
```

---

## Chunk 2: Components — Nav, Hero, Footer, Exercise Cards

### Task 4: Update Nav component for gym

**Files:**
- Modify: `components/Nav.tsx`

- [ ] **Step 1: Rewrite Nav.tsx**

Simplified dark navbar with gym branding. Links: Inicio, Rutinas. No UrloLogo dependency — use text logo "GR" (Gym Routine). Dark theme colors.

```typescript
'use client'

import { useState } from 'react'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/#rutinas', label: 'Rutinas' },
]

export default function Nav() {
  const { isNavSolid } = useScrollAnimations()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between transition-all duration-500 ${
          isNavSolid
            ? 'bg-bg/95 backdrop-blur-lg py-3 px-5 md:py-4 md:px-14 shadow-[0_1px_0_var(--color-border)]'
            : 'py-5 px-5 md:py-7 md:px-14'
        }`}
      >
        <a href="/" className="no-underline font-heading text-2xl tracking-widest text-accent">
          GR
        </a>

        <ul className="hidden md:flex gap-10 list-none">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.72rem] font-normal tracking-[0.14em] uppercase no-underline text-text opacity-60 transition-all duration-300 hover:opacity-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 bg-transparent border-none cursor-pointer gap-[5px]"
        >
          <span className={`block w-5 h-[1.5px] bg-text transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-text transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-text transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </nav>

      <div
        className={`fixed top-16 right-5 z-90 bg-card rounded-md shadow-lg border border-border md:hidden flex flex-col py-4 px-6 gap-4 transition-all duration-300 origin-top-right ${
          open ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
        }`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-[0.72rem] font-normal tracking-[0.18em] uppercase text-text no-underline opacity-70"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: update Nav for gym theme"
```

### Task 5: Create Hero component for gym

**Files:**
- Modify: `components/Hero.tsx`

- [ ] **Step 1: Rewrite Hero.tsx**

Dark hero matching the original HTML style — gradient background, title "RUTINA PPL FUERZA & VOLUMEN", tag chips, centered layout.

```typescript
export default function Hero() {
  return (
    <section
      className="relative overflow-hidden px-8 pt-[50px] pb-[44px] text-center border-b border-[#222]"
      style={{
        background: 'linear-gradient(160deg, #0d0d0d 0%, #1a0800 55%, #0d0d0d 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% -20%, rgba(220,80,20,0.18) 0%, transparent 65%)',
        }}
      />
      <div className="relative z-10">
        <p className="text-[10px] tracking-[5px] uppercase text-accent font-bold mb-2.5">
          Programa de entrenamiento
        </p>
        <h1 className="font-heading text-[clamp(48px,12vw,100px)] tracking-[3px] leading-[0.95] text-white">
          RUTINA <span className="text-accent">PPL</span>
          <br />
          FUERZA & VOLUMEN
        </h1>
        <p className="mt-3.5 text-[13px] text-text-muted tracking-[2px] uppercase">
          Push · Pull · Legs — 5 días activos
        </p>
        <div className="flex justify-center gap-2.5 mt-7 flex-wrap">
          {['20 ejercicios', '4 sets / ejercicio', '8–15 reps', 'Progresión semanal', '+2.5kg cada semana'].map((tag) => (
            <span
              key={tag}
              className="px-[18px] py-1.5 border border-[#333] text-[11px] tracking-[1.5px] uppercase text-text-muted bg-[#111]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: create gym Hero component"
```

### Task 6: Update Footer component

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Rewrite Footer.tsx**

```typescript
export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-7 px-8 text-center mt-15">
      <p className="text-[10px] text-[#444] tracking-[2px] uppercase">
        Gym Routine — PPL Fuerza & Volumen · {new Date().getFullYear()}
      </p>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: update Footer for gym"
```

### Task 7: Create ExerciseCard component

**Files:**
- Create: `components/ExerciseCard.tsx`

- [ ] **Step 1: Create ExerciseCard.tsx**

Card with exercise image, badge number, target tag, name, description, and sets/reps/rest pills. Matches the HTML design.

```typescript
import Image from 'next/image'
import type { Exercise } from '@/types'

interface ExerciseCardProps {
  exercise: Exercise
  index: number
  accentColor: string
}

export default function ExerciseCard({ exercise, index, accentColor }: ExerciseCardProps) {
  return (
    <div className="bg-card border border-border overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--card-accent)]"
      style={{ '--card-accent': accentColor } as React.CSSProperties}
    >
      <div className="relative">
        <Image
          src={exercise.image}
          alt={exercise.name}
          width={400}
          height={185}
          className="w-full h-[185px] object-cover block saturate-[1.1] contrast-[1.05]"
        />
        <div
          className="absolute top-2.5 left-2.5 text-black font-heading text-[20px] w-8 h-8 flex items-center justify-center"
          style={{ backgroundColor: accentColor }}
        >
          {index + 1}
        </div>
        <div
          className="absolute top-2.5 right-2.5 bg-[rgba(0,0,0,0.85)] text-[9px] font-bold tracking-[1.5px] uppercase px-2 py-[3px]"
          style={{ borderColor: accentColor, color: accentColor, borderWidth: 1, borderStyle: 'solid' }}
        >
          {exercise.target}
        </div>
      </div>
      <div className="p-3.5">
        <h3 className="font-heading text-[20px] tracking-[1px] mb-1.5">{exercise.name}</h3>
        {exercise.description && (
          <p className="text-xs text-text-muted leading-[1.55] mb-3">{exercise.description}</p>
        )}
        <div className="flex gap-[7px] flex-wrap">
          <span className="text-[10px] font-bold tracking-[1px] uppercase px-2.5 py-1 bg-[rgba(255,255,255,0.06)] border border-[#333] text-[#ddd]">
            {exercise.sets}×{exercise.reps}
          </span>
          <span className="text-[10px] font-bold tracking-[1px] uppercase px-2.5 py-1 bg-[rgba(255,255,255,0.04)] border border-[#2a2a2a] text-text-muted">
            ⏱ {exercise.rest}
          </span>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ExerciseCard.tsx
git commit -m "feat: create ExerciseCard component"
```

### Task 8: Create DayTabs, DayHeader, TipBar, RestDay, and ExerciseGrid components

**Files:**
- Create: `components/DayTabs.tsx`
- Create: `components/DayHeader.tsx`
- Create: `components/TipBar.tsx`
- Create: `components/RestDay.tsx`
- Create: `components/ExerciseGrid.tsx`

- [ ] **Step 1: Create DayTabs.tsx**

Tab navigation for days of the week.

```typescript
import type { Day } from '@/types'

interface DayTabsProps {
  days: Day[]
  activeIndex: number
  onSelect: (index: number) => void
}

export default function DayTabs({ days, activeIndex, onSelect }: DayTabsProps) {
  return (
    <nav className="flex bg-[#111] border-b border-[#222] overflow-x-auto">
      {days.map((day, i) => (
        <button
          key={day.id}
          onClick={() => onSelect(i)}
          className={`flex-1 min-w-[70px] py-3 px-1.5 bg-none border-none cursor-pointer font-body text-[10px] tracking-[1px] uppercase flex flex-col items-center gap-[3px] transition-all duration-200 border-b-[3px] ${
            i === activeIndex
              ? 'text-white border-b-current'
              : 'text-text-muted border-b-transparent hover:text-white hover:bg-[#161616]'
          }`}
          style={i === activeIndex ? { borderBottomColor: day.color } : undefined}
        >
          <span className="font-heading text-[18px] tracking-[2px] leading-none">{day.dayLabel}</span>
          <span className="text-[9px] tracking-[1px]">{day.name}</span>
        </button>
      ))}
    </nav>
  )
}
```

- [ ] **Step 2: Create DayHeader.tsx**

```typescript
interface DayHeaderProps {
  dayNumber: number
  dayLabel: string
  name: string
}

export default function DayHeader({ dayNumber, dayLabel, name }: DayHeaderProps) {
  return (
    <div className="flex items-end gap-4 mb-8 pb-4 border-b border-[#222]">
      <span className="font-heading text-[72px] text-[#1e1e1e] leading-none">{dayNumber}</span>
      <div>
        <div className="text-[10px] tracking-[3px] uppercase mb-1 font-semibold">{dayLabel}</div>
        <h2 className="font-heading text-[38px] tracking-[1px] leading-none">{name}</h2>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create TipBar.tsx**

```typescript
interface TipBarProps {
  tip: string
  color: string
}

export default function TipBar({ tip, color }: TipBarProps) {
  return (
    <div
      className="mt-6 bg-[#111] py-3.5 px-[18px] text-[12.5px] text-text-muted leading-[1.6]"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <strong style={{ color }}>📋 {tip.split(':')[0]}:</strong>{' '}
      {tip.includes(':') ? tip.split(':').slice(1).join(':').trim() : tip}
    </div>
  )
}
```

- [ ] **Step 4: Create RestDay.tsx**

```typescript
export default function RestDay() {
  return (
    <div className="text-center py-20 px-5">
      <div className="text-[56px] mb-5">🧘</div>
      <h2 className="font-heading text-[48px] tracking-[3px] mb-4">DESCANSO ACTIVO</h2>
      <p className="text-text-muted text-sm leading-[1.9] max-w-[420px] mx-auto">
        Caminata suave, stretching o foam roller.<br />
        La recuperación es parte del entrenamiento.<br />
        Dormí bien, hidratate, comé suficiente proteína.
      </p>
    </div>
  )
}
```

- [ ] **Step 5: Create ExerciseGrid.tsx**

```typescript
import type { Exercise } from '@/types'
import ExerciseCard from './ExerciseCard'
import RevealOnScroll from './RevealOnScroll'

interface ExerciseGridProps {
  exercises: Exercise[]
  accentColor: string
}

export default function ExerciseGrid({ exercises, accentColor }: ExerciseGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-3.5">
      {exercises.map((exercise, i) => (
        <RevealOnScroll key={exercise.id} delay={i * 0.08}>
          <ExerciseCard exercise={exercise} index={i} accentColor={accentColor} />
        </RevealOnScroll>
      ))}
    </div>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add components/DayTabs.tsx components/DayHeader.tsx components/TipBar.tsx components/RestDay.tsx components/ExerciseGrid.tsx
git commit -m "feat: create DayTabs, DayHeader, TipBar, RestDay, and ExerciseGrid components"
```

---

## Chunk 3: Pages, Images, and Polish

### Task 9: Create RoutineCard and update home page

**Files:**
- Create: `components/RoutineCard.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create RoutineCard.tsx**

Card shown on home page linking to a routine.

```typescript
import Link from 'next/link'
import type { Routine } from '@/types'

export default function RoutineCard({ routine }: { routine: Routine }) {
  const activeDays = routine.days.filter((d) => d.exercises.length > 0).length
  const totalExercises = routine.days.reduce((sum, d) => sum + d.exercises.length, 0)

  return (
    <Link
      href={`/rutinas/${routine.slug}`}
      className="block bg-card border border-border p-6 transition-all duration-200 hover:border-accent hover:-translate-y-0.5 no-underline"
    >
      <h3 className="font-heading text-[28px] tracking-[1px] text-white mb-2">{routine.name}</h3>
      <p className="text-xs text-text-muted mb-4">{routine.description}</p>
      <div className="flex gap-2 flex-wrap">
        <span className="text-[10px] font-bold tracking-[1px] uppercase px-2.5 py-1 bg-[rgba(255,255,255,0.06)] border border-[#333] text-[#ddd]">
          {activeDays} días
        </span>
        <span className="text-[10px] font-bold tracking-[1px] uppercase px-2.5 py-1 bg-[rgba(255,255,255,0.06)] border border-[#333] text-[#ddd]">
          {totalExercises} ejercicios
        </span>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Update app/page.tsx**

```typescript
import Hero from '@/components/Hero'
import RoutineCard from '@/components/RoutineCard'
import ScrollToTop from '@/components/ScrollToTop'
import { routines } from '@/data/routines'

export default function Home() {
  return (
    <>
      <Hero />
      <section id="rutinas" className="max-w-[1100px] mx-auto px-6 py-16">
        <h2 className="font-heading text-[32px] tracking-[2px] mb-8">RUTINAS</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
          {routines.map((routine) => (
            <RoutineCard key={routine.slug} routine={routine} />
          ))}
        </div>
      </section>
      <ScrollToTop />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/RoutineCard.tsx app/page.tsx
git commit -m "feat: create RoutineCard and update home page"
```

### Task 10: Create routine detail page

**Files:**
- Create: `app/rutinas/[slug]/page.tsx`

- [ ] **Step 1: Create the routine detail page**

Server component that loads routine by slug, renders DayTabs + ExerciseGrid in a client wrapper.

```typescript
import { notFound } from 'next/navigation'
import { getRoutineBySlug, routines } from '@/data/routines'
import RoutineView from './RoutineView'

export function generateStaticParams() {
  return routines.map((r) => ({ slug: r.slug }))
}

export default async function RoutinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const routine = getRoutineBySlug(slug)
  if (!routine) notFound()

  return <RoutineView routine={routine} />
}
```

- [ ] **Step 2: Create the client RoutineView component**

Create `app/rutinas/[slug]/RoutineView.tsx`:

```typescript
'use client'

import { useState } from 'react'
import type { Routine } from '@/types'
import DayTabs from '@/components/DayTabs'
import DayHeader from '@/components/DayHeader'
import ExerciseGrid from '@/components/ExerciseGrid'
import TipBar from '@/components/TipBar'
import RestDay from '@/components/RestDay'
import ScrollToTop from '@/components/ScrollToTop'

export default function RoutineView({ routine }: { routine: Routine }) {
  const [activeDay, setActiveDay] = useState(0)
  const day = routine.days[activeDay]

  return (
    <>
      <DayTabs days={routine.days} activeIndex={activeDay} onSelect={setActiveDay} />
      <section className="px-6 py-10 max-w-[1100px] mx-auto">
        {day.exercises.length === 0 ? (
          <RestDay />
        ) : (
          <>
            <DayHeader dayNumber={activeDay + 1} dayLabel={day.dayLabel} name={day.name} />
            <ExerciseGrid exercises={day.exercises} accentColor={day.color} />
            {day.tip && <TipBar tip={day.tip} color={day.color} />}
          </>
        )}
      </section>
      <ScrollToTop />
    </>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/rutinas/
git commit -m "feat: create routine detail page with day tabs and exercise grid"
```

### Task 11: Download exercise images

**Files:**
- Create: multiple files in `public/images/exercises/`

- [ ] **Step 1: Search and download royalty-free images for each exercise**

Use web search to find suitable exercise images from Unsplash, Pexels, or Pixabay. Download one image per unique exercise (~18 unique images since some exercises repeat across days). Save as JPG in `public/images/exercises/`.

Target filenames (matching the `image` paths in the routine data):
- `flat-db-bench-press.jpg`
- `incline-db-press.jpg`
- `smith-machine-bench.jpg`
- `seated-db-overhead-press.jpg`
- `seated-lateral-raise.jpg`
- `db-pullover.jpg`
- `lat-pulldown.jpg`
- `wide-grip-lat-pulldown.jpg`
- `reverse-grip-pulldown.jpg`
- `seated-cable-row.jpg`
- `incline-db-curl.jpg`
- `hammer-curl.jpg`
- `barbell-squat.jpg`
- `leg-press.jpg`
- `romanian-deadlift.jpg`
- `lying-leg-curl.jpg`
- `standing-calf-raise.jpg`
- `seated-front-press.jpg`
- `bent-over-rear-delt-fly.jpg`
- `seated-row-close-grip.jpg`
- `concentration-curl.jpg`

If illustration-style images cannot be found, use high-quality gym photography showing the exercise being performed.

- [ ] **Step 2: Commit**

```bash
git add public/images/exercises/
git commit -m "feat: add exercise images"
```

### Task 12: Verify and polish

- [ ] **Step 1: Run `npm run build` to check for compilation errors**

```bash
cd /Users/federicogalassi/Downloads/gym-routine && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Run `npm run dev` and visually verify**

```bash
npm run dev
```

Check:
- Home page shows Hero + Routine card
- Clicking routine card navigates to `/rutinas/ppl-fuerza`
- Day tabs work and switch content
- Exercise cards show images, names, targets, sets/reps
- Rest day (SÁB) shows special view
- Mobile responsive layout works

- [ ] **Step 3: Fix any issues found during verification**

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "fix: polish and fixes from verification"
```

- [ ] **Step 5: Push to GitHub**

```bash
git push origin master
```
