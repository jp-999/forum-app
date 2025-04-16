import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NeonHeading, Button } from '../components/common/StyledComponents';

// Material UI Icons
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';

const ApiDocContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const HeadingWithIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: linear-gradient(45deg, var(--primary-dark), var(--primary));
  color: white;
  font-size: 1.5rem;
  box-shadow: var(--neon-shadow);
`;

const PageDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ApiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ApiSection = styled.div`
  background: var(--background-lighter);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow);
  }
`;

const ApiSectionTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--text);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: var(--primary);
  }
`;

const ApiSectionContent = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CodeExample = styled.pre`
  background: var(--background);
  padding: 1rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: var(--text);
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin: 1.5rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const ApiDocPage = () => {
  return (
    <ApiDocContainer
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <PageHeader>
        <HeadingWithIcon>
          <HeaderIcon>
            <CodeIcon fontSize="large" />
          </HeaderIcon>
          <NeonHeading>API Documentation</NeonHeading>
        </HeadingWithIcon>
        <PageDescription>
          Integrate with the NexusTalk platform using our powerful and developer-friendly API. 
          Build your own applications, extensions, or customize your experience.
        </PageDescription>
      </PageHeader>
      
      <ApiGrid>
        <ApiSection>
          <ApiSectionTitle>
            <IntegrationInstructionsIcon /> Getting Started
          </ApiSectionTitle>
          <ApiSectionContent>
            To use the NexusTalk API, you'll need to register for an API key. Our RESTful API allows
            you to interact with forum data programmatically.
          </ApiSectionContent>
          <CodeExample>
{`// Example API request with authentication
fetch('https://api.nexustalk.com/v1/threads', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
          </CodeExample>
          <Button small>
            Register for API Key
          </Button>
        </ApiSection>
        
        <ApiSection>
          <ApiSectionTitle>
            <ArticleIcon /> Endpoints
          </ApiSectionTitle>
          <ApiSectionContent>
            Our API provides endpoints for threads, categories, users, and more. All endpoints
            return JSON responses and follow RESTful conventions.
          </ApiSectionContent>
          <ul>
            <li>GET /api/v1/threads - List all threads</li>
            <li>GET /api/v1/threads/:id - Get thread by ID</li>
            <li>GET /api/v1/categories - List all categories</li>
            <li>GET /api/v1/users/:id - Get user profile</li>
            <li>POST /api/v1/threads - Create new thread</li>
            <li>POST /api/v1/comments - Create new comment</li>
          </ul>
          <Button small as="a" href="#" target="_blank" rel="noopener noreferrer">
            Full API Reference
          </Button>
        </ApiSection>
        
        <ApiSection>
          <ApiSectionTitle>
            <GitHubIcon /> SDKs & Libraries
          </ApiSectionTitle>
          <ApiSectionContent>
            We provide official client libraries for several programming languages to make
            integration even easier.
          </ApiSectionContent>
          <ul>
            <li>JavaScript/TypeScript</li>
            <li>Python</li>
            <li>Java</li>
            <li>Ruby</li>
            <li>Go</li>
          </ul>
          <ButtonContainer>
            <Button small as="a" href="https://github.com/nexustalk" target="_blank" rel="noopener noreferrer">
              <GitHubIcon style={{ marginRight: '0.5rem' }} />
              GitHub Repos
            </Button>
            <Button small as="a" href="#" variant="secondary">
              Sample Apps
            </Button>
          </ButtonContainer>
        </ApiSection>
        
        <ApiSection>
          <ApiSectionTitle>
            <ArticleIcon /> Webhooks
          </ApiSectionTitle>
          <ApiSectionContent>
            Set up webhooks to get real-time notifications when events occur on the platform.
            Webhooks can be configured for new threads, comments, upvotes, and more.
          </ApiSectionContent>
          <CodeExample>
{`// Webhook payload example
{
  "event": "thread.created",
  "timestamp": "2023-07-22T15:20:30Z",
  "data": {
    "threadId": "t-123456",
    "title": "New Thread Title",
    "author": "user-789",
    "categoryId": "cat-456"
  }
}`}
          </CodeExample>
          <Button small>
            Configure Webhooks
          </Button>
        </ApiSection>
      </ApiGrid>
    </ApiDocContainer>
  );
};

export default ApiDocPage; 