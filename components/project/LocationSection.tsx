import RevealOnScroll from '../RevealOnScroll'
import ZoomImage from './ZoomImage'

interface LocationSectionProps {
  mapImage: string
  description: string
  stats: { value: string; label: string }[]
  bgColor?: string
}

export default function LocationSection({ mapImage, description, stats, bgColor = '#3A5740' }: LocationSectionProps) {
  return (
    <section className="py-16 md:py-24 text-white" style={{ backgroundColor: bgColor }}>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[450px]">
        <ZoomImage src={mapImage} alt="Ubicación" className="h-[350px] md:h-auto" />
        <div className="flex flex-col justify-center py-14 px-8 md:px-20">
          <RevealOnScroll>
            <p className="text-base font-light leading-relaxed text-white/75 text-center max-w-[400px] mx-auto">
              {description}
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20 px-8 md:px-20 text-center">
          {stats.map((stat, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <p className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight text-white">
                {stat.value}
              </p>
              <p className="font-serif text-[clamp(1.2rem,2vw,2rem)] font-light text-white/70 mt-1">
                {stat.label}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      )}
    </section>
  )
}
