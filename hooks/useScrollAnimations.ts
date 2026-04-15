'use client'

import { useState, useEffect, useCallback } from 'react'

interface ScrollState {
  scrollY: number
  scrollProgress: number
  isNavSolid: boolean
}

export function useScrollAnimations(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    isNavSolid: false,
  })

  const handleScroll = useCallback(() => {
    const sy = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? sy / docHeight : 0

    setState({
      scrollY: sy,
      scrollProgress: Math.min(1, Math.max(0, progress)),
      isNavSolid: sy > 60,
    })
  }, [])

  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  return state
}
