import { NextRequest } from 'next/server'
import { doc, getDoc, setDoc } from 'firebase/firestore'
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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const project = await req.json()
    // console.log(project)
    const docRef = doc(db, 'project', params.id)
    await setDoc(docRef, project)
    return Response.json(params.id)
  } catch (e) {
    console.log(e)
    return Response.json({ error: 'Error' }, { status: 504 })
  }
}
