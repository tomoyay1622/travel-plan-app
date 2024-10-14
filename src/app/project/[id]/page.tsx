'use client'

import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { compareAsc, parse } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import { ScheduleCreateDialog } from '@/components/project/ScheduleCreateDialog'
import { ScheduleUpdateDialog } from '@/components/project/SheduleUpdateDialog'
import { ScheduleDeleteDialog } from '@/components/project/ScheduleDeleteDialog'
import { ProjectUpdateDialog } from '@/components/project/ProjectUpdateDialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import type { Project, ProjectDate } from '@/model/Project'
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/features/context/AuthContext'

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
  const { isLoggedIn, isAuthLoading } = useAuth()

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

  async function createSchedule(
    dateId: string,
    startTime: string,
    endTime: string,
    description: string,
    note?: string,
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
          note: note,
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
    note?: string,
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
          note: note,
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

  if (isAuthLoading) {
    return <main className='flex flex-col items-center min-h-screen m-24'>認証確認中でござる</main>
  }

  if (!isLoggedIn) {
    return (
      <main className='flex flex-col items-center min-h-screen m-24'>
        <span className='p-5 sm:p-16'>サインアウト中</span>
        <Link href={'/signin'}>
          <span className='m-10 p-3 rounded-lg border bg-yellow-500'>サインインへ</span>
        </Link>
      </main>
    )
  }

  if (!data) {
    return (
      <main className='flex flex-col items-center min-h-screen m-24'>データ取得中でござる</main>
    )
  }

  return (
    <>
      {/* <title>{project.title} | travel-plan-app</title> */}
      <main>
        <section className='sm:p-10 min-h-screen '>
          <div className='flex justify-between p-3 bg-gray-200'>
            <h1 className='flex items-center h-[50px] text-xl sm:text-3xl font-bold ml-2 sm:mb-4'>
              {data.title}
            </h1>
            <ProjectUpdateDialog
              project={data}
              onSave={(title, description, dates) =>
                onUpdateTitleAndDescriptionAndDates(title, description, dates)
              }
            />
          </div>
          <p className='hidden sm:block sm:m-3 items-center md:text-lg'>{data.description}</p>
          {data.description ? (
            <Accordion type='single' collapsible className='w-full sm:hidden py-0 px-5'>
              <AccordionItem value='item-1'>
                <AccordionTrigger className='px-2 py-0'>詳細</AccordionTrigger>
                <AccordionContent className='px-2 py-0'>{data.description}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <div></div>
          )}

          <Tabs defaultValue={data.dates[0].id} className='sm:px-2 bg-gray-200'>
            <TabsList className='w-full rounded-none'>
              {data.dates.map((date) => (
                <TabsTrigger key={date.id} value={date.id} className='w-full border'>
                  {date.display}
                </TabsTrigger>
              ))}
            </TabsList>
            {data.dates.map((date) => (
              <TabsContent key={date.id} value={date.id} className=''>
                <div className='flex justify-end m-4'>
                  <ScheduleCreateDialog
                    onSave={(startTime, endTime, description, note?) => {
                      createSchedule(date.id, startTime, endTime, description, note)
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
                    <Card key={projectSchedule.id} className='m-2 mb-4'>
                      <CardHeader className='flex flex-row items-center'>
                        <CardTitle className='text-lg'>{projectSchedule.description}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className='flex space-y-2 justify-between text-base'>
                          {projectSchedule.startTime}~
                          {!(projectSchedule.endTime === ':') && projectSchedule.endTime}
                          <div className='flex justify-end'>
                            <ScheduleUpdateDialog
                              defaultValue={{
                                startTime: projectSchedule.startTime,
                                endTime: projectSchedule.endTime,
                                description: projectSchedule.description,
                                note: projectSchedule.note,
                              }}
                              onUpdate={(startTime, endTime, description, note?) =>
                                updateSchedule(
                                  projectSchedule.id,
                                  projectSchedule.dateId,
                                  startTime,
                                  endTime,
                                  description,
                                  note,
                                )
                              }
                            />
                            <ScheduleDeleteDialog
                              onDelete={() => deleteSchedule(projectSchedule.id)}
                            />
                          </div>
                        </div>
                        {projectSchedule.note ? (
                          <Accordion type='single' collapsible className='w-full'>
                            <AccordionItem value='item-1'>
                              <AccordionTrigger>詳細</AccordionTrigger>
                              <AccordionContent>{projectSchedule.note}</AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ) : (
                          <div></div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>
    </>
  )
}
