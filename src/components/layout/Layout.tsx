import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

type Props = { children: ReactNode }

const Layout = ({ children }: Props) => {
  return (
    <div className='bg-gray-200'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
