import styled from 'styled-components';
import { motion } from 'framer-motion';

// Buttons
export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${props => props.small ? '0.5rem 1rem' : '0.75rem 1.5rem'};
  background: ${props => props.variant === 'secondary' 
    ? 'rgba(126, 87, 194, 0.1)' 
    : props.variant === 'ghost' 
      ? 'transparent' 
      : 'rgba(110, 0, 255, 0.05)'};
  color: ${props => props.variant === 'secondary' 
    ? 'var(--secondary)' 
    : 'var(--primary-light)'};
  border: 2px solid ${props => props.variant === 'secondary' 
    ? 'var(--secondary)' 
    : 'var(--primary)'};
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: ${props => props.small ? '0.875rem' : '1rem'};
  transition: var(--transition);
  box-shadow: ${props => props.variant === 'secondary' 
    ? '0 0 10px rgba(126, 87, 194, 0.5), inset 0 0 10px rgba(126, 87, 194, 0.2)' 
    : '0 0 10px rgba(110, 0, 255, 0.5), inset 0 0 10px rgba(110, 0, 255, 0.2)'};
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover, &:focus {
    background: ${props => props.variant === 'secondary' 
      ? 'rgba(126, 87, 194, 0.2)' 
      : 'rgba(110, 0, 255, 0.15)'};
    transform: translateY(-2px);
    box-shadow: ${props => props.variant === 'secondary' 
      ? '0 0 15px rgba(126, 87, 194, 0.8), inset 0 0 15px rgba(126, 87, 194, 0.4)' 
      : '0 0 15px rgba(110, 0, 255, 0.8), inset 0 0 15px rgba(110, 0, 255, 0.4)'};
    border-color: ${props => props.variant === 'secondary' 
      ? 'var(--secondary)' 
      : 'var(--primary-light)'};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
`;

// Motion button variant for animations
export const MotionButton = motion(Button);

// Card component with glassmorphism effect
export const Card = styled.div`
  background: var(--background-light);
  border-radius: var(--card-border-radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--card-shadow);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(110, 0, 255, 0.2);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, var(--primary), var(--secondary));
  }
`;

// Motion card variant
export const MotionCard = motion(Card);

// Input field with neon glow effect
export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--background-lighter);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  color: var(--text);
  font-size: 1rem;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(110, 0, 255, 0.2);
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

// Badge component for categories, tags, etc.
export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${props => props.small ? '0.25rem 0.5rem' : '0.35rem 0.75rem'};
  background: ${props => props.color ? props.color : 'var(--primary)'};
  color: white;
  border-radius: 2rem;
  font-size: ${props => props.small ? '0.7rem' : '0.8rem'};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 0 10px ${props => props.color ? props.color + '80' : 'rgba(110, 0, 255, 0.3)'};
`;

// Heading with neon glow effect
export const NeonHeading = styled.h1`
  font-size: ${props => {
    switch (props.level) {
      case 2: return '2rem';
      case 3: return '1.5rem';
      case 4: return '1.25rem';
      case 5: return '1rem';
      case 6: return '0.875rem';
      default: return '2.5rem';
    }
  }};
  font-weight: 700;
  background: linear-gradient(to right, var(--text), var(--primary-light));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 5px rgba(110, 0, 255, 0.3);
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

// Container for grid layouts
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${props => props.minWidth || '280px'}, 1fr));
  gap: ${props => props.gap || '1.5rem'};
  width: 100%;
`;

// Flex container with common alignment patterns
export const Flex = styled.div`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'flex-start'};
  gap: ${props => props.gap || '1rem'};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

// Divider with gradient
export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: linear-gradient(to right, transparent, var(--primary), transparent);
  margin: 1.5rem 0;
  opacity: 0.3;
`;

// Avatar component
export const Avatar = styled.div`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border-radius: 50%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border: 2px solid var(--background-lighter);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  
  &:hover {
    border-color: var(--primary);
    transform: scale(1.05);
    transition: var(--transition);
  }
`;

// Icon button for actions
export const IconButton = styled.button`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.active ? 'var(--primary)' : 'var(--background-light)'};
  border: none;
  color: var(--text);
  transition: var(--transition);
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-2px);
    box-shadow: var(--neon-shadow);
  }
`;

// Dropdown menu container
export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: var(--background-lighter);
  border-radius: var(--border-radius);
  min-width: 180px;
  box-shadow: var(--box-shadow);
  z-index: 100;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`; 