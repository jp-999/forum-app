import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { NeonHeading, Card, Button } from '../components/common/StyledComponents';
import { Link } from 'react-router-dom';

// Material UI Icons
import HelpIcon from '@mui/icons-material/Help';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import ForumIcon from '@mui/icons-material/Forum';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';

const FaqPageContainer = styled.div`
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

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: var(--background-lighter);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  color: var(--text);
  font-size: 1rem;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(110, 0, 255, 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const SearchIconWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 1.25rem;
  transform: translateY(-50%);
  color: var(--primary);
  font-size: 1.25rem;
  pointer-events: none;
`;

const FaqCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const CategoryButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${props => props.active ? 'var(--primary)' : 'var(--background-lighter)'};
  color: ${props => props.active ? 'white' : 'var(--text)'};
  
  svg {
    font-size: 1.1rem;
  }
`;

const FaqSection = styled(Card)`
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

const FaqItem = styled.div`
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const FaqQuestion = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  
  svg {
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    color: var(--primary);
  }
`;

const FaqAnswer = styled(motion.div)`
  color: var(--text-secondary);
  line-height: 1.7;
  padding: 0.5rem 0 1rem;
  
  a {
    color: var(--secondary);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
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

const faqData = {
  general: [
    {
      question: "What is Quantum Forum?",
      answer: "Quantum Forum is a next-generation discussion platform designed for tech enthusiasts, futurists, and creative minds. Our platform combines cutting-edge technology with a sleek, futuristic design to create an immersive space for meaningful conversations."
    },
    {
      question: "How do I create a new thread?",
      answer: "To create a new thread, click the 'New Thread' button in the navigation bar. Choose the appropriate category, add a descriptive title, write your content, and click 'Post Thread'. You can also add tags to help others find your thread."
    },
    {
      question: "Can I use markdown in my posts?",
      answer: "Yes, Quantum Forum supports markdown formatting. You can use it to style your text, create lists, add code blocks, and more. Click the formatting help icon in the post editor to see available markdown syntax."
    },
    {
      question: "How does the karma system work?",
      answer: "Karma is earned when other users upvote your threads or comments. Higher karma gives you access to additional features and indicates your standing in the community. Consistently helpful and valuable contributions will increase your karma over time."
    }
  ],
  account: [
    {
      question: "How do I change my profile picture?",
      answer: "To change your profile picture, go to your profile page by clicking on your avatar in the top-right corner, then select 'Profile'. Click the 'Edit Profile' button and you'll find options to upload a new profile picture."
    },
    {
      question: "Can I change my username?",
      answer: "Usernames can be changed once every 30 days. Go to Settings > Account > Username to update it. Note that your previous username may still appear in old quotes or mentions."
    },
    {
      question: "How do I reset my password?",
      answer: "If you're logged in, go to Settings > Security > Password to change your password. If you've forgotten your password, click 'Forgot Password' on the login page and follow the instructions sent to your email."
    },
    {
      question: "How can I delete my account?",
      answer: "Account deletion can be initiated in Settings > Account > Delete Account. This action is permanent and will remove all your personal information, though your public contributions will remain on the forum with an anonymous attribution."
    }
  ],
  notifications: [
    {
      question: "How do I control which notifications I receive?",
      answer: "You can customize your notification preferences in Settings > Notifications. Toggle options for different types of activities like replies, mentions, upvotes, and more. You can also choose to receive notifications via email."
    },
    {
      question: "Why am I not receiving email notifications?",
      answer: "Check your spam folder first. If you still don't see them, verify your email address is correct in Settings > Account. You can also try re-enabling email notifications in Settings > Notifications."
    },
    {
      question: "How do I mute a specific thread?",
      answer: "To mute notifications from a specific thread, open the thread and click the bell icon near the top. You can choose to mute all notifications or only certain types for that thread."
    }
  ],
  privacy: [
    {
      question: "Who can see my profile information?",
      answer: "By default, your profile is visible to all community members. You can adjust your privacy settings in Settings > Privacy to limit what information is visible and to whom."
    },
    {
      question: "Are my private messages secure?",
      answer: "Private messages are encrypted and only visible to you and the recipient(s). Our staff cannot read the content of your messages unless they're reported for violating our community guidelines."
    },
    {
      question: "Can I make my activity invisible to other users?",
      answer: "You can enable 'Incognito Mode' in Settings > Privacy to browse without appearing in online user lists and without updating your 'last seen' timestamp. Note that your posts and comments will still be visible."
    }
  ]
};

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestions, setOpenQuestions] = useState({});
  
  const toggleQuestion = (categoryIndex, questionIndex) => {
    const questionKey = `${categoryIndex}-${questionIndex}`;
    setOpenQuestions(prev => ({
      ...prev,
      [questionKey]: !prev[questionKey]
    }));
  };
  
  const filteredFaqData = searchQuery
    ? Object.keys(faqData).reduce((result, category) => {
        const filteredQuestions = faqData[category].filter(
          item => 
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredQuestions.length > 0) {
          result[category] = filteredQuestions;
        }
        return result;
      }, {})
    : { [activeCategory]: faqData[activeCategory] };
  
  const categories = [
    { id: 'general', label: 'General', icon: <HelpIcon /> },
    { id: 'account', label: 'Account', icon: <AccountCircleIcon /> },
    { id: 'notifications', label: 'Notifications', icon: <NotificationsIcon /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <SecurityIcon /> }
  ];
  
  return (
    <FaqPageContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader>
        <NeonHeading>Frequently Asked Questions</NeonHeading>
        <Subtitle>
          Find answers to common questions about using Quantum Forum. If you can't find what you're looking for,
          don't hesitate to contact our support team.
        </Subtitle>
      </PageHeader>
      
      <SearchContainer>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <SearchInput 
          placeholder="Search for answers..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      
      {!searchQuery && (
        <FaqCategories>
          {categories.map(category => (
            <CategoryButton
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon}
              {category.label}
            </CategoryButton>
          ))}
        </FaqCategories>
      )}
      
      {Object.entries(filteredFaqData).map(([category, questions]) => (
        <FaqSection key={category}>
          <SectionTitle>
            {categories.find(cat => cat.id === category)?.icon || <ForumIcon />}
            {categories.find(cat => cat.id === category)?.label || 'FAQs'}
          </SectionTitle>
          
          {questions.map((item, index) => (
            <FaqItem key={index}>
              <FaqQuestion 
                isOpen={openQuestions[`${category}-${index}`]} 
                onClick={() => toggleQuestion(category, index)}
              >
                {item.question}
                <ExpandMoreIcon />
              </FaqQuestion>
              
              <AnimatePresence>
                {openQuestions[`${category}-${index}`] && (
                  <FaqAnswer
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.answer}
                  </FaqAnswer>
                )}
              </AnimatePresence>
            </FaqItem>
          ))}
        </FaqSection>
      ))}
      
      <ContactSection>
        <ContactTitle>Still Have Questions?</ContactTitle>
        <ContactDescription>
          If you couldn't find the answer you were looking for, our support team
          is ready to assist you with any questions you may have.
        </ContactDescription>
        <Link to="/about">
          <Button>Contact Support</Button>
        </Link>
      </ContactSection>
    </FaqPageContainer>
  );
};

export default FaqPage; 