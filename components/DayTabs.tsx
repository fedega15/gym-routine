import type { Day } from '@/types'

interface DayTabsProps {
  days: Day[]
  activeIndex: number
  onSelect: (index: number) => void
}

export default function DayTabs({ days, activeIndex, onSelect }: DayTabsProps) {
  return (
    <nav className="flex bg-[#111] border-b border-[#222] overflow-x-auto">
      {days.map((day, i) => (
        <button
          key={day.id}
          onClick={() => onSelect(i)}
          className={`flex-1 min-w-[70px] py-3 px-1.5 bg-none border-none cursor-pointer font-body text-[10px] tracking-[1px] uppercase flex flex-col items-center gap-[3px] transition-all duration-200 border-b-[3px] ${
            i === activeIndex
              ? 'text-white border-b-current'
              : 'text-text-muted border-b-transparent hover:text-white hover:bg-[#161616]'
          }`}
          style={i === activeIndex ? { borderBottomColor: day.color } : undefined}
        >
          <span className="font-heading text-[18px] tracking-[2px] leading-none">{day.dayLabel}</span>
          <span className="text-[9px] tracking-[1px]">{day.name}</span>
        </button>
      ))}
    </nav>
  )
}
