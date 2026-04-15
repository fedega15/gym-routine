import type { Category } from '@/types'

export const IMAGE_BASE = '/images'

export const categories: Category[] = [
  { image: `${IMAGE_BASE}/aceite-quimio-3.png`, count: '3 quimiotipos', name: 'Aceites', description: 'Fitopreparados en aceite con distintos quimiotipos para acompañar diferentes tratamientos.' },
  { image: `${IMAGE_BASE}/tintura-madre.png`, count: '2 variedades', name: 'Tinturas', description: 'Extractos obtenidos mediante maceración que conservan los compuestos naturales de la planta.' },
  { image: `${IMAGE_BASE}/shampoo.png`, count: '2 productos', name: 'Cosmética', description: 'Cremas, bálsamos y shampoo con extractos de cannabis para el cuidado personal.' },
  { image: `${IMAGE_BASE}/charlas.png`, count: 'Eventos', name: 'Charlas', description: 'Encuentros educativos con profesionales sobre fitoterapia y uso responsable.' },
]
