'use client'

import Link from 'next/link'
import { useAuth } from '@/features/context/AuthContext'

export function Header() {
  const { isLoggedIn, isAuthLoading, userEmail } = useAuth()
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
            <nav className='md:ml-auto flex flex-wrap items-center text-xs sm:text-base justify-end p-2'>
              <Link href={'/register'}>
                <span className='bg-blue-500 text-white p-1 rounded-sm ml-3 border hover:bg-blue-300'>
                  新規登録
                </span>
              </Link>
              <Link href={'/signin'}>
                <span className='p-1 ml-3 border-2 rounded-sm hover:bg-gray-200'>サインイン</span>
              </Link>
            </nav>
          ) : (
            <nav className='md:ml-auto flex flex-wrap items-center text-xs sm:text-sm justify-between p-2'>
              <span className=''>{userEmail} でサインイン中</span>
              <Link href={'/'}>
                <span className='p-1 ml-3 border-2 rounded-sm hover:bg-gray-200'>サインアウト</span>
              </Link>
            </nav>
          )}
        </>
      )}
    </header>
  )
}
