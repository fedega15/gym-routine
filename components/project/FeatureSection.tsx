import RevealOnScroll from '../RevealOnScroll'
import ZoomImage from './ZoomImage'

interface FeatureSectionProps {
  title: string
  text: string
  image: string
  reversed?: boolean
  bgColor?: string
}

export default function FeatureSection({ title, text, image, reversed, bgColor = '#ffffff' }: FeatureSectionProps) {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: bgColor }}>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {reversed ? (
          <>
            <ZoomImage src={image} className="h-[300px] md:h-auto order-0" />
            <div className="flex flex-col justify-center py-14 px-8 md:px-20 order-1">
              <RevealOnScroll>
                <h2 className="font-serif text-[clamp(2rem,3.5vw,4rem)] font-light text-text leading-[0.95] mb-6">
                  {title}
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p className="text-sm font-light leading-relaxed text-text-muted max-w-[400px]">
                  {text}
                </p>
              </RevealOnScroll>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center py-14 px-8 md:px-20 order-1 md:order-0">
              <RevealOnScroll>
                <h2 className="font-serif text-[clamp(2rem,3.5vw,4rem)] font-light text-text leading-[0.95] mb-6">
                  {title}
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p className="text-sm font-light leading-relaxed text-text-muted max-w-[400px]">
                  {text}
                </p>
              </RevealOnScroll>
            </div>
            <ZoomImage src={image} className="h-[300px] md:h-auto order-0 md:order-1" />
          </>
        )}
      </div>
    </section>
  )
}
