'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface ParallaxSectionProps {
  images: string[]
  bgColor?: string
}

export default function ParallaxSection({ images, bgColor = '#ffffff' }: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const onScroll = () => {
      const imgs = container.querySelectorAll<HTMLDivElement>('[data-parallax]')
      imgs.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        if (rect.top < vh && rect.bottom > 0) {
          const progress = (vh - rect.top) / (vh + rect.height)
          const offset = (progress - 0.5) * 40
          const img = el.querySelector('img')
          if (img) img.style.transform = `translateY(${offset}px) scale(1.05)`
        }
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-8 md:px-20" style={{ backgroundColor: bgColor }}>
      <div className={`grid gap-6 ${images.length === 1 ? 'grid-cols-1 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
        {images.map((img, i) => (
          <div
            key={i}
            data-parallax
            className="relative h-[50vh] md:h-[65vh] overflow-hidden rounded-sm"
          >
            <Image
              src={img}
              alt=""
              fill
              className="object-cover transition-transform duration-100 ease-out"
              loading="lazy"
              sizes={images.length === 1 ? '80vw' : '50vw'}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
