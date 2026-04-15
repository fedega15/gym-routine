'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Category } from '@/types'
import { projects } from '@/data/projects'

interface HorizontalScrollProps {
  categories: Category[]
}

export default function HorizontalScroll({ categories }: HorizontalScrollProps) {
  const outerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const maxXRef = useRef(0)

  const calcMaxX = useCallback(() => {
    if (!trackRef.current) return
    const mob = window.innerWidth < 900
    const cardW = mob ? 300 : 400
    const gap = mob ? 16 : 28
    const padX = mob ? 64 : 112
    const n = trackRef.current.children.length
    maxXRef.current = Math.max(0, n * cardW + (n - 1) * gap + padX - window.innerWidth)
  }, [])

  useEffect(() => {
    let ticking = false

    const updateHScroll = () => {
      const outer = outerRef.current
      const track = trackRef.current
      if (!outer || !track) return

      const rect = outer.getBoundingClientRect()
      const scrollable = outer.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))
      track.style.transform = `translateX(${(-progress * maxXRef.current).toFixed(1)}px)`
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateHScroll)
        ticking = true
      }
    }

    calcMaxX()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', calcMaxX)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', calcMaxX)
    }
  }, [calcMaxX])

  return (
    <section id="productos">
      <div ref={outerRef} className="h-[380vh] relative bg-bg">
        <div className="sticky top-0 h-screen flex flex-col">
          <div className="shrink-0 flex items-end justify-between px-8 pt-12 pb-10 md:px-14 md:pt-[4.5rem]">
            <div>
              <div className="w-9 h-px bg-warm mb-3" />
              <p className="text-[0.65rem] font-normal tracking-[0.28em] uppercase text-warm mb-3.5">
                Nuestros productos
              </p>
              <h2 className="font-serif text-[clamp(2.2rem,3.5vw,3.8rem)] font-light leading-tight text-text">
                Fitoterapia,<br />
                <em className="font-serif italic">de la planta a vos</em>
              </h2>
            </div>
            <span className="hidden md:flex text-[0.62rem] tracking-[0.18em] uppercase text-text-muted items-center gap-3 before:content-[''] before:w-[30px] before:h-px before:bg-border before:block">
              Scrolleá para explorar
            </span>
          </div>
          <div className="flex-1 overflow-hidden flex items-stretch">
            <div
              ref={trackRef}
              className="flex gap-4 md:gap-7 px-8 pb-6 md:px-14 shrink-0 will-change-transform items-stretch"
            >
              {categories.map((c, i) => {
                const firstProject = projects.find((p) => p.category === c.name)
                const href = firstProject ? `/proyectos/${firstProject.slug}` : '#'
                return (
                <Link
                  key={i}
                  href={href}
                  className="flex-none w-[300px] md:w-[400px] relative overflow-hidden cursor-pointer group no-underline"
                >
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
                    loading="lazy"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,3,0.88)] via-[rgba(10,8,3,0.06)_55%] to-transparent flex flex-col justify-end p-9 transition-all duration-500 group-hover:from-[rgba(36,57,41,0.92)]">
                    <span className="text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.5)] mb-2">
                      {c.count}
                    </span>
                    <h3 className="font-serif text-[2.4rem] font-light text-white leading-none mb-4">
                      {c.name}
                    </h3>
                    <p className="text-[0.8rem] font-light leading-relaxed text-[rgba(255,255,255,0.72)] max-w-[280px] opacity-100 translate-y-0 md:opacity-0 md:translate-y-3 transition-all duration-400 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                      {c.description}
                    </p>
                    <span className="mt-5 text-[0.68rem] tracking-[0.12em] uppercase text-[rgba(255,255,255,0.75)] flex items-center gap-2 opacity-100 md:opacity-0 transition-opacity duration-350 md:group-hover:opacity-100 after:content-['→'] after:text-sm">
                      Ver productos
                    </span>
                  </div>
                </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
