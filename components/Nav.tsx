'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useScrollAnimations } from '@/hooks/useScrollAnimations'
import UrloLogo from './UrloLogo'

const links = [
  { href: '/#about', label: 'Nosotros' },
  { href: '/#productos', label: 'Productos' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#equipo', label: 'Equipo' },
]

export default function Nav() {
  const { isNavSolid } = useScrollAnimations()
  const pathname = usePathname()
  const isProject = pathname.startsWith('/proyectos/')
  const transparent = isProject && !isNavSolid
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
        <a href="/" className="no-underline">
          <UrloLogo
            color={transparent ? '#FFFFFF' : '#2C2820'}
            width={60}
            className={`w-[45px] md:w-[60px] h-auto ${transparent ? 'opacity-90' : ''}`}
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-[0.72rem] font-normal tracking-[0.14em] uppercase no-underline opacity-60 transition-all duration-300 hover:opacity-100 ${
                  transparent ? 'text-white' : 'text-text'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="/#contacto"
            className={`hidden md:inline-block text-[0.72rem] font-normal tracking-[0.1em] uppercase no-underline py-2.5 px-6 rounded-sm transition-colors duration-300 ${
              transparent
                ? 'text-white border border-white/40 bg-transparent hover:bg-white/10'
                : 'text-white bg-accent hover:bg-accent-dark'
            }`}
          >
            Contacto
          </a>

          {/* Hamburger button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menú"
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 bg-transparent border-none cursor-pointer gap-[5px]"
          >
            <span className={`block w-5 h-[1.5px] transition-all duration-300 origin-center ${transparent ? 'bg-white' : 'bg-text'} ${open ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] transition-all duration-300 ${transparent ? 'bg-white' : 'bg-text'} ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] transition-all duration-300 origin-center ${transparent ? 'bg-white' : 'bg-text'} ${open ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed top-16 right-5 z-90 bg-bg rounded-md shadow-lg border border-border md:hidden flex flex-col py-4 px-6 gap-4 transition-all duration-300 origin-top-right ${
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
        <a
          href="/#contacto"
          onClick={() => setOpen(false)}
          className="text-[0.72rem] font-normal tracking-[0.1em] uppercase text-white bg-accent no-underline py-2.5 px-6 rounded-sm text-center mt-1"
        >
          Contacto
        </a>
      </div>
    </>
  )
}
