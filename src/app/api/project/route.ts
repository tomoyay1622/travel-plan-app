import { NextRequest } from 'next/server'
import { doc, getDocs, setDoc, query, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Project } from '@/model/Project'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const docRef = query(collection(db, 'project'))
  const docSnaps = await getDocs(docRef)

  const projects: Project[] = []
  docSnaps.forEach((doc) => {
    projects.push(doc.data() as Project)
  })

  return Response.json(projects)
}
