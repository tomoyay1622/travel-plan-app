'use client'

import { Project, ProjectDate } from '@/model/Project'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { LiaPlusSolid } from 'react-icons/lia'
import { RxTrash } from 'react-icons/rx'
import { v4 as uuidv4 } from 'uuid'
import { IoAddSharp } from 'react-icons/io5'

type Props = {
  project: Project
  onSave: (title: string, description: string, dates: ProjectDate[]) => void
}

export function TitleEditDialog(props: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(props.project.title)
  const [dates, setDates] = useState<ProjectDate[]>(props.project.dates)
  const [description, setDescription] = useState<string>(props.project.description)

  function updateDate(id: string, display: string) {
    setDates((dates) => [...dates.filter((date) => date.id !== id), { id: id, display: display }])
  }

  function deleteDate(id: string) {
    if (props.project.projectSchedules.some((projectSchedule) => projectSchedule.dateId === id)) {
      return
    }
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
      <DialogTrigger className='bg-black text-white p-4 rounded '>編集</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>編集</DialogTitle>
          <DialogDescription>タイトルと概要を更新</DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='' className='text-right'>
              タイトル
            </Label>
            <Input
              id=''
              defaultValue={title}
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
              defaultValue={description}
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
                    id=''
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
