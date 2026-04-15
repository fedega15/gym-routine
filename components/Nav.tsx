'use client'

import { useState } from 'react'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'

const links = [
  { href: '/', label: 'Inicio' },
  { href: '/#rutinas', label: 'Rutinas' },
]

export default function Nav() {
  const { isNavSolid } = useScrollAnimations()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between transition-all duration-500 ${
          isNavSolid
            ? 'bg-bg/95 backdrop-blur-lg py-3 px-5 md:py-4 md:px-14 shadow-[0_1px_0_var(--color-border)]'
            : 'py-5 px-5 md:py-7 md:px-14'
        }`}
      >
        <a href="/" className="no-underline font-heading text-2xl tracking-widest text-accent">
          GR
        </a>

        <ul className="hidden md:flex gap-10 list-none">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.72rem] font-normal tracking-[0.14em] uppercase no-underline text-text opacity-60 transition-all duration-300 hover:opacity-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 bg-transparent border-none cursor-pointer gap-[5px]"
        >
          <span className={`block w-5 h-[1.5px] bg-text transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-text transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-text transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </nav>

      <div
        className={`fixed top-16 right-5 z-90 bg-card rounded-md shadow-lg border border-border md:hidden flex flex-col py-4 px-6 gap-4 transition-all duration-300 origin-top-right ${
          open ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
        }`}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-[0.72rem] font-normal tracking-[0.18em] uppercase text-text no-underline opacity-70"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}
