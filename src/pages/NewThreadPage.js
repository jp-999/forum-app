import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { NeonHeading, Button } from '../components/common/StyledComponents';
import { categories } from '../data/mockData';

// Material UI Icons
import CreateIcon from '@mui/icons-material/Create';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const NewThreadContainer = styled(motion.div)`
  max-width: 800px;
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

const ThreadForm = styled.form`
  background: var(--background-lighter);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: var(--card-shadow);
`;

const FormSection = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text);
  font-size: 0.95rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--background);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  color: var(--text);
  font-size: 1rem;
  
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

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--background);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  color: var(--text);
  font-size: 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(110, 0, 255, 0.2);
  }
  
  option {
    background: var(--background);
    color: var(--text);
  }
`;

const TextEditor = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  overflow: hidden;
`;

const EditorToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0.5rem;
  background: var(--background);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const ToolbarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--primary-light);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 1rem;
  background: var(--background);
  border: none;
  color: var(--text);
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
  
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Guidelines = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(110, 0, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(110, 0, 255, 0.2);
`;

const GuidelinesTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--primary-light);
  margin-bottom: 1rem;
`;

const GuidelinesList = styled.ul`
  padding-left: 1.5rem;
  
  li {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }
`;

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const NewThreadPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleEditorTool = (tool) => {
    // In a real implementation, this would insert markdown/formatting at cursor position
    console.log(`Tool ${tool} clicked`);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // This would normally create a new thread in the database
    console.log('New thread data:', formData);
    
    // For the demo, just redirect to a thread page
    alert('Thread created successfully!');
    navigate('/thread/thread1');
  };
  
  return (
    <NewThreadContainer
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <PageHeader>
        <HeaderIcon>
          <CreateIcon fontSize="large" />
        </HeaderIcon>
        <NeonHeading>Create New Thread</NeonHeading>
      </PageHeader>
      
      <ThreadForm onSubmit={handleSubmit}>
        <FormSection>
          <FormGroup>
            <Label htmlFor="title">Thread Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a descriptive title for your thread"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormGroup>
        </FormSection>
        
        <FormSection>
          <Label htmlFor="content">Content</Label>
          <TextEditor>
            <EditorToolbar>
              <ToolbarButton type="button" onClick={() => handleEditorTool('bold')}>
                <FormatBoldIcon fontSize="small" />
              </ToolbarButton>
              <ToolbarButton type="button" onClick={() => handleEditorTool('italic')}>
                <FormatItalicIcon fontSize="small" />
              </ToolbarButton>
              <ToolbarButton type="button" onClick={() => handleEditorTool('link')}>
                <LinkIcon fontSize="small" />
              </ToolbarButton>
              <ToolbarButton type="button" onClick={() => handleEditorTool('quote')}>
                <FormatQuoteIcon fontSize="small" />
              </ToolbarButton>
              <ToolbarButton type="button" onClick={() => handleEditorTool('code')}>
                <CodeIcon fontSize="small" />
              </ToolbarButton>
              <ToolbarButton type="button" onClick={() => handleEditorTool('list-bullet')}>
                <FormatListBulletedIcon fontSize="small" />
              </ToolbarButton>
              <ToolbarButton type="button" onClick={() => handleEditorTool('list-number')}>
                <FormatListNumberedIcon fontSize="small" />
              </ToolbarButton>
              <ToolbarButton type="button" onClick={() => handleEditorTool('image')}>
                <ImageIcon fontSize="small" />
              </ToolbarButton>
              <ToolbarButton type="button" onClick={() => handleEditorTool('file')}>
                <AttachFileIcon fontSize="small" />
              </ToolbarButton>
            </EditorToolbar>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Share your thoughts, ideas, or questions in detail here..."
              required
            />
          </TextEditor>
        </FormSection>
        
        <FormSection>
          <ButtonGroup>
            <Button as={Link} to="/" variant="secondary">
              Cancel
            </Button>
            <Button type="submit">
              Create Thread
            </Button>
          </ButtonGroup>
        </FormSection>
      </ThreadForm>
      
      <Guidelines>
        <GuidelinesTitle>Thread Guidelines</GuidelinesTitle>
        <GuidelinesList>
          <li>Be respectful and considerate of others' opinions.</li>
          <li>Stay on topic and make sure your post contributes to the discussion.</li>
          <li>Format your text for readability using the editor tools.</li>
          <li>Include all relevant information in your initial post.</li>
          <li>Check for existing threads on the same topic before creating a new one.</li>
          <li>Use appropriate tags to help others find your thread.</li>
        </GuidelinesList>
      </Guidelines>
    </NewThreadContainer>
  );
};

export default NewThreadPage; 