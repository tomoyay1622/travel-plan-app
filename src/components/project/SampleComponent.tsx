'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

type Props = {
  title: string
}

export function SampleComponent(props: Props) {
  const [email, setEmail] = useState('')

  return (
    <article className='w-auto shadow rounded-md float-left p-4'>
      <Input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-100 m-4'
      />
      <Link href='/project' className='text-center bg-black'>
        <h1 className='font-bold text-xl border rounded bg-gray-900 text-white m-6'>
          {props.title}
        </h1>
      </Link>
    </article>
  )
}
