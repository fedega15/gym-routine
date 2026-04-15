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
          Arquitectos, diseñadores de interiores y directores de obra que trabajan conjuntamente desde los primeros bocetos hasta la entrega final.
        </p>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="grid grid-cols-2 md:grid-cols-3 border-t border-border mt-14">
          {members.map((m, i) => (
            <div
              key={m.name}
              className={`py-8 px-6 border-b border-border ${
                i % 2 === 0 ? 'border-r' : ''
              } ${i % 3 === 2 ? 'md:border-r-0' : 'md:border-r'}`}
            >
              <div className="font-serif text-lg font-normal text-text mb-1">{m.name}</div>
              <div className="text-[0.65rem] tracking-[0.12em] uppercase text-warm">{m.role}</div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  )
}
