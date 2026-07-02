'use client'

import { onAuthStateChanged } from 'firebase/auth'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { auth } from '@/lib/firebase'

type ContextType = {
  isLoggedIn: boolean
  setLoggedIn: Dispatch<SetStateAction<boolean>>
  isAuthLoading: boolean
  userEmail: string | null
}

const AuthContext = createContext<ContextType>({
  isLoggedIn: false,
  setLoggedIn: () => {},
  isAuthLoading: true,
  userEmail: '',
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthLoading, setAuthLoading] = useState<boolean>(true)
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false)
  // const [userId, setUserId] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')

  useEffect(() => {
    // ログイン状態を監視し、変化があったら発動
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthLoading(false)
      if (user) {
        // console.log(user)
        setLoggedIn(true)
        // ログインしていた場合、メールアドレスをセット
        // setUserId(user?.uid || '')
        setUserEmail(user.email || '')
      } else {
        // console.log('signout')
        setLoggedIn(false)
        setUserEmail('')
      }
    })
    // このコンポーネントが不要になったら監視を終了する
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, isAuthLoading, userEmail }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
