import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NeonHeading } from '../components/common/StyledComponents';

const AboutPageContainer = styled.div`
  padding: 2rem 0;
`;

const AboutSection = styled.section`
  background: var(--background-light);
  border-radius: var(--card-border-radius);
  padding: 2rem;
  margin-bottom: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: var(--card-shadow);
`;

const HeadingWrapper = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--text);
`;

const HighlightText = styled.span`
  color: var(--secondary);
  font-weight: 600;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled(motion.div)`
  background: var(--background-lighter);
  border-radius: var(--card-border-radius);
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-5px);
    box-shadow: var(--neon-shadow);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--primary-light);
`;

const AboutPage = () => {
  return (
    <AboutPageContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AboutSection>
        <HeadingWrapper>
          <NeonHeading>About Quantum Forum</NeonHeading>
        </HeadingWrapper>
        
        <Paragraph>
          Welcome to <HighlightText>Quantum Forum</HighlightText>, a next-generation discussion platform 
          designed for tech enthusiasts, futurists, and creative minds. Our platform combines cutting-edge 
          technology with a sleek, futuristic design to create an immersive space for meaningful conversations.
        </Paragraph>
        
        <Paragraph>
          Founded in 2023, Quantum Forum aims to bridge the gap between traditional forums and modern social 
          media, offering the best of both worlds - the depth and substance of forum discussions with the 
          engaging user experience of contemporary platforms.
        </Paragraph>
        
        <Paragraph>
          Our mission is to foster a community where ideas flourish, knowledge is shared freely, and connections 
          are formed around shared interests. Whether you're here to learn, teach, debate, or simply explore, 
          you'll find a welcoming space that values quality content and respectful discourse.
        </Paragraph>
      </AboutSection>
      
      <AboutSection>
        <HeadingWrapper>
          <NeonHeading level={2}>Features</NeonHeading>
        </HeadingWrapper>
        
        <GridContainer>
          <FeatureCard
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <FeatureTitle>Responsive Design</FeatureTitle>
            <Paragraph>
              Enjoy a seamless experience across all devices with our fully responsive interface.
            </Paragraph>
          </FeatureCard>
          
          <FeatureCard
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <FeatureTitle>Real-time Updates</FeatureTitle>
            <Paragraph>
              Stay in the loop with instant notifications and live comment updates.
            </Paragraph>
          </FeatureCard>
          
          <FeatureCard
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <FeatureTitle>Advanced Filtering</FeatureTitle>
            <Paragraph>
              Find exactly what you're looking for with our intuitive search and filtering tools.
            </Paragraph>
          </FeatureCard>
          
          <FeatureCard
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <FeatureTitle>Community Badges</FeatureTitle>
            <Paragraph>
              Earn recognition for your contributions with our dynamic badge system.
            </Paragraph>
          </FeatureCard>
          
          <FeatureCard
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <FeatureTitle>Custom Themes</FeatureTitle>
            <Paragraph>
              Personalize your experience with a selection of custom color schemes and layouts.
            </Paragraph>
          </FeatureCard>
          
          <FeatureCard
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <FeatureTitle>Rich Media Support</FeatureTitle>
            <Paragraph>
              Share images, videos, code snippets, and more with our advanced editor.
            </Paragraph>
          </FeatureCard>
        </GridContainer>
      </AboutSection>
    </AboutPageContainer>
  );
};

export default AboutPage; 