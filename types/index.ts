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
