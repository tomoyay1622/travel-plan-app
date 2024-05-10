'use client'

import { useState } from 'react'

type Props = {
  title: string
  description: string
}

export function ProjectCard(props: Props) {
  const [checked, setChecked] = useState(true)
  const [email, setEmail] = useState('')
  return (
    <article className='w-52 shadow p-4 rounded-md'>
      <h1 className='text-xl font-bold'>{props.title}</h1>
      <p className='mt-2'>{props.description}</p>
    </article>
  )
}
