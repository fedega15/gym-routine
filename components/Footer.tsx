export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-7 px-8 text-center mt-15">
      <p className="text-[10px] text-[#444] tracking-[2px] uppercase">
        Gym Routine — PPL Fuerza & Volumen · {new Date().getFullYear()}
      </p>
    </footer>
  )
}
