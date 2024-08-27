'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components/project/LoginForm'
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '@/lib/firebase'

export default function Home() {
  const router = useRouter()
  const now = new Date()

  const handleSignin = async () => {
    if (confirm('サインインしますか？') === true) {
      router.push('/project')
    }

    // signInWithEmailAndPassword(auth, email, password)
    // createUserWithEmailAndPassword(auth, email, password)
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
      <main className='flex min-h-screen flex-col items-center justify-start gap-3 p-24'>
        <h1>
          {1 + now.getMonth()}月{now.getDate()}日{now.getHours()}時{now.getMinutes()}分
        </h1>
        <LoginForm />
        <Button variant='ghost' className='border' onClick={handleSignin}>
          サンプルボタン
        </Button>
      </main>
    </>
  )
}
