import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card, Badge } from '../common/StyledComponents';

const CategoryCardContainer = styled(motion(Card))`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(110, 0, 255, 0.2);
  }
`;

const CategoryHeader = styled.div`
  position: relative;
  height: 100px;
  overflow: hidden;
  background: ${props => props.bgColor || 'var(--primary)'};
  background-image: ${props => props.bgImage ? `url(${props.bgImage})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      ${props => `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), 
      radial-gradient(circle at 70% 40%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%),
      linear-gradient(to bottom right, ${props.bgColor || 'var(--primary)'}80 0%, ${props.bgColor || 'var(--primary)'}20 80%)`};
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3));
  }
`;

const CategoryIcon = styled.div`
  font-size: 2.5rem;
  color: white;
  z-index: 2;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const CategoryContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text);
`;

const CategoryDescription = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  flex: 1;
`;

const CategoryFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

const CategoryStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: var(--text-secondary);
`;

const StatValue = styled.span`
  font-weight: 600;
  color: var(--text);
`;

const CategoryCard = ({ category }) => {
  const { id, name, description, icon, color, threadCount, memberCount, backgroundImage } = category;
  
  return (
    <CategoryCardContainer
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link to={`/categories/${id}`} style={{ textDecoration: 'none', color: 'inherit', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CategoryHeader bgColor={color} bgImage={backgroundImage}>
          <CategoryIcon>{icon}</CategoryIcon>
        </CategoryHeader>
        
        <CategoryContent>
          <CategoryTitle>{name}</CategoryTitle>
          <CategoryDescription>{description}</CategoryDescription>
          
          <CategoryFooter>
            <CategoryStats>
              <StatItem>
                <StatValue>{threadCount}</StatValue> threads
              </StatItem>
              <StatItem>
                <StatValue>{memberCount}</StatValue> members
              </StatItem>
            </CategoryStats>
            
            <Badge small color={color}>Active</Badge>
          </CategoryFooter>
        </CategoryContent>
      </Link>
    </CategoryCardContainer>
  );
};

export default CategoryCard; 