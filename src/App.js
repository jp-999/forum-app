import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './styles/theme';
import GlobalStyles from './styles/globalStyles';
import MainLayout from './components/layout/MainLayout';
import ScrollToTop from './components/utils/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import ThreadPage from './pages/ThreadPage';
import TrendingPage from './pages/TrendingPage';
import RecentPage from './pages/RecentPage';
import NotificationsPage from './pages/NotificationsPage';
import FaqPage from './pages/FaqPage';
import GuidelinesPage from './pages/GuidelinesPage';
import ApiDocPage from './pages/ApiDocPage';
import BlogPage from './pages/BlogPage';
import SettingsPage from './pages/SettingsPage';
import NewThreadPage from './pages/NewThreadPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile/:userId" element={<ProfilePage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="categories/:categoryId" element={<CategoryPage />} />
            <Route path="thread/:threadId" element={<ThreadPage />} />
            <Route path="trending" element={<TrendingPage />} />
            <Route path="recent" element={<RecentPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="guidelines" element={<GuidelinesPage />} />
            <Route path="api-docs" element={<ApiDocPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="new-thread" element={<NewThreadPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
