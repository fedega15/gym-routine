import Hero from '@/components/Hero'
import About from '@/components/About'
import HorizontalScroll from '@/components/HorizontalScroll'
import FeaturedProjects from '@/components/FeaturedProjects'
import Services from '@/components/Services'
import Team from '@/components/Team'
import Contact from '@/components/Contact'
import ScrollToTop from '@/components/ScrollToTop'
import { categories } from '@/data/categories'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { team } from '@/data/team'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <HorizontalScroll categories={categories} />
      <FeaturedProjects projects={projects} />
      <Services services={services} />
      <Team members={team} />
      <Contact />
      <ScrollToTop />
    </>
  )
}
