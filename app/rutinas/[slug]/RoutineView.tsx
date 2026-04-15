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
