'use client'

import { useRef, type FormEvent } from 'react'

const WA_URL =
  'https://api.whatsapp.com/send/?phone=543412631212&text=Hola%2C+quisiera+consultar+sobre+los+productos&type=phone_number&app_absent=0'

export default function Contact() {
  const btnRef = useRef<HTMLButtonElement>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const btn = btnRef.current
    if (!btn) return
    btn.textContent = '✓ Enviado — te contactamos pronto'
    btn.style.background = '#25D366'
    btn.style.color = '#fff'
    btn.disabled = true
    setTimeout(() => {
      btn.textContent = 'Enviar consulta →'
      btn.style.background = ''
      btn.style.color = ''
      btn.disabled = false
      ;(e.target as HTMLFormElement).reset()
    }, 4000)
  }

  const inputClasses =
    'bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.14)] text-white py-3.5 px-4 font-sans text-sm font-light outline-none rounded-sm transition-all duration-300 focus:border-[rgba(255,255,255,0.4)] focus:bg-[rgba(255,255,255,0.1)] placeholder:text-[rgba(255,255,255,0.25)] appearance-none'

  return (
    <section className="py-28 px-8 md:px-14 bg-accent" id="contacto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-28 items-start">
        <div>
          <div className="w-9 h-px bg-[rgba(255,255,255,0.3)] mb-5" />
          <p className="text-[0.65rem] font-normal tracking-[0.28em] uppercase text-[rgba(255,255,255,0.45)] mb-3.5">
            Contacto
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,3.5vw,4.5rem)] font-light leading-tight text-white mb-7">
            ¿Necesitás asesoramiento?
          </h2>
          <p className="text-sm font-light leading-relaxed text-[rgba(255,255,255,0.65)] mb-10 max-w-[400px]">
            Estamos para acompañarte. Consultanos sobre nuestros fitopreparados, inscripción al REPROCANN o cualquier duda sobre fitoterapia con cannabis.
          </p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[0.8rem] font-normal tracking-[0.1em] uppercase text-accent bg-white no-underline py-4 px-8 rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.108.548 4.09 1.508 5.814L.057 23.196a.75.75 0 00.917.917l5.382-1.451A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.94-1.346l-.354-.21-3.664.989.989-3.664-.21-.354A9.713 9.713 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" fill="#25D366" />
            </svg>
            Escribinos por WhatsApp
          </a>
          <div className="mt-10 pt-10 border-t border-[rgba(255,255,255,0.12)]">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.4)] mb-2">Teléfono</p>
            <a href="https://api.whatsapp.com/send/?phone=543412631212" className="text-[rgba(255,255,255,0.75)] no-underline text-sm font-light transition-colors duration-300 hover:text-white">
              341 2631212
            </a>
          </div>
          <div className="mt-10 pt-10 border-t border-[rgba(255,255,255,0.12)]">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.4)] mb-2">Instagram</p>
            <a href="https://instagram.com/cdelparana.ong" target="_blank" rel="noopener noreferrer" className="text-[rgba(255,255,255,0.75)] no-underline text-sm font-light transition-colors duration-300 hover:text-white">
              @cdelparana.ong
            </a>
          </div>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.45)]">Nombre</label>
              <input type="text" placeholder="Tu nombre" required className={inputClasses} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.45)]">Teléfono</label>
              <input type="tel" placeholder="+54 341 000 0000" className={inputClasses} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.45)]">Email</label>
            <input type="email" placeholder="tu@email.com" required className={inputClasses} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.45)]">Consulta sobre</label>
            <select className={inputClasses}>
              <option value="">Seleccioná una opción</option>
              <option>Aceite de cannabis</option>
              <option>Tintura madre</option>
              <option>Crema / Bálsamo</option>
              <option>Shampoo de cannabis</option>
              <option>Inscripción REPROCANN</option>
              <option>Charlas y capacitaciones</option>
              <option>Consulta general</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.62rem] tracking-[0.2em] uppercase text-[rgba(255,255,255,0.45)]">Mensaje</label>
            <textarea placeholder="Contanos tu consulta..." className={`${inputClasses} resize-y min-h-[110px]`} />
          </div>
          <button
            ref={btnRef}
            type="submit"
            className="self-start font-sans text-xs font-normal tracking-[0.12em] uppercase text-accent bg-white border-none py-4 px-8 rounded-sm cursor-pointer transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
          >
            Enviar consulta →
          </button>
        </form>
      </div>
    </section>
  )
}
