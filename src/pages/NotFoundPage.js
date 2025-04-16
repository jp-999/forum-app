import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button } from '../components/common/StyledComponents';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 300px);
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const GlitchText = styled(motion.h1)`
  font-size: clamp(6rem, 15vw, 10rem);
  font-weight: 900;
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
  position: relative;
  letter-spacing: -5px;
  
  &::before,
  &::after {
    content: '404';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  &::before {
    left: 2px;
    text-shadow: -2px 0 var(--secondary);
    clip-path: inset(0 0 0 0);
    animation: glitch-anim-1 2s linear infinite alternate-reverse;
  }
  
  &::after {
    left: -2px;
    text-shadow: -2px 0 var(--primary);
    clip-path: inset(0 0 0 0);
    animation: glitch-anim-2 3s linear infinite alternate-reverse;
  }
  
  @keyframes glitch-anim-1 {
    0%, 100% { opacity: 1; transform: translate(0); }
    20% { opacity: 0.8; transform: translate(-5px, 5px); }
    40% { opacity: 0.6; transform: translate(-5px, -5px); }
    60% { opacity: 0.8; transform: translate(5px, 5px); }
    80% { opacity: 0.6; transform: translate(5px, -5px); }
  }
  
  @keyframes glitch-anim-2 {
    0%, 100% { opacity: 0.7; transform: translate(0); }
    20% { opacity: 0.5; transform: translate(5px, 5px); }
    40% { opacity: 0.7; transform: translate(5px, -5px); }
    60% { opacity: 0.5; transform: translate(-5px, 5px); }
    80% { opacity: 0.7; transform: translate(-5px, -5px); }
  }
`;

const ErrorTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ErrorDescription = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.8;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const BackgroundGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  z-index: -1;
`;

const Orb = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '300px'};
  height: ${props => props.size || '300px'};
  border-radius: 50%;
  background: radial-gradient(circle, ${props => props.color} 0%, rgba(0, 0, 0, 0) 70%);
  filter: blur(60px);
  opacity: 0.3;
  z-index: -1;
  top: ${props => props.top || '0'};
  left: ${props => props.left || '0'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <BackgroundGrid />
      
      <Orb 
        color="rgba(110, 0, 255, 0.5)" 
        size="400px" 
        top="-100px" 
        right="10%" 
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut"
        }}
      />
      
      <Orb 
        color="rgba(0, 229, 255, 0.5)" 
        size="350px" 
        bottom="-50px" 
        left="10%" 
        animate={{
          x: [0, -50, 50, 0],
          y: [0, 30, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut"
        }}
      />
      
      <GlitchText
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </GlitchText>
      
      <ErrorTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Transmission Lost
      </ErrorTitle>
      
      <ErrorDescription
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        The digital path you were seeking seems to have fragmented in the void.
        This dimension doesn't exist in our network.
      </ErrorDescription>
      
      <ButtonContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button as={Link} to="/">Return to Home</Button>
        <Button as={Link} to="/categories" variant="secondary">Explore Categories</Button>
      </ButtonContainer>
    </NotFoundContainer>
  );
};

export default NotFoundPage; 