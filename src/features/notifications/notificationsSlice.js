import { createSlice } from '@reduxjs/toolkit';
import { users, threads } from '../../data/mockData';

// Generate mock notifications
const generateMockNotifications = () => {
  const notificationTypes = [
    'reply',
    'mention',
    'upvote',
    'thread_featured',
    'follow',
    'welcome',
    'announcement'
  ];
  
  const mockNotifications = [];
  
  // Generate 15 random notifications
  for (let i = 0; i < 15; i++) {
    const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const thread = threads[Math.floor(Math.random() * threads.length)];
    
    const baseNotification = {
      id: `notification-${i + 1}`,
      isRead: Math.random() > 0.3, // 30% unread
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(), // Random time in last 7 days
    };
    
    switch (type) {
      case 'reply':
        mockNotifications.push({
          ...baseNotification,
          type,
          title: 'New Reply',
          message: `${user.name} replied to your thread`,
          user: { id: user.id, name: user.name, avatar: user.avatar },
          threadId: thread.id,
          threadTitle: thread.title
        });
        break;
      case 'mention':
        mockNotifications.push({
          ...baseNotification,
          type,
          title: 'New Mention',
          message: `${user.name} mentioned you in a comment`,
          user: { id: user.id, name: user.name, avatar: user.avatar },
          threadId: thread.id,
          threadTitle: thread.title
        });
        break;
      case 'upvote':
        mockNotifications.push({
          ...baseNotification,
          type,
          title: 'Thread Upvoted',
          message: `${user.name} upvoted your thread`,
          user: { id: user.id, name: user.name, avatar: user.avatar },
          threadId: thread.id,
          threadTitle: thread.title
        });
        break;
      case 'thread_featured':
        mockNotifications.push({
          ...baseNotification,
          type,
          title: 'Thread Featured',
          message: 'Your thread has been featured on the homepage',
          threadId: thread.id,
          threadTitle: thread.title
        });
        break;
      case 'follow':
        mockNotifications.push({
          ...baseNotification,
          type,
          title: 'New Follower',
          message: `${user.name} started following you`,
          user: { id: user.id, name: user.name, avatar: user.avatar }
        });
        break;
      case 'welcome':
        mockNotifications.push({
          ...baseNotification,
          type,
          title: 'Welcome to Quantum Forum',
          message: 'Thanks for joining our community!',
          isRead: true // Welcome notifications are always read
        });
        break;
      case 'announcement':
        mockNotifications.push({
          ...baseNotification,
          type,
          title: 'New Announcement',
          message: 'We have updated our community guidelines',
        });
        break;
      default:
        break;
    }
  }
  
  // Sort by created date (newest first)
  return mockNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const initialState = {
  notifications: generateMockNotifications(),
  isLoading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    fetchNotificationsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchNotificationsSuccess: (state, action) => {
      state.notifications = action.payload;
      state.isLoading = false;
    },
    fetchNotificationsFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    markAsReadStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    markAsReadSuccess: (state, action) => {
      const { notificationId } = action.payload;
      const notification = state.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.isRead = true;
      }
      state.isLoading = false;
    },
    markAllAsReadSuccess: (state) => {
      state.notifications.forEach(notification => {
        notification.isRead = true;
      });
      state.isLoading = false;
    },
    markAsReadFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    deleteNotificationStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteNotificationSuccess: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
      state.isLoading = false;
    },
    deleteNotificationFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: `notification-${Date.now()}`,
        isRead: false,
        createdAt: new Date().toISOString(),
        ...action.payload
      });
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    }
  },
});

export const {
  fetchNotificationsStart,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
  markAsReadStart,
  markAsReadSuccess,
  markAllAsReadSuccess,
  markAsReadFailure,
  deleteNotificationStart,
  deleteNotificationSuccess,
  deleteNotificationFailure,
  addNotification,
  clearAllNotifications
} = notificationsSlice.actions;

// Selectors
export const selectNotifications = (state) => state.notifications.notifications;
export const selectUnreadNotifications = (state) => 
  state.notifications.notifications.filter(notification => !notification.isRead);
export const selectUnreadCount = (state) => 
  state.notifications.notifications.filter(notification => !notification.isRead).length;
export const selectIsLoading = (state) => state.notifications.isLoading;
export const selectError = (state) => state.notifications.error;

export default notificationsSlice.reducer; 