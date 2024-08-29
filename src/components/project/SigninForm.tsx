'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Link from 'next/link'
import { PasswordResetDialog } from './PasswordResetDialog'

export function SigninForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const handleSignIn = async () => {
    // e.preventDefault()

    // try {
    //   await signInWithEmailAndPassword(auth, email, password)
    // } catch (error) {
    //   console.log(error)
    // }
    signInWithEmailAndPassword(auth, email, password)
      // createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        router.push('/project')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='shadow rounded-md m-2'>
      <div className='p-2 text-center bg-black'>
        <div className='m-2 text-xl text-white'>Signin</div>
      </div>
      <form className='w-auto p-4'>
        <div className='m-4'>
          <Label htmlFor='signin-email'>E-mail</Label>
          <Input
            type='email'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            id='signin-email'
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
              handleSignIn()
              // router.push('/project')
            }}
            className='w-44 bg-blue-500'
          >
            Signin
          </Button>
        </div>
        <div className='flex flex-col items-center justify-start p-4'>
          <Link href={'/register'}>
            <span className='text-xs text-blue-500 hover:underline'>Create account?</span>
          </Link>
          <PasswordResetDialog />
        </div>
      </form>
    </div>
  )
}
