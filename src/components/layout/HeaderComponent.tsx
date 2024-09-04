import Link from 'next/link'
import { useAuth } from '@/features/context/AuthContext'

export const HeaderComponent = () => {
  //   const { isLoggedIn } = useAuth()
  return (
    <header className='body-font bg-gray-100 container mx-auto flex flex-wrap p-5 justify-between'>
      <div className='flex title-font font-medium items-center text-gray-900 md:mb-0'>
        <h1 className='sm:ml-3 text-xl font-bold'>
          <Link href='/project' className=''>
            TRAVEL PLAN APP
          </Link>
        </h1>
      </div>
      <div className='md:ml-auto flex flex-wrap items-center text-base justify-end'>
        {/* {isLoggedIn && (
          <Link href={'/'}>
            <span className='ml-3 border hover:bg-gray-200'>Signout</span>
          </Link>
        )}
        {!isLoggedIn && (
          <Link href={'/signin'}>
            <span className='ml-3 border hover:bg-gray-200'>Signin</span>
          </Link>
        )} */}
        <Link href={'/'}>
          <span className='ml-3 border hover:bg-gray-200'>Signout</span>
        </Link>
        <Link href={'/signin'}>
          <span className='ml-3 border hover:bg-gray-200'>Signin</span>
        </Link>
      </div>
    </header>
  )
}
