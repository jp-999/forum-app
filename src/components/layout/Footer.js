import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Flex, Divider } from '../common/StyledComponents';

// Material UI Icons
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RedditIcon from '@mui/icons-material/Reddit';

const FooterContainer = styled.footer`
  width: 100%;
  background: linear-gradient(to top, var(--background), rgba(8, 9, 36, 0));
  padding: 4rem 2rem 2rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLogo = styled.h2`
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
`;

const FooterDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`;

const FooterHeading = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(to right, var(--primary), var(--secondary));
    border-radius: 2px;
  }
`;

const FooterLink = styled(Link)`
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: var(--transition);
  
  &:hover {
    color: var(--primary-light);
    transform: translateX(5px);
    display: inline-block;
  }
`;

// For links to pages that don't exist yet
const PlaceholderLink = styled(Link)`
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: var(--transition);
  opacity: 0.7;
  
  &:hover {
    color: var(--primary-light);
    transform: translateX(5px);
    display: inline-block;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--background-lighter);
  color: var(--text);
  transition: var(--transition);
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    background: var(--primary);
    color: white;
    box-shadow: var(--neon-shadow);
  }
`;

const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const Copyright = styled.p`
  color: var(--text-secondary);
  font-size: 0.85rem;
`;

const FooterNav = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const FooterNavLink = styled(Link)`
  color: var(--text-secondary);
  font-size: 0.85rem;
  transition: var(--transition);
  
  &:hover {
    color: var(--primary-light);
  }
`;

const socialIcons = [
  { Icon: GitHubIcon, href: 'https://github.com', label: 'GitHub' },
  { Icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
  { Icon: LinkedInIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { Icon: RedditIcon, href: 'https://reddit.com', label: 'Reddit' }
];

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <FooterLogo>NexusTalk</FooterLogo>
          </Link>
          <FooterDescription>
            A futuristic community platform for discussing tech, gaming, science and more. Join our growing community of passionate enthusiasts.
          </FooterDescription>
          <SocialLinks>
            {socialIcons.map(({ Icon, href, label }) => (
              <SocialIcon 
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon fontSize="small" />
              </SocialIcon>
            ))}
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Explore</FooterHeading>
          <FooterLink to="/categories">Categories</FooterLink>
          <FooterLink to="/trending">Trending</FooterLink>
          <FooterLink to="/recent">Recent Posts</FooterLink>
          <FooterLink to="/notifications">Notifications</FooterLink>
          <PlaceholderLink to="/about">About Us</PlaceholderLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Resources</FooterHeading>
          <FooterLink to="/guidelines">Community Guidelines</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <PlaceholderLink to="/about">Support Center</PlaceholderLink>
          <FooterLink to="/api-docs">API Documentation</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Account</FooterHeading>
          <FooterDescription>
            Have questions or feedback? We'd love to hear from you.
          </FooterDescription>
          <FooterLink to="/login">Login</FooterLink>
          <FooterLink to="/register">Register</FooterLink>
          <FooterLink to="/profile/1">Profile</FooterLink>
          <FooterLink to="/settings">Settings</FooterLink>
        </FooterColumn>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>© {new Date().getFullYear()} NexusTalk. All rights reserved.</Copyright>
        <FooterNav>
          <FooterNavLink to="/terms-of-service">Terms of Service</FooterNavLink>
          <FooterNavLink to="/privacy-policy">Privacy Policy</FooterNavLink>
          <FooterNavLink to="/cookie-policy">Cookie Policy</FooterNavLink>
          <FooterNavLink to="/guidelines">Community Guidelines</FooterNavLink>
        </FooterNav>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 