import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NeonHeading } from '../components/common/StyledComponents';
import ThreadList from '../components/forum/ThreadList';
import { threads } from '../data/mockData';

// Material UI Icons
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const TrendingPageContainer = styled.div`
  padding: 2rem 0;
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const PageSubtitle = styled.p`
  color: var(--text-secondary);
  margin-top: 1rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const TitleIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: white;
  margin-right: 0.75rem;
  box-shadow: 0 0 20px rgba(255, 0, 229, 0.3);
  
  svg {
    font-size: 1.75rem;
  }
`;

const HeadingFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const TrendingPage = () => {
  // Sort threads by upvotes and views for trending
  const trendingThreads = [...threads]
    .sort((a, b) => {
      // Calculate a "heat" score based on upvotes and views
      const scoreA = (a.upvotes - a.downvotes) * 3 + a.viewCount;
      const scoreB = (b.upvotes - b.downvotes) * 3 + b.viewCount;
      return scoreB - scoreA;
    });
  
  return (
    <TrendingPageContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader>
        <HeadingFlex>
          <TitleIcon>
            <LocalFireDepartmentIcon />
          </TitleIcon>
          <NeonHeading>Trending Discussions</NeonHeading>
        </HeadingFlex>
        <PageSubtitle>
          Explore the most popular and active conversations happening right now.
          These threads are gaining traction and generating meaningful discussions.
        </PageSubtitle>
      </PageHeader>
      
      <ThreadList threads={trendingThreads} />
    </TrendingPageContainer>
  );
};

export default TrendingPage; 