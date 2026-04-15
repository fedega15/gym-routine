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
