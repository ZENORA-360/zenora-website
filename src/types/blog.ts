export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  content: string;
  contentEn?: string;
  coverImage: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  categoryEn?: string;
  tags: string[];
  tagsEn?: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  isPublished: boolean;
  gallery?: string[];
}

export interface BlogFormData {
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  content: string;
  contentEn?: string;
  coverImage: string;
  category: string;
  categoryEn?: string;
  tags: string[];
  tagsEn?: string[];
  isPublished: boolean;
}

export interface BlogFilters {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type ConnectionStatus = 'online' | 'offline' | 'slow' | 'error';
