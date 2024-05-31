'use client'

import { SampleComponent } from '@/components/projects/SampleComponent'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-start gap-4 p-24'>
      <SampleComponent title='Projects' />
    </main>
  )
}
