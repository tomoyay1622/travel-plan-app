export function Footer() {
  //   if (typeof window === 'undefined') {
  //     return null // サーバーサイドレンダリング中は何も表示しない
  //   }

  return (
    <footer className='border-t bg-white'>
      <div className='container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col'>
        <p className='text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4'>
          Copyright © 2026 All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
