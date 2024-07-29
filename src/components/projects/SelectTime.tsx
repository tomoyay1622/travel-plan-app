'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props = {
  value?: string
  onValueChange?: (value: string) => void
}

export function SelectTime(props: Props) {
  const times = [
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
    '24:00',
  ]
  return (
    <Select value={props.value} onValueChange={props.onValueChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select time' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>time</SelectLabel>
          {times.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
