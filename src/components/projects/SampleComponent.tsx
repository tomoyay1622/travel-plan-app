'use client'

import { Switch } from '@radix-ui/react-switch'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

type Props = {
  title: string
}

export function SampleComponent(props: Props) {
  const [checked, setChecked] = useState(true)
  const [email, setEmail] = useState('')
  return (
    <div>
      <h1>{props.title}</h1>
      <p className='text-red-600'>{checked.toString()}</p>
      <Switch checked={checked} onCheckedChange={() => setChecked(!checked)} />
      <p className='text-blue-800'>{email}</p>
      <Input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='w-100'
      />
      <Textarea className='w-60' placeholder='Type your message here.' />
    </div>
  )
}
