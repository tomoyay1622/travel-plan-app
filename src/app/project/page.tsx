'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ProjectCreateDialog } from '@/components/project/ProjectCreateDialog'
import type { Project, ProjectDate } from '@/model/Project'
// import { useAuth } from '@/features/context/AuthContext'
import { query, collection, doc, getDocs, setDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { v4 as uuidv4 } from 'uuid'

export default function ProjectList() {
  const router = useRouter()
  // const { isLoggedIn, isAuthLoading } = useAuth()

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

  // function requireSignInForSave() {
  //   if (isLoggedIn) {
  //     return true
  //   }
  //
  //   alert('保存するにはサインインが必要です。')
  //   router.push('/signin')
  //   return false
  // }

  async function createProject(title: string, description: string, dates: ProjectDate[]) {
    // if (!requireSignInForSave()) {
    //   return
    // }

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

  // if (isAuthLoading) {
  //   return <main className='flex flex-col items-center min-h-screen m-24'>認証確認中</main>
  // }

  if (!data) {
    return (
      <main className='flex flex-col items-center min-h-screen m-24'>データ取得中</main>
    )
  }

  return (
    <>
      {/* <title>project | travel-plan-app</title> */}
      <main className='relative isolate min-h-screen overflow-hidden bg-slate-100'>
        <div
          className='absolute inset-0 z-0 bg-cover bg-center'
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(15,23,42,0.4), rgba(30,41,59,0.2)), url('/backpicture2.jpg')",
          }}
        />
        {/* {!isLoggedIn && (
          <div className='mx-5 mt-5 rounded-md border border-dashed border-yellow-500 bg-yellow-50 p-3 text-sm'>
            ゲストモードで閲覧中です。保存するにはサインインしてください。
          </div>
        )} */}
        
        <section className='relative z-10 flex flex-wrap items-start content-start justify-center md:justify-start gap-4 p-5 sm:p-10'>
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
