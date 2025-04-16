import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NeonHeading, Card, Button, Avatar, Badge } from '../components/common/StyledComponents';
import HeroSection from '../components/forum/HeroSection';
import CategoryGrid from '../components/forum/CategoryGrid';
import ThreadList from '../components/forum/ThreadList';
import { threads, categories, users } from '../data/mockData';

// Material UI Icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import UpdateIcon from '@mui/icons-material/Update';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ForumIcon from '@mui/icons-material/Forum';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  
  h2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: var(--primary);
    }
  }
`;

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  color: var(--secondary);
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin: 1rem 0 2rem;
`;

const StatCard = styled(Card)`
  padding: 1.5rem;
  text-align: center;
  transition: var(--transition);
  border: 1px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: var(--neon-shadow);
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(to right, var(--primary-light), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FeaturedThreadsSection = styled.section`
  margin-bottom: 2rem;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainFeatured = styled(Card)`
  position: relative;
  overflow: hidden;
  min-height: 300px;
  background: linear-gradient(rgba(8, 9, 36, 0.8), rgba(8, 9, 36, 0.9)), 
    url(${props => props.bgImage}) no-repeat center/cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--neon-shadow);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, 
      rgba(8, 9, 36, 0.95) 0%, 
      rgba(8, 9, 36, 0.5) 50%, 
      rgba(8, 9, 36, 0.1) 100%);
    z-index: 1;
  }
`;

const FeaturedContent = styled.div`
  position: relative;
  z-index: 2;
`;

const FeaturedTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text);
`;

const FeaturedMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  
  span {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
`;

const FeaturedExcerpt = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const FeaturedSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SideFeatured = styled(Card)`
  padding: 1.25rem;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    box-shadow: var(--neon-shadow);
  }
`;

const SideFeaturedTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text);
`;

const ActivityFeed = styled(Card)`
  padding: 1.5rem;
  max-height: 350px;
  overflow-y: auto;
`;

const ActivityItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityMeta = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
`;

const ActivityMessage = styled.p`
  color: var(--text);
  
  a {
    color: var(--secondary);
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const UserWelcomeCard = styled(Card)`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, var(--background-light), var(--background-lighter));
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const WelcomeContent = styled.div`
  flex: 1;
`;

const WelcomeTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  color: var(--text);
`;

const WelcomeText = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const TabsContainer = styled.div`
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const TabList = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 0;
  }
`;

const Tab = styled.button`
  background: transparent;
  border: none;
  padding: 0.75rem 1.25rem;
  color: ${props => props.active ? 'var(--text)' : 'var(--text-secondary)'};
  font-weight: 600;
  font-size: 0.95rem;
  border-bottom: 2px solid ${props => props.active ? 'var(--primary)' : 'transparent'};
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    color: var(--text);
  }
  
  svg {
    margin-right: 0.5rem;
    vertical-align: middle;
  }
