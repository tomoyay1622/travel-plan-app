'use client'

import { Switch } from '@/components/ui/switch'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function Home() {
  const [checked, setChecked] = useState(true)
  const [email, setEmail] = useState('')

  return (
    <main className='flex min-h-screen flex-col items-center justify-start gap-4 p-24'>
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
    </main>
  )
}
