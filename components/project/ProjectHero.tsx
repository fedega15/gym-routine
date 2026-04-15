'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import UrloLogo from '../UrloLogo'

interface ProjectHeroProps {
  heroImage: string
  name: string
  logoImage?: string
}

export default function ProjectHero({ heroImage, name, logoImage }: ProjectHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Disable parallax on mobile/touch devices — causes jank with mobile scroll behavior
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const onScroll = () => {
      const scrollY = window.scrollY
      const img = section.querySelector<HTMLImageElement>('[data-hero-img]')
      const overlay = section.querySelector<HTMLDivElement>('[data-hero-overlay]')
      if (img) img.style.transform = `translateY(${scrollY * 0.3}px) scale(1.05)`
      if (overlay) overlay.style.opacity = `${0.3 + scrollY * 0.0005}`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      <Image
        data-hero-img
        src={heroImage}
        alt={name}
        fill
        className="object-cover transition-transform duration-100 ease-out"
        priority
        sizes="100vw"
      />
      <div data-hero-overlay className="absolute inset-0 bg-black/30 transition-opacity duration-100" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
        {logoImage && (
          <Image src={logoImage} alt={name} width={280} height={120} className="mb-6 object-contain animate-[fadeInUp_1s_ease-out_0.3s_both]" priority />
        )}
        {!logoImage && (
          <>
            <UrloLogo color="#FFFFFF" width={80} className="mb-8 opacity-70 animate-[fadeInUp_1s_ease-out_0.2s_both]" />
            <h1 className="font-serif text-[clamp(3rem,8vw,7rem)] font-light text-white leading-[0.95] tracking-wide animate-[fadeInUp_1s_ease-out_0.5s_both]">
              {name}
            </h1>
          </>
        )}
      </div>
    </section>
  )
}
