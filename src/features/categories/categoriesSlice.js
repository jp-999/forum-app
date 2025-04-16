import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../../data/mockData';

const initialState = {
  categories: categories,
  currentCategory: null,
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchCategoryStart: (state) => {
      state.isLoading = true;
      state.currentCategory = null;
      state.error = null;
    },
    fetchCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.currentCategory = action.payload;
    },
    fetchCategoryFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCategoryStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.categories = [...state.categories, action.payload];
    },
    createCategoryFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateCategoryStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateCategorySuccess: (state, action) => {
      state.isLoading = false;
      // Update the category in the array
      const index = state.categories.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
      
      // Update currentCategory if it's the same category
      if (state.currentCategory && state.currentCategory.id === action.payload.id) {
        state.currentCategory = action.payload;
      }
    },
    updateCategoryFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteCategoryStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.categories = state.categories.filter(category => category.id !== action.payload);
      
      // Clear currentCategory if it's the same category
      if (state.currentCategory && state.currentCategory.id === action.payload) {
        state.currentCategory = null;
      }
    },
    deleteCategoryFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchCategoryStart,
  fetchCategorySuccess,
  fetchCategoryFailure,
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
} = categoriesSlice.actions;

// Selectors
export const selectCategories = (state) => state.categories.categories;
export const selectCategoryById = (state, categoryId) => 
  state.categories.categories.find(category => category.id === categoryId);
export const selectCurrentCategory = (state) => state.categories.currentCategory;
export const selectCategoriesLoading = (state) => state.categories.isLoading;
export const selectCategoriesError = (state) => state.categories.error;

export default categoriesSlice.reducer; 