'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import RevealOnScroll from '../RevealOnScroll'

interface GallerySectionProps {
  images: string[]
}

export default function GallerySection({ images }: GallerySectionProps) {
  const [current, setCurrent] = useState(0)

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  }, [images.length])

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))
  }, [images.length])

  return (
    <RevealOnScroll>
      <section className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden bg-black">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={img}
            alt=""
            fill
            className="object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
            sizes="100vw"
          />
        </div>
      ))}

      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Imagen ${i + 1}`}
            className={`w-2 h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${
              i === current ? 'bg-white scale-125' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
      </section>
    </RevealOnScroll>
  )
}
