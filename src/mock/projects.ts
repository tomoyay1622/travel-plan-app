import { Project } from '@/model/Project'

export const projects: Project[] = [
  {
    title: '伊東',
    description: '5/8',
    id: '1',
    dateIDs: ['20240505', '20240506'],
    projectSchedules: [
      { dateID: '20240505', starttime: '11:00', endtime: '12:00', description: '芦ノ湖' },
      { dateID: '20240506', starttime: '12:00', endtime: '13:00', description: 'お昼ご飯' },
    ],
  },
]
