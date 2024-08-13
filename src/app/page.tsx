'use client'

import { SampleComponent } from '@/components/project/SampleComponent'

export default function Home() {
  const now = new Date()

  return (
    <main className='flex min-h-screen flex-col items-center justify-start gap-4 p-24'>
      <h1>
        今は{1 + now.getMonth()}月{now.getDate()}日{now.getHours()}時{now.getMinutes()}分
      </h1>
      <SampleComponent title='Projects' />
    </main>
  )
}
