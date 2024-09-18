import Link from 'next/link'

export function Header() {
  // if (typeof window === 'undefined') {
  //   return null // サーバーサイドレンダリング中は何も表示しない
  // }

  return (
    <header className='body-font bg-gray-100 container mx-auto sm:flex flex-wrap p-5 justify-between'>
      <div className='flex title-font font-medium items-center text-gray-900 md:mb-0'>
        <h1 className='sm:ml-3 text-xl font-bold'>
          <Link href='/project'>TRAVEL PLAN APP</Link>
        </h1>
      </div>
      <nav className='md:ml-auto flex flex-wrap items-center text-base justify-end'>
        <Link href={'/register'}>
          <span className='bg-blue-500 text-white p-1 rounded-sm ml-3 border hover:bg-blue-300'>
            Register
          </span>
        </Link>
        <Link href={'/signin'}>
          <span className='p-1 ml-3 border-2 rounded-sm hover:bg-gray-200'>Signin</span>
        </Link>
        <Link href={'/'}>
          <span className='p-1 ml-3 border-2 rounded-sm hover:bg-gray-200'>Signout</span>
        </Link>
      </nav>
    </header>
  )
}
