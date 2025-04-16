import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NeonHeading, Button, Flex, Badge, Card } from '../components/common/StyledComponents';
import ThreadList from '../components/forum/ThreadList';
import { categories, getThreadsByCategory } from '../data/mockData';

// Material UI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ForumIcon from '@mui/icons-material/Forum';

const CategoryPageContainer = styled.div`
  padding: 2rem 0;
`;

const CategoryHeader = styled(Card)`
  margin-bottom: 2rem;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: ${props => props.categoryColor || 'var(--primary)'};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, ${props => props.categoryColor + '20' || 'rgba(110, 0, 255, 0.1)'} 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
    opacity: 0.6;
  }
`;

const CategoryIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.color || 'var(--primary)'};
  margin-right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const CategoryInfo = styled.div`
  flex: 1;
`;

const CategoryDescription = styled.p`
  color: var(--text-secondary);
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 1.05rem;
`;

const CategoryStats = styled(Flex)`
  margin-top: 1.5rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-right: 2rem;
  
  svg {
    color: ${props => props.color || 'var(--primary)'};
  }
  
  span {
    font-weight: bold;
    color: var(--text);
    margin-right: 0.25rem;
  }
`;

const BackButton = styled(Button)`
  margin-bottom: 1.5rem;
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

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  // Find the category by ID
  const category = categories.find(cat => cat.id === categoryId);
  
  // If category not found, show error
  if (!category) {
    return (
      <CategoryPageContainer>
        <BackButton 
          variant="ghost" 
          small 
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon fontSize="small" />
          Back
        </BackButton>
        
        <EmptyState>
          <h3>Category Not Found</h3>
          <p>The category you're looking for doesn't exist or has been removed.</p>
          <Button as={Link} to="/categories">View All Categories</Button>
        </EmptyState>
      </CategoryPageContainer>
    );
  }
  
  // Get threads for this category
  const categoryThreads = getThreadsByCategory(categoryId);
  
  return (
    <CategoryPageContainer>
      <BackButton 
        variant="ghost" 
        small 
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon fontSize="small" />
        Back
      </BackButton>
      
      <CategoryHeader
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        categoryColor={category.color}
      >
        <Flex align="flex-start">
          <CategoryIcon color={category.color}>
            {category.icon}
          </CategoryIcon>
          
          <CategoryInfo>
            <Badge color={category.color}>{category.name}</Badge>
            <NeonHeading level={2}>{category.name}</NeonHeading>
            <CategoryDescription>{category.description}</CategoryDescription>
            
            <Button>Create Thread</Button>
            
            <CategoryStats>
              <StatItem color={category.color}>
                <ForumIcon fontSize="small" />
                <span>{category.threadCount}</span> threads
              </StatItem>
              
              <StatItem color={category.color}>
                <PeopleAltIcon fontSize="small" />
                <span>{category.memberCount}</span> members
              </StatItem>
            </CategoryStats>
          </CategoryInfo>
        </Flex>
      </CategoryHeader>
      
      {categoryThreads.length > 0 ? (
        <ThreadList 
          threads={categoryThreads} 
          title={`Threads in ${category.name}`} 
        />
      ) : (
        <EmptyState>
          <h3>No Threads Yet</h3>
          <p>
            Be the first to start a conversation in this category.
            Create a thread to share your thoughts, ask questions, or discuss topics related to {category.name}.
          </p>
          <Button>Create Thread</Button>
        </EmptyState>
      )}
    </CategoryPageContainer>
  );
};

export default CategoryPage; 