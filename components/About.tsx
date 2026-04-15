import Image from 'next/image'
import RevealOnScroll from './RevealOnScroll'

export default function About() {
  return (
    <section className="py-14 px-8 md:py-28 md:px-14" id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        <div>
          <RevealOnScroll>
            <div className="w-9 h-px bg-warm mb-5" />
          </RevealOnScroll>
          <RevealOnScroll>
            <p className="text-[0.65rem] font-normal tracking-[0.28em] uppercase text-warm mb-3.5">
              Cannabis del Paraná
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.12}>
            <blockquote className="font-serif text-[clamp(1.6rem,2.5vw,2.5rem)] font-light italic leading-snug text-text mb-8">
              &ldquo;Salud integral no es una alternativa. Es una evolución.&rdquo;
            </blockquote>
          </RevealOnScroll>
          <RevealOnScroll delay={0.24}>
            <p className="text-sm font-light leading-relaxed text-text-muted mb-5">
              Somos una asociación civil sin fines de lucro dedicada al abordaje, uso e investigación científica del cannabis medicinal y/o terapéutico y sus derivados. Formamos nuestra asociación civil cuyo objetivo es brindar información, asesoramiento y acompañamiento integral a quienes necesitan el uso medicinal o terapéutico del cannabis.
            </p>
            <p className="text-sm font-light leading-relaxed text-text-muted">
              Trabajamos siempre respetando el medio ambiente y cumpliendo con las normativas vigentes. Con el tiempo, ampliamos nuestra línea de fitopreparados con profesionales en las áreas de medicina, derecho, cultivo y acompañamiento terapéutico.
            </p>
          </RevealOnScroll>
        </div>
        <RevealOnScroll delay={0.12} className="relative order-first md:order-last">
          <div className="relative h-[400px] md:h-[560px]">
            <Image
              src="/images/que-hacemos.jpg"
              alt="Cannabis del Paraná - Sobre nosotros"
              fill
              className="object-cover"
              loading="lazy"
              sizes="50vw"
            />
          </div>
          <div className="absolute -bottom-6 left-8 bg-white border border-border py-4 px-6">
            <strong className="block font-serif text-lg font-normal text-text mb-0.5">Cannabis del Paraná</strong>
            <span className="text-[0.7rem] font-light tracking-[0.06em] text-text-muted">
              Asociación Civil · Rosario, Santa Fe
            </span>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
