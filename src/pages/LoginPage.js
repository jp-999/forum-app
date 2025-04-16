import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NeonHeading, Button } from '../components/common/StyledComponents';

// Material UI Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 250px);
  padding: 2rem 0;
`;

const LoginCard = styled(motion.div)`
  background: var(--background-light);
  border-radius: var(--card-border-radius);
  padding: 2.5rem;
  width: 100%;
  max-width: 450px;
  box-shadow: var(--card-shadow);
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(110, 0, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: -100px;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }
`;

const LoginForm = styled.form`
  position: relative;
  z-index: 1;
`;

const FormHeading = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: var(--background);
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
    color: rgba(255, 255, 255, 0.3);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary);
  display: flex;
  align-items: center;
`;

const TogglePasswordVisibility = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  
  &:hover {
    color: var(--text);
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.75rem;
`;

const FormFooter = styled.div`
  margin-top: 2rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const FormLink = styled(Link)`
  color: var(--secondary);
  font-weight: 500;
  transition: var(--transition);
  
  &:hover {
    color: var(--primary-light);
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);
    // Authentication logic would go here
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };
  
  return (
    <LoginPageContainer>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoginForm onSubmit={handleSubmit}>
          <FormHeading>
            <NeonHeading>Login</NeonHeading>
          </FormHeading>
          
          <FormGroup>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <InputWrapper>
              <InputIcon>
                <EmailIcon fontSize="small" />
              </InputIcon>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputWrapper>
          </FormGroup>
          
          <FormGroup>
            <InputLabel htmlFor="password">Password</InputLabel>
            <InputWrapper>
              <InputIcon>
                <LockIcon fontSize="small" />
              </InputIcon>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <TogglePasswordVisibility
                type="button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <VisibilityOffIcon fontSize="small" />
                ) : (
                  <VisibilityIcon fontSize="small" />
                )}
              </TogglePasswordVisibility>
            </InputWrapper>
          </FormGroup>
          
          <SubmitButton type="submit">
            <LoginIcon style={{ marginRight: '0.5rem' }} />
            Login
          </SubmitButton>
          
          <FormFooter>
            Don't have an account? <FormLink to="/register">Register</FormLink>
          </FormFooter>
        </LoginForm>
      </LoginCard>
    </LoginPageContainer>
  );
};

export default LoginPage; 