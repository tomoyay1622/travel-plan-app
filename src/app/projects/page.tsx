'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { ProjectCard } from '@/components/projects/ProjectCard'
import { ProjectCreateDialog } from '@/components/projects/ProjectCreateDialog'

import { Project, ProjectDate } from '@/model/Project'
import useSWR, { mutate } from 'swr'

export default function ProjectList() {
  const {
    data: projects,
    error,
    isLoading,
  } = useSWR<Project[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project`, (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .catch((res) => console.log(res)),
  )

  const router = useRouter()

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
        router.push(`/projects/${res.id}`)
      })
  }

  if (!projects) {
    return null
  }

  return (
    <>
      <title>projects</title>
      <main className='flex min-h-screen flex-col items-center justify-start gap-4 p-24'>
        <div className='flex gap-4'>
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <ProjectCreateDialog
            onSave={(title, description, dates) => createProject(title, description, dates)}
          />
        </div>
      </main>
    </>
  )
}
