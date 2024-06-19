'use client'

import React, { useState } from 'react'

import { ProjectCard } from '@/components/projects/ProjectCard'
import { ProjectCreateDialog } from '@/components/projects/ProjectCreateDialog'

import { Project } from '@/model/Project'
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
          <ProjectCreateDialog onSave={(title, description) => createProject()} />
        </div>
      </main>
    </>
  )
}
