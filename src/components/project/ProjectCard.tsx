'use client'

import { Project } from '@/model/Project'
import Link from 'next/link'

type Props = {
  project: Project
}

export function ProjectCard(props: Props) {
  return (
    <Link href={`/project/${props.project.id}`}>
      <article className='bg-white w-52 h-44 shadow p-4 rounded-md hover:shadow-xl'>
        <h1 className='text-xl text-blue-900 font-bold py-4 hover:underline overflow-hidden overflow-ellipsis max-h-[46px]'>
          {props.project.title}
        </h1>
        <p className='mt-2 max-h-[72px] overflow-hidden overflow-ellipsis'>
          {props.project.description}
        </p>
      </article>
    </Link>
  )
}
