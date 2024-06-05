import { NextRequest } from 'next/server'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const docRef = doc(db, 'project', params.id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return Response.json(docSnap.data())
  } else {
    return Response.json({ error: 'Error' }, { status: 404 })
  }
}
