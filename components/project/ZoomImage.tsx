'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface ZoomImageProps {
  src: string
  alt?: string
  priority?: boolean
  sizes?: string
  className?: string
}

export default function ZoomImage({ src, alt = '', priority = false, sizes = '50vw', className = '' }: ZoomImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isVisible ? 'scale-100' : 'scale-110'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
      />
    </div>
  )
}
