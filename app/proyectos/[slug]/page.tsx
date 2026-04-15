import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projectDetails } from '@/data/projectDetails'
import ProjectHero from '@/components/project/ProjectHero'
import StorySection from '@/components/project/StorySection'
import GallerySection from '@/components/project/GallerySection'
import ParallaxSection from '@/components/project/ParallaxSection'
import FeatureSection from '@/components/project/FeatureSection'
import TripleSection from '@/components/project/TripleSection'
import LocationSection from '@/components/project/LocationSection'
import AboutSection from '@/components/project/AboutSection'
import Contact from '@/components/Contact'
import ScrollToTop from '@/components/ScrollToTop'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projectDetails.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projectDetails.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.name} — Cannabis del Paraná`,
    description: `${project.name} · ${project.category} · Cannabis del Paraná`,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = projectDetails.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <div>
      <ProjectHero
        heroImage={project.heroImage}
        name={project.name}
        logoImage={project.logoImage}
      />

      {project.sections.map((section, i) => {
        switch (section.type) {
          case 'story':
            return (
              <StorySection
                key={i}
                title={section.title}
                text={section.text}
                image={section.image}
                reversed={section.reversed}
                buttonText={section.buttonText}
                buttonHref={section.buttonHref}
                bgColor={section.bgColor}
              />
            )
          case 'gallery':
            return <GallerySection key={i} images={section.images} />
          case 'parallax':
            return <ParallaxSection key={i} images={section.images} bgColor={section.bgColor} />
          case 'feature':
            return (
              <FeatureSection
                key={i}
                title={section.title}
                text={section.text}
                image={section.image}
                reversed={section.reversed}
                bgColor={section.bgColor}
              />
            )
          case 'triple':
            return <TripleSection key={i} items={section.items} bgColor={section.bgColor} />
          case 'location':
            return (
              <LocationSection
                key={i}
                mapImage={section.mapImage}
                description={section.description}
                stats={section.stats}
                bgColor={section.bgColor}
              />
            )
          case 'about':
            return (
              <AboutSection
                key={i}
                title={section.title}
                paragraphs={section.paragraphs}
                image={section.image}
                bgColor={section.bgColor}
              />
            )
          case 'contact':
            return <Contact key={i} />
          default:
            return null
        }
      })}

      <ScrollToTop />
    </div>
  )
}
