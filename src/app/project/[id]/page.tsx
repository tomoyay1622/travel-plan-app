'use client'

import useSWR, { mutate } from 'swr'
import { compareAsc, parse } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

import { ScheduleCreateDialog } from '@/components/project/ScheduleCreateDialog'
import { ScheduleDeleteDialog } from '@/components/project/ScheduleDeleteDialog'
import { ScheduleUpdateDialog } from '@/components/project/SheduleUpdateDialog'
import { ScheduleCUDialog } from '@/components/project/SheduleCUDialog'
import { TitleEditDialog } from '@/components/project/TitleEditDialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Project, ProjectDate } from '@/model/Project'
import { VscEdit } from 'react-icons/vsc'
import { IoAddSharp } from 'react-icons/io5'

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const {
    data: project,
    error,
    isLoading,
  } = useSWR<Project>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .catch((res) => console.log(res)),
  )

  if (isLoading) {
    return <main className='flex flex-col items-center min-h-screen m-24'>データ取得中...</main>
  }

  if (!project) {
    return null
  }

  function createSchedule(dateId: string, startTime: string, endTime: string, description: string) {
    if (!project) {
      return
    }
    const id = uuidv4()
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
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
      }),
    }).then((res) => mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`))
  }

  function updateSchedule(
    id: string,
    dateId: string,
    startTime: string,
    endTime: string,
    description: string,
  ) {
    if (!project) {
      return
    }
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...project,
        projectSchedules: [
          ...project.projectSchedules.filter((projectSchedule) => projectSchedule.id !== id),
          {
            id: id,
            dateId: dateId,
            startTime: startTime,
            endTime: endTime,
            description: description,
          },
        ],
      }),
    }).then((res) => mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`))
  }

  function deleteSchedule(id: string) {
    if (!project) {
      return
    }
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...project,
        projectSchedules: project.projectSchedules.filter(
          (projectSchedule) => projectSchedule.id !== id,
        ),
      }),
    }).then((res) => mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`))
  }

  function onUpdateTitle(title: string, description: string, dates: ProjectDate[]) {
    if (!project) {
      return
    }
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...project,
        title,
        description,
        dates,
      }),
    }).then((res) => mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`))
  }

  return (
    <>
      <title>{project.title} | travel-plan-app</title>
      <div>
        <section className='p-10'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-5xl font-bold md:mb-4'>{project.title}</h1>
              <p>{project.description}</p>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <p></p>
            <TitleEditDialog
              project={project}
              onSave={(title, description, dates) => onUpdateTitle(title, description, dates)}
            />
          </div>
          <Tabs defaultValue={project.dates[0].id} className='py-6 px-2'>
            <TabsList className='w-full '>
              {project.dates.map((date) => (
                <TabsTrigger key={date.id} value={date.id} className='w-full border-r'>
                  {date.display}
                </TabsTrigger>
              ))}
            </TabsList>
            {project.dates.map((date) => (
              <TabsContent key={date.id} value={date.id} className='p-3'>
                <div className='flex justify-end m-4'>
                  <ScheduleCUDialog
                    title='新規作成'
                    defaultValue={{ startTime: '00:00', endTime: '00:00', description: '' }}
                    icon={<IoAddSharp />}
                    onUpdate={(startTime, endTime, description) => {
                      createSchedule(date.id, startTime, endTime, description)
                    }}
                  />
                </div>
                {project.projectSchedules
                  .filter((projectSchedule) => projectSchedule.dateId === date.id)
                  .sort((a, b) =>
                    compareAsc(
                      parse(a.startTime, 'HH:mm', new Date()),
                      parse(b.startTime, 'HH:mm', new Date()),
                    ),
                  )
                  .map((projectSchedule) => (
                    <Card key={projectSchedule.id} className='mb-6'>
                      <CardHeader className='flex flex-row items-center justify-between'>
                        <CardTitle>{projectSchedule.description}</CardTitle>
                      </CardHeader>
                      <CardContent className='flex flex-col space-y-2 flex justify-between'>
                        {projectSchedule.startTime}~{projectSchedule.endTime}
                        <div className='sm:flex justify-end'>
                          <ScheduleCUDialog
                            title='更新'
                            icon={<VscEdit />}
                            defaultValue={{
                              startTime: projectSchedule.startTime,
                              endTime: projectSchedule.endTime,
                              description: projectSchedule.description,
                            }}
                            onUpdate={(startTime, endTime, description) =>
                              updateSchedule(
                                projectSchedule.id,
                                projectSchedule.dateId,
                                startTime,
                                endTime,
                                description,
                              )
                            }
                          />
                          <ScheduleDeleteDialog
                            onDelete={() => deleteSchedule(projectSchedule.id)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </div>
    </>
  )
}
