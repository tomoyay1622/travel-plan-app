import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SelectTime() {
  return (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select time' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Time</SelectLabel>
          <SelectItem value='10'>10:00</SelectItem>
          <SelectItem value='11'>11:00</SelectItem>
          <SelectItem value='12'>12:00</SelectItem>
          <SelectItem value='13'>13:00</SelectItem>
          <SelectItem value='14'>14:00</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
