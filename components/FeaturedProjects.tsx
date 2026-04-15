'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/types'
import RevealOnScroll from './RevealOnScroll'

interface FeaturedProjectsProps {
  projects: Project[]
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const bigRefs = useRef<(HTMLDivElement | null)[]>([])

  const updateScaleAnimations = useCallback(() => {
    const vh = window.innerHeight
    bigRefs.current.forEach((el) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const mid = r.top + r.height * 0.5
      let scale: number
      if (mid > vh * 1.1) {
        scale = 0.88
      } else if (mid < -r.height * 0.5) {
        scale = 1.0
      } else {
        const dist = Math.abs(mid - vh * 0.5)
        scale = Math.max(0.88, 1.0 - (dist / (vh * 0.7)) * 0.12)
      }
      el.style.transform = `scale(${scale.toFixed(4)})`
    })
  }, [])

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScaleAnimations()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateScaleAnimations()

    return () => window.removeEventListener('scroll', onScroll)
  }, [updateScaleAnimations])

  return (
    <section className="bg-bg-alt pt-40" id="destacados">
      <div className="text-center px-8 pb-20 md:px-14">
        <RevealOnScroll className="mx-auto">
          <div className="w-9 h-px bg-warm mx-auto mb-5" />
        </RevealOnScroll>
        <RevealOnScroll>
          <p className="text-[0.65rem] font-normal tracking-[0.28em] uppercase text-warm mb-3.5">
            Nuestras preparaciones
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.12}>
          <h2 className="font-serif text-[clamp(3.5rem,8vw,9rem)] font-light leading-[0.9] text-text mt-2">
            Productos<br /><em className="italic text-accent">destacados</em>
          </h2>
        </RevealOnScroll>
      </div>

      {projects.map((p, i) => (
        <article key={p.slug} className={`block ${i > 0 ? 'mt-32' : ''}`} style={i === projects.length - 1 ? { paddingBottom: '4rem' } : {}}>
          <div className={`grid grid-cols-1 md:grid-cols-[42%_58%] min-h-[300px] ${p.reversed ? 'md:grid-cols-[58%_42%]' : ''}`}>
            {p.reversed ? (
              <>
                <div className="flex flex-col justify-center py-10 px-8 md:py-16 md:px-20 bg-bg order-1">
                  <span className="text-[0.65rem] tracking-[0.22em] uppercase text-warm mb-5 block">{p.category}</span>
                  <h3 className="font-serif text-[clamp(2.2rem,4vw,4.5rem)] font-light text-text leading-[0.95] mb-6">{p.name}</h3>
                  <p className="text-sm font-light leading-relaxed text-text-muted max-w-[380px] mb-8">{p.description}</p>
                  <Link href={`/proyectos/${p.slug}`} className="text-[0.7rem] font-normal tracking-[0.15em] uppercase text-accent no-underline border-b border-accent pb-1 self-start transition-opacity duration-300 hover:opacity-70">
                    Ver producto →
                  </Link>
                </div>
                <div className="overflow-hidden h-[220px] md:h-auto order-0 md:order-2 relative">
                  <Image src={p.thumbnail} alt="" fill className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.05]" loading="lazy" sizes="42vw" />
                </div>
              </>
            ) : (
              <>
                <div className="overflow-hidden relative h-[220px] md:h-auto">
                  <Image src={p.thumbnail} alt="" fill className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.05]" loading="lazy" sizes="42vw" />
                </div>
                <div className="flex flex-col justify-center py-10 px-8 md:py-16 md:px-20 bg-bg">
                  <span className="text-[0.65rem] tracking-[0.22em] uppercase text-warm mb-5 block">{p.category}</span>
                  <h3 className="font-serif text-[clamp(2.2rem,4vw,4.5rem)] font-light text-text leading-[0.95] mb-6">{p.name}</h3>
                  <p className="text-sm font-light leading-relaxed text-text-muted max-w-[380px] mb-8">{p.description}</p>
                  <Link href={`/proyectos/${p.slug}`} className="text-[0.7rem] font-normal tracking-[0.15em] uppercase text-accent no-underline border-b border-accent pb-1 self-start transition-opacity duration-300 hover:opacity-70">
                    Ver producto →
                  </Link>
                </div>
              </>
            )}
          </div>
          <div
            ref={(el) => { bigRefs.current[i] = el }}
            className="w-full h-[50vh] md:h-[68vh] overflow-hidden relative origin-center transition-transform duration-150 ease-out mt-10"
          >
            <Image
              src={p.image}
              alt={p.name}
              fill
              className="object-cover transition-transform duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.04]"
              loading="lazy"
              sizes="100vw"
            />
          </div>
        </article>
      ))}
    </section>
  )
}
