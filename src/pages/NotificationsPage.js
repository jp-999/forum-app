import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NeonHeading, Button, Avatar } from '../components/common/StyledComponents';
import { selectNotifications } from '../features/notifications/notificationsSlice';

// Material UI Icons
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import ReplyIcon from '@mui/icons-material/Reply';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CampaignIcon from '@mui/icons-material/Campaign';

const NotificationsPageContainer = styled.div`
  padding: 2rem 0;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  svg {
    color: var(--primary);
    font-size: 2rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FilterChip = styled.button`
  background: ${props => props.active ? 'var(--primary)' : 'var(--background-light)'};
  color: ${props => props.active ? 'white' : 'var(--text)'};
  border: 1px solid ${props => props.active ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 20px;
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: ${props => props.active ? 'var(--primary)' : 'var(--background-lighter)'};
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const NotificationItem = styled(motion.div)`
  padding: 1.25rem;
  border-radius: var(--card-border-radius);
  background: ${props => props.isRead ? 'var(--background-light)' : 'var(--background-lighter)'};
  border-left: 4px solid ${props => getNotificationColor(props.type)};
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: var(--transition);
  
  &:hover {
    transform: translateX(5px);
    box-shadow: var(--card-shadow);
  }
`;

const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => getNotificationColor(props.type)};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  svg {
    font-size: 1.25rem;
  }
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const NotificationTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: var(--text);
`;

const NotificationTime = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const NotificationMessage = styled.p`
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  
  a {
    color: var(--secondary);
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled(Button)`
  padding: 0.35rem 0.75rem;
  font-size: 0.85rem;
  
  svg {
    font-size: 0.9rem;
    margin-right: 0.35rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: var(--background-light);
  border-radius: var(--card-border-radius);
  margin-top: 2rem;
  
  h3 {
    margin-top: 1rem;
    color: var(--text);
  }
  
  p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
  
  svg {
    font-size: 3rem;
    color: var(--primary);
  }
`;

// Helper function to get notification color based on type
function getNotificationColor(type) {
  switch (type) {
    case 'reply':
      return 'var(--primary)';
    case 'mention':
      return 'var(--secondary)';
    case 'upvote':
      return 'var(--success)';
    case 'thread_featured':
      return 'var(--accent)';
    case 'follow':
      return '#9547ff';
    case 'welcome':
      return 'var(--success)';
    case 'announcement':
      return 'var(--warning)';
    default:
      return 'var(--primary)';
  }
}

// Helper function to get notification icon based on type
function getNotificationIcon(type) {
  switch (type) {
    case 'reply':
      return <ReplyIcon />;
    case 'mention':
      return <AlternateEmailIcon />;
    case 'upvote':
      return <ThumbUpIcon />;
    case 'thread_featured':
      return <LocalFireDepartmentIcon />;
    case 'follow':
      return <PersonAddIcon />;
    case 'welcome':
      return <EmojiEventsIcon />;
    case 'announcement':
      return <CampaignIcon />;
    default:
      return <NotificationsIcon />;
  }
}

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

const NotificationsPage = () => {
  // In a real app, you would use Redux to fetch notifications
  // For now, we'll use the selector directly with some mock data
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // This would come from Redux in a real app
      const mockNotifications = selectNotifications({ 
        notifications: { 
          notifications: [
            {
              id: 'notification-1',
              type: 'reply',
              title: 'New Reply',
              message: 'Alex Johnson replied to your thread',
              user: { id: 'user-1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/300?img=1' },
              threadId: 'thread-1',
              threadTitle: 'What do you think about the new AI developments?',
              isRead: false,
              createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
            },
            {
              id: 'notification-2',
              type: 'mention',
              title: 'New Mention',
              message: 'Sarah Williams mentioned you in a comment',
              user: { id: 'user-2', name: 'Sarah Williams', avatar: 'https://i.pravatar.cc/300?img=5' },
              threadId: 'thread-2',
              threadTitle: 'The future of quantum computing',
              isRead: false,
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
            },
            {
              id: 'notification-3',
              type: 'upvote',
              title: 'Thread Upvoted',
              message: 'Michael Brown upvoted your thread',
              user: { id: 'user-3', name: 'Michael Brown', avatar: 'https://i.pravatar.cc/300?img=8' },
              threadId: 'thread-3',
              threadTitle: 'Best practices for React development',
              isRead: true,
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() // 5 hours ago
            },
            {
              id: 'notification-4',
              type: 'follow',
              title: 'New Follower',
              message: 'Emily Wilson started following you',
              user: { id: 'user-4', name: 'Emily Wilson', avatar: 'https://i.pravatar.cc/300?img=9' },
              isRead: true,
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
            },
            {
              id: 'notification-5',
              type: 'thread_featured',
              title: 'Thread Featured',
              message: 'Your thread has been featured on the homepage',
              threadId: 'thread-4',
              threadTitle: 'Exploring the metaverse: opportunities and challenges',
              isRead: false,
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days ago
            },
            {
              id: 'notification-6',
              type: 'announcement',
              title: 'New Announcement',
              message: 'We have updated our community guidelines',
              isRead: true,
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() // 3 days ago
            },
            {
              id: 'notification-7',
              type: 'welcome',
              title: 'Welcome to Quantum Forum',
              message: 'Thanks for joining our community!',
              isRead: true,
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString() // 7 days ago
            }
          ]
        }
      });
      
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const handleMarkAsRead = (notificationId) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      )
    );
  };
  
  const handleDeleteNotification = (notificationId) => {
    setNotifications(
      notifications.filter(notification => notification.id !== notificationId)
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, isRead: true }))
    );
  };
  
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  const filterNotifications = () => {
    if (activeFilter === 'all') {
      return notifications;
    } else if (activeFilter === 'unread') {
      return notifications.filter(notification => !notification.isRead);
    } else {
      return notifications.filter(notification => notification.type === activeFilter);
    }
  };
  
  const filteredNotifications = filterNotifications();
  
  return (
    <NotificationsPageContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader>
        <HeaderTitle>
          <NotificationsIcon />
          <NeonHeading>Notifications</NeonHeading>
        </HeaderTitle>
        
        <ActionButtons>
          <Button 
            variant="outlined" 
            color="secondary"
            onClick={handleMarkAllAsRead}
            disabled={!notifications.some(n => !n.isRead)}
          >
            <MarkChatReadIcon style={{ marginRight: '0.5rem' }} />
            Mark All Read
          </Button>
          <Button 
            variant="outlined"
            color="danger"
            onClick={handleClearAll}
            disabled={notifications.length === 0}
          >
            <DeleteIcon style={{ marginRight: '0.5rem' }} />
            Clear All
          </Button>
        </ActionButtons>
      </PageHeader>
      
      <FiltersContainer>
        <FilterChip 
          active={activeFilter === 'all'} 
          onClick={() => setActiveFilter('all')}
        >
          <FilterListIcon />
          All
        </FilterChip>
        <FilterChip 
          active={activeFilter === 'unread'} 
          onClick={() => setActiveFilter('unread')}
        >
          <NotificationsIcon />
          Unread
        </FilterChip>
        <FilterChip 
          active={activeFilter === 'reply'} 
          onClick={() => setActiveFilter('reply')}
        >
          <ReplyIcon />
          Replies
        </FilterChip>
        <FilterChip 
          active={activeFilter === 'mention'} 
          onClick={() => setActiveFilter('mention')}
        >
          <AlternateEmailIcon />
          Mentions
        </FilterChip>
        <FilterChip 
          active={activeFilter === 'upvote'} 
          onClick={() => setActiveFilter('upvote')}
        >
          <ThumbUpIcon />
          Upvotes
        </FilterChip>
        <FilterChip 
          active={activeFilter === 'follow'} 
          onClick={() => setActiveFilter('follow')}
        >
          <PersonAddIcon />
          Follows
        </FilterChip>
        <FilterChip 
          active={activeFilter === 'thread_featured'} 
          onClick={() => setActiveFilter('thread_featured')}
        >
          <LocalFireDepartmentIcon />
          Featured
        </FilterChip>
        <FilterChip 
          active={activeFilter === 'announcement'} 
          onClick={() => setActiveFilter('announcement')}
        >
          <CampaignIcon />
          Announcements
        </FilterChip>
      </FiltersContainer>
      
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '3rem 0' }}>
          Loading notifications...
        </div>
      ) : filteredNotifications.length > 0 ? (
        <NotificationsList>
          <AnimatePresence>
            {filteredNotifications.map(notification => (
              <NotificationItem
                key={notification.id}
                type={notification.type}
                isRead={notification.isRead}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <NotificationIcon type={notification.type}>
                  {getNotificationIcon(notification.type)}
                </NotificationIcon>
                
                <NotificationContent>
                  <NotificationHeader>
                    <NotificationTitle>{notification.title}</NotificationTitle>
                    <NotificationTime>{formatRelativeTime(notification.createdAt)}</NotificationTime>
                  </NotificationHeader>
                  
                  <NotificationMessage>
                    {notification.user && (
                      <Link to={`/profile/${notification.user.id}`}>{notification.user.name}</Link>
                    )}
                    {notification.user ? ' ' : ''}
                    {notification.message}
                    {notification.threadTitle && (
                      <>
                        {': '}
                        <Link to={`/thread/${notification.threadId}`}>{notification.threadTitle}</Link>
                      </>
                    )}
                  </NotificationMessage>
                  
                  <NotificationActions>
                    {!notification.isRead && (
                      <ActionButton 
                        variant="outlined" 
                        color="secondary" 
                        small
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <MarkChatReadIcon />
                        Mark as Read
                      </ActionButton>
                    )}
                    
                    {notification.threadId && (
                      <ActionButton 
                        small 
                        as={Link} 
                        to={`/thread/${notification.threadId}`}
                      >
                        View Thread
                      </ActionButton>
                    )}
                    
                    <ActionButton 
                      variant="outlined" 
                      color="danger" 
                      small
                      onClick={() => handleDeleteNotification(notification.id)}
                    >
                      <DeleteIcon />
                      Delete
                    </ActionButton>
                  </NotificationActions>
                </NotificationContent>
                
                {notification.user && (
                  <Avatar 
                    src={notification.user.avatar} 
                    alt={notification.user.name} 
                    size="48px" 
                  />
                )}
              </NotificationItem>
            ))}
          </AnimatePresence>
        </NotificationsList>
      ) : (
        <EmptyState>
          <NotificationsIcon />
          <h3>No Notifications</h3>
          <p>
            {activeFilter === 'all' 
              ? "You don't have any notifications yet." 
              : `No ${activeFilter === 'unread' ? 'unread' : activeFilter} notifications found.`}
          </p>
          {activeFilter !== 'all' && (
            <Button onClick={() => setActiveFilter('all')}>
              Show All Notifications
            </Button>
          )}
        </EmptyState>
      )}
    </NotificationsPageContainer>
  );
};

export default NotificationsPage; 