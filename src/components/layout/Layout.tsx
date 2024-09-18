import { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

type Props = { children: ReactNode }

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
