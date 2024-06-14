export type Project = {
  title: string
  description: string
  id: string
  dateIds: string[]
  projectSchedules: ProjectSchedule[]
}

export type ProjectSchedule = {
  id: string
  dateId: string
  startTime: number
  endTime: number
  description: string
}
