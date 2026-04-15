import RevealOnScroll from '../RevealOnScroll'
import ZoomImage from './ZoomImage'

interface StorySectionProps {
  title: string
  text: string
  image: string
  reversed?: boolean
  buttonText?: string
  buttonHref?: string
  bgColor?: string
}

export default function StorySection({ title, text, image, reversed, buttonText, buttonHref, bgColor = '#ffffff' }: StorySectionProps) {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: bgColor }}>
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {reversed ? (
          <>
            <ZoomImage src={image} className="h-[350px] md:h-auto order-0" />
            <div className="flex flex-col justify-center py-16 px-8 md:px-20 order-1">
              <RevealOnScroll>
                <h2 className="font-serif text-[clamp(2.2rem,4vw,4.5rem)] font-light text-text leading-[0.95] mb-8">
                  {title}
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p className="text-sm font-light leading-relaxed text-text-muted max-w-[440px] mb-8">
                  {text}
                </p>
              </RevealOnScroll>
              {buttonText && buttonHref && (
                <RevealOnScroll delay={0.2}>
                  <a
                    href={buttonHref}
                    className="inline-block text-[0.75rem] font-normal tracking-[0.12em] uppercase text-white bg-accent py-4 px-8 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                  >
                    {buttonText}
                  </a>
                </RevealOnScroll>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center py-16 px-8 md:px-20 order-1 md:order-0">
              <RevealOnScroll>
                <h2 className="font-serif text-[clamp(2.2rem,4vw,4.5rem)] font-light text-text leading-[0.95] mb-8">
                  {title}
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <p className="text-sm font-light leading-relaxed text-text-muted max-w-[440px] mb-8">
                  {text}
                </p>
              </RevealOnScroll>
              {buttonText && buttonHref && (
                <RevealOnScroll delay={0.2}>
                  <a
                    href={buttonHref}
                    className="inline-block text-[0.75rem] font-normal tracking-[0.12em] uppercase text-white bg-accent py-4 px-8 no-underline transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                  >
                    {buttonText}
                  </a>
                </RevealOnScroll>
              )}
            </div>
            <ZoomImage src={image} className="h-[350px] md:h-auto order-0 md:order-1" />
          </>
        )}
      </div>
    </section>
  )
}
