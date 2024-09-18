'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SigninForm } from '@/components/project/SigninForm'
import { useAuth } from '@/features/context/AuthContext'
import Link from 'next/link'

export default function Signin() {
  const { isLoggedIn, userEmail } = useAuth()
  // const router = useRouter()
  const now = new Date()

  // const handleSignin = async () => {
  //   if (confirm('サインインしますか？') === true) {
  //     router.push('/project')
  //   }
  // }

  return (
    <>
      {/* <title>signin | travel-plan-app </title> */}
      <main className='min-h-screen flex flex-col items-center p-10 md:p-24'>
        <h1 className='m-10'>
          {1 + now.getMonth()}月{now.getDate()}日{now.getHours()}時{now.getMinutes()}分
        </h1>
        {isLoggedIn && <span className='m-10'>{userEmail} でサインインしています。</span>}
        {isLoggedIn && (
          <Link href={'/project'}>
            <span className='p-3 rounded-lg border bg-yellow-500'>プロジェクト一覧へ</span>
          </Link>
        )}
        {!isLoggedIn && <SigninForm />}
        {/* <Button variant='ghost' className='border' onClick={handleSignin}>
          サンプルボタン
        </Button> */}
      </main>
    </>
  )
}
