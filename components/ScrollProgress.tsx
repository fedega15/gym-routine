'use client'

import { useScrollAnimations } from '@/hooks/useScrollAnimations'

export default function ScrollProgress() {
  const { scrollProgress } = useScrollAnimations()

  return (
    <div
      className="fixed top-0 left-0 h-0.5 bg-warm z-[200]"
      style={{ width: `${scrollProgress * 100}%` }}
    />
  )
}
