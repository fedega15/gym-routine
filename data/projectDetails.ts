import type { ProjectDetail } from '@/types'

const cdelparanaAbout = {
  type: 'about' as const,
  title: 'Cannabis del Paraná',
  paragraphs: [
    'Asociación civil dedicada a la fitoterapia con cannabis medicinal en Rosario, Santa Fe. Elaboramos fitopreparados artesanales con cannabis cultivado de forma responsable.',
    'Nuestro objetivo es brindar herramientas terapéuticas desde la fitoterapia y el trabajo responsable con la planta, siempre bajo seguimiento profesional.',
  ],
  image: '/images/triptico-interior.jpeg',
  bgColor: '#9CC5C0',
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: 'aceite-quimiotipo-1',
    name: 'Aceite Quimiotipo 1',
    category: 'Aceites',
    heroImage: '/images/aceite-quimio-1.png',
    sections: [
      {
        type: 'story',
        title: 'Acompañar tratamientos',
        text: 'Nuestro aceite de quimiotipo 1 es un fitopreparado elaborado por la asociación para acompañar distintos tratamientos de nuestros pacientes. Es producido a partir de cannabis cuidadosamente cultivado y procesado, priorizando siempre la calidad, la seguridad y el bienestar de quienes lo utilizan.',
        image: '/images/info-productos2.jpeg',
        bgColor: '#F0F4F3',
      },
      {
        type: 'gallery',
        images: [
          '/images/combo.jpeg',
          '/images/flyer-productos.jpeg',
          '/images/tintura-madre-varias.jpeg',
        ],
      },
      {
        type: 'feature',
        title: 'Fitoterapia responsable',
        text: 'En Cannabis del Paraná trabajamos de forma responsable para desarrollar preparaciones naturales basadas en fitoterapia vegetal que acompañen diferentes necesidades.',
        image: '/images/triptico-interior.jpeg',
        bgColor: '#ffffff',
      },
      cdelparanaAbout,
      { type: 'contact' },
    ],
  },
  {
    slug: 'aceite-quimiotipo-2',
    name: 'Aceite Quimiotipo 2',
    category: 'Aceites',
    heroImage: '/images/aceite-quimio-2.png',
    sections: [
      {
        type: 'story',
        title: 'Compuestos naturales',
        text: 'El aceite de quimiotipo 2 es un fitopreparado que combina distintos compuestos naturales presentes en la planta, elaborado por nuestra asociación para acompañar a nuestros pacientes. Cada preparación es realizada con dedicación, buscando mantener los componentes naturales de esta planta medicinal.',
        image: '/images/combo.jpeg',
        bgColor: '#F0F4F3',
      },
      {
        type: 'gallery',
        images: [
          '/images/info-productos1.jpeg',
          '/images/info-productos2.jpeg',
          '/images/tintura-madre.jpeg',
        ],
      },
      {
        type: 'feature',
        title: 'Calidad asegurada',
        text: 'Nuestro objetivo es brindar herramientas terapéuticas desde la fitoterapia y el trabajo responsable con la planta, asegurando un producto de calidad.',
        image: '/images/triptico.jpeg',
        bgColor: '#ffffff',
      },
      cdelparanaAbout,
      { type: 'contact' },
    ],
  },
  {
    slug: 'aceite-quimiotipo-3',
    name: 'Aceite Quimiotipo 3',
    category: 'Aceites',
    heroImage: '/images/aceite-quimio-3.png',
    sections: [
      {
        type: 'story',
        title: 'No psicoactivo',
        text: 'Nuestro aceite de quimiotipo 3 es un fitopreparado rico en compuestos no psicoactivos, desarrollado para acompañar distintos procesos terapéuticos de nuestros pacientes. En Cannabis del Paraná elaboramos nuestras preparaciones con cannabis cultivado de forma responsable.',
        image: '/images/info-productos1.jpeg',
        bgColor: '#F0F4F3',
      },
      {
        type: 'gallery',
        images: [
          '/images/combo.jpeg',
          '/images/flyer-productos.jpeg',
          '/images/tintura-madre-varias.jpeg',
        ],
      },
      {
        type: 'feature',
        title: 'Procesos cuidados',
        text: 'Seguimos trabajando para acercar la fitoterapia con esta planta de forma segura y accesible, con procesos cuidados que preservan sus propiedades naturales.',
        image: '/images/triptico-interior.jpeg',
        bgColor: '#ffffff',
      },
      cdelparanaAbout,
      { type: 'contact' },
    ],
  },
  {
    slug: 'tintura-madre',
    name: 'Tintura Madre',
    category: 'Tinturas',
    heroImage: '/images/tintura-madre.png',
    sections: [
      {
        type: 'story',
        title: 'Extracto natural',
        text: 'La tintura madre de cannabis es un extracto obtenido mediante un proceso de maceración que permite conservar gran parte de los compuestos naturales de la planta. En Cannabis del Paraná elaboramos este fitopreparado para acompañar a nuestros pacientes dentro del enfoque de la fitoterapia con plantas medicinales.',
        image: '/images/tintura-madre.jpeg',
        bgColor: '#F0F4F3',
      },
      {
        type: 'gallery',
        images: [
          '/images/etiqueta-tintura.jpeg',
          '/images/tintura-raices.jpeg',
          '/images/combo.jpeg',
        ],
      },
      {
        type: 'feature',
        title: 'Cuidado y respeto',
        text: 'Cada preparación es realizada con cuidado y respeto por la planta y sus propiedades. Alternativa natural que puede acompañar procesos de bienestar físico, emocional y de descanso.',
        image: '/images/tintura-madre-varias.jpeg',
        bgColor: '#ffffff',
      },
      cdelparanaAbout,
      { type: 'contact' },
    ],
  },
  {
    slug: 'tintura-madre-raices',
    name: 'Tintura Madre de Raíces',
    category: 'Tinturas',
    heroImage: '/images/titnrua-madre-raices.png',
    sections: [
      {
        type: 'story',
        title: 'De las raíces',
        text: 'Nuestra tintura madre de raíces de cannabis es un fitopreparado elaborado a partir de las raíces de la planta, parte utilizada tradicionalmente en distintas preparaciones herbales. Forma parte del trabajo de investigación y elaboración que realizamos en Cannabis del Paraná.',
        image: '/images/etiqueta-raices.jpeg',
        bgColor: '#F0F4F3',
      },
      {
        type: 'gallery',
        images: [
          '/images/tintura-madre.jpeg',
          '/images/tintura-madre-varias.jpeg',
          '/images/combo.jpeg',
        ],
      },
      {
        type: 'feature',
        title: 'Investigación continua',
        text: 'Seguimos explorando las posibilidades terapéuticas que ofrece esta planta. Alternativa natural que puede acompañar procesos de alivio antiinflamatorio y apoyo dérmico.',
        image: '/images/triptico-interior.jpeg',
        bgColor: '#ffffff',
      },
      cdelparanaAbout,
      { type: 'contact' },
    ],
  },
  {
    slug: 'crema-cannabis',
    name: 'Crema de Cannabis',
    category: 'Cosmética',
    heroImage: '/images/crema-planta.jpeg',
    sections: [
      {
        type: 'story',
        title: 'Uso tópico',
        text: 'Nuestra crema de cannabis es un fitopreparado de uso tópico desarrollado por la asociación para acompañar distintas necesidades de nuestros pacientes. Su formulación combina extracto vegetal de cannabis con una base pensada para el cuidado de la piel.',
        image: '/images/balsamo.jpeg',
        bgColor: '#F0F4F3',
      },
      {
        type: 'gallery',
        images: [
          '/images/combo.jpeg',
          '/images/shampoo.jpeg',
          '/images/flyer-productos.jpeg',
        ],
      },
      {
        type: 'feature',
        title: 'Aplicación localizada',
        text: 'Permite una aplicación localizada y forma parte de las preparaciones que elaboramos dentro de nuestro trabajo con fitoterapia vegetal.',
        image: '/images/triptico-interior.jpeg',
        bgColor: '#ffffff',
      },
      cdelparanaAbout,
      { type: 'contact' },
    ],
  },
  {
    slug: 'shampoo-cannabis',
    name: 'Shampoo de Cannabis',
    category: 'Cosmética',
    heroImage: '/images/shampoo.png',
    sections: [
      {
        type: 'story',
        title: 'Cuidado capilar',
        text: 'Presentamos nuestro shampoo con extractos de cannabis sativa L, elaborado a partir de fitocompuestos naturales de la planta. Su fórmula fue pensada para el cuidado del cuero cabelludo y el cabello, aprovechando las propiedades del cannabis en productos de higiene y bienestar.',
        image: '/images/combo.jpeg',
        bgColor: '#F0F4F3',
      },
      {
        type: 'gallery',
        images: [
          '/images/crema-planta.jpeg',
          '/images/balsamo.jpeg',
          '/images/flyer-productos.jpeg',
        ],
      },
      {
        type: 'feature',
        title: 'Orgánico y artesanal',
        text: 'Producto orgánico de elaboración artesanal con extractos vegetales. Disponible en presentación de 100ml. Solo para personas inscriptas en REPROCANN, uso bajo seguimiento médico.',
        image: '/images/triptico-interior.jpeg',
        bgColor: '#ffffff',
      },
      cdelparanaAbout,
      { type: 'contact' },
    ],
  },
]
