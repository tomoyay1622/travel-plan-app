'use client'

import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import NextLink from 'next/link'

type Props = {
  title: string
}

export function SampleComponent(props: Props) {
  const [checked, setChecked] = useState(true)
  const [email, setEmail] = useState('')
  return (
    <article className='w-auto shadow p-4 rounded-md float-left'>
      <h1>{props.title}</h1>
      <p className='text-red-600'>{checked.toString()}</p>
      <Switch checked={checked} onCheckedChange={() => setChecked(!checked)} />
      <p className='text-blue-800'>{email}</p>
      <Input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-100 m-4'
      />
      <Textarea className='w-60' placeholder='Type your message here.' />
    </article>
  )
}