`;

// Generate mock community stats
const generateCommunityStats = () => {
  return {
    threads: threads.length,
    users: users.length,
    views: threads.reduce((total, thread) => total + thread.views, 0),
    replies: threads.reduce((total, thread) => total + thread.commentCount, 0)
  };
};

// Generate mock activity feed
const generateActivityFeed = () => {
  const activities = [
    {
      id: 1,
      user: users[0],
      type: 'post',
      content: 'posted a new thread',
      target: { id: threads[0].id, title: threads[0].title },
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 minutes ago
    },
    {
      id: 2,
      user: users[1],
      type: 'reply',
      content: 'replied to',
      target: { id: threads[1].id, title: threads[1].title },
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() // 15 minutes ago
    },
    {
      id: 3,
      user: users[2],
      type: 'upvote',
      content: 'upvoted',
      target: { id: threads[2].id, title: threads[2].title },
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
    },
    {
      id: 4,
      user: users[3],
      type: 'join',
      content: 'joined the community',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() // 45 minutes ago
    },
    {
      id: 5,
      user: users[4],
      type: 'post',
      content: 'posted a new thread',
      target: { id: threads[3].id, title: threads[3].title },
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() // 1 hour ago
    }
  ];
  
  return activities;
};

// Format relative time
const formatRelativeTime = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else {
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }
};

// Get trending threads
const getTrendingThreads = () => {
  return [...threads]
    .sort((a, b) => (b.upvotes.length + b.views * 0.1) - (a.upvotes.length + a.views * 0.1))
    .slice(0, 3);
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [communityStats, setCommunityStats] = useState({});
  const [activityFeed, setActivityFeed] = useState([]);
  const [trendingThreads, setTrendingThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCommunityStats(generateCommunityStats());
      setActivityFeed(generateActivityFeed());
      setTrendingThreads(getTrendingThreads());
      
      setIsLoading(false);
    };
    
    fetchData();
    
    // Set up interval for real-time updates (simulated)
    const updateInterval = setInterval(() => {
      setActivityFeed(prevFeed => {
        // Add a new activity at random intervals
        if (Math.random() > 0.7) {
          const randomUser = users[Math.floor(Math.random() * users.length)];
          const randomThread = threads[Math.floor(Math.random() * threads.length)];
          const activities = ['post', 'reply', 'upvote', 'join'];
          const randomActivity = activities[Math.floor(Math.random() * activities.length)];
          
          const newActivity = {
            id: Date.now(),
            user: randomUser,
            type: randomActivity,
            content: randomActivity === 'post' 
              ? 'posted a new thread' 
              : randomActivity === 'reply'
                ? 'replied to'
                : randomActivity === 'upvote'
                  ? 'upvoted'
                  : 'joined the community',
            ...(randomActivity !== 'join' && { target: { id: randomThread.id, title: randomThread.title } }),
            timestamp: new Date().toISOString()
          };
          
          return [newActivity, ...prevFeed.slice(0, 4)];
        }
        
        return prevFeed;
      });
    }, 10000);
    
    return () => clearInterval(updateInterval);
  }, []);
  
  // Filter threads based on active tab
  const getFilteredThreads = () => {
    switch (activeTab) {
      case 'recommended':
        return threads.slice(0, 5);
      case 'trending':
        return [...threads]
          .sort((a, b) => b.upvotes.length - a.upvotes.length)
          .slice(0, 5);
      case 'recent':
        return [...threads]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
      default:
        return threads.slice(0, 5);
    }
  };
  
  // Mock user data - in a real app, this would come from authentication
  const currentUser = {
    name: 'Alex Johnson',
    avatar: 'https://i.pravatar.cc/300?img=68',
    karma: 143,
    unreadNotifications: 3
  };
  
  return (
    <HomePageContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      
      <UserWelcomeCard>
        <Avatar src={currentUser.avatar} alt={currentUser.name} size="80px" />
        <WelcomeContent>
          <WelcomeTitle>Welcome back, {currentUser.name}!</WelcomeTitle>
          <WelcomeText>
            You have {currentUser.unreadNotifications} new notifications and {currentUser.karma} karma points.
          </WelcomeText>
          <Link to="/profile/1">
            <Button small>
              View Profile
            </Button>
          </Link>
        </WelcomeContent>
        <div>
          <Link to="/notifications">
            <Button color="secondary" small>
              <NotificationsActiveIcon style={{ marginRight: '0.5rem' }} />
              Notifications
              <Badge>{currentUser.unreadNotifications}</Badge>
            </Button>
          </Link>
        </div>
      </UserWelcomeCard>
      
      <SectionHeading>
        <h2>
          <PeopleAltIcon />
          Community Statistics
        </h2>
      </SectionHeading>
      
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading statistics...</div>
      ) : (
        <StatsContainer>
          <StatCard>
            <StatValue>{communityStats.users}</StatValue>
            <StatLabel>Members</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{communityStats.threads}</StatValue>
            <StatLabel>Threads</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{communityStats.replies}</StatValue>
            <StatLabel>Replies</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{communityStats.views.toLocaleString()}</StatValue>
            <StatLabel>Views</StatLabel>
          </StatCard>
        </StatsContainer>
      )}
      
      <FeaturedThreadsSection>
        <SectionHeading>
          <h2>
            <LocalFireDepartmentIcon />
            Featured Discussions
          </h2>
          <ViewAllLink to="/trending">
            View All <TrendingUpIcon fontSize="small" />
          </ViewAllLink>
        </SectionHeading>
        
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading featured content...</div>
        ) : (
          <FeaturedGrid>
            <MainFeatured bgImage="https://images.unsplash.com/photo-1483817101829-339b08e8d83f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80">
              <FeaturedContent>
                <Badge color="secondary">Featured</Badge>
                <FeaturedTitle>{trendingThreads[0]?.title || 'Loading...'}</FeaturedTitle>
                <FeaturedMeta>
                  <span>
                    <ForumIcon fontSize="small" />
                    {trendingThreads[0]?.commentCount || 0} comments
                  </span>
                  <span>
                    <VisibilityIcon fontSize="small" />
                    {trendingThreads[0]?.views || 0} views
                  </span>
                </FeaturedMeta>
                <FeaturedExcerpt>
                  {trendingThreads[0]?.content.substring(0, 150) + '...' || 'Loading content...'}
                </FeaturedExcerpt>
                <Link to={`/thread/${trendingThreads[0]?.id}`}>
                  <Button>Read More</Button>
                </Link>
              </FeaturedContent>
            </MainFeatured>
            
            <FeaturedSide>
              {trendingThreads.slice(1, 3).map((thread, index) => (
                <SideFeatured key={thread.id}>
                  <Badge>{thread.category.name}</Badge>
                  <SideFeaturedTitle>
                    <Link to={`/thread/${thread.id}`}>{thread.title}</Link>
                  </SideFeaturedTitle>
                  <FeaturedMeta>
                    <span>
                      <ForumIcon fontSize="small" />
                      {thread.commentCount} comments
                    </span>
                    <span>
                      <VisibilityIcon fontSize="small" />
                      {thread.views} views
                    </span>
                  </FeaturedMeta>
                </SideFeatured>
              ))}
            </FeaturedSide>
          </FeaturedGrid>
        )}
      </FeaturedThreadsSection>
      
      <section>
        <SectionHeading>
          <h2>
            <ForumIcon />
            Discussions For You
          </h2>
        </SectionHeading>
        
        <TabsContainer>
          <TabList>
            <Tab 
              active={activeTab === 'recommended'} 
              onClick={() => setActiveTab('recommended')}
            >
              Recommended
            </Tab>
            <Tab 
              active={activeTab === 'trending'} 
              onClick={() => setActiveTab('trending')}
            >
              <TrendingUpIcon fontSize="small" />
              Trending
            </Tab>
            <Tab 
              active={activeTab === 'recent'} 
              onClick={() => setActiveTab('recent')}
            >
              <UpdateIcon fontSize="small" />
              Recent
            </Tab>
          </TabList>
        </TabsContainer>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>Loading threads...</div>
            ) : (
              <ThreadList 
                threads={getFilteredThreads()} 
                showFilters={false}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </section>
      
      <section>
        <SectionHeading>
          <h2>
            <UpdateIcon />
            Activity Feed
          </h2>
        </SectionHeading>
        
        <ActivityFeed>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading activity...</div>
          ) : (
            activityFeed.map(activity => (
              <ActivityItem key={activity.id}>
                <Avatar src={activity.user.avatar} alt={activity.user.name} size="40px" />
                <ActivityContent>
                  <ActivityMessage>
                    <Link to={`/profile/${activity.user.id}`}>{activity.user.name}</Link>
                    {' '}{activity.content}{' '}
                    {activity.target && (
                      <Link to={`/thread/${activity.target.id}`}>{activity.target.title}</Link>
                    )}
                  </ActivityMessage>
                  <ActivityMeta>{formatRelativeTime(activity.timestamp)}</ActivityMeta>
                </ActivityContent>
              </ActivityItem>
            ))
          )}
        </ActivityFeed>
      </section>
      
      <section>
        <SectionHeading>
          <h2>Popular Categories</h2>
          <ViewAllLink to="/categories">View All Categories</ViewAllLink>
        </SectionHeading>
        <CategoryGrid categories={categories.slice(0, 6)} />
      </section>
    </HomePageContainer>
  );
};

export default HomePage; 