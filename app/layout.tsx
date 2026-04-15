import type { Metadata } from 'next'
import { Bebas_Neue, Barlow } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import './globals.css'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-barlow',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gym Routine — PPL Fuerza & Volumen',
  description: 'Rutina de entrenamiento PPL (Push/Pull/Legs) para fuerza y volumen. 5 días activos con progresión semanal.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${barlow.variable}`}>
      <body>
        <ScrollProgress />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
