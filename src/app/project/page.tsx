'use client'

import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ProjectCreateDialog } from '@/components/project/ProjectCreateDialog'
import type { Project, ProjectDate } from '@/model/Project'
import { useAuth } from '@/features/context/AuthContext'
import { setTimeout } from 'timers'
import { query, collection, doc, getDocs, setDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'

export default function ProjectList() {
  const router = useRouter()
  const { isLoggedIn, isAuthLoading } = useAuth()

  // if (!isLoggedIn) {
  //   setTimeout(() => router.push('/signin'), 2000)
  //   return (
  //     <main className='flex flex-col items-center min-h-screen m-24'>
  //       ログインしていないため、ログインページへ移動します。
  //     </main>
  //   )
  // }

  // const {
  //   data: projects,
  //   error,
  //   isLoading,
  // } = useSWR<Project[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project`, (url: string) =>
  //   fetch(url)
  //     .then((res) => {
  //       if (!res.ok) {
  //         const errorMessage = res.statusText
  //         const error: Error = new Error(errorMessage)
  //         throw error
  //       }
  //       return res.json()
  //     })
  //     .catch((res) => {
  //       console.log(res)
  //     }),
  // )
  const [data, setData] = useState<Project[] | null>(null)
  const docRef = query(collection(db, 'project'))

  const fetchData = async () => {
    try {
      const docSnaps = await getDocs(docRef)
      const temporaryData: Project[] = []
      docSnaps.forEach((doc) => temporaryData.push(doc.data() as Project))
      setData(temporaryData)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
    // Firestore リアルタイムリスナー (データの変更があったとき)
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      fetchData()
    })

    // コンポーネントのアンマウント時にクリーンアップ
    return () => {
      unsubscribe()
    }
  }, [])

  async function createProject(title: string, description: string, dates: ProjectDate[]) {
    const id = uuidv4()
    const newDocRef = doc(db, 'project', id)
    try {
      const newProject: Project = {
        id,
        title,
        description,
        dates,
        projectSchedules: [],
      }
      await setDoc(newDocRef, newProject).then(() => {
        router.push(`/project/${id}`)
      })
    } catch (e) {
      console.log(e)
    }
    // await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     title,
    //     description,
    //     dates,
    //   }),
    // })
    //   .then((res) => {
    //     return res.json()
    //   })
    //   .then((res) => {
    //     console.log(res)
    //     router.push(`/project/${res.id}`)
    //   })
  }

  if (isAuthLoading) {
    return <main className='flex flex-col items-center min-h-screen m-24'>認証確認中でござる</main>
  }

  if (!isLoggedIn) {
    return (
      <main className='flex flex-col items-center min-h-screen m-24'>
        <span className='m-5 sm:m-16'>ログアウト中（ログイン後にデータを取得できます）</span>
        <Link href={'/signin'}>
          <span className='m-10 p-3 rounded-lg border bg-yellow-500'>ログインへ</span>
        </Link>
      </main>
    )
  }

  if (!data) {
    return (
      <main className='flex flex-col items-center min-h-screen m-24'>データ取得中でござる</main>
    )
  }

  return (
    <>
      {/* <title>project | travel-plan-app</title> */}
      <main>
        <section className='flex flex-wrap min-h-screen items-start content-start justify-center md:justify-start gap-4 p-5 sm:p-10'>
          {data.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <ProjectCreateDialog
            onSave={(title, description, dates) => createProject(title, description, dates)}
          />
        </section>
      </main>
    </>
  )
}
