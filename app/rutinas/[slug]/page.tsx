import { notFound } from 'next/navigation'
import { getRoutineBySlug, routines } from '@/data/routines'
import RoutineView from './RoutineView'

export function generateStaticParams() {
  return routines.map((r) => ({ slug: r.slug }))
}

export default async function RoutinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const routine = getRoutineBySlug(slug)
  if (!routine) notFound()

  return <RoutineView routine={routine} />
}
