import { NextRequest } from 'next/server'
import { getDocs, query, collection } from 'firebase/firestore'
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
  const id = uuidv4()
}
