export type Locale = 'bn' | 'en';

export const translations = {
  bn: {
    admin: {
      title: 'এডমিন ড্যাশবোর্ড',
      dashboard: 'ড্যাশবোর্ড',
      users: 'ব্যবহারকারী',
      stories: 'গল্পসমূহ',
      chapters: 'অধ্যায়সমূহ',
      submissions: 'আবেদনসমূহ',
      categories: 'বিভাগসমূহ',
      comments: 'মন্তব্যসমূহ',
      reports: 'রিপোর্টসমূহ',
      moderation: 'মডারেশন',
      analytics: 'এনালিটিক্স',
      payments: 'পেমেন্ট',
      settings: 'সেটিংস',
      logout: 'লগআউট',
    },
    common: {
      switchLanguage: 'ভাষা পরিবর্তন',
      switchTheme: 'থিম পরিবর্তন',
    },
  },
  en: {
    admin: {
      title: 'Admin Dashboard',
      dashboard: 'Dashboard',
      users: 'Users',
      stories: 'Stories',
      chapters: 'Chapters',
      submissions: 'Submissions',
      categories: 'Categories',
      comments: 'Comments',
      reports: 'Reports',
      moderation: 'Moderation',
      analytics: 'Analytics',
      payments: 'Payments',
      settings: 'Settings',
      logout: 'Logout',
    },
    common: {
      switchLanguage: 'Change Language',
      switchTheme: 'Toggle Theme',
    },
  },
} as const;
