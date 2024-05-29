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

type Props = { onDelete: () => void }

export function ScheduleDeleteDialog(props: Props) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='rounded border p-4'>✕</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>この予定を削除しますか？</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div>
            <Button
              type='button'
              className='mx-2 text-white bg-black'
              onClick={() => {
                props.onDelete()
                setOpen(false)
              }}
            >
              削除
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
