import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { NeonHeading, Button, Flex, Badge, Card, Avatar, Input, IconButton, Divider } from '../components/common/StyledComponents';
import Comment from '../components/forum/Comment';
import { getThreadById, getCommentsByThreadId, users } from '../data/mockData';

// Material UI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SendIcon from '@mui/icons-material/Send';
import SortIcon from '@mui/icons-material/Sort';

const ThreadPageContainer = styled.div`
  padding: 2rem 0;
`;

const BackButton = styled(Button)`
  margin-bottom: 1.5rem;
`;

const ThreadCard = styled(Card)`
  margin-bottom: 2rem;
  padding: 2rem;
  position: relative;
  overflow: visible;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: ${props => props.categoryColor || 'var(--primary)'};
  }
`;

const ThreadTitle = styled(NeonHeading)`
  margin-top: 0.5rem;
`;

const ThreadContent = styled.div`
  color: var(--text);
  line-height: 1.8;
  font-size: 1.1rem;
  margin: 1.5rem 0;
`;

const ThreadMeta = styled(Flex)`
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const AuthorInfo = styled(Flex)`
  gap: 0.75rem;
  margin-right: 1rem;
`;

const AuthorName = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorDisplayName = styled.span`
  font-weight: 600;
  color: var(--text);
`;

const AuthorUsername = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const PostTime = styled.span`
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const ThreadActions = styled(Flex)`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const ActionButton = styled(Button)`
  gap: 0.5rem;
`;

const ThreadStats = styled(Flex)`
  margin-left: auto;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
    width: 100%;
    justify-content: flex-start;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  
  svg {
    opacity: 0.7;
  }
  
  span {
    font-weight: 600;
  }
`;

const CommentsSection = styled.section`
  margin-top: 3rem;
`;

const CommentHeader = styled(Flex)`
  margin-bottom: 2rem;
`;

const CommentForm = styled.form`
  margin-bottom: 2rem;
`;

const CommentInput = styled(Input)`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  margin-bottom: 1rem;
  resize: vertical;
`;

const SortOptions = styled(Flex)`
  margin-left: auto;
`;

const SortButton = styled(Button)`
  gap: 0.5rem;
`;

const NoCommentsMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: var(--background-light);
  border-radius: var(--card-border-radius);
  margin-top: 2rem;
  
  h4 {
    margin-bottom: 1rem;
    color: var(--text);
  }
  
  p {
    color: var(--text-secondary);
    margin-bottom: 0;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  background: var(--background-light);
  border-radius: var(--card-border-radius);
  
  h3 {
    margin-bottom: 1rem;
    color: var(--text);
  }
  
  p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ThreadPage = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  
  // Current user (for demo purposes)
  const currentUser = users[0];
  
  // Find the thread by ID
  const thread = getThreadById(threadId);
  
  // Get thread comments
  const threadComments = getCommentsByThreadId(threadId);
  
  // If thread not found, show error
  if (!thread) {
    return (
      <ThreadPageContainer>
        <BackButton 
          variant="ghost" 
          small 
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon fontSize="small" />
          Back
        </BackButton>
        
        <EmptyState>
          <h3>Thread Not Found</h3>
          <p>The thread you're looking for doesn't exist or has been removed.</p>
          <Button as={Link} to="/">Return to Home</Button>
        </EmptyState>
      </ThreadPageContainer>
    );
  }
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Here you would normally submit the comment to your API
    setCommentText('');
    alert('Comment submitted!');
  };
  
  return (
    <ThreadPageContainer>
      <BackButton 
        variant="ghost" 
        small 
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon fontSize="small" />
        Back
      </BackButton>
      
      <ThreadCard
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        categoryColor={thread.category.color}
      >
        <ThreadMeta>
          <Badge color={thread.category.color}>
            {thread.category.name}
          </Badge>
          
          <PostTime>Posted on {formatDate(thread.createdAt)}</PostTime>
        </ThreadMeta>
        
        <ThreadTitle level={1}>{thread.title}</ThreadTitle>
        
        <AuthorInfo>
          <Avatar src={thread.author.avatar} size="48px" />
          <AuthorName>
            <AuthorDisplayName>{thread.author.name}</AuthorDisplayName>
            <AuthorUsername>{thread.author.username}</AuthorUsername>
          </AuthorName>
        </AuthorInfo>
        
        <ThreadContent>
          {thread.content}
        </ThreadContent>
        
        <ThreadActions>
          <ActionButton variant="ghost">
            <ThumbUpOutlinedIcon />
            Upvote ({thread.upvotes})
          </ActionButton>
          
          <ActionButton variant="ghost">
            <ThumbDownOutlinedIcon />
            Downvote ({thread.downvotes})
          </ActionButton>
          
          <ActionButton variant="ghost">
            <BookmarkBorderIcon />
            Save
          </ActionButton>
          
          <ActionButton variant="ghost">
            <ShareIcon />
            Share
          </ActionButton>
          
          <ThreadStats>
            <StatItem>
              <VisibilityIcon fontSize="small" />
              <span>{thread.viewCount}</span> views
            </StatItem>
          </ThreadStats>
        </ThreadActions>
      </ThreadCard>
      
      <CommentsSection>
        <CommentHeader>
          <NeonHeading level={3}>
            {thread.commentCount} {thread.commentCount === 1 ? 'Comment' : 'Comments'}
          </NeonHeading>
          
          <SortOptions>
            <SortButton variant="ghost" small>
              <SortIcon fontSize="small" />
              {sortOption === 'newest' ? 'Newest' : 'Top Comments'}
            </SortButton>
          </SortOptions>
        </CommentHeader>
        
        <CommentForm onSubmit={handleCommentSubmit}>
          <CommentInput
            as="textarea"
            placeholder="Add your comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Flex justify="flex-end">
            <Button type="submit">
              <SendIcon fontSize="small" />
              Post Comment
            </Button>
          </Flex>
        </CommentForm>
        
        <Divider />
        
        <AnimatePresence>
          {threadComments.length > 0 ? (
            threadComments.map(comment => (
              <Comment 
                key={comment.id} 
                comment={comment} 
                currentUser={currentUser}
                isAuthor={comment.author.id === thread.author.id}
              />
            ))
          ) : (
            <NoCommentsMessage>
              <h4>No Comments Yet</h4>
              <p>Be the first to share your thoughts on this thread!</p>
            </NoCommentsMessage>
          )}
        </AnimatePresence>
      </CommentsSection>
    </ThreadPageContainer>
  );
};

export default ThreadPage; 