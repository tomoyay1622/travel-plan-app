'use client'

import { Project } from '@/model/Project'
import { LiaPlusSolid } from 'react-icons/lia'

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

type Props = {
  onSave: (title: string, description: string) => void
}

export function ProjectCreateDialog(props: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <article className='w-52 shadow p-4 rounded-md'>
          <h1 className='text-xl font-bold py-4'></h1>
          <p className='mt-2 object-center'>
            <LiaPlusSolid />
          </p>
          <p className='mt-2'>新規プロジェクトを作成</p>
        </article>
      </DialogTrigger>
      <DialogContent>
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
            <Input
              id=''
              defaultValue=''
              className='col-span-3'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button
              type='button'
              className='mx-2 text-white bg-black'
              onClick={() => {
                props.onSave(title, description)
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
