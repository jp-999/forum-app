import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  registerStart, 
  registerSuccess, 
  registerFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure 
} from './authSlice';
import { users } from '../../data/mockData';

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Login thunk
export const login = ({ email, password }) => async (dispatch) => {
  try {
    dispatch(loginStart());
    
    // Simulate API call
    await delay(1000);
    
    // Find user with matching email and password
    const user = users.find(user => 
      user.email === email && user.password === password
    );
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Remove sensitive data before sending to Redux store
    const { password: _, ...safeUserData } = user;
    
    const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substr(2);
    
    dispatch(loginSuccess({
      user: safeUserData,
      token: mockToken
    }));
    
    return { user: safeUserData };
  } catch (error) {
    dispatch(loginFailure(error.message));
    throw error;
  }
};

// Register thunk
export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart());
    
    // Simulate API call
    await delay(1500);
    
    // Check if email is already in use
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    // Create new user with mock ID and data
    const newUser = {
      id: 'user-' + Math.random().toString(36).substr(2),
      ...userData,
      avatar: `https://avatars.dicebear.com/api/avataaars/${Math.random()}.svg`,
      joinDate: new Date().toISOString(),
      bio: userData.bio || "No bio yet",
      location: userData.location || "Unknown",
      website: userData.website || "https://quantumforum.com",
      karma: 0,
      followers: [],
      following: [],
    };
    
    // Remove password before sending to Redux store
    const { password: _, ...safeUserData } = newUser;
    
    const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substr(2);
    
    dispatch(registerSuccess({
      user: safeUserData,
      token: mockToken
    }));
    
    return { user: safeUserData };
  } catch (error) {
    dispatch(registerFailure(error.message));
    throw error;
  }
};

// Update user profile thunk
export const updateUserProfile = (userId, userData) => async (dispatch, getState) => {
  try {
    dispatch(updateUserStart());
    
    // Simulate API call
    await delay(1000);
    
    const { auth } = getState();
    if (!auth.isAuthenticated || auth.user.id !== userId) {
      throw new Error('Not authorized to update this profile');
    }
    
    // Update user
    const updatedUser = {
      ...auth.user,
      ...userData,
      // Don't allow these fields to be updated directly
      id: auth.user.id,
      email: auth.user.email,
      karma: auth.user.karma,
      joinDate: auth.user.joinDate
    };
    
    dispatch(updateUserSuccess(updatedUser));
    
    return { user: updatedUser };
  } catch (error) {
    dispatch(updateUserFailure(error.message));
    throw error;
  }
}; 