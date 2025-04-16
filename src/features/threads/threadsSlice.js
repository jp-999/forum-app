import { createSlice } from '@reduxjs/toolkit';
import { threads } from '../../data/mockData';

const initialState = {
  threads: threads,
  currentThread: null,
  trendingThreads: [],
  recentThreads: [],
  filteredThreads: [],
  filterCriteria: {
    category: null,
    sortBy: 'latest',
    searchQuery: '',
  },
  isLoading: false,
  error: null,
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    fetchThreadsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchThreadsSuccess: (state, action) => {
      state.isLoading = false;
      state.threads = action.payload;
      // Apply any active filters
      state.filteredThreads = filterThreads(action.payload, state.filterCriteria);
    },
    fetchThreadsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchThreadStart: (state) => {
      state.isLoading = true;
      state.currentThread = null;
      state.error = null;
    },
    fetchThreadSuccess: (state, action) => {
      state.isLoading = false;
      state.currentThread = action.payload;
    },
    fetchThreadFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchTrendingThreadsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTrendingThreadsSuccess: (state, action) => {
      state.isLoading = false;
      state.trendingThreads = action.payload;
    },
    fetchTrendingThreadsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchRecentThreadsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchRecentThreadsSuccess: (state, action) => {
      state.isLoading = false;
      state.recentThreads = action.payload;
    },
    fetchRecentThreadsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createThreadStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createThreadSuccess: (state, action) => {
      state.isLoading = false;
      state.threads = [action.payload, ...state.threads];
      state.filteredThreads = filterThreads(state.threads, state.filterCriteria);
    },
    createThreadFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateThreadStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateThreadSuccess: (state, action) => {
      state.isLoading = false;
      // Update the thread in the array
      const index = state.threads.findIndex(thread => thread.id === action.payload.id);
      if (index !== -1) {
        state.threads[index] = action.payload;
      }
      
      // Update currentThread if it's the same thread
      if (state.currentThread && state.currentThread.id === action.payload.id) {
        state.currentThread = action.payload;
      }
      
      state.filteredThreads = filterThreads(state.threads, state.filterCriteria);
    },
    updateThreadFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteThreadStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteThreadSuccess: (state, action) => {
      state.isLoading = false;
      state.threads = state.threads.filter(thread => thread.id !== action.payload);
      state.filteredThreads = filterThreads(state.threads, state.filterCriteria);
      
      // Clear currentThread if it's the same thread
      if (state.currentThread && state.currentThread.id === action.payload) {
        state.currentThread = null;
      }
    },
    deleteThreadFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    upvoteThreadStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    upvoteThreadSuccess: (state, action) => {
      state.isLoading = false;
      
      // Update the thread in the threads array
      const threadIndex = state.threads.findIndex(thread => thread.id === action.payload.threadId);
      if (threadIndex !== -1) {
        state.threads[threadIndex] = {
          ...state.threads[threadIndex],
          upvotes: action.payload.isUpvoting
            ? [...state.threads[threadIndex].upvotes, action.payload.userId]
            : state.threads[threadIndex].upvotes.filter(id => id !== action.payload.userId)
        };
      }
      
      // Update currentThread if it's the same thread
      if (state.currentThread && state.currentThread.id === action.payload.threadId) {
        state.currentThread = {
          ...state.currentThread,
          upvotes: action.payload.isUpvoting
            ? [...state.currentThread.upvotes, action.payload.userId]
            : state.currentThread.upvotes.filter(id => id !== action.payload.userId)
        };
      }
      
      state.filteredThreads = filterThreads(state.threads, state.filterCriteria);
    },
    upvoteThreadFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setFilterCriteria: (state, action) => {
      state.filterCriteria = {
        ...state.filterCriteria,
        ...action.payload
      };
      state.filteredThreads = filterThreads(state.threads, state.filterCriteria);
    },
    clearFilters: (state) => {
      state.filterCriteria = {
        category: null,
        sortBy: 'latest',
        searchQuery: '',
      };
      state.filteredThreads = filterThreads(state.threads, state.filterCriteria);
    },
  },
});

// Helper function to filter and sort threads
const filterThreads = (threads, criteria) => {
  let filtered = [...threads];
  
  // Filter by category if specified
  if (criteria.category) {
    filtered = filtered.filter(thread => thread.category.id === criteria.category);
  }
  
  // Filter by search query if specified
  if (criteria.searchQuery) {
    const query = criteria.searchQuery.toLowerCase();
    filtered = filtered.filter(thread => 
      thread.title.toLowerCase().includes(query) || 
      thread.content.toLowerCase().includes(query)
    );
  }
  
  // Sort threads based on criteria
  switch (criteria.sortBy) {
    case 'latest':
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'oldest':
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'popular':
      filtered.sort((a, b) => b.upvotes.length - a.upvotes.length);
      break;
    case 'commented':
      filtered.sort((a, b) => b.commentCount - a.commentCount);
      break;
    default:
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  
  return filtered;
};

export const {
  fetchThreadsStart,
  fetchThreadsSuccess,
  fetchThreadsFailure,
  fetchThreadStart,
  fetchThreadSuccess,
  fetchThreadFailure,
  fetchTrendingThreadsStart,
  fetchTrendingThreadsSuccess,
  fetchTrendingThreadsFailure,
  fetchRecentThreadsStart,
  fetchRecentThreadsSuccess,
  fetchRecentThreadsFailure,
  createThreadStart,
  createThreadSuccess,
  createThreadFailure,
  updateThreadStart,
  updateThreadSuccess,
  updateThreadFailure,
  deleteThreadStart,
  deleteThreadSuccess,
  deleteThreadFailure,
  upvoteThreadStart,
  upvoteThreadSuccess,
  upvoteThreadFailure,
  setFilterCriteria,
  clearFilters,
} = threadsSlice.actions;

// Selectors
export const selectThreads = (state) => state.threads.threads;
export const selectFilteredThreads = (state) => state.threads.filteredThreads;
export const selectCurrentThread = (state) => state.threads.currentThread;
export const selectTrendingThreads = (state) => state.threads.trendingThreads;
export const selectRecentThreads = (state) => state.threads.recentThreads;
export const selectThreadsLoading = (state) => state.threads.isLoading;
export const selectThreadsError = (state) => state.threads.error;
export const selectFilterCriteria = (state) => state.threads.filterCriteria;

export default threadsSlice.reducer; 