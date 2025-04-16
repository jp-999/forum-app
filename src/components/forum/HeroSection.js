import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Button } from '../common/StyledComponents';

const HeroContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6rem 2rem;
  overflow: hidden;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  box-sizing: border-box;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  background: linear-gradient(to right, var(--text), var(--primary-light));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 20px rgba(110, 0, 255, 0.3);
  
  span {
    display: block;
    background: linear-gradient(to right, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const HeroSubtitle = styled(motion.h2)`
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 400;
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

const HeroActions = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const StatsList = styled(motion.div)`
  display: flex;
  gap: 3rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatValue = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, var(--primary-light), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const StatLabel = styled.span`
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const GridBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: -3;
`;

const StarfieldCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
`;

const Orb = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '200px'};
  height: ${props => props.size || '200px'};
  border-radius: 50%;
  background: radial-gradient(circle, ${props => props.color} 0%, rgba(0, 0, 0, 0) 70%);
  filter: blur(60px);
  opacity: 0.4;
  z-index: -1;
  top: ${props => props.top || '0'};
  left: ${props => props.left || '0'};
  right: ${props => props.right || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
`;

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    } 
  }
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      delay: 0.2, 
      ease: "easeOut" 
    } 
  }
};

const actionsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      delay: 0.4, 
      ease: "easeOut" 
    } 
  }
};

const statsVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.6
    } 
  }
};

const statItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    } 
  }
};

const orbVariants = {
  animate: {
    x: [0, 10, -10, 0],
    y: [0, -10, 10, 0],
    transition: {
      x: {
        repeat: Infinity,
        duration: 20,
        ease: "easeInOut"
      },
      y: {
        repeat: Infinity,
        duration: 15,
        ease: "easeInOut"
      }
    }
  }
};

// StarfieldBackground component
const StarfieldBackground = ({ numStars = 200 }) => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animationRef = useRef(null);
  
  // Initialize stars
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create stars with properties
    starsRef.current = Array(numStars).fill().map(() => {
      // More stars on the top left, fewer as we move to bottom right
      const xBias = Math.random() * 0.7; // 0-0.7 bias toward left side
      const yBias = Math.random() * 0.7; // 0-0.7 bias toward top
      
      return {
        x: canvas.width * xBias,
        y: canvas.height * yBias,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.7 + 0.2,
        color: getStarColor(),
        blinking: Math.random() > 0.7,
        blinkRate: Math.random() * 0.02 + 0.005,
        blinkState: Math.random(),
        angle: Math.atan2(
          canvas.height - canvas.height * yBias,
          canvas.width - canvas.width * xBias
        )
      };
    });
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      starsRef.current.forEach(star => {
        // Handle blinking effect
        if (star.blinking) {
          star.blinkState += star.blinkRate;
          if (star.blinkState > 1 || star.blinkState < 0) {
            star.blinkRate = -star.blinkRate;
          }
        }
        
        const opacity = star.blinking ? 0.3 + star.blinkState * 0.7 : 1;
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color.replace(')', `, ${opacity})`);
        ctx.fill();
        
        // Update position - move along the angle
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        
        // Reset position when star goes out of bounds
        if (star.x > canvas.width || star.y > canvas.height) {
          // Respawn from top left quadrant
          star.x = Math.random() * (canvas.width * 0.3);
          star.y = Math.random() * (canvas.height * 0.3);
          star.size = Math.random() * 2 + 0.5;
          star.speed = Math.random() * 0.7 + 0.2;
          
          // Recalculate angle toward bottom right
          star.angle = Math.atan2(
            canvas.height - star.y,
            canvas.width - star.x
          );
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [numStars]);
  
  // Get a random star color with a bias toward blue/purple hues
  const getStarColor = () => {
    const colors = [
      'rgba(255, 255, 255',
      'rgba(210, 210, 255',
      'rgba(110, 0, 255',
      'rgba(0, 229, 255',
      'rgba(180, 180, 255',
      'rgba(150, 150, 255',
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  return <StarfieldCanvas ref={canvasRef} />;
};

const HeroSection = () => {
  const stats = [
    { value: '500+', label: 'Topics' },
    { value: '10K+', label: 'Members' },
    { value: '25K+', label: 'Discussions' },
    { value: '99%', label: 'Satisfaction' }
  ];
  
  return (
    <HeroContainer>
      <StarfieldBackground numStars={300} />
      
      <Orb 
        color="rgba(110, 0, 255, 0.5)" 
        size="300px" 
        top="-50px" 
        left="10%" 
        variants={orbVariants}
        animate="animate"
      />
      <Orb 
        color="rgba(0, 229, 255, 0.5)" 
        size="250px" 
        bottom="-30px" 
        right="15%" 
        variants={orbVariants}
        animate="animate"
      />
      
      <HeroTitle 
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Join the Future of <span>Discussions</span>
      </HeroTitle>
      
      <HeroSubtitle
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
      >
        Connect with like-minded individuals in our futuristic forum
        platform, featuring real-time discussions, elegant interfaces, and
        cutting-edge technology.
      </HeroSubtitle>
      
      <HeroActions
        variants={actionsVariants}
        initial="hidden"
        animate="visible"
      >
        <Button as="a" href="/categories">Explore Categories</Button>
        <Button as="a" href="/register" variant="secondary">Create Account</Button>
      </HeroActions>
      
      <StatsList
        variants={statsVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, index) => (
          <StatItem key={index} variants={statItemVariants}>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatItem>
        ))}
      </StatsList>
    </HeroContainer>
  );
};

export default HeroSection; 