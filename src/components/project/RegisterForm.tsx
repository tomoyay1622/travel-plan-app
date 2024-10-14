'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Link from 'next/link'

export function RegisterForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleRegister = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        alert('Register Completed!')
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='shadow bg-white rounded-md m-2'>
      <div className='p-2 text-center '>
        <div className='m-2 text-xl text-black font-semibold'>Register</div>
      </div>
      <form className='w-auto p-4'>
        <div className='m-4'>
          <Label htmlFor='email'>E-mail</Label>
          <Input
            type='email'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            id='email'
            className='w-52 '
          />
        </div>
        <div className='m-4'>
          <Label htmlFor='password'>Password (at least 6 characters)</Label>
          <Input
            type='password'
            value={password}
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
            id='password'
            className='w-52 '
          />
        </div>
        <div className='flex justify-center w-52 m-4 p-1'>
          <Button
            type='submit'
            onClick={(e) => {
              e.preventDefault()
              // alert('signin completed!')
              // router.push('/project')
              handleRegister()
            }}
            className='w-44 bg-blue-500'
          >
            Register
          </Button>
        </div>
        <div className='flex flex-row items-center justify-center p-4'>
          <span className='text-black p-2'>Already register? </span>
          <Link href={'/signin'}>
            <span className='text-blue-500 hover:underline'>Signin</span>
          </Link>
        </div>
      </form>
    </div>
  )
}
