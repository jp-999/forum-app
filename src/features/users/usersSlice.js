import { createSlice } from '@reduxjs/toolkit';
import { users } from '../../data/mockData';

const initialState = {
  users: users,
  currentProfile: null,
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchProfileStart: (state) => {
      state.isLoading = true;
      state.currentProfile = null;
      state.error = null;
    },
    fetchProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.currentProfile = action.payload;
    },
    fetchProfileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    followUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    followUserSuccess: (state, action) => {
      state.isLoading = false;
      // Update the followed user in the users array
      const userIndex = state.users.findIndex(user => user.id === action.payload.userId);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          followers: [...state.users[userIndex].followers, action.payload.followerId]
        };
      }
      
      // Update the current profile if it's the followed user
      if (state.currentProfile && state.currentProfile.id === action.payload.userId) {
        state.currentProfile = {
          ...state.currentProfile,
          followers: [...state.currentProfile.followers, action.payload.followerId]
        };
      }
    },
    followUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    unfollowUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    unfollowUserSuccess: (state, action) => {
      state.isLoading = false;
      
      // Update the unfollowed user in the users array
      const userIndex = state.users.findIndex(user => user.id === action.payload.userId);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          followers: state.users[userIndex].followers.filter(id => id !== action.payload.followerId)
        };
      }
      
      // Update the current profile if it's the unfollowed user
      if (state.currentProfile && state.currentProfile.id === action.payload.userId) {
        state.currentProfile = {
          ...state.currentProfile,
          followers: state.currentProfile.followers.filter(id => id !== action.payload.followerId)
        };
      }
    },
    unfollowUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  followUserStart,
  followUserSuccess,
  followUserFailure,
  unfollowUserStart,
  unfollowUserSuccess,
  unfollowUserFailure,
} = usersSlice.actions;

// Selectors
export const selectUsers = (state) => state.users.users;
export const selectUserById = (state, userId) => 
  state.users.users.find(user => user.id === userId);
export const selectCurrentProfile = (state) => state.users.currentProfile;
export const selectUsersLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;

export default usersSlice.reducer; 