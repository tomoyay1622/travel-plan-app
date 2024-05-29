'use client'

import { ScheduleCreateDialog } from '@/components/projects/ScheduleCreateDialog'
import { ScheduleDeleteDialog } from '@/components/projects/ScheduleDeleteDialog'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { projects } from '@/mock/projects'
import { Project } from '@/model/Project'

import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | undefined>(undefined)

  useEffect(() => {
    setProject(projects.find((project) => project.id === params.id))
  }, [])

  function createSchedule(dateId: string, startTime: string, endTime: string, description: string) {
    const id = uuidv4()
    setProject((project) => {
      if (project === undefined) {
        return undefined
      }

      // スプレッド構文を勉強お願いします。
      return {
        ...project,
        projectSchedules: [
          ...project.projectSchedules,
          {
            id: id,
            dateId: dateId,
            startTime: startTime,
            endTime: endTime,
            description: description,
          },
        ],
      }
    })
  }

  function deleteSchedule(id: string) {
    setProject((project) => {
      if (project === undefined) {
        return undefined
      }

      return {
        ...project,
        projectSchedules: project.projectSchedules.filter(
          (projectSchedule) => projectSchedule.id !== id,
        ),
      }
    })
  }

  if (!project) {
    return null
  }

  return (
    <section className='p-10'>
      <h1 className='text-5xl font-bold'>{project.title}</h1>
      <p>{project.description}</p>

      <Tabs defaultValue={project.dateIds[0]} className='py-6 px-2'>
        <TabsList className='grid w-full grid-cols-2'>
          {project.dateIds.map((dateId) => (
            <TabsTrigger value={dateId}>{dateId}</TabsTrigger>
          ))}
        </TabsList>
        {project.dateIds.map((dateId) => (
          <TabsContent value={dateId} className='p-6'>
            <div className='flex justify-end'>
              <ScheduleCreateDialog
                onSave={(startTime, endTime, description) => {
                  createSchedule(dateId, startTime, endTime, description)
                }}
              />
            </div>
            {project.projectSchedules
              .filter((projectSchedule) => projectSchedule.dateId === dateId)
              .map((projectSchedule) => (
                <Card className='m-6'>
                  <CardHeader>
                    <div className='flex justify-end'>
                      <ScheduleDeleteDialog onDelete={() => deleteSchedule(projectSchedule.id)} />
                    </div>
                    <CardTitle>
                      {projectSchedule.startTime}~{projectSchedule.endTime}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-2'>{projectSchedule.description}</CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
