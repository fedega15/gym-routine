import RevealOnScroll from '../RevealOnScroll'
import ZoomImage from './ZoomImage'

interface TripleSectionProps {
  items: { image: string; title: string; text: string }[]
  bgColor?: string
}

export default function TripleSection({ items, bgColor = '#ffffff' }: TripleSectionProps) {
  return (
    <section className="py-16 md:py-24 px-8 md:px-20" style={{ backgroundColor: bgColor }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <RevealOnScroll key={i} delay={i * 0.1}>
            <div className="flex flex-col">
              <ZoomImage src={item.image} alt={item.title} className="h-[300px] md:h-[360px] rounded-sm mb-6" sizes="33vw" />
              <h3 className="font-serif text-xl font-light text-text mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-text-muted">
                {item.text}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
