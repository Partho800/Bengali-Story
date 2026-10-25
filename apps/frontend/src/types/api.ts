import { Story, Chapter, Category } from './story';
import { User, AuthorProfile } from './user';
import { PaginatedResponse, ApiResponse } from './common';

export interface StoriesFilterParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  categorySlug?: string;
  status?: string;
  sort?: 'trending' | 'newest' | 'popular' | 'topRated';
  search?: string;
  isCompleted?: boolean;
}

export type StoriesResponse = ApiResponse<PaginatedResponse<Story>>;
export type StoryResponse = ApiResponse<Story>;
export type ChaptersResponse = ApiResponse<Chapter[]>;
export type ChapterResponse = ApiResponse<Chapter>;
export type CategoriesResponse = ApiResponse<Category[]>;
export type AuthorsResponse = ApiResponse<PaginatedResponse<AuthorProfile>>;
export type AuthorResponse = ApiResponse<AuthorProfile>;
export type AuthResponse = ApiResponse<{ user: User; token: string }>;
