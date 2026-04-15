import UrloLogo from './UrloLogo'

export default function Footer() {
  return (
    <footer className="bg-[#0A1A1A] py-10 px-8 md:px-14 flex flex-col md:flex-row items-center justify-between gap-4">
      <UrloLogo width={90} className="opacity-70" />
      <p className="text-[0.72rem] font-light text-[rgba(255,255,255,0.35)]">
        © 2026 Cannabis del Paraná · Asociación Civil · Rosario, Santa Fe
      </p>
      <ul className="flex gap-9 list-none">
        {[
          { href: 'https://instagram.com/cdelparana.ong', label: 'Instagram' },
          { href: 'https://api.whatsapp.com/send/?phone=543412631212', label: 'WhatsApp' },
        ].map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-[0.65rem] tracking-[0.14em] uppercase text-[rgba(255,255,255,0.35)] no-underline transition-colors duration-300 hover:text-[rgba(255,255,255,0.8)]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
