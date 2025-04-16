import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card, Badge, Avatar, Flex, IconButton } from '../common/StyledComponents';

// Material UI Icons
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';

const ThreadCardContainer = styled(motion(Card))`
  padding: 1.25rem;
  border-left: 3px solid ${props => props.categoryColor || 'var(--primary)'};
  position: relative;
  overflow: visible;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -3px;
    width: 3px;
    height: 100%;
    background: ${props => props.categoryColor || 'var(--primary)'};
    box-shadow: 0 0 15px ${props => props.categoryColor || 'var(--primary)'};
  }
`;

const ThreadTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text);
  line-height: 1.4;
  
  a {
    color: var(--text);
    text-decoration: none;
    transition: var(--transition);
    
    &:hover {
      color: var(--primary-light);
    }
  }
`;

const ThreadMeta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ThreadContent = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ThreadFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ThreadStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ThreadStat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  
  svg {
    font-size: 1.1rem;
  }
`;

const ThreadActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VoteCount = styled.span`
  font-weight: bold;
  color: ${props => 
    props.count > 0 
      ? 'var(--success)' 
      : props.count < 0 
        ? 'var(--danger)' 
        : 'var(--text-secondary)'
  };
  margin: 0 0.3rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-right: 1rem;
`;

const UserName = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text);
`;

const PostTime = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const CategoryBadge = styled(Badge)`
  margin-left: 0.5rem;
`;

const HoverGlowContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: var(--card-border-radius);
  pointer-events: none;
  z-index: -1;
`;

const formatDate = (date) => {
  const options = { month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

const ThreadCard = ({ thread }) => {
  const { 
    id, 
    title, 
    content, 
    author, 
    createdAt, 
    upvotes, 
    downvotes, 
    commentCount, 
    viewCount,
    category
  } = thread;
  
  const voteCount = upvotes - downvotes;
  
  return (
    <ThreadCardContainer 
      categoryColor={category.color}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <ThreadMeta>
        <UserInfo>
          <Avatar src={author.avatar} size="32px" />
          <div>
            <UserName>{author.name}</UserName>
            <PostTime>{formatDate(createdAt)}</PostTime>
          </div>
        </UserInfo>
        <CategoryBadge small color={category.color}>{category.name}</CategoryBadge>
      </ThreadMeta>
      
      <ThreadTitle>
        <Link to={`/threads/${id}`}>{title}</Link>
      </ThreadTitle>
      
      <ThreadContent>{content}</ThreadContent>
      
      <ThreadFooter>
        <ThreadStats>
          <ThreadStat>
            <ThumbUpOutlinedIcon fontSize="small" />
            <VoteCount count={voteCount}>{voteCount}</VoteCount>
          </ThreadStat>
          <ThreadStat>
            <ChatBubbleOutlineIcon fontSize="small" />
            {commentCount}
          </ThreadStat>
          <ThreadStat>
            <VisibilityIcon fontSize="small" />
            {viewCount}
          </ThreadStat>
        </ThreadStats>
        
        <ThreadActions>
          <IconButton size="32px" aria-label="Upvote">
            <ThumbUpOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="32px" aria-label="Downvote">
            <ThumbDownOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="32px" aria-label="Bookmark">
            <BookmarkBorderIcon fontSize="small" />
          </IconButton>
          <IconButton size="32px" aria-label="Share">
            <ShareIcon fontSize="small" />
          </IconButton>
        </ThreadActions>
      </ThreadFooter>
      
      <HoverGlowContainer 
        animate={{ 
          boxShadow: `0 0 20px 5px rgba(${parseInt(category.color.slice(1, 3), 16)}, ${parseInt(category.color.slice(3, 5), 16)}, ${parseInt(category.color.slice(5, 7), 16)}, 0.1)` 
        }}
        transition={{ duration: 0.3 }}
      />
    </ThreadCardContainer>
  );
};

export default ThreadCard; 