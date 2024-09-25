'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Link from 'next/link'
import { PasswordResetDialog } from './PasswordResetDialog'
import { FcGoogle } from 'react-icons/fc'

export function SigninForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()
  const provider = new GoogleAuthProvider()

  const handleSignInWithEmailANdPassword = async () => {
    // e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        router.push('/project')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSignInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        // The signed-in user info.
        const user = result.user
        console.log(user)
        alert('signin completed!')
        router.push('/project')
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // display error
        console.log(error)
      })
  }

  return (
    <div className='shadow rounded-md m-2'>
      <div className='p-2 text-center bg-white'>
        <div className='m-2 text-xl text-black font-semibold'>サインイン</div>
      </div>
      <form className='w-auto p-4' action={handleSignInWithEmailANdPassword}>
        <div className='m-4'>
          <Label htmlFor='email'>メールアドレス</Label>
          <Input
            type='email'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            id='email'
            name='email'
            className='w-52 '
          />
        </div>
        <div className='m-4'>
          <Label htmlFor='password'>パスワード (英数字6文字以上)</Label>
          <Input
            type='password'
            value={password}
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
            id='password'
            name='password'
            className='w-52 '
          />
        </div>
        <div className='flex justify-center w-52 m-4 p-1'>
          <Button
            type='submit'
            // onClick={(e) => {
            //   e.preventDefault()
            //   // alert('signin completed!')
            //   handleSignInWithEmailANdPassword()
            // }}
            className='w-44 bg-blue-500'
          >
            サインイン
          </Button>
        </div>
        <div className='flex flex-col items-center justify-start p-4'>
          <Link href={'/register'}>
            <span className='text-xs text-blue-500 hover:underline'>Create account?</span>
          </Link>
          <PasswordResetDialog />
        </div>
      </form>
      <div className='border-t p-2 flex  justify-center'>
        <Button
          variant='ghost'
          className='border'
          onClick={async (e) => {
            e.preventDefault()
            handleSignInWithGoogle()
          }}
        >
          <FcGoogle />
        </Button>
        <div className='flex items-center text-center ml-2'>
          <p>Googleでサインイン</p>
        </div>
      </div>
    </div>
  )
}
