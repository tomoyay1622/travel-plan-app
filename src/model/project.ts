export type Project = {
  title: string
  description: string
  id: string
  dateIDs: string[]
  projectSchedules: ProjectSchedule[]
}

export type ProjectSchedule = {
  dateID: string
  starttime: string
  endtime: string
  description: string
}
