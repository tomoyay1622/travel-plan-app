'use client'

import { Project } from '@/model/Project'
import Link from 'next/link'

type Props = {
  project: Project
}

export function ProjectCard(props: Props) {
  return (
    <Link href={`/projects/${props.project.id}`}>
      <article className='w-52 shadow p-4 rounded-md'>
        <h1 className='text-xl font-bold py-4'>{props.project.title}</h1>
        <p className='mt-2'>{props.project.description}</p>
      </article>
    </Link>
  )
}
