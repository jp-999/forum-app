import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Avatar, IconButton, Button, Input, Flex, Card } from '../common/StyledComponents';

// Material UI Icons
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';

const CommentContainer = styled(motion.div)`
  margin-left: ${props => props.depth > 0 ? `${props.depth * 2}rem` : '0'};
  border-left: ${props => props.depth > 0 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
  padding-left: ${props => props.depth > 0 ? '1rem' : '0'};
  margin-bottom: 1.5rem;
  max-width: 100%;
  
  @media (max-width: 768px) {
    margin-left: ${props => props.depth > 0 ? `${Math.min(props.depth, 3) * 1}rem` : '0'};
  }
`;

const CommentCard = styled(Card)`
  padding: 1rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  border-left: 2px solid ${props => props.isAuthor ? 'var(--primary)' : 'transparent'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthorBadge = styled.span`
  background: var(--primary);
  color: white;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CommentTime = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const CommentContent = styled.div`
  color: var(--text);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VoteButton = styled(IconButton)`
  &.active {
    color: ${props => props.upvote ? 'var(--success)' : 'var(--danger)'};
  }
`;

const VoteCount = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${props => 
    props.count > 0 
      ? 'var(--success)' 
      : props.count < 0 
        ? 'var(--danger)' 
        : 'var(--text-secondary)'
  };
  min-width: 1.5rem;
  text-align: center;
`;

const ReplyButton = styled(Button)`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const ReplyContainer = styled(motion.div)`
  margin-top: 1rem;
  padding-left: 2.5rem;
`;

const ReplyForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReplyActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const ReplyInput = styled(Input)`
  min-height: 80px;
  padding: 0.75rem;
  resize: vertical;
`;

const OptionsButton = styled(IconButton)`
  margin-left: auto;
`;

const formatTimestamp = (date) => {
  const now = new Date();
  const commentDate = new Date(date);
  const diffMs = now - commentDate;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);
  
  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return commentDate.toLocaleDateString();
};

const Comment = ({ comment, currentUser, isAuthor = false, depth = 0 }) => {
  const [showReply, setShowReply] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [voteCount, setVoteCount] = useState(comment.upvotes - comment.downvotes);
  
  const handleToggleReply = () => {
    setShowReply(!showReply);
  };
  
  const handleSubmitReply = (e) => {
    e.preventDefault();
    // This would submit the reply in a real application
    setShowReply(false);
  };
  
  const handleUpvote = () => {
    if (upvoted) {
      setUpvoted(false);
      setVoteCount(voteCount - 1);
    } else {
      setUpvoted(true);
      if (downvoted) {
        setDownvoted(false);
        setVoteCount(voteCount + 2);
      } else {
        setVoteCount(voteCount + 1);
      }
    }
  };
  
  const handleDownvote = () => {
    if (downvoted) {
      setDownvoted(false);
      setVoteCount(voteCount + 1);
    } else {
      setDownvoted(true);
      if (upvoted) {
        setUpvoted(false);
        setVoteCount(voteCount - 2);
      } else {
        setVoteCount(voteCount - 1);
      }
    }
  };

  return (
    <CommentContainer 
      depth={depth}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CommentCard isAuthor={isAuthor}>
        <CommentHeader>
          <UserInfo>
            <Avatar 
              src={comment.author.avatar} 
              size="36px"
            />
            <UserMeta>
              <Username>
                {comment.author.name}
                {isAuthor && <AuthorBadge>Author</AuthorBadge>}
              </Username>
              <CommentTime>{formatTimestamp(comment.createdAt)}</CommentTime>
            </UserMeta>
          </UserInfo>
          
          <OptionsButton aria-label="More options">
            <MoreVertIcon fontSize="small" />
          </OptionsButton>
        </CommentHeader>
        
        <CommentContent>
          {comment.content}
        </CommentContent>
        
        <CommentActions>
          <VoteButton 
            size="28px" 
            aria-label="Upvote" 
            upvote 
            className={upvoted ? 'active' : ''}
            onClick={handleUpvote}
          >
            <ThumbUpOutlinedIcon fontSize="small" />
          </VoteButton>
          
          <VoteCount count={voteCount}>{voteCount}</VoteCount>
          
          <VoteButton 
            size="28px" 
            aria-label="Downvote"
            className={downvoted ? 'active' : ''}
            onClick={handleDownvote}
          >
            <ThumbDownOutlinedIcon fontSize="small" />
          </VoteButton>
          
          <ReplyButton 
            variant="ghost" 
            small
            onClick={handleToggleReply}
          >
            <ReplyIcon fontSize="small" />
            Reply
          </ReplyButton>
        </CommentActions>
      </CommentCard>
      
      {showReply && (
        <ReplyContainer
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <ReplyForm onSubmit={handleSubmitReply}>
            <ReplyInput 
              as="textarea" 
              placeholder="Write your reply..." 
              autoFocus
            />
            <ReplyActions>
              <Button 
                variant="ghost" 
                small 
                type="button"
                onClick={handleToggleReply}
              >
                Cancel
              </Button>
              <Button 
                small 
                type="submit"
              >
                Submit Reply
              </Button>
            </ReplyActions>
          </ReplyForm>
        </ReplyContainer>
      )}
      
      {/* Render replies if available */}
      {comment.replies && comment.replies.map(reply => (
        <Comment 
          key={reply.id} 
          comment={reply} 
          depth={depth + 1}
          currentUser={currentUser}
        />
      ))}
    </CommentContainer>
  );
};

export default Comment; 