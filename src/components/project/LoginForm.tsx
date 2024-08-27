'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    <form className='w-auto shadow rounded-md p-4'>
      <Input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete='off'
        id='signin-email'
        className='w-52 flex items-center justify-center content-center m-4'
      />
      <Input
        type='password'
        value={password}
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        autoComplete='off'
        id='signin-password'
        className='w-52 m-4'
      />
      <Button
        type='submit'
        onClick={(e) => {
          e.preventDefault()
          // alert('signin completed!')
          // router.push('/project')
          handleSignIn()
        }}
        className='m-4 '
      >
        サインイン
      </Button>
      <div></div>
    </form>
  )
}
