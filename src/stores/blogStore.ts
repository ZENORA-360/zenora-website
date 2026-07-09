import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BlogPost, BlogFilters, ConnectionStatus } from '@/types/blog';

interface BlogState {
  // Data
  posts: BlogPost[];
  currentPost: BlogPost | null;
  
  // Pagination
  totalPosts: number;
  currentPage: number;
  totalPages: number;
  limit: number;
  
  // UI States
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  connectionStatus: ConnectionStatus;
  
  // Filters
  filters: BlogFilters;
  
  // Cache
  lastFetched: number | null;
  cacheExpiry: number; // in milliseconds
  
  // Actions
  setPosts: (posts: BlogPost[], total: number, page: number, totalPages: number) => void;
  appendPosts: (posts: BlogPost[]) => void;
  setCurrentPost: (post: BlogPost | null) => void;
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  
  setLoading: (loading: boolean) => void;
  setLoadingMore: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  
  setFilters: (filters: BlogFilters) => void;
  setPage: (page: number) => void;
  
  clearCache: () => void;
  isCacheValid: () => boolean;
}

export const useBlogStore = create<BlogState>()(
  persist(
    (set, get) => ({
      // Initial state
      posts: [],
      currentPost: null,
      totalPosts: 0,
      currentPage: 1,
      totalPages: 1,
      limit: 9,
      isLoading: false,
      isLoadingMore: false,
      error: null,
      connectionStatus: 'online',
      filters: {},
      lastFetched: null,
      cacheExpiry: 5 * 60 * 1000, // 5 minutes
      
      // Actions
      setPosts: (posts, total, page, totalPages) => set({
        posts,
        totalPosts: total,
        currentPage: page,
        totalPages,
        lastFetched: Date.now(),
        error: null,
      }),
      
      appendPosts: (newPosts) => set((state) => ({
        posts: [...state.posts, ...newPosts],
        currentPage: state.currentPage + 1,
      })),
      
      setCurrentPost: (post) => set({ currentPost: post }),
      
      addPost: (post) => set((state) => ({
        posts: [post, ...state.posts],
        totalPosts: state.totalPosts + 1,
      })),
      
      updatePost: (id, updatedPost) => set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, ...updatedPost } : post
        ),
        currentPost: state.currentPost?.id === id
          ? { ...state.currentPost, ...updatedPost }
          : state.currentPost,
      })),
      
      deletePost: (id) => set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
        totalPosts: state.totalPosts - 1,
        currentPost: state.currentPost?.id === id ? null : state.currentPost,
      })),
      
      setLoading: (isLoading) => set({ isLoading }),
      setLoadingMore: (isLoadingMore) => set({ isLoadingMore }),
      setError: (error) => set({ error }),
      setConnectionStatus: (connectionStatus) => set({ connectionStatus }),
      
      setFilters: (filters) => set({ filters, currentPage: 1 }),
      setPage: (page) => set({ currentPage: page }),
      
      clearCache: () => set({
        posts: [],
        currentPost: null,
        lastFetched: null,
        currentPage: 1,
      }),
      
      isCacheValid: () => {
        const { lastFetched, cacheExpiry } = get();
        if (!lastFetched) return false;
        return Date.now() - lastFetched < cacheExpiry;
      },
    }),
    {
      name: 'zenora-blog-store-v4',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        posts: state.posts,
        currentPost: state.currentPost,
        lastFetched: state.lastFetched,
        totalPosts: state.totalPosts,
        currentPage: state.currentPage,
        totalPages: state.totalPages,
      }),
    }
  )
);
