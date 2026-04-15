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
