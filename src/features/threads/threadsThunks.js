import {
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
} from './threadsSlice';
import { threads } from '../../data/mockData';

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch all threads
export const fetchThreads = () => async (dispatch) => {
  try {
    dispatch(fetchThreadsStart());
    
    // Simulate API call
    await delay(1000);
    
    dispatch(fetchThreadsSuccess(threads));
    return threads;
  } catch (error) {
    dispatch(fetchThreadsFailure(error.message));
    throw error;
  }
};

// Fetch a single thread by ID
export const fetchThread = (threadId) => async (dispatch) => {
  try {
    dispatch(fetchThreadStart());
    
    // Simulate API call
    await delay(800);
    
    const thread = threads.find(thread => thread.id === threadId);
    
    if (!thread) {
      throw new Error('Thread not found');
    }
    
    dispatch(fetchThreadSuccess(thread));
    return thread;
  } catch (error) {
    dispatch(fetchThreadFailure(error.message));
    throw error;
  }
};

// Fetch trending threads
export const fetchTrendingThreads = () => async (dispatch) => {
  try {
    dispatch(fetchTrendingThreadsStart());
    
    // Simulate API call
    await delay(1200);
    
    // Calculate a "heat" score based on upvotes, views, and recency
    const sortedThreads = [...threads].sort((a, b) => {
      const aHeat = a.upvotes.length * 3 + a.views * 0.1;
      const bHeat = b.upvotes.length * 3 + b.views * 0.1;
      return bHeat - aHeat;
    });
    
    // Get top 10 threads
    const trendingThreads = sortedThreads.slice(0, 10);
    
    dispatch(fetchTrendingThreadsSuccess(trendingThreads));
    return trendingThreads;
  } catch (error) {
    dispatch(fetchTrendingThreadsFailure(error.message));
    throw error;
  }
};

// Fetch recent threads
export const fetchRecentThreads = () => async (dispatch) => {
  try {
    dispatch(fetchRecentThreadsStart());
    
    // Simulate API call
    await delay(900);
    
    // Sort by creation date (newest first)
    const recentThreads = [...threads]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);
    
    dispatch(fetchRecentThreadsSuccess(recentThreads));
    return recentThreads;
  } catch (error) {
    dispatch(fetchRecentThreadsFailure(error.message));
    throw error;
  }
};

// Create a new thread
export const createThread = (threadData) => async (dispatch, getState) => {
  try {
    dispatch(createThreadStart());
    
    // Simulate API call
    await delay(1500);
    
    const { auth } = getState();
    
    if (!auth.isAuthenticated) {
      throw new Error('You must be logged in to create a thread');
    }
    
    // Create a new thread with the provided data and generated ID
    const newThread = {
      id: 'thread-' + Math.random().toString(36).substr(2),
      ...threadData,
      author: auth.user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      upvotes: [],
      views: 0,
      commentCount: 0,
      isPinned: false,
      isLocked: false,
    };
    
    dispatch(createThreadSuccess(newThread));
    return newThread;
  } catch (error) {
    dispatch(createThreadFailure(error.message));
    throw error;
  }
};

// Update an existing thread
export const updateThread = (threadId, threadData) => async (dispatch, getState) => {
  try {
    dispatch(updateThreadStart());
    
    // Simulate API call
    await delay(1200);
    
    const { auth } = getState();
    const { threads } = getState().threads;
    
    // Find the thread to update
    const threadToUpdate = threads.find(thread => thread.id === threadId);
    
    if (!threadToUpdate) {
      throw new Error('Thread not found');
    }
    
    // Check if user is authorized to update the thread
    if (!auth.isAuthenticated || (auth.user.id !== threadToUpdate.author.id && !auth.user.isAdmin)) {
      throw new Error('Not authorized to update this thread');
    }
    
    // Update the thread with new data
    const updatedThread = {
      ...threadToUpdate,
      ...threadData,
      updatedAt: new Date().toISOString(),
    };
    
    dispatch(updateThreadSuccess(updatedThread));
    return updatedThread;
  } catch (error) {
    dispatch(updateThreadFailure(error.message));
    throw error;
  }
};

// Delete a thread
export const deleteThread = (threadId) => async (dispatch, getState) => {
  try {
    dispatch(deleteThreadStart());
    
    // Simulate API call
    await delay(1000);
    
    const { auth } = getState();
    const { threads } = getState().threads;
    
    // Find the thread to delete
    const threadToDelete = threads.find(thread => thread.id === threadId);
    
    if (!threadToDelete) {
      throw new Error('Thread not found');
    }
    
    // Check if user is authorized to delete the thread
    if (!auth.isAuthenticated || (auth.user.id !== threadToDelete.author.id && !auth.user.isAdmin)) {
      throw new Error('Not authorized to delete this thread');
    }
    
    dispatch(deleteThreadSuccess(threadId));
    return { success: true };
  } catch (error) {
    dispatch(deleteThreadFailure(error.message));
    throw error;
  }
};

// Upvote or remove upvote from a thread
export const toggleThreadUpvote = (threadId) => async (dispatch, getState) => {
  try {
    dispatch(upvoteThreadStart());
    
    // Simulate API call
    await delay(500);
    
    const { auth } = getState();
    const { threads } = getState().threads;
    
    if (!auth.isAuthenticated) {
      throw new Error('You must be logged in to upvote threads');
    }
    
    // Find the thread
    const thread = threads.find(thread => thread.id === threadId);
    
    if (!thread) {
      throw new Error('Thread not found');
    }
    
    // Check if user has already upvoted
    const hasUpvoted = thread.upvotes.includes(auth.user.id);
    
    dispatch(upvoteThreadSuccess({
      threadId,
      userId: auth.user.id,
      isUpvoting: !hasUpvoted
    }));
    
    return { success: true, upvoted: !hasUpvoted };
  } catch (error) {
    dispatch(upvoteThreadFailure(error.message));
    throw error;
  }
}; 