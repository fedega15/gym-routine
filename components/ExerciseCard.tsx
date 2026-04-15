import Image from 'next/image'
import type { Exercise } from '@/types'

interface ExerciseCardProps {
  exercise: Exercise
  index: number
  accentColor: string
}

export default function ExerciseCard({ exercise, index, accentColor }: ExerciseCardProps) {
  return (
    <div
      className="bg-card border border-border overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--card-accent)]"
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
