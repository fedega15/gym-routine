import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import ScrollProgress from '@/components/ScrollProgress'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cannabis del Paraná — Asociación Civil',
  description:
    'Asociación civil dedicada a la fitoterapia con cannabis medicinal en Rosario, Santa Fe. Fitopreparados artesanales, asesoramiento y acompañamiento a pacientes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <ScrollProgress />
        <WhatsAppFloat />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
