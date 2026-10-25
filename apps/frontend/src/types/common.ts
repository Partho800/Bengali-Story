export type Locale = 'bn' | 'en';
export type Theme = 'light' | 'dark' | 'system';

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
}
