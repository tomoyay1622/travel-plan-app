'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { projects } from '@/mock/projects'
import { Project } from '@/model/Project'

import { useEffect, useState } from 'react'

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | undefined>(undefined)

  useEffect(() => {
    setProject(projects.find((project) => project.id === params.id))
  }, [])

  if (!project) {
    return null
  }

  return (
    <section className='p-10'>
      <h1 className='text-5xl font-bold'>箱根旅行計画</h1>
      <p>箱根は日本の神奈川県に位置する人気の観光地で、温泉、自然、美しい景観で知られています。</p>

      <Tabs defaultValue={project.dateIDs[0]} className='py-6 px-2'>
        <TabsList className='grid w-full grid-cols-2'>
          {project.dateIDs.map((dateID) => (
            <TabsTrigger value={dateID}>{dateID}</TabsTrigger>
          ))}
        </TabsList>
        {project.dateIDs.map((dateID) => (
          <TabsContent value={dateID} className='p-6'>
            <div className='flex justify-end'>
              <Button>Add Cards</Button>
            </div>
            {project.projectSchedules
              .filter((projectSchedule) => projectSchedule.dateID === dateID)
              .map((projectSchedule) => (
                <Card className='m-6'>
                  <CardHeader>
                    <CardTitle>
                      {projectSchedule.starttime}~{projectSchedule.endtime}
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
