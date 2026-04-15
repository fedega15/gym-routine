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
