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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export const PasswordResetDialog = () => {
  const [email, setEmail] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span className='text-xs text-blue-500 hover:underline'>Forget password?</span>
      </DialogTrigger>

      <DialogContent className='w-auto'>
        <DialogHeader>Password reset</DialogHeader>
        <form className='w-auto p-4'>
          <div className='m-4'>
            <Label htmlFor='email'>E-mail</Label>
            <Input
              type='email'
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='off'
              id='email'
              className='w-52 '
            />
          </div>
          <div className='flex justify-center w-52 m-4 p-1'>
            <Button
              type='submit'
              onClick={async (e) => {
                e.preventDefault()
                sendPasswordResetEmail(auth, email)
                  .then(() => {
                    // Password reset email sent!
                    alert('送信完了！')
                    router.push('/')
                  })
                  .catch((error) => {
                    console.log(error)
                    const errorCode = error.code
                    const errorMessage = error.message
                    // ..
                  })
                // alert('signin completed!')
              }}
              className='w-44 bg-blue-500'
            >
              Reset password
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
