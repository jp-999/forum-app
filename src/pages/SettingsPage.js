import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NeonHeading, Button } from '../components/common/StyledComponents';

// Material UI Icons
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import PaletteIcon from '@mui/icons-material/Palette';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TranslateIcon from '@mui/icons-material/Translate';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SecurityIcon from '@mui/icons-material/Security';

// Mock user data
import { users } from '../data/mockData';

const SettingsPageContainer = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
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

const SettingsContent = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  background: var(--background-lighter);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: var(--card-shadow);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SettingsTabs = styled.div`
  background: var(--background);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem 0;
  
  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    overflow-x: auto;
    padding: 1rem;
  }
`;

const TabItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem 1.5rem;
  background: ${props => props.active ? 'rgba(110, 0, 255, 0.1)' : 'transparent'};
  border: none;
  text-align: left;
  color: ${props => props.active ? 'var(--primary-light)' : 'var(--text)'};
  font-size: 0.95rem;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  
  &:hover {
    background: rgba(110, 0, 255, 0.05);
    color: var(--primary-light);
  }
  
  ${props => props.active && `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: var(--primary);
      border-radius: 0 4px 4px 0;
    }
  `}
  
  svg {
    color: ${props => props.active ? 'var(--primary)' : 'var(--text-secondary)'};
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    width: auto;
    white-space: nowrap;
    
    ${props => props.active && `
      &::before {
        display: none;
      }
    `}
  }
`;

const TabContent = styled.div`
  padding: 2rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--text);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--background);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  color: var(--text);
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(110, 0, 255, 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--background);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  color: var(--text);
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(110, 0, 255, 0.2);
  }
`;

const ToggleSwitch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  
  span {
    color: var(--text);
    font-size: 0.95rem;
  }
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background);
    transition: .4s;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    &:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 2px;
      background-color: var(--text-secondary);
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: var(--primary);
    
    &:before {
      transform: translateX(22px);
      background-color: white;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const DangerZone = styled.div`
  margin-top: 3rem;
  padding: 1.5rem;
  border-radius: 8px;
  background: rgba(255, 61, 113, 0.1);
  border: 1px solid rgba(255, 61, 113, 0.3);
