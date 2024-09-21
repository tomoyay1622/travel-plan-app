'use client'

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
import { SelectHour, SelectMinute } from '@/components/project/SelectTime'
import { useState, useEffect } from 'react'
import { VscEdit } from 'react-icons/vsc'
import { compareAsc, parse } from 'date-fns'

type Props = {
  defaultValue: { startTime: string; endTime: string; description: string }
  onUpdate: (startTime: string, endTime: string, description: string) => void
}

export function ScheduleUpdateDialog(props: Props) {
  const startTimeParts: string[] = props.defaultValue.startTime.split(':')
  const endTimeParts: string[] = props.defaultValue.endTime.split(':')
  const [open, setOpen] = useState<boolean>(false)
  const [startHour, setStartHour] = useState<string>(startTimeParts[0])
  const [startMinute, setStartMinute] = useState<string>(startTimeParts[1])
  const [endHour, setEndHour] = useState<string>(endTimeParts[0])
  const [endMinute, setEndMinute] = useState<string>(endTimeParts[1])
  const [description, setDescription] = useState<string>(props.defaultValue.description)

  // ダイアログが閉じられた時にフォームをリセット
  useEffect(() => {
    if (!open) {
      setStartHour(startTimeParts[0])
      setStartMinute(startTimeParts[1])
      setEndHour(endTimeParts[0])
      setEndMinute(endTimeParts[1])
      setDescription(props.defaultValue.description)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='rounded border p-4'>
        <VscEdit />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>更新</DialogTitle>
          {/* <DialogDescription>予定を更新</DialogDescription> */}
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='justify-center items-center flex '>
            <Label htmlFor='' className=' w-[80px]'>
              開始時間
            </Label>
            <div className='flex'>
              <SelectHour
                value={startHour}
                onValueChange={(value) => {
                  // console.log(value)
                  setStartHour(value)
                }}
              />
              <p className='text-center m-2'>:</p>
              <SelectMinute
                value={startMinute}
                onValueChange={(value) => {
                  setStartMinute(value)
                }}
              />
            </div>
          </div>
          <div className='flex justify-center items-center '>
            <Label htmlFor='select-end-time' className=' w-[80px]'>
              終了時間
            </Label>
            <div className='flex'>
              <SelectHour
                value={endHour}
                onValueChange={(value) => {
                  setEndHour(value)
                }}
              />
              <p className='text-center m-2'>:</p>
              <SelectMinute
                value={endMinute}
                onValueChange={(value) => {
                  setEndMinute(value)
                }}
              />
            </div>
            {/* <Input
              type='time'
              id='select-end-time'
              value={endTime}
              className='w-auto text-xl ml-2'
              onChange={(e) => {
                setEndTime(e.target.value)
                console.log(endTime)
                console.log(typeof endTime)
              }}
            /> */}
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='' className='text-right'>
              行き先
            </Label>
            <Input
              type='text'
              id=''
              value={description}
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
                const startTime = startHour + ':' + startMinute
                const endTime = endHour + ':' + endMinute
                const flag =
                  compareAsc(
                    parse(startTime, 'HH:mm', new Date()),
                    parse(endTime, 'HH:mm', new Date()),
                  ) === -1
                let errorMessage: string = ''
                if (!flag) {
                  errorMessage =
                    errorMessage + '・開始時間の後に終了時間が来るようにしてください。\n'
                }
                if (description === '') {
                  errorMessage = errorMessage + '・行き先が入力されていません。'
                }
                if (!errorMessage) {
                  props.onUpdate(startTime, endTime, description)
                  setOpen(false)
                } else {
                  window.alert(errorMessage)
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
