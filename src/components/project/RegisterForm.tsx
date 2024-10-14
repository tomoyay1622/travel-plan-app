'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function RegisterForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const router = useRouter()

  const handleRegister = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        router.push('/project')
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <div className='shadow bg-white rounded-md m-2'>
      <div className='p-2 text-center border-b'>
        <div className='m-2 text-xl text-black font-semibold'>新規登録</div>
      </div>
      <form className='w-auto p-4'>
        <div className='m-4'>
          <Label htmlFor='email'>メールアドレス</Label>
          <Input
            type='email'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            id='email'
            className='w-60'
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
            className='w-60'
          />
        </div>
        <div className='flex justify-center w-full my-10'>
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
            登録
          </Button>
        </div>
        <div className='flex flex-row items-center justify-center p-4'>
          <span className='px-2'>登録済みなら</span>
          <Link href={'/signin'}>
            <span className='text-blue-500 hover:underline'>ログイン</span>
          </Link>
        </div>
      </form>
    </div>
  )
}
