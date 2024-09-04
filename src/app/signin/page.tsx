'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SigninForm } from '@/components/project/SigninForm'
import { useAuth } from '@/features/context/AuthContext'

export default function Signin() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const now = new Date()

  const handleSignin = async () => {
    if (confirm('サインインしますか？') === true) {
      router.push('/project')
    }
    // signInWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //   const user = userCredential.user
    //   alert('サインイン完了！')
    //   console.log(user)
    // })
    // .catch((error) => {
    //   console.log(error)
    // })
  }

  return (
    <>
      {/* <title>signin | travel-plan-app </title> */}
      <main className='min-h-screen flex flex-col items-center gap-3 p-10 md:p-24'>
        <h1 className='m-10'>
          {1 + now.getMonth()}月{now.getDate()}日{now.getHours()}時{now.getMinutes()}分
        </h1>
        {isLoggedIn && <span>サインインしています。</span>}
        {!isLoggedIn && <SigninForm />}
        {/* <Button variant='ghost' className='border' onClick={handleSignin}>
          サンプルボタン
        </Button> */}
      </main>
    </>
  )
}
