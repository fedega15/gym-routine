import Image from 'next/image'

interface LogoProps {
  color?: string
  className?: string
  width?: number
}

export default function UrloLogo({ color, className = '', width = 120 }: LogoProps) {
  const height = Math.round(width * 1)
  return (
    <Image
      src="/images/logo.jpeg"
      alt="Cannabis del Paraná"
      width={width}
      height={height}
      className={`object-cover rounded-full ${className}`}
      style={color === '#FFFFFF' ? { filter: 'brightness(1.2) contrast(1.1)' } : undefined}
    />
  )
}
