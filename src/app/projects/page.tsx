'use client'

import React, { useState } from 'react'

import { ProjectCard } from '@/components/projects/ProjectCard'

import { Project } from '@/model/Project'
import useSWR from 'swr'

export default function ProjectList() {
  const {
    data: projects,
    error,
    isLoading,
  } = useSWR<Project[] | undefined>(`http://localhost:3000/api/project`, (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .catch((res) => console.log(res)),
  )
  if (!projects) {
    return null
  }
  return (
    <main className='flex min-h-screen flex-col items-center justify-start gap-4 p-24'>
      <div className='flex gap-4'>
        {projects.map((project: Project) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </main>
  )
}
