export type Project = {
  title: string
  description: string
  id: string
  dates: ProjectDate[]
  projectSchedules: ProjectSchedule[]
}

export type ProjectDate = {
  id: string
  display: string
}

export type ProjectSchedule = {
  id: string
  dateId: string
  startTime: string
  endTime: string
  description: string
  note?: string
}
