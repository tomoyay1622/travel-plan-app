'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
// import { SigninForm } from '@/components/project/SigninForm'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/features/context/AuthContext'
import { useState } from 'react'

export default function Home() {
  const { isLoggedIn, setLoggedIn, isAuthLoading, userEmail } = useAuth()
  // const [loginMemo, setLoginMemo] = useState<string>('')
  const router = useRouter()
  const now = new Date()
  // console.log(isLoggedIn)

  const handleSignout = async () => {
    // signInWithEmailAndPassword(auth, email, password)
    // createUserWithEmailAndPassword(auth, email, password)
    signOut(auth)
      .then(() => {
        alert('サインアウト完了！')
        setLoggedIn(false)
        router.refresh()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  // let memo = ''
  // if (isLoggedIn) {
  //   memo = userEmail + '  でサインイン'
  // } else {
  //   memo = 'サインアウト'
  // }

  return (
    <>
      {/* <title>signin | travel-plan-app </title> */}
      <main className='min-h-screen flex flex-col items-center gap-3 p-10 md:p-24'>
        {/* <span className='p-5 sm:p-16'>{memo}</span> */}
        {isLoggedIn && <span className='p-5 sm:p-16'>{userEmail} でサインイン</span>}
        {!isLoggedIn && <span className='p-5 sm:p-16'>サインアウト</span>}
        <h1>
          {1 + now.getMonth()}月{now.getDate()}日{now.getHours()}時{now.getMinutes()}分
        </h1>
        {/* <SigninForm /> */}
        {isLoggedIn && (
          <Button variant='ghost' className='border bg-yellow-500' onClick={handleSignout}>
            サインアウト
          </Button>
        )}
      </main>
    </>
  )
}
