# Gym Routine App — Design Spec

**Date:** 2026-04-15
**Status:** Approved

## Overview

Personal gym routine viewer built on Next.js 16 + React 19 + Tailwind 4. Displays PPL (Push/Pull/Legs) training routines with exercise illustrations, organized by day with tab navigation. No auth, no tracking (for now). Supports multiple routines.

## Data Model

```typescript
interface Exercise {
  id: string
  name: string
  target: string          // "Pecho", "Espalda", "Piernas", etc.
  sets: number
  reps: string            // "8-10", "10-15"
  rest: string            // "90s", "2min"
  image: string           // exercise illustration path
  description?: string
}

interface Day {
  id: string
  dayLabel: string        // "LUN", "MAR", etc.
  name: string            // "PUSH A", "PULL A", "LEGS"
  color: string           // accent per type
  exercises: Exercise[]
  tip?: string
}

interface Routine {
  slug: string
  name: string
  description: string
  tags: string[]
  days: Day[]
}
```

Data lives in `data/routines/ppl-fuerza.ts`. Future routines are new files in that folder.

## Pages

- `/` — Home: Hero + grid of available routines
- `/rutinas/[slug]` — Routine view with day tabs and exercise cards

## Components

### Keep (adapted):
- `Hero` — rebranded for gym
- `Nav` — simplified navbar
- `RevealOnScroll` — scroll animations
- `ScrollToTop` — scroll-to-top button
- `Footer` — generic footer

### New:
- `RoutineCard` — card on home for each routine
- `DayTabs` — day tabs (LUN–SÁB) with color per type
- `ExerciseCard` — card with illustration, name, target, sets/reps/rest
- `ExerciseGrid` — responsive grid of ExerciseCards
- `DayHeader` — day title with number and name
- `TipBar` — tip bar at end of day
- `RestDay` — rest day special view

### Delete:
- `About`, `HorizontalScroll`, `FeaturedProjects`, `Services`, `Team`, `Contact`, `WhatsAppFloat`, `UrloLogo`
- All `components/project/*`
- Data: `projects.ts`, `projectDetails.ts`, `categories.ts`, `services.ts`, `team.ts`

## Images

Illustration-style or real photos (royalty-free) for each of the ~23 unique exercises. Stored in `public/images/exercises/`.

### Exercise list:
**Push:** Flat DB Bench Press, Incline DB Press, Smith Machine Bench, Seated DB Overhead Press, Seated Lateral Raise, DB Pullover, Seated Front Press, Bent Over Rear Delt Fly

**Pull:** Standard Grip Lat Pulldown, Wide Grip Lat Pulldown, Reverse Grip Pulldown, Seated Cable Row, Incline DB Curl, Hammer Curl, Seated Row Close Grip, Concentration Curl

**Legs:** Barbell Squat, Leg Press, Romanian Deadlift, Lying Leg Curl, Standing Calf Raise

## Visual Style

- **Theme:** Dark (#0d0d0d bg, #181818 cards) with orange accent (#e05020)
- **Day colors:** Push red (#e03030), Pull blue (#2090e0), Legs green (#20c050), Rest gray (#666)
- **Typography:** Bebas Neue (headings) + Barlow (body)
- **Cards:** Image top (185px), badge with number, target muscle tag, sets/reps/rest pills
- **Responsive:** 3-col desktop → 1-col mobile grid
- **Animations:** RevealOnScroll on exercise cards

## Layout

Single page with tabs (Option A from brainstorm). Each routine page has:
1. Day tabs at top (LUN–SÁB)
2. Day header with number and title
3. Exercise cards grid
4. Tip bar at bottom
5. Rest day has special centered view

## Future Considerations

- Progress tracking (weight, reps, RPE per session) — structure supports it via localStorage
- Multiple routines — data structure already supports it
- No auth needed — personal use only
