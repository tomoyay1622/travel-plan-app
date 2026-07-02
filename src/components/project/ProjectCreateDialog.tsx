'use client'

import { useState } from 'react'
import type { ProjectDate } from '@/model/Project'
import { LiaPlusSolid } from 'react-icons/lia'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { v4 as uuidv4 } from 'uuid'
import { IoAddSharp } from 'react-icons/io5'
import { RxTrash } from 'react-icons/rx'

type Props = {
  onSave: (title: string, description: string, dates: ProjectDate[]) => void
}

export function ProjectCreateDialog(props: Props) {
  const id = uuidv4()

  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [dates, setDates] = useState<ProjectDate[]>([{ id, display: '' }])
  const [description, setDescription] = useState<string>('')

  function updateDate(id: string, display: string) {
    setDates((dates) => [...dates.filter((date) => date.id !== id), { id: id, display: display }])
  }

  function deleteDate(id: string) {
    if (dates.length === 1) {
      return
    }

    setDates((dates) => [...dates.filter((date) => date.id !== id)])
  }

  function createDate() {
    const id = uuidv4()
    setDates((dates) => [...dates, { id: id, display: '' }])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='m-0'>
        <article className='bg-white w-52 h-44 shadow p-4 rounded-md hover:shadow-xl'>
          <h1 className='text-xl font-bold py-4'></h1>
          <p className='mt-2 object-center'>
            <LiaPlusSolid />
          </p>
          <p className='mt-2'>新規プロジェクトを作成</p>
        </article>
      </DialogTrigger>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>新規作成</DialogTitle>
          <DialogDescription>新しいプロジェクト名を入力</DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='' className='text-right'>
              タイトル
            </Label>
            <Input
              id=''
              defaultValue=''
              className='col-span-3'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='' className='text-right'>
              概要
            </Label>
            <Textarea
              id=''
              defaultValue=''
              className='col-span-3'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            {dates.map((date, i) => {
              return (
                <div key={date.id} className='grid grid-cols-4 items-center gap-4'>
                  {i === 0 ? (
                    <Label htmlFor='' className='text-right'>
                      日付
                    </Label>
                  ) : (
                    <div />
                  )}
                  <Input
                    type='date'
                    id='date'
                    defaultValue={date.display}
                    className='col-span-2'
                    onChange={(e) => updateDate(date.id, e.target.value)}
                  />
                  <Button onClick={() => deleteDate(date.id)}>
                    <RxTrash />
                  </Button>
                </div>
              )
            })}
            <div className='grid grid-cols-4 items-center gap-4'>
              <div className='col-span-3' />
              <Button onClick={() => createDate()}>
                <IoAddSharp />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button
              type='button'
              className='mx-2 text-white bg-black'
              onClick={() => {
                props.onSave(title, description, dates)
                setOpen(false)
              }}
            >
              保存
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
