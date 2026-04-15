import RevealOnScroll from '../RevealOnScroll'
import ZoomImage from './ZoomImage'

interface AboutSectionProps {
  title: string
  paragraphs: string[]
  image: string
  bgColor?: string
}

export default function AboutSection({ title, paragraphs, image, bgColor = '#B5B5A4' }: AboutSectionProps) {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: bgColor }}>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        <div className="flex flex-col justify-center py-16 px-8 md:px-20 order-1 md:order-0">
          <RevealOnScroll>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,4rem)] font-light text-text leading-[0.95] mb-8">
              {title}
            </h2>
          </RevealOnScroll>
          {paragraphs.map((p, i) => (
            <RevealOnScroll key={i} delay={(i + 1) * 0.1}>
              <p className="text-sm font-light leading-relaxed text-text-muted mb-5 max-w-[440px]">
                {p}
              </p>
            </RevealOnScroll>
          ))}
        </div>
        <ZoomImage src={image} className="h-[350px] md:h-auto order-0 md:order-1" />
      </div>
    </section>
  )
}
