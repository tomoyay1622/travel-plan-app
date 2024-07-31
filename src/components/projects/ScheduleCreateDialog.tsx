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
import { IoAddSharp } from 'react-icons/io5'
import { compareAsc, parse } from 'date-fns'

type Props = {
  onSave: (startTime: string, endTime: string, description: string) => void
}

export function ScheduleCreateDialog(props: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [warning, setWarning] = useState<string>('')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='rounded border p-4 mb-6'>
        <IoAddSharp />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新規作成</DialogTitle>
          <DialogDescription>新しい予定を入力</DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='' className='text-right'>
              開始時間
            </Label>
            <SelectTime value={startTime} onValueChange={(value) => setStartTime(value)} />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='' className='text-right'>
              終了時間
            </Label>
            <SelectTime value={endTime} onValueChange={(value) => setEndTime(value)} />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='' className='text-right'>
              行き先
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
          <div className='flex'>
            <Button
              type='button'
              className='mx-2 text-white bg-black'
              onClick={() => {
                setWarning('')
                const flag =
                  compareAsc(
                    parse(startTime, 'HH:mm', new Date()),
                    parse(endTime, 'HH:mm', new Date()),
                  ) === -1
                console.log(flag)
                if (flag && description !== '') {
                  props.onSave(startTime, endTime, description)
                  setOpen(false)
                } else {
                  setWarning('正しい入力をしてください')
                }
              }}
            >
              保存
            </Button>
            <p className='flex text-red-400 items-center'>{warning}</p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
