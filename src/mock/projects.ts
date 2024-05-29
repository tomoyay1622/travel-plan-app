import { Project } from '@/model/Project'

export const projects: Project[] = [
  {
    title: '伊東旅行',
    description: '伊東市は静岡県に位置し、美しい海岸線と豊かな温泉地で知られる観光地です。',
    id: '1',
    dateIds: ['20240505', '20240506'],
    projectSchedules: [
      {
        id: '1',
        dateId: '20240505',
        startTime: '11:00',
        endTime: '12:00',
        description: '伊東オレンジビーチ',
      },
      {
        id: '2',
        dateId: '20240506',
        startTime: '12:00',
        endTime: '13:00',
        description: 'お昼ご飯',
      },
    ],
  },
]
