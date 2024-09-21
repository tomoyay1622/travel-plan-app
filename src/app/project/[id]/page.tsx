'use client'

import useSWR from 'swr'
import { compareAsc, parse } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import { ScheduleCreateDialog } from '@/components/project/ScheduleCreateDialog'
import { ScheduleUpdateDialog } from '@/components/project/SheduleUpdateDialog'
import { ScheduleDeleteDialog } from '@/components/project/ScheduleDeleteDialog'
// import { ScheduleCUDialog } from '@/components/project/SheduleCUDialog'
import { TitleEditDialog } from '@/components/project/TitleEditDialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Project, ProjectDate } from '@/model/Project'
// import { VscEdit } from 'react-icons/vsc'
// import { IoAddSharp } from 'react-icons/io5'

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const {
    data: project,
    error,
    isLoading,
    mutate,
  } = useSWR<Project>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .catch((res) => console.log(res)),
    // 自動更新するタイムを設定
    { refreshInterval: 60000 },
  )

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

  if (!project) {
    return null
  }

  async function createSchedule(
    dateId: string,
    startTime: string,
    endTime: string,
    description: string,
  ) {
    if (!project) {
      return
    }
    const id = uuidv4()
    const newSchedule = {
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
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSchedule),
    })
    // .then((res) => mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`))
    mutate(newSchedule, false)
  }

  async function updateSchedule(
    id: string,
    dateId: string,
    startTime: string,
    endTime: string,
    description: string,
  ) {
    if (!project) {
      return
    }
    const newSchedule = {
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
    }
    mutate(newSchedule, false)
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSchedule),
    })
    // .then((res) => mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`))
  }

  async function deleteSchedule(id: string) {
    if (!project) {
      return
    }
    const newSchedule = {
      ...project,
      projectSchedules: project.projectSchedules.filter(
        (projectSchedule) => projectSchedule.id !== id,
      ),
    }
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSchedule),
    })
    // .then((res) => mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`))
    mutate(newSchedule, false)
  }

  async function onUpdateTitleAndScheduleAndDescription(
    title: string,
    description: string,
    dates: ProjectDate[],
  ) {
    if (!project) {
      return
    }
    const newSchedule = {
      ...project,
      title,
      description,
      dates,
    }
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSchedule),
    })
    // .then((res) => mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`))
    mutate(newSchedule, false)
  }

  return (
    <>
      <title>{project.title} | travel-plan-app</title>
      <div className='sm:p-10 min-h-screen'>
        <div className='flex items-center justify-start'>
          <div>
            <h1 className='text-5xl font-bold ml-2 md:mb-4'>{project.title}</h1>
            <p className='md:text-lg'>{project.description}</p>
          </div>
        </div>
        <div className='flex items-center justify-end'>
          <TitleEditDialog
            project={project}
            onSave={(title, description, dates) =>
              onUpdateTitleAndScheduleAndDescription(title, description, dates)
            }
          />
        </div>
        <Tabs defaultValue={project.dates[0].id} className='py-6 sm:px-2'>
          <TabsList className='w-full '>
            {project.dates.map((date) => (
              <TabsTrigger key={date.id} value={date.id} className='w-full border-r'>
                {date.display}
              </TabsTrigger>
            ))}
          </TabsList>
          {project.dates.map((date) => (
            <TabsContent key={date.id} value={date.id} className=''>
              <div className='flex justify-end m-4'>
                <ScheduleCreateDialog
                  onSave={(startTime, endTime, description) => {
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
                    <CardHeader className='flex flex-row items-center'>
                      <CardTitle>{projectSchedule.description}</CardTitle>
                    </CardHeader>
                    <CardContent className='flex space-y-2 justify-between'>
                      {projectSchedule.startTime}~{projectSchedule.endTime}
                      <div className='flex justify-end'>
                        <ScheduleUpdateDialog
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
                        <ScheduleDeleteDialog onDelete={() => deleteSchedule(projectSchedule.id)} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
