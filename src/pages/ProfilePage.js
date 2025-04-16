import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { NeonHeading, Button, Card, Flex, Avatar, Badge, Divider } from '../components/common/StyledComponents';
import ThreadList from '../components/forum/ThreadList';
import { users, threads } from '../data/mockData';

// Material UI Icons
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ForumIcon from '@mui/icons-material/Forum';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

const ProfilePageContainer = styled.div`
  padding: 2rem 0;
`;

const ProfileHeader = styled(Card)`
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(110, 0, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
`;

const CoverImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 150px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  z-index: 0;
`;

const ProfileContent = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 80px;
`;

const ProfileAvatar = styled(Avatar)`
  border: 4px solid var(--background-light);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
`;

const ProfileName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--text);
`;

const ProfileUsername = styled.h3`
  font-size: 1.1rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
`;

const ProfileBio = styled.p`
  max-width: 600px;
  margin: 0 auto 1.5rem;
  line-height: 1.8;
  color: var(--text);
`;

const ProfileStats = styled(Flex)`
  margin: 2rem 0;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const StatCard = styled(motion.div)`
  background: var(--background-lighter);
  border-radius: var(--card-border-radius);
  padding: 1.25rem 1.5rem;
  min-width: 160px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: var(--transition);
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-5px);
    box-shadow: var(--neon-shadow);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, var(--primary-light), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
`;

const ProfileMeta = styled(Flex)`
  color: var(--text-secondary);
  justify-content: center;
  margin: 1.5rem 0;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 0.9rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  a {
    color: var(--secondary);
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  svg {
    color: var(--primary);
    font-size: 1.1rem;
  }
`;

const EditButton = styled(Button)`
  position: absolute;
  top: 170px;
  right: 2rem;
  z-index: 1;
`;

const TabsContainer = styled.div`
  margin-bottom: 2rem;
`;

const TabList = styled(Flex)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  background: transparent;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.active ? 'var(--text)' : 'var(--text-secondary)'};
  border-bottom: 2px solid ${props => props.active ? 'var(--primary)' : 'transparent'};
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    color: var(--text);
  }
  
  svg {
    margin-right: 0.5rem;
    font-size: 1.1rem;
    vertical-align: middle;
  }
`;

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('threads');
  
  // Using first user for demo
  const user = users[0];
  
  // Get threads by this user
  const userThreads = threads.filter(thread => thread.author.id === user.id);
  
  return (
    <ProfilePageContainer>
      <ProfileHeader
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CoverImage />
        
        <EditButton small>
          <EditIcon fontSize="small" />
          Edit Profile
        </EditButton>
        
        <ProfileContent>
          <ProfileAvatar src={user.avatar} size="120px" />
          <ProfileName>{user.name}</ProfileName>
          <ProfileUsername>{user.username}</ProfileUsername>
          <ProfileBio>{user.bio}</ProfileBio>
          
          <ProfileMeta>
            <MetaItem>
              <LocationOnIcon />
              {user.location}
            </MetaItem>
            
            <MetaItem>
              <LanguageIcon />
              <a href={user.website} target="_blank" rel="noopener noreferrer">
                {user.website.replace(/(^\w+:|^)\/\//, '')}
              </a>
            </MetaItem>
            
            <MetaItem>
              <CalendarTodayIcon />
              Joined {formatDate(user.joinDate)}
            </MetaItem>
          </ProfileMeta>
          
          <ProfileStats>
            <StatCard
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <StatValue>{userThreads.length}</StatValue>
              <StatLabel>
                <ForumIcon fontSize="small" />
                Threads
              </StatLabel>
            </StatCard>
            
            <StatCard
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <StatValue>{user.karma}</StatValue>
              <StatLabel>
                <ThumbUpIcon fontSize="small" />
                Karma
              </StatLabel>
            </StatCard>
            
            <StatCard
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <StatValue>125</StatValue>
              <StatLabel>
                <PeopleAltIcon fontSize="small" />
                Following
              </StatLabel>
            </StatCard>
          </ProfileStats>
        </ProfileContent>
      </ProfileHeader>
      
      <TabsContainer>
        <TabList>
          <Tab 
            active={activeTab === 'threads'} 
            onClick={() => setActiveTab('threads')}
          >
            <ForumIcon />
            Threads
          </Tab>
          <Tab 
            active={activeTab === 'comments'} 
            onClick={() => setActiveTab('comments')}
          >
            <ForumIcon />
            Comments
          </Tab>
          <Tab 
            active={activeTab === 'upvoted'} 
            onClick={() => setActiveTab('upvoted')}
          >
            <ThumbUpIcon />
            Upvoted
          </Tab>
          <Tab 
            active={activeTab === 'saved'} 
            onClick={() => setActiveTab('saved')}
          >
            <BookmarksIcon />
            Saved
          </Tab>
        </TabList>
        
        <AnimatePresence mode="wait">
          {activeTab === 'threads' && (
            <motion.div
              key="threads"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ThreadList 
                threads={userThreads} 
                title={`${user.name}'s Threads`} 
                showFilters={false}
              />
            </motion.div>
          )}
          
          {(activeTab === 'comments' || activeTab === 'upvoted' || activeTab === 'saved') && (
            <motion.div
              key="other-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card style={{ padding: '3rem', textAlign: 'center' }}>
                <LocalFireDepartmentIcon style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }} />
                <NeonHeading level={3}>Coming Soon</NeonHeading>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto' }}>
                  This feature is currently under development and will be available soon.
                  Check back later to access your {activeTab} content.
                </p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </TabsContainer>
    </ProfilePageContainer>
  );
};

export default ProfilePage; 