'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { ProjectCard } from '@/components/project/ProjectCard'
import { ProjectCreateDialog } from '@/components/project/ProjectCreateDialog'

import { Project, ProjectDate } from '@/model/Project'
import useSWR from 'swr'
import { useAuth } from '@/features/context/AuthContext'
import { setTimeout } from 'timers'

export default function ProjectList() {
  const router = useRouter()
  const { isLoggedIn: isLoggedin, isAuthLoading: isAuthloading, userEmail: useremail } = useAuth()
  // console.log(isLoggedin)

  if (!isLoggedin && !isAuthloading) {
    setTimeout(() => router.push('/signin'), 2000)
    // router.push('/signin')
    return (
      <main className='flex flex-col items-center min-h-screen m-24'>
        サインインしていないため、サインインページへ移動します。
      </main>
    )
  }
  const {
    data: projects,
    error,
    isLoading,
  } = useSWR<Project[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project`, (url: string) =>
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          const error: Error = new Error('An error occurred while fetching the data.')
          // エラーオブジェクトに追加情報を付与します。
          // error.info = await res.json()
          // error.status = res.status
          throw error
        }
        return res.json()
      })
      .catch((res) => {
        console.log(res)
        // const error = new Error('An error occurred while fetching the data.')
        // throw error
      }),
  )

  function createProject(title: string, description: string, dates: ProjectDate[]) {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project`, {
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

  if (!!error) {
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
        <span className='p-5 sm:p-16'>{useremail} でログイン中</span>
        <section className='flex flex-wrap min-h-screen items-start content-start justify-start gap-4 p-5 sm:p-10'>
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
