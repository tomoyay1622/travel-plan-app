'use client'

import Link from 'next/link'
import { useAuth } from '@/features/context/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export function Header() {
  const router = useRouter()
  const { isLoggedIn, isAuthLoading, userEmail } = useAuth()
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
    <header className='body-font bg-gray-100 mx-auto sm:flex flex-wrap sm:justify-between'>
      <div className='flex title-font font-medium items-center text-gray-900 md:mb-0 p-2'>
        <h1 className='sm:ml-3 text-xl font-bold'>
          <Link href='/project'>TRAVEL PLAN APP</Link>
        </h1>
      </div>
      {!isAuthLoading && (
        <>
          {!isLoggedIn ? (
            <nav className='md:ml-auto flex flex-wrap items-center text-xs sm:text-base justify-end md:p-2'>
              <Link href={'/register'}>
                <span className='bg-blue-500 text-white p-1 rounded-sm ml-3 border hover:bg-blue-400 hover:shadow'>
                  新規登録
                </span>
              </Link>
              <Link href={'/signin'}>
                <span className='p-1 ml-3 border-2 rounded-sm hover:bg-gray-200'>ログイン</span>
              </Link>
            </nav>
          ) : (
            <nav className='md:ml-auto flex flex-wrap items-center text-xs sm:text-sm justify-between md:p-2'>
              <span className=''>{userEmail} でログイン中</span>
              {/* <Link href={'/'}>
                <span className='p-1 ml-3 border-2 rounded-sm hover:bg-gray-200'>ログアウト</span>
              </Link> */}
              <Button
                variant='outline'
                className='border-2 text-xs sm:text-sm h-6 p-1 rounded-sm ml-3 hover:bg-gray-200'
                onClick={handleSignout}
              >
                ログアウト
              </Button>
            </nav>
          )}
        </>
      )}
    </header>
  )
}
