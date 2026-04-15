interface DayHeaderProps {
  dayNumber: number
  dayLabel: string
  name: string
}

export default function DayHeader({ dayNumber, dayLabel, name }: DayHeaderProps) {
  return (
    <div className="flex items-end gap-4 mb-8 pb-4 border-b border-[#222]">
      <span className="font-heading text-[72px] text-[#1e1e1e] leading-none">{dayNumber}</span>
      <div>
        <div className="text-[10px] tracking-[3px] uppercase mb-1 font-semibold">{dayLabel}</div>
        <h2 className="font-heading text-[38px] tracking-[1px] leading-none">{name}</h2>
      </div>
    </div>
  )
}
