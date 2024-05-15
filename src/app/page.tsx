'use client'

import { SampleComponent } from '@/components/projects/SampleComponent'
import NextLink from 'next/link'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-start gap-4 p-24'>
      <SampleComponent title='ディズニー' />
      <a href='/projects' className='float-left cursor-default'>
        projects
      </a>
    </main>
  )
}