`;

const DangerTitle = styled.h3`
  color: var(--danger);
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const DangerDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('account');
  const user = users[0]; // Using the first user from mock data
  
  // Form state for Account settings
  const [accountForm, setAccountForm] = useState({
    name: user.name,
    username: user.username,
    email: 'alex.johnson@example.com',
    bio: user.bio,
    location: user.location,
    website: user.website
  });
  
  // Form state for Privacy settings
  const [privacyForm, setPrivacyForm] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowDirectMessages: true,
    showActivity: true,
    twoFactorAuth: false
  });
  
  // Form state for Appearance settings
  const [appearanceForm, setAppearanceForm] = useState({
    theme: 'dark',
    fontSize: 'medium',
    reducedMotion: false,
    highContrast: false,
    language: 'english'
  });
  
  // Form state for Notifications settings
  const [notificationsForm, setNotificationsForm] = useState({
    emailNotifications: true,
    mentions: true,
    replies: true,
    directMessages: true,
    threadUpdates: false,
    newsletter: false
  });
  
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggleChange = (formSetter, formState, field) => {
    formSetter({ ...formState, [field]: !formState[field] });
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <>
            <FormSection>
              <SectionTitle>Profile Information</SectionTitle>
              <FormGroup>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={accountForm.name}
                  onChange={handleAccountChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={accountForm.username}
                  onChange={handleAccountChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={accountForm.email}
                  onChange={handleAccountChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={accountForm.bio}
                  onChange={handleAccountChange}
                  placeholder="Tell us a bit about yourself..."
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="location">Location</Label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  value={accountForm.location}
                  onChange={handleAccountChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="website">Website</Label>
                <Input
                  type="url"
                  id="website"
                  name="website"
                  value={accountForm.website}
                  onChange={handleAccountChange}
                />
              </FormGroup>
            </FormSection>
            
            <ButtonGroup>
              <Button>
                <SaveIcon style={{ marginRight: '0.5rem' }} />
                Save Changes
              </Button>
            </ButtonGroup>
            
            <DangerZone>
              <DangerTitle>Delete Account</DangerTitle>
              <DangerDescription>
                Once you delete your account, there is no going back. Please be certain.
              </DangerDescription>
              <Button variant="danger">
                <DeleteForeverIcon style={{ marginRight: '0.5rem' }} />
                Delete Account
              </Button>
            </DangerZone>
          </>
        );
        
      case 'privacy':
        return (
          <>
            <FormSection>
              <SectionTitle>Privacy Settings</SectionTitle>
              <FormGroup>
                <Label htmlFor="profileVisibility">Profile Visibility</Label>
                <Input
                  as="select"
                  id="profileVisibility"
                  name="profileVisibility"
                  value={privacyForm.profileVisibility}
                  onChange={(e) => setPrivacyForm({ ...privacyForm, profileVisibility: e.target.value })}
                >
                  <option value="public">Public - Anyone can view</option>
                  <option value="members">Members Only - Only registered users can view</option>
                  <option value="private">Private - Only you and moderators can view</option>
                </Input>
              </FormGroup>
              
              <ToggleSwitch>
                <span>Show online status</span>
                <Toggle>
                  <input 
                    type="checkbox" 
                    checked={privacyForm.showOnlineStatus}
                    onChange={() => handleToggleChange(setPrivacyForm, privacyForm, 'showOnlineStatus')}
                  />
                  <span></span>
                </Toggle>
              </ToggleSwitch>
              
              <ToggleSwitch>
                <span>Allow direct messages</span>
                <Toggle>
                  <input 
                    type="checkbox" 
                    checked={privacyForm.allowDirectMessages}
                    onChange={() => handleToggleChange(setPrivacyForm, privacyForm, 'allowDirectMessages')}
                  />
                  <span></span>
                </Toggle>
              </ToggleSwitch>
              
              <ToggleSwitch>
                <span>Show activity in public feeds</span>
                <Toggle>
                  <input 
                    type="checkbox" 
                    checked={privacyForm.showActivity}
                    onChange={() => handleToggleChange(setPrivacyForm, privacyForm, 'showActivity')}
                  />
                  <span></span>
                </Toggle>
              </ToggleSwitch>
            </FormSection>
            
            <FormSection>
              <SectionTitle>Security</SectionTitle>
              <ToggleSwitch>
                <span>Enable two-factor authentication</span>
                <Toggle>
                  <input 
                    type="checkbox" 
                    checked={privacyForm.twoFactorAuth}
                    onChange={() => handleToggleChange(setPrivacyForm, privacyForm, 'twoFactorAuth')}
                  />
                  <span></span>
                </Toggle>
              </ToggleSwitch>
              <Button small style={{ marginTop: '1rem' }}>Change Password</Button>
            </FormSection>
            
            <ButtonGroup>
              <Button>
                <SaveIcon style={{ marginRight: '0.5rem' }} />
                Save Changes
              </Button>
            </ButtonGroup>
          </>
        );
        
      case 'appearance':
        return (
          <>
            <FormSection>
              <SectionTitle>Theme Settings</SectionTitle>
              <FormGroup>
                <Label htmlFor="theme">Theme</Label>
                <Input
                  as="select"
                  id="theme"
                  name="theme"
                  value={appearanceForm.theme}
                  onChange={(e) => setAppearanceForm({ ...appearanceForm, theme: e.target.value })}
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="system">System Default</option>
                </Input>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="fontSize">Font Size</Label>
                <Input
                  as="select"
                  id="fontSize"
                  name="fontSize"
                  value={appearanceForm.fontSize}
                  onChange={(e) => setAppearanceForm({ ...appearanceForm, fontSize: e.target.value })}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="xlarge">Extra Large</option>
                </Input>
              </FormGroup>
              
              <ToggleSwitch>
                <span>Reduce motion</span>
                <Toggle>
                  <input 
                    type="checkbox" 
                    checked={appearanceForm.reducedMotion}
                    onChange={() => handleToggleChange(setAppearanceForm, appearanceForm, 'reducedMotion')}
                  />
                  <span></span>
                </Toggle>
              </ToggleSwitch>
              
              <ToggleSwitch>
                <span>High contrast mode</span>
                <Toggle>
                  <input 
                    type="checkbox" 
                    checked={appearanceForm.highContrast}
                    onChange={() => handleToggleChange(setAppearanceForm, appearanceForm, 'highContrast')}
                  />
                  <span></span>
                </Toggle>
              </ToggleSwitch>
            </FormSection>
            
            <FormSection>
              <SectionTitle>Language</SectionTitle>
              <FormGroup>
                <Label htmlFor="language">Display Language</Label>
                <Input
                  as="select"
                  id="language"
                  name="language"
                  value={appearanceForm.language}
                  onChange={(e) => setAppearanceForm({ ...appearanceForm, language: e.target.value })}
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="japanese">Japanese</option>
                  <option value="chinese">Chinese (Simplified)</option>
                </Input>
              </FormGroup>
            </FormSection>
            
            <ButtonGroup>
              <Button>
                <SaveIcon style={{ marginRight: '0.5rem' }} />
                Save Changes
              </Button>
            </ButtonGroup>
          </>
        );
        
      case 'notifications':
        return (
          <>
            <FormSection>
              <SectionTitle>Notification Preferences</SectionTitle>
              <ToggleSwitch>
                <span>Email notifications</span>
                <Toggle>
                  <input 
                    type="checkbox" 
                    checked={notificationsForm.emailNotifications}
                    onChange={() => handleToggleChange(setNotificationsForm, notificationsForm, 'emailNotifications')}
                  />
                  <span></span>
                </Toggle>
              </ToggleSwitch>
              
              <SectionTitle style={{ marginTop: '2rem' }}>Notify me about</SectionTitle>
              <ToggleSwitch>
                <span>Mentions</span>
                <Toggle>
                  <input 
                    type="checkbox" 
                    checked={notificationsForm.mentions}
                    onChange={() => handleToggleChange(setNotificationsForm, notificationsForm, 'mentions')}
                  />
                  <span></span>
                </Toggle>
              </ToggleSwitch>
              
              <ToggleSwitch>
                <span>Replies to my comments</span>
                <Toggle>
                  <input 
                    type="checkbox" 
                    checked={notificationsForm.replies}
                    onChange={() => handleToggleChange(setNotificationsForm, notificationsForm, 'replies')}
                  />
                  <span></span>
                </Toggle>
              </ToggleSwitch>
              
              <ToggleSwitch>
                <span>Direct messages</span>
                <Toggle>
                  <input 
                    type="checkbox" 
                    checked={notificationsForm.directMessages}
                    onChange={() => handleToggleChange(setNotificationsForm, notificationsForm, 'directMessages')}
                  />
                  <span></span>
                </Toggle>
              </ToggleSwitch>
              
              <ToggleSwitch>
                <span>Updates to threads I'm watching</span>
                <Toggle>
                  <input 
                    type="checkbox" 
                    checked={notificationsForm.threadUpdates}
                    onChange={() => handleToggleChange(setNotificationsForm, notificationsForm, 'threadUpdates')}
                  />
                  <span></span>
                </Toggle>
              </ToggleSwitch>
              
              <ToggleSwitch>
                <span>Newsletter and announcements</span>
                <Toggle>
                  <input 
                    type="checkbox" 
                    checked={notificationsForm.newsletter}
                    onChange={() => handleToggleChange(setNotificationsForm, notificationsForm, 'newsletter')}
                  />
                  <span></span>
                </Toggle>
              </ToggleSwitch>
            </FormSection>
            
            <ButtonGroup>
              <Button>
                <SaveIcon style={{ marginRight: '0.5rem' }} />
                Save Changes
              </Button>
            </ButtonGroup>
          </>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <SettingsPageContainer
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <PageHeader>
        <HeaderIcon>
          <SettingsIcon fontSize="large" />
        </HeaderIcon>
        <NeonHeading>Account Settings</NeonHeading>
      </PageHeader>
      
      <SettingsContent>
        <SettingsTabs>
          <TabItem 
            active={activeTab === 'account'} 
            onClick={() => setActiveTab('account')}
          >
            <AccountCircleIcon /> Account
          </TabItem>
          <TabItem 
            active={activeTab === 'privacy'} 
            onClick={() => setActiveTab('privacy')}
          >
            <LockIcon /> Privacy & Security
          </TabItem>
          <TabItem 
            active={activeTab === 'appearance'} 
            onClick={() => setActiveTab('appearance')}
          >
            <PaletteIcon /> Appearance
          </TabItem>
          <TabItem 
            active={activeTab === 'notifications'} 
            onClick={() => setActiveTab('notifications')}
          >
            <NotificationsIcon /> Notifications
          </TabItem>
        </SettingsTabs>
        
        <TabContent>
          {renderTabContent()}
        </TabContent>
      </SettingsContent>
    </SettingsPageContainer>
  );
};

export default SettingsPage; 