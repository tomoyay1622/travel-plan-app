'use client'

import { useRouter } from 'next/navigation'
import { RegisterForm } from '@/components/project/RegisterForm'

export default function RegisterPage() {
  const router = useRouter()
  const now = new Date()

  return (
    <>
      <main className='min-h-screen flex flex-col items-center p-10 md:p-24'>
        <h1 className='m-10'>
          {1 + now.getMonth()}月{now.getDate()}日{now.getHours()}時{now.getMinutes()}分
        </h1>
        <RegisterForm />
      </main>
    </>
  )
}
