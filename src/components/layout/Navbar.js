import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button, Flex, Avatar, IconButton, Dropdown } from '../common/StyledComponents';

// Material UI Icons
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';

const NavbarContainer = styled(motion.nav)`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: rgba(8, 9, 36, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 1000;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -0.02em;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  position: relative;
  color: var(--text);
  font-weight: 500;
  font-size: 0.95rem;
  transition: var(--transition);
  
  &:hover, &.active {
    color: var(--primary-light);
  }
  
  &.active::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, var(--primary), var(--secondary));
    border-radius: 2px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 300px;
  
  @media (max-width: 1024px) {
    width: 200px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  background: var(--background-lighter);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1.5rem;
  color: var(--text);
  font-size: 0.875rem;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(110, 0, 255, 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const SearchIconWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 1.25rem;
  pointer-events: none;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background: var(--danger);
  border-radius: 50%;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(255, 61, 113, 0.5);
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background: var(--background);
  z-index: 999;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MobileNavLink = styled(NavLink)`
  font-size: 1.25rem;
  padding: 0.5rem 0;
`;

const ProfileDropdownContent = styled.div`
  padding: 0.5rem 0;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text);
  transition: var(--transition);
  
  &:hover {
    background: rgba(110, 0, 255, 0.1);
    color: var(--primary-light);
  }
`;

const UserInfo = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  h4 {
    margin: 0;
    font-size: 0.95rem;
    color: var(--text);
  }
  
  p {
    margin: 0;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
`;

const navVariants = {
  hidden: { y: -100 },
  visible: { 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 20
    }
  }
};

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  // Mock user data - in a real app this would come from authentication
  const user = {
    id: '1', // Add user ID for profile navigation
    name: 'Alex Johnson',
    username: '@alexj',
    avatar: 'https://i.pravatar.cc/150?img=11'
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/categories', label: 'Categories' },
    { path: '/trending', label: 'Trending' },
    { path: '/recent', label: 'Recent' },
    { path: '/blog', label: 'Blog' }
  ];
  
  return (
    <NavbarContainer
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <LogoContainer
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo>NexusTalk</Logo>
        </Link>
      </LogoContainer>
      
      <Navigation>
        {navLinks.map((link) => (
          <NavLink 
            key={link.path} 
            to={link.path}
            className={location.pathname === link.path ? 'active' : ''}
          >
            {link.label}
          </NavLink>
        ))}
      </Navigation>
      
      <SearchContainer>
        <SearchInput placeholder="Search threads, categories..." />
        <SearchIconWrapper>
          <SearchIcon fontSize="small" />
        </SearchIconWrapper>
      </SearchContainer>
      
      <Actions>
        <div style={{ position: 'relative' }}>
          <IconButton as={Link} to="/notifications" aria-label="Notifications">
            <NotificationsIcon />
          </IconButton>
          <NotificationBadge>3</NotificationBadge>
        </div>
        
        <div style={{ position: 'relative' }}>
          <Avatar 
            src={user.avatar}
            onClick={toggleProfileDropdown}
            style={{ cursor: 'pointer' }}
          />
          
          {profileDropdownOpen && (
            <Dropdown>
              <UserInfo>
                <h4>{user.name}</h4>
                <p>{user.username}</p>
              </UserInfo>
              <ProfileDropdownContent>
                <DropdownItem to={`/profile/${user.id}`}>
                  <AccountCircleIcon fontSize="small" />
                  Profile
                </DropdownItem>
                <DropdownItem to="/settings">
                  <SettingsIcon fontSize="small" />
                  Settings
                </DropdownItem>
                <DropdownItem to="/login">
                  <LogoutIcon fontSize="small" />
                  Logout
                </DropdownItem>
              </ProfileDropdownContent>
            </Dropdown>
          )}
        </div>
        
        <Button small as={Link} to="/new-thread">
          <AddIcon style={{ marginRight: '0.5rem' }} />
          New Thread
        </Button>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </MobileMenuButton>
      </Actions>
      
      {mobileMenuOpen && (
        <MobileMenu
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
          <SearchInput placeholder="Search threads, categories..." />
          
          {navLinks.map((link) => (
            <MobileNavLink 
              key={link.path} 
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </MobileNavLink>
          ))}
          
          <MobileNavLink to="/notifications" onClick={() => setMobileMenuOpen(false)}>
            Notifications
          </MobileNavLink>
          
          <MobileNavLink to={`/profile/${user.id}`} onClick={() => setMobileMenuOpen(false)}>
            My Profile
          </MobileNavLink>
          
          <MobileNavLink to="/blog" onClick={() => setMobileMenuOpen(false)}>
            Blog
          </MobileNavLink>
          
          <MobileNavLink to="/settings" onClick={() => setMobileMenuOpen(false)}>
            <SettingsIcon style={{ marginRight: '0.5rem' }} />
            Settings
          </MobileNavLink>
          
          <Button as={Link} to="/new-thread" onClick={() => setMobileMenuOpen(false)}>
            <AddIcon style={{ marginRight: '0.5rem' }} />
            New Thread
          </Button>
        </MobileMenu>
      )}
    </NavbarContainer>
  );
};

export default Navbar; 