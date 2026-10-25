/**
 * Platform Constants
 */

export const APP_CONFIG = {
  name: 'BengaliStory',
  defaultLocale: 'bn' as const,
  supportedLocales: ['bn', 'en'] as const,
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  storageKeys: {
    locale: 'bengali_story_locale',
    theme: 'bengali_story_theme',
    token: 'bengali_story_auth_token',
  },
  cookieKeys: {
    locale: 'bengali_story_locale',
    token: 'bengali_story_token',
  },
  pagination: {
    defaultPageSize: 12,
    storiesPageSize: 12,
    chaptersPageSize: 20,
    commentsPageSize: 10,
  },
} as const;

export const ROUTES = {
  home: '/',
  stories: '/stories',
  storyDetail: (slug: string) => `/stories/${slug}`,
  chapterDetail: (slug: string, chapterNumber: number) => `/stories/${slug}/chapters/${chapterNumber}`,
  categories: '/categories',
  categoryDetail: (slug: string) => `/categories/${slug}`,
  authors: '/authors',
  authorProfile: (username: string) => `/profile/${username}`,
  rankings: '/rankings',
  search: '/search',
  write: '/write',
  writeNewStory: '/write/stories/new',
  writeChapter: (chapterId: string) => `/write/chapters/${chapterId}`,
  dashboard: '/dashboard',
  library: '/dashboard/library',
  history: '/dashboard/history',
  following: '/dashboard/following',
  notifications: '/dashboard/notifications',
  login: '/login',
  register: '/register',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
} as const;
