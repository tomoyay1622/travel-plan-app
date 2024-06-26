import { NextRequest } from 'next/server'
import { getDocs, query, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Project } from '@/model/Project'

import { v4 as uuidv4 } from 'uuid'

export async function GET(req: NextRequest) {
  const docRef = query(collection(db, 'project'))
  const docSnaps = await getDocs(docRef)

  const projects: Project[] = []
  docSnaps.forEach((doc) => {
    projects.push(doc.data() as Project)
  })

  return Response.json(projects)
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, dates } = await req.json()
    console.log({ title, description, dates })
    const id = uuidv4()
    const project: Project = {
      id,
      title,
      description,
      dates,
      projectSchedules: [],
    }
    const docRef = doc(db, 'project', id)
    await setDoc(docRef, project)
    return Response.json({ id })
  } catch (e) {
    console.log(e)
    return Response.json({ error: 'Error' }, { status: 504 })
  }
}
