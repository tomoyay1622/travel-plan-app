'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/features/context/AuthContext'
import Link from 'next/link'

export default function Home() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  // const now = new Date()

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
      <main className='relative isolate min-h-screen overflow-hidden bg-slate-100'>
        <div
          className='absolute inset-0 z-0 bg-cover bg-center'
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(15,23,42,0.6), rgba(30,41,59,0.35)), url('/backpicture1.jpg')",
          }}
        />
        <div className='absolute inset-x-0 top-0 z-5 flex h-80 items-center justify-center pointer-events-none'>
          <h1 className='text-5xl font-bold text-white text-center drop-shadow-lg px-6 md:text-6xl'>
            あなたの旅をデザインしよう
          </h1>
        </div>
        <div className='relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-6 py-16'>
          <div className='rounded-2xl border border-white/30 bg-white/80 px-6 py-10 text-center shadow-xl backdrop-blur-sm sm:px-10'>
        {/* <h1 className='m-10'>
          アクセス時刻：{1 + now.getMonth()}月{now.getDate()}日{now.getHours()}時{now.getMinutes()}
          分
        </h1> */}
        {isLoggedIn ? (
          <div className='mt-2 flex flex-col items-center gap-4 sm:flex-row'>
            <Link
              href={'/project'}
              className='inline-flex min-w-52 items-center justify-center rounded-lg border border-amber-500 bg-amber-400 px-6 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-md'
            >
              プロジェクト一覧へ
            </Link>
            <Button
              variant='ghost'
              className='min-w-52 border border-slate-300 bg-white/90 px-6 py-3 hover:bg-white'
              onClick={handleSignout}
            >
              ログアウト
            </Button>
          </div>
        ) : (
          <div className='mt-2 flex flex-col items-center gap-4 sm:flex-row'>
            <Link
              href={'/project'}
              className='inline-flex min-w-52 items-center justify-center rounded-lg border border-amber-500 bg-amber-400 px-6 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-md'
            >
              ゲストで始める
            </Link>
            <Link
              href={'/signin'}
              className='inline-flex min-w-52 items-center justify-center rounded-lg border border-slate-300 bg-white/90 px-6 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md'
            >
              ログインして始める
            </Link>
          </div>
        )}
          </div>
        </div>
      </main>
    </>
  )
}
