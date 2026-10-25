import { User } from './user';

export type StoryStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'REJECTED' | 'ARCHIVED';
export type ChapterStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'REJECTED';

export interface Category {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: string;
  descriptionBn?: string | null;
  descriptionEn?: string | null;
  iconName?: string | null;
  storyCount?: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Chapter {
  id: string;
  storyId: string;
  chapterNumber: number;
  title: string;
  content: string; // Tiptap JSON or HTML
  wordCount: number;
  status: ChapterStatus;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  likesCount?: number;
  commentsCount?: number;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  synopsis: string;
  coverImage?: string | null;
  authorId: string;
  author: User;
  categoryId: string;
  category: Category;
  tags?: Tag[];
  status: StoryStatus;
  isCompleted: boolean;
  totalChapters: number;
  viewsCount: number;
  likesCount: number;
  bookmarksCount: number;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  chapters?: Chapter[];
  isBookmarked?: boolean;
  isLiked?: boolean;
}

export interface ReadingProgress {
  id: string;
  userId: string;
  storyId: string;
  chapterId: string;
  chapterNumber: number;
  percentage: number;
  updatedAt: string;
}
