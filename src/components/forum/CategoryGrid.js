import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Grid, NeonHeading } from '../common/StyledComponents';
import CategoryCard from './CategoryCard';

const CategoryGridContainer = styled.section`
  margin: 2rem 0;
`;

const StaggeredGrid = styled(Grid)`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -100px;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(110, 0, 255, 0.2) 0%, rgba(110, 0, 255, 0) 70%);
    border-radius: 50%;
    z-index: -1;
    filter: blur(50px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: -100px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(0, 229, 255, 0.2) 0%, rgba(0, 229, 255, 0) 70%);
    border-radius: 50%;
    z-index: -1;
    filter: blur(50px);
  }
`;

const categoryListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const categoryItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

const CategoryGrid = ({ categories, title }) => {
  return (
    <CategoryGridContainer>
      {title && <NeonHeading level={2}>{title}</NeonHeading>}
      
      <StaggeredGrid
        as={motion.div}
        variants={categoryListVariants}
        initial="hidden"
        animate="visible"
        minWidth="280px"
        gap="1.5rem"
      >
        {categories.map((category) => (
          <motion.div 
            key={category.id} 
            variants={categoryItemVariants}
          >
            <CategoryCard category={category} />
          </motion.div>
        ))}
      </StaggeredGrid>
    </CategoryGridContainer>
  );
};

export default CategoryGrid; 