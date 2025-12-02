export interface Activity {
  date: string;
  titleKey: string;
  descriptionKey: string;
}

export const Activities: Activity[] = [
  { date: '2019-03-01', titleKey: 'activity.0.title', descriptionKey: 'activity.0.description' },
  {
    date: '2020-08-04',
    titleKey: 'activity.1.title',
    descriptionKey: 'activity.1.description',
  },
  { date: '2022-02-03', titleKey: 'activity.2.title', descriptionKey: 'activity.2.description' },
  {
    date: '2024-11-01',
    titleKey: 'activity.3.title',
    descriptionKey: 'activity.3.description',
  },
  {
    date: '2024-12-11',
    titleKey: 'activity.4.title',
    descriptionKey: 'activity.4.description',
  },
  {
    date: '2025-02-01',
    titleKey: 'activity.5.title',
    descriptionKey: 'activity.5.description',
  },
  {
    date: '2025-08-13',
    titleKey: 'activity.6.title',
    descriptionKey: 'activity.6.description',
  },
];
