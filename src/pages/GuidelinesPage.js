import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NeonHeading, Card, Button } from '../components/common/StyledComponents';
import { Link } from 'react-router-dom';

// Material UI Icons
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import SecurityIcon from '@mui/icons-material/Security';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PolicyIcon from '@mui/icons-material/Policy';

const GuidelinesPageContainer = styled.div`
  padding: 2rem 0;
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  margin-top: 1rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const GuidelinesSection = styled(Card)`
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--primary-light);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: var(--primary);
  }
`;

const GuidelinesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const GuidelineItem = styled.li`
  margin-bottom: 1.5rem;
  padding-left: 2rem;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 10px;
    height: 10px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    border-radius: 50%;
  }
`;

const GuidelineTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--text);
`;

const GuidelineDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
`;

const DosDontsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DosDontsCard = styled(Card)`
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: ${props => props.type === 'dos' ? 'var(--success)' : 'var(--danger)'};
    
    svg {
      color: ${props => props.type === 'dos' ? 'var(--success)' : 'var(--danger)'};
    }
  }
  
  ul {
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.75rem;
      color: var(--text-secondary);
    }
  }
`;

const ContactSection = styled(Card)`
  padding: 2rem;
  text-align: center;
  margin-top: 3rem;
`;

const ContactTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text);
`;

const ContactDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const GuidelinesPage = () => {
  return (
    <GuidelinesPageContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader>
        <NeonHeading>Community Guidelines</NeonHeading>
        <Subtitle>
          Our guidelines ensure that Quantum Forum remains a positive, inclusive, and 
          valuable space for all members. By joining our community, you agree to follow 
          these principles.
        </Subtitle>
      </PageHeader>
      
      <GuidelinesSection>
        <SectionTitle>
          <ForumIcon />
          General Principles
        </SectionTitle>
        <GuidelinesList>
          <GuidelineItem>
            <GuidelineTitle>Respect Everyone</GuidelineTitle>
            <GuidelineDescription>
              Treat all community members with respect and courtesy, regardless of their 
              background, experience level, or opinions. Disagreements are natural, but 
              personal attacks, harassment, or discrimination will not be tolerated.
            </GuidelineDescription>
          </GuidelineItem>
          
          <GuidelineItem>
            <GuidelineTitle>Quality Content</GuidelineTitle>
            <GuidelineDescription>
              Aim to contribute value to discussions. Posts should be thoughtful, 
              relevant, and add something meaningful to the conversation. Avoid 
              low-effort content like one-word responses or excessive memes.
            </GuidelineDescription>
          </GuidelineItem>
          
          <GuidelineItem>
            <GuidelineTitle>Stay On Topic</GuidelineTitle>
            <GuidelineDescription>
              Keep your posts relevant to the thread and category they're in. If you 
              want to discuss something different, consider starting a new thread in 
              the appropriate category.
            </GuidelineDescription>
          </GuidelineItem>
        </GuidelinesList>
      </GuidelinesSection>
      
      <GuidelinesSection>
        <SectionTitle>
          <SecurityIcon />
          Content Policies
        </SectionTitle>
        <GuidelinesList>
          <GuidelineItem>
            <GuidelineTitle>No Harmful Content</GuidelineTitle>
            <GuidelineDescription>
              Don't post content that promotes violence, illegal activities, or harm
              to individuals or groups. This includes threatening language, incitement,
              or instructions for dangerous activities.
            </GuidelineDescription>
          </GuidelineItem>
          
          <GuidelineItem>
            <GuidelineTitle>Intellectual Property</GuidelineTitle>
            <GuidelineDescription>
              Respect copyright and intellectual property rights. Don't post content
              that infringes on others' rights, and properly attribute sources when
              sharing others' work.
            </GuidelineDescription>
          </GuidelineItem>
          
          <GuidelineItem>
            <GuidelineTitle>Privacy</GuidelineTitle>
            <GuidelineDescription>
              Respect others' privacy. Don't share personal information about other
              users without their consent, including private messages, contact details,
              or identifying information.
            </GuidelineDescription>
          </GuidelineItem>
        </GuidelinesList>
      </GuidelinesSection>
      
      <GuidelinesSection>
        <SectionTitle>
          <PeopleAltIcon />
          Community Etiquette
        </SectionTitle>
        
        <DosDontsContainer>
          <DosDontsCard type="dos">
            <h3>
              <CheckCircleIcon />
              Do's
            </h3>
            <ul>
              <li>Be constructive and supportive in your interactions</li>
              <li>Use clear, descriptive titles for your threads</li>
              <li>Format your posts for readability (paragraphs, lists, etc.)</li>
              <li>Check if your question has already been answered before posting</li>
              <li>Provide context and relevant details when asking questions</li>
              <li>Report content that violates our guidelines</li>
              <li>Accept and learn from constructive criticism</li>
            </ul>
          </DosDontsCard>
          
          <DosDontsCard type="donts">
            <h3>
              <CancelIcon />
              Don'ts
            </h3>
            <ul>
              <li>Engage in personal attacks or harassment</li>
              <li>Spam the forum with repetitive or promotional content</li>
              <li>Post off-topic comments that derail discussions</li>
              <li>Use excessive formatting (ALL CAPS, multiple exclamation marks!!!)</li>
              <li>Create multiple accounts to manipulate voting or evade bans</li>
              <li>Share non-consensual intimate imagery or doxing information</li>
              <li>Intentionally spread misinformation or unverified claims</li>
            </ul>
          </DosDontsCard>
        </DosDontsContainer>
      </GuidelinesSection>
      
      <GuidelinesSection>
        <SectionTitle>
          <PolicyIcon />
          Enforcement
        </SectionTitle>
        <GuidelineDescription>
          Violations of these guidelines may result in content removal, temporary restrictions, 
          or permanent account suspension, depending on the severity and frequency. Our moderation 
          team reviews reported content and makes decisions based on these guidelines and their best judgment.
        </GuidelineDescription>
        <GuidelineDescription>
          We strive to be fair and consistent in enforcement, but recognize that moderation decisions 
          involve context and nuance. If you believe a decision was made in error, you can appeal through 
          our support channels.
        </GuidelineDescription>
      </GuidelinesSection>
      
      <ContactSection>
        <ContactTitle>Questions About Our Guidelines?</ContactTitle>
        <ContactDescription>
          If you have questions about our community guidelines or need to report a violation,
          our support team is here to help.
        </ContactDescription>
        <Link to="/about">
          <Button>Contact Support</Button>
        </Link>
      </ContactSection>
    </GuidelinesPageContainer>
  );
};

export default GuidelinesPage; 