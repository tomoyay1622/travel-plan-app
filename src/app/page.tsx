'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/features/context/AuthContext'
import Link from 'next/link'

export default function Home() {
  const { isLoggedIn, userEmail } = useAuth()
  const router = useRouter()
  const now = new Date()

  const handleSignout = async () => {
    signOut(auth)
      .then(() => {
        alert('ログアウト完了！')
        router.refresh()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      {/* <title>top | travel-plan-app </title> */}
      <main className='min-h-screen flex flex-col items-center gap-3 p-10 md:p-24'>
        <h1 className='m-10'>
          アクセス時刻：{1 + now.getMonth()}月{now.getDate()}日{now.getHours()}時{now.getMinutes()}
          分
        </h1>
        {isLoggedIn ? (
          <>
            <Link href={'/project'}>
              <span className='m-10 p-3 rounded-lg border bg-yellow-500 hover:shadow'>
                プロジェクト一覧へ
              </span>
            </Link>
            <Button variant='ghost' className='m-5 border-lg bg-white' onClick={handleSignout}>
              ログアウト
            </Button>
          </>
        ) : (
          <Link href={'/signin'}>
            <span className='m-10 p-3 rounded-lg border bg-yellow-500 hover:shadow'>
              アプリを始める
            </span>
          </Link>
        )}
      </main>
    </>
  )
}
