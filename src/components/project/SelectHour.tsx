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

export function SelectHour(props: Props) {
  const times = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ]
  return (
    <Select value={props.value} onValueChange={props.onValueChange}>
      <SelectTrigger className='w-[90px]'>
        <SelectValue placeholder='' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>h</SelectLabel>
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
