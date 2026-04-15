export default function Hero() {
  return (
    <section
      className="relative overflow-hidden px-8 pt-[50px] pb-[44px] text-center border-b border-[#222]"
      style={{
        background: 'linear-gradient(160deg, #0d0d0d 0%, #1a0800 55%, #0d0d0d 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% -20%, rgba(220,80,20,0.18) 0%, transparent 65%)',
        }}
      />
      <div className="relative z-10">
        <p className="text-[10px] tracking-[5px] uppercase text-accent font-bold mb-2.5">
          Programa de entrenamiento
        </p>
        <h1 className="font-heading text-[clamp(48px,12vw,100px)] tracking-[3px] leading-[0.95] text-white">
          RUTINA <span className="text-accent">PPL</span>
          <br />
          FUERZA & VOLUMEN
        </h1>
        <p className="mt-3.5 text-[13px] text-text-muted tracking-[2px] uppercase">
          Push · Pull · Legs — 5 días activos
        </p>
        <div className="flex justify-center gap-2.5 mt-7 flex-wrap">
          {['20 ejercicios', '4 sets / ejercicio', '8–15 reps', 'Progresión semanal', '+2.5kg cada semana'].map((tag) => (
            <span
              key={tag}
              className="px-[18px] py-1.5 border border-[#333] text-[11px] tracking-[1.5px] uppercase text-text-muted bg-[#111]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
