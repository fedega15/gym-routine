import type { Service } from '@/types'
import RevealOnScroll from './RevealOnScroll'

interface ServicesProps {
  services: Service[]
}

export default function Services({ services }: ServicesProps) {
  return (
    <section className="py-28 px-8 md:px-14" id="servicios">
      <RevealOnScroll>
        <div className="w-9 h-px bg-warm mb-5" />
      </RevealOnScroll>
      <RevealOnScroll>
        <p className="text-[0.65rem] font-normal tracking-[0.28em] uppercase text-warm mb-3.5">
          Qué hacemos
        </p>
      </RevealOnScroll>
      <RevealOnScroll delay={0.12}>
        <h2 className="font-serif text-[clamp(2.2rem,3.5vw,3.8rem)] font-light leading-tight text-text">
          Servicios
        </h2>
      </RevealOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-border mt-14">
        {services.map((s, i) => (
          <RevealOnScroll key={s.number} delay={Math.min(i * 0.12, 0.24)}>
            <div
              className={`py-14 border-b border-border grid grid-cols-[52px_1fr] gap-6 items-start ${
                i % 2 === 0
                  ? 'md:pr-20 md:border-r md:border-border'
                  : 'md:pl-[4.5rem]'
              }`}
            >
              <div className="font-serif text-lg font-light text-warm mt-1">{s.number}</div>
              <div>
                <h3 className="font-serif text-[1.65rem] font-normal text-text mb-4 leading-snug">
                  {s.title}
                </h3>
                <p className="text-[0.85rem] font-light leading-relaxed text-text-muted">
                  {s.description}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
