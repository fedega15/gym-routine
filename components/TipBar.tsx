interface TipBarProps {
  tip: string
  color: string
}

export default function TipBar({ tip, color }: TipBarProps) {
  const colonIndex = tip.indexOf(':')
  const label = colonIndex > -1 ? tip.slice(0, colonIndex) : 'Tip'
  const content = colonIndex > -1 ? tip.slice(colonIndex + 1).trim() : tip

  return (
    <div
      className="mt-6 bg-[#111] py-3.5 px-[18px] text-[12.5px] text-text-muted leading-[1.6]"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <strong style={{ color }}>📋 {label}:</strong> {content}
    </div>
  )
}
