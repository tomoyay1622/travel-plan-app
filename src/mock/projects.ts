import { Project } from '@/model/Project'

export const projects: Project[] = [
  {
    title: '伊東旅行',
    description: '伊東市は静岡県に位置し、美しい海岸線と豊かな温泉地で知られる観光地です。',
    id: '1',
    dateIDs: ['20240505', '20240506'],
    projectSchedules: [
      {
        dateID: '20240505',
        starttime: '11:00',
        endtime: '12:00',
        description: '伊東オレンジビーチ',
      },
      { dateID: '20240506', starttime: '12:00', endtime: '13:00', description: 'お昼ご飯' },
    ],
  },
]
