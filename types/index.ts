export interface Project {
  slug: string
  name: string
  category: string
  description: string
  image: string
  thumbnail: string
  reversed: boolean
}

export interface ProjectDetail {
  slug: string
  name: string
  category: string
  heroImage: string
  logoImage?: string
  sections: ProjectSection[]
}

export type ProjectSection =
  | { type: 'story'; title: string; text: string; image: string; reversed?: boolean; buttonText?: string; buttonHref?: string; bgColor?: string }
  | { type: 'gallery'; images: string[] }
  | { type: 'parallax'; images: string[]; bgColor?: string }
  | { type: 'feature'; title: string; text: string; image: string; reversed?: boolean; bgColor?: string }
  | { type: 'triple'; items: { image: string; title: string; text: string }[]; bgColor?: string }
  | { type: 'location'; mapImage: string; description: string; stats: { value: string; label: string }[]; bgColor?: string }
  | { type: 'about'; title: string; paragraphs: string[]; image: string; bgColor?: string }
  | { type: 'contact' }

export interface Category {
  name: string
  image: string
  count: string
  description: string
}

export interface Service {
  number: string
  title: string
  description: string
}

export interface TeamMember {
  name: string
  role: string
}
