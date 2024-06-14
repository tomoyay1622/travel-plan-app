'use client'

import useSWR, { mutate } from 'swr'

import { ScheduleCreateDialog } from '@/components/projects/ScheduleCreateDialog'
import { ScheduleDeleteDialog } from '@/components/projects/ScheduleDeleteDialog'
import { ScheduleEditDialog } from '@/components/projects/SheduleEditDialog'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Project } from '@/model/Project'

import { v4 as uuidv4 } from 'uuid'

export default function ProjectDetail({ params }: { params: { id: string } }) {
  // const [project, setProject] = useState<Project | undefined>(undefined)

  // useEffect(() => {
  //   setProject(projects.find((project) => project.id === params.id))
  // }, [])

  const {
    data: project,
    error,
    isLoading,
  } = useSWR<Project>(`http://localhost:3000/api/project/${params.id}`, (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .catch((res) => console.log(res)),
  )
  console.log(project)
  if (!project) {
    return null
  }

  function createSchedule(dateId: string, startTime: number, endTime: number, description: string) {
    if (!project) {
      return
    }
    const id = uuidv4()
    fetch(`http://localhost:3000/api/project/${params.id}`, {
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
    }).then((res) => mutate(`http://localhost:3000/api/project/${params.id}`))
  }

  function updateSchedule(
    id: string,
    dateId: string,
    startTime: number,
    endTime: number,
    description: string,
  ) {
    if (!project) {
      return
    }
    fetch(`http://localhost:3000/api/project/${params.id}`, {
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
    }).then((res) => mutate(`http://localhost:3000/api/project/${params.id}`))
  }

  function deleteSchedule(id: string) {
    if (!project) {
      return
    }
    fetch(`http://localhost:3000/api/project/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...project,
        projectSchedules: project.projectSchedules.filter(
          (projectSchedule) => projectSchedule.id !== id,
        ),
      }),
    }).then((res) => mutate(`http://localhost:3000/api/project/${params.id}`))
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
                      <ScheduleEditDialog
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
                    <CardTitle>
                      {projectSchedule.startTime}:00~{projectSchedule.endTime}:00
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
