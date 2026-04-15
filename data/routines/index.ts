import { pplFuerza } from './ppl-fuerza'
import type { Routine } from '@/types'

export const routines: Routine[] = [pplFuerza]

export function getRoutineBySlug(slug: string): Routine | undefined {
  return routines.find((r) => r.slug === slug)
}
