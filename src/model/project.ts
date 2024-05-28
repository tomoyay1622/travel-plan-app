export type Project = {
  title: string
  description: string
  id: string
  dateIds: string[]
  projectSchedules: ProjectSchedule[]
}

export type ProjectSchedule = {
  dateId: string
  startTime: string
  endTime: string
  description: string
}
