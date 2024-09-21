'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ProjectCreateDialog } from '@/components/project/ProjectCreateDialog'
import type { Project, ProjectDate } from '@/model/Project'
import useSWR from 'swr'
import { useAuth } from '@/features/context/AuthContext'
import { setTimeout } from 'timers'

export default function ProjectList() {
  const router = useRouter()
  const { isLoggedIn, userEmail } = useAuth()

  // if (!isLoggedIn) {
  //   setTimeout(() => router.push('/signin'), 2000)
  //   return (
  //     <main className='flex flex-col items-center min-h-screen m-24'>
  //       サインインしていないため、サインインページへ移動します。
  //     </main>
  //   )
  // }

  const {
    data: projects,
    error,
    isLoading,
  } = useSWR<Project[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project`, (url: string) =>
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          const errorMessage = res.statusText
          const error: Error = new Error(errorMessage)
          throw error
        }
        return res.json()
      })
      .catch((res) => {
        console.log(res)
      }),
  )

  async function createProject(title: string, description: string, dates: ProjectDate[]) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        dates,
      }),
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        console.log(res)
        router.push(`/project/${res.id}`)
      })
  }

  if (isLoading) {
    return <main className='flex flex-col items-center min-h-screen m-24'>データ取得中...</main>
  }

  if (error) {
    return (
      <main className='flex flex-col items-center min-h-screen m-24'>
        データ取得に失敗しました。
      </main>
    )
  }

  if (!projects) {
    return null
  }

  return (
    <>
      <title>project | travel-plan-app</title>
      <main>
        {isLoggedIn ? (
          <span className='p-5 sm:p-16'>{userEmail} でログイン中</span>
        ) : (
          <span className='p-5 sm:p-16'>ログアウト中</span>
        )}
        {/* {!isLoggedIn && <span className='p-5 sm:p-16'>ログアウト中</span>} */}
        <section className='flex flex-wrap min-h-screen items-start content-start justify-center md:justify-start gap-4 p-5 sm:p-10'>
          {projects.map((project: Project) => (
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
