'use client'

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
import { Button } from '@/components/ui/button'
import { SelectTime } from '@/components/projects/SelectTime'
import { useState } from 'react'
import { VscEdit } from 'react-icons/vsc'
import { compareAsc, parse } from 'date-fns'

type Props = {
  defaultValue: { startTime: string; endTime: string; description: string }
  onUpdate: (startTime: string, endTime: string, description: string) => void
}

export function ScheduleEditDialog(props: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [startTime, setStartTime] = useState<string>(props.defaultValue.startTime)
  const [endTime, setEndTime] = useState<string>(props.defaultValue.endTime)
  const [description, setDescription] = useState<string>(props.defaultValue.description)
  const [warn, setWarn] = useState<string>('')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='rounded border p-4'>
        <VscEdit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>更新</DialogTitle>
          <DialogDescription>予定を更新</DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='' className='text-right'>
              開始時間
            </Label>
            <SelectTime value={String(startTime)} onValueChange={(value) => setStartTime(value)} />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='' className='text-right'>
              終了時間
            </Label>
            <SelectTime value={String(endTime)} onValueChange={(value) => setEndTime(value)} />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='' className='text-right'>
              行き先
            </Label>
            <Input
              id=''
              value={description}
              className='col-span-3'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <p className='text-red-400'>{warn}</p>
          <div>
            <Button
              type='button'
              className='mx-2 text-white bg-black'
              onClick={() => {
                setWarn('')
                const flag =
                  compareAsc(
                    parse(startTime, 'HH:mm', new Date()),
                    parse(endTime, 'HH:mm', new Date()),
                  ) === -1
                console.log(flag)
                if (flag && description !== '') {
                  props.onUpdate(startTime, endTime, description)
                  setOpen(false)
                } else {
                  setWarn('正しい入力をしてください')
                }
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
