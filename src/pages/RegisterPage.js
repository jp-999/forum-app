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
import PersonIcon from '@mui/icons-material/Person';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const RegisterPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 250px);
  padding: 2rem 0;
`;

const RegisterCard = styled(motion.div)`
  background: var(--background-light);
  border-radius: var(--card-border-radius);
  padding: 2.5rem;
  width: 100%;
  max-width: 500px;
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

const RegisterForm = styled.form`
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

const FormError = styled.div`
  color: var(--danger);
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Username validation
    if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    console.log('Registration attempt with:', formData);
    // Registration logic would go here
  };
  
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(prev => !prev);
    } else {
      setShowConfirmPassword(prev => !prev);
    }
  };
  
  return (
    <RegisterPageContainer>
      <RegisterCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <RegisterForm onSubmit={handleSubmit}>
          <FormHeading>
            <NeonHeading>Create Account</NeonHeading>
          </FormHeading>
          
          <FormGroup>
            <InputLabel htmlFor="username">Username</InputLabel>
            <InputWrapper>
              <InputIcon>
                <PersonIcon fontSize="small" />
              </InputIcon>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </InputWrapper>
            {errors.username && <FormError>{errors.username}</FormError>}
          </FormGroup>
          
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
            {errors.email && <FormError>{errors.email}</FormError>}
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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <TogglePasswordVisibility
                type="button"
                onClick={() => togglePasswordVisibility('password')}
              >
                {showPassword ? (
                  <VisibilityOffIcon fontSize="small" />
                ) : (
                  <VisibilityIcon fontSize="small" />
                )}
              </TogglePasswordVisibility>
            </InputWrapper>
            {errors.password && <FormError>{errors.password}</FormError>}
          </FormGroup>
          
          <FormGroup>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <InputWrapper>
              <InputIcon>
                <LockIcon fontSize="small" />
              </InputIcon>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <TogglePasswordVisibility
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {showConfirmPassword ? (
                  <VisibilityOffIcon fontSize="small" />
                ) : (
                  <VisibilityIcon fontSize="small" />
                )}
              </TogglePasswordVisibility>
            </InputWrapper>
            {errors.confirmPassword && <FormError>{errors.confirmPassword}</FormError>}
          </FormGroup>
          
          <SubmitButton type="submit">
            <AppRegistrationIcon style={{ marginRight: '0.5rem' }} />
            Register
          </SubmitButton>
          
          <FormFooter>
            Already have an account? <FormLink to="/login">Login</FormLink>
          </FormFooter>
        </RegisterForm>
      </RegisterCard>
    </RegisterPageContainer>
  );
};

export default RegisterPage; 