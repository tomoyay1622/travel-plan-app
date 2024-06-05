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
        startTime: 11,
        endTime: 12,
        description: '伊東オレンジビーチ',
      },
      {
        id: '2',
        dateId: '20240506',
        startTime: 12,
        endTime: 13,
        description: 'お昼ご飯',
      },
    ],
  },
  {
    title: '箱根旅行',
    description: '箱根は神奈川県に位置し、よく知られる観光地です。',
    id: '2',
    dateIds: ['20240505', '20240506'],
    projectSchedules: [
      {
        id: '1',
        dateId: '20240505',
        startTime: 11,
        endTime: 12,
        description: '大涌谷',
      },
      {
        id: '2',
        dateId: '20240506',
        startTime: 12,
        endTime: 13,
        description: 'ユネッサン',
      },
    ],
  },
]
