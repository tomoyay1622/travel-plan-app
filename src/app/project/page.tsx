'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { ProjectCard } from '@/components/project/ProjectCard'
import { ProjectCreateDialog } from '@/components/project/ProjectCreateDialog'

import { Project, ProjectDate } from '@/model/Project'
import useSWR from 'swr'

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
      <main>
        <section className='flex flex-wrap min-h-screen items-start content-start justify-start gap-4 p-24'>
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
