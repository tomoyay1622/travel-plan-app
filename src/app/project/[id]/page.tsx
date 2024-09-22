'use client'

import useSWR from 'swr'
import { useState, useEffect } from 'react'
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
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
// import { VscEdit } from 'react-icons/vsc'
// import { IoAddSharp } from 'react-icons/io5'

export default function ProjectDetail({ params }: { params: { id: string } }) {
  // const {
  //   data: project,
  //   error,
  //   isLoading,
  //   mutate,
  // } = useSWR<Project>(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`,
  //   (url: string) =>
  //     fetch(url)
  //       .then((res) => res.json())
  //       .catch((res) => console.log(res)),
  //   // 自動更新するタイムを設定
  //   { refreshInterval: 60000 },
  // )
  const [data, setData] = useState<Project | null>(null)
  const docRef = doc(db, 'project', params.id)

  // Firestoreからデータを取得する関数
  const fetchData = async () => {
    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setData(docSnap.data() as Project)
      } else {
        setData(null)
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData()
    // Firestore リアルタイムリスナー (データの変更があったとき)
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data() as Project)
      }
    })

    // コンポーネントのアンマウント時にクリーンアップ
    return () => {
      unsubscribe()
    }
  }, [])

  // if (isLoading) {
  //   return <main className='flex flex-col items-center min-h-screen m-24'>データ取得中...</main>
  // }

  // if (error) {
  //   return (
  //     <main className='flex flex-col items-center min-h-screen m-24'>
  //       データ取得に失敗しました。
  //     </main>
  //   )
  // }

  // if (!project) {
  //   return null
  // }

  if (!data) {
    return (
      <main className='flex flex-col items-center min-h-screen m-24'>データ取得中でござる</main>
    )
  }

  async function createSchedule(
    dateId: string,
    startTime: string,
    endTime: string,
    description: string,
  ) {
    if (!data) {
      return
    }
    const id = uuidv4()
    const newSchedule = {
      ...data,
      projectSchedules: [
        ...data.projectSchedules,
        {
          id: id,
          dateId: dateId,
          startTime: startTime,
          endTime: endTime,
          description: description,
        },
      ],
    }
    await setDoc(docRef, newSchedule)
    // .then((res) => mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`))
    // mutate(newSchedule, false)
  }

  async function updateSchedule(
    id: string,
    dateId: string,
    startTime: string,
    endTime: string,
    description: string,
  ) {
    if (!data) {
      return
    }
    const newSchedule = {
      ...data,
      projectSchedules: [
        ...data.projectSchedules.filter((projectSchedule) => projectSchedule.id !== id),
        {
          id: id,
          dateId: dateId,
          startTime: startTime,
          endTime: endTime,
          description: description,
        },
      ],
    }
    await setDoc(docRef, newSchedule)
    // .then((res) => mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`))
    // mutate(newSchedule, false)
  }

  async function deleteSchedule(id: string) {
    if (!data) {
      return
    }
    const newSchedule = {
      ...data,
      projectSchedules: data.projectSchedules.filter(
        (projectSchedule) => projectSchedule.id !== id,
      ),
    }
    await setDoc(docRef, newSchedule)
    // .then((res) => mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`))
    // mutate(newSchedule, false)
  }

  async function onUpdateTitleAndDescriptionAndDates(
    title: string,
    description: string,
    dates: ProjectDate[],
  ) {
    if (!data) {
      return
    }
    const newSchedule = {
      ...data,
      title,
      description,
      dates,
    }
    await setDoc(docRef, newSchedule)
    // .then((res) => mutate(`${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${params.id}`))
    // mutate(newSchedule, false)
  }

  return (
    <>
      {/* <title>{project.title} | travel-plan-app</title> */}
      <div className='sm:p-10 min-h-screen'>
        <h1 className='text-5xl font-bold ml-2 md:mb-4'>{data.title}</h1>
        <div className='sm:flex justify-between'>
          <p className='flex items-center md:text-lg'>{data.description}</p>
          <div className='flex items-end'>
            <TitleEditDialog
              project={data}
              onSave={(title, description, dates) =>
                onUpdateTitleAndDescriptionAndDates(title, description, dates)
              }
            />
          </div>
        </div>

        <Tabs defaultValue={data.dates[0].id} className='py-6 sm:px-2'>
          <TabsList className='w-full '>
            {data.dates.map((date) => (
              <TabsTrigger key={date.id} value={date.id} className='w-full border-r'>
                {date.display}
              </TabsTrigger>
            ))}
          </TabsList>
          {data.dates.map((date) => (
            <TabsContent key={date.id} value={date.id} className=''>
              <div className='flex justify-end m-4'>
                <ScheduleCreateDialog
                  onSave={(startTime, endTime, description) => {
                    createSchedule(date.id, startTime, endTime, description)
                  }}
                />
              </div>
              {data.projectSchedules
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
