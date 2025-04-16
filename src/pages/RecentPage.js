import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NeonHeading } from '../components/common/StyledComponents';
import ThreadList from '../components/forum/ThreadList';
import { threads } from '../data/mockData';

// Material UI Icons
import UpdateIcon from '@mui/icons-material/Update';

const RecentPageContainer = styled.div`
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
  background: linear-gradient(135deg, var(--secondary), var(--success));
  color: white;
  margin-right: 0.75rem;
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.3);
  
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

const RecentPage = () => {
  // Sort threads by creation date (newest first)
  const recentThreads = [...threads]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  return (
    <RecentPageContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader>
        <HeadingFlex>
          <TitleIcon>
            <UpdateIcon />
          </TitleIcon>
          <NeonHeading>Recent Discussions</NeonHeading>
        </HeadingFlex>
        <PageSubtitle>
          Stay up to date with the newest conversations in our community.
          Browse the most recently created threads across all categories.
        </PageSubtitle>
      </PageHeader>
      
      <ThreadList threads={recentThreads} />
    </RecentPageContainer>
  );
};

export default RecentPage; 