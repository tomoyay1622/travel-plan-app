'use client'

import React, { useState } from 'react'

import { ProjectCard } from '@/components/projects/ProjectCard'

import { projects } from '@/mock/projects'

export default function ProjectList() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-start gap-4 p-24'>
      <div className='flex gap-4'>
        {projects.map((project) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </main>
  )
}
