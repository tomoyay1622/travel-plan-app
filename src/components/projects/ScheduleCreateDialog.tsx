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

export function ScheduleCreateDialog() {
  return (
    <Dialog>
      <DialogTrigger className='rounded border p-4'>新規作成</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新規予定の作成</DialogTitle>
          <DialogDescription>新しい予定を入力</DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='' className='text-right'>
              開始時間
            </Label>
            <SelectTime></SelectTime>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='' className='text-right'>
              終了時間
            </Label>
            <SelectTime></SelectTime>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='' className='text-right'>
              行き先
            </Label>
            <Input id='' defaultValue='' className='col-span-3' />
          </div>
        </div>
        <DialogFooter>
          <div>
            <DialogClose asChild>
              <Button type='button' variant='secondary' className='mx-2'>
                閉じる
              </Button>
            </DialogClose>
            <Button type='button'>作る</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
