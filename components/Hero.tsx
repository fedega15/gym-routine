'use client'

import Image from 'next/image'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'


export default function Hero() {
  const { scrollY } = useScrollAnimations()
  const parallaxY = scrollY < (typeof window !== 'undefined' ? window.innerHeight : 1000)
    ? scrollY * 0.12
    : 0

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-[52%_48%]" id="inicio">
      <div className="flex flex-col justify-end px-8 pt-28 pb-16 md:px-16 md:pt-36 md:pb-20 md:pr-16">
        <p className="text-[0.68rem] tracking-[0.22em] uppercase text-warm font-light mb-7">
          Rosario · Santa Fe · Personería Jurídica N° 1581/24
        </p>
        <h1 className="font-serif text-[clamp(3.2rem,5.5vw,6rem)] font-light leading-[0.95] tracking-tight text-text mb-10">
          Fitoterapia<br />con <em className="italic text-accent">cannabis</em><br />medicinal
        </h1>
        <p className="text-sm font-light leading-relaxed text-text-muted max-w-[360px] mb-12">
          Asociación civil dedicada a la elaboración de fitopreparados artesanales, el acompañamiento a pacientes y la investigación responsable con la planta.
        </p>
        <div className="flex gap-7 items-center mb-16">
          <a
            href="#productos"
            className="inline-flex items-center text-xs font-normal tracking-[0.12em] uppercase text-white bg-accent no-underline py-4 px-8 rounded-sm transition-all duration-300 hover:bg-accent-dark hover:-translate-y-px"
          >
            Ver productos →
          </a>
          <a
            href="#contacto"
            className="text-xs font-light tracking-[0.08em] text-text no-underline border-b border-border pb-0.5 transition-colors duration-300 hover:border-text"
          >
            Consultanos
          </a>
        </div>
        <div className="flex gap-12 pt-10 border-t border-border">
          {[
            { num: '7', lbl: 'Productos' },
            { num: '745', lbl: 'Socios' },
            { num: '4', lbl: 'Líneas' },
          ].map((s) => (
            <div key={s.lbl}>
              <div className="font-serif text-[2.8rem] font-light text-text leading-none">{s.num}</div>
              <div className="text-[0.65rem] font-light tracking-[0.12em] uppercase text-text-muted mt-1">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden hidden md:block">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-bg to-transparent to-35%" />
        <div
          className="w-full h-full"
          style={{ transform: `scale(1.05) translateY(${parallaxY}px)` }}
        >
          <Image
            src="/images/hero-logo.jpg"
            alt="Cannabis del Paraná"
            fill
            className="object-cover"
            priority
            sizes="48vw"
          />
        </div>
      </div>
    </section>
  )
}
