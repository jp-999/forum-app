import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NeonHeading, Button, Card, Badge, Flex } from '../components/common/StyledComponents';
import { categories, threads } from '../data/mockData';

// Material UI Icons
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CloseIcon from '@mui/icons-material/Close';
import ColorLensIcon from '@mui/icons-material/ColorLens';

const CategoriesPageContainer = styled.div`
  padding: 2rem 0;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const PageSubtitle = styled.p`
  color: var(--text-secondary);
  margin-top: 0.5rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const FiltersContainer = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: var(--background-light);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  color: var(--text);
  font-size: 0.95rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(110, 0, 255, 0.2);
  }
`;

const SearchIconWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: var(--text-secondary);
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const FilterButton = styled(Button)`
  svg {
    margin-right: 0.5rem;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: var(--background-light);
  border-radius: var(--border-radius);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: var(--card-shadow);
  min-width: 200px;
  z-index: 10;
  overflow: hidden;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  text-align: left;
  color: var(--text);
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: rgba(110, 0, 255, 0.1);
  }
  
  svg {
    color: var(--primary);
  }
`;

const DropdownHeader = styled.div`
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: var(--text);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const CategoryCard = styled(Card)`
  padding: 0;
  overflow: hidden;
  transition: var(--transition);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--neon-shadow);
    border-color: var(--primary);
  }
`;

const CategoryHeader = styled.div`
  padding: 1.5rem;
  background: ${props => props.bgColor || 'var(--background-lighter)'};
  background-image: ${props => props.bgImage ? `url(${props.bgImage})` : 'none'};
  background-size: cover;
  background-position: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  color: white;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), ${props.bgColor ? props.bgColor + '40' : 'var(--background-lighter)'}`};
    z-index: 1;
  }
  
  & > * {
    position: relative;
    z-index: 2;
  }
`;

const CategoryTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text);
`;

const CategoryDescription = styled.p`
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const CategoryBody = styled.div`
  padding: 1.5rem;
  flex: 1;
`;

const CategoryStats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  
  svg {
    color: var(--primary);
    font-size: 1.1rem;
  }
`;

const LatestActivity = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 1.5rem;
`;

const LatestTitle = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
`;

const LatestThread = styled(Link)`
  display: block;
  color: var(--text);
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: var(--transition);
  
  &:hover {
    color: var(--primary);
  }
`;

const LatestTime = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
  
  h3 {
    color: var(--text);
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const CreateCategoryModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(8, 9, 36, 0.8);
  z-index: 100;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: var(--background);
  border-radius: var(--card-border-radius);
  box-shadow: var(--card-shadow);
  width: 100%;
  max-width: 500px;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  padding: 1.25rem;
  background: var(--background-light);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: var(--text);
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: var(--text);
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
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
  background: var(--background-light);
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
  background: var(--background-light);
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

const ColorPicker = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ColorOption = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid ${props => props.selected ? 'var(--text)' : 'transparent'};
  background-color: ${props => props.color};
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ModalFooter = styled.div`
  padding: 1.25rem;
  background: var(--background-light);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CategoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form state for creating a new category
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'ForumIcon',
    color: '#6e00ff'
  });
  
  // Available colors for the color picker
  const colorOptions = [
    '#6e00ff', // Primary
    '#00e5ff', // Secondary
    '#ff00e5', // Accent
    '#00ff9d', // Success
    '#ffcf00', // Warning
    '#ff3d71', // Danger
    '#9547ff', 
    '#00b3ff',
    '#ff7b00',
    '#00ffcc'
  ];
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Update filtered categories when search or sort changes
  useEffect(() => {
    let filtered = [...categories];
    
    // Filter by search query
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        category => 
          category.name.toLowerCase().includes(lowerCaseQuery) || 
          category.description.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    // Sort categories
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'threads':
        filtered.sort((a, b) => getThreadCount(b.id) - getThreadCount(a.id));
        break;
      case 'activity':
        filtered.sort((a, b) => getLatestActivity(b.id) - getLatestActivity(a.id));
        break;
      default:
        break;
    }
    
    setFilteredCategories(filtered);
  }, [searchQuery, sortBy]);
  
  // Helper to get thread count for a category
  const getThreadCount = (categoryId) => {
    return threads.filter(thread => thread.category.id === categoryId).length;
  };
  
  // Helper to get latest activity timestamp for a category
  const getLatestActivity = (categoryId) => {
    const categoryThreads = threads.filter(thread => thread.category.id === categoryId);
    if (categoryThreads.length === 0) return 0;
    
    return Math.max(...categoryThreads.map(thread => new Date(thread.updatedAt).getTime()));
  };
  
  // Get the latest thread for a category
  const getLatestThread = (categoryId) => {
    const categoryThreads = threads.filter(thread => thread.category.id === categoryId);
    if (categoryThreads.length === 0) return null;
    
    return categoryThreads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  };
  
  // Format timestamp to relative time
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSortChange = (value) => {
    setSortBy(value);
    setShowSortDropdown(false);
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleColorSelect = (color) => {
    setFormData(prev => ({
      ...prev,
      color
    }));
  };
  
  const handleCreateCategory = (e) => {
    e.preventDefault();
    
    // In a real app, we would send this to an API
    console.log('Creating new category:', formData);
    
    // Close the modal and reset form
    setShowCreateModal(false);
    setFormData({
      name: '',
      description: '',
      icon: 'ForumIcon',
      color: '#6e00ff'
    });
    
    // Show success message (would be a toast in a real app)
    alert('Category created successfully!');
  };
  
  return (
    <CategoriesPageContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <NeonHeading>Categories</NeonHeading>
        <PageSubtitle>
          Browse all the conversation categories in our community. 
          Find the topics that interest you and join the discussion.
        </PageSubtitle>
      </Header>
      
      <FiltersContainer>
        <SearchContainer>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <SearchInput 
            type="text" 
            placeholder="Search categories..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </SearchContainer>
        
        <FilterGroup>
          <DropdownContainer>
            <FilterButton 
              color="secondary" 
              small
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              <SortIcon />
              Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
              {showSortDropdown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </FilterButton>
            
            <AnimatePresence>
              {showSortDropdown && (
                <DropdownMenu
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownHeader>Sort Categories</DropdownHeader>
                  <DropdownItem onClick={() => handleSortChange('latest')}>
                    Latest
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSortChange('oldest')}>
                    Oldest
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSortChange('alphabetical')}>
                    Alphabetical
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSortChange('threads')}>
                    Most Threads
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSortChange('activity')}>
                    Recent Activity
                  </DropdownItem>
                </DropdownMenu>
              )}
            </AnimatePresence>
          </DropdownContainer>
          
          <FilterButton 
            small
            onClick={() => setShowCreateModal(true)}
          >
            <AddIcon />
            Create Category
          </FilterButton>
        </FilterGroup>
      </FiltersContainer>
      
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          Loading categories...
        </div>
      ) : filteredCategories.length > 0 ? (
        <CategoriesGrid>
          {filteredCategories.map(category => {
            const threadCount = getThreadCount(category.id);
            const latestThread = getLatestThread(category.id);
            
            return (
              <Link to={`/categories/${category.id}`} key={category.id} style={{ textDecoration: 'none' }}>
                <CategoryCard animate={{opacity: 1}} initial={{opacity: 0}}>
                  <CategoryHeader 
                    bgColor={category.color} 
                    bgImage={category.backgroundImage}
                  >
                    <Flex align="center" gap="0.75rem">
                      {category.icon}
                      <CategoryTitle>{category.name}</CategoryTitle>
                    </Flex>
                    <CategoryDescription>{category.description}</CategoryDescription>
                    <Badge color={category.color}>{threadCount} threads</Badge>
                  </CategoryHeader>
                  
                  <CategoryBody>
                    <CategoryStats>
                      <StatItem>
                        <ForumIcon />
                        {threadCount} threads
                      </StatItem>
                      <StatItem>
                        <GroupIcon />
                        {category.memberCount} members
                      </StatItem>
                    </CategoryStats>
                    
                    {latestThread && (
                      <LatestActivity>
                        <LatestTitle>Latest Activity</LatestTitle>
                        <LatestThread to={`/thread/${latestThread.id}`} onClick={(e) => e.stopPropagation()}>
                          {latestThread.title}
                        </LatestThread>
                        <LatestTime>
                          {formatRelativeTime(latestThread.createdAt)}
                        </LatestTime>
                      </LatestActivity>
                    )}
                  </CategoryBody>
                </CategoryCard>
              </Link>
            );
          })}
        </CategoriesGrid>
      ) : (
        <EmptyState>
          <h3>No Categories Found</h3>
          <p>We couldn't find any categories matching your search criteria.</p>
          <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
        </EmptyState>
      )}
      
      <AnimatePresence>
        {showCreateModal && (
          <CreateCategoryModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreateModal(false)}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <ModalHeader>
                <h3>Create New Category</h3>
                <CloseButton onClick={() => setShowCreateModal(false)}>
                  <CloseIcon />
                </CloseButton>
              </ModalHeader>
              
              <ModalBody>
                <form onSubmit={handleCreateCategory}>
                  <FormGroup>
                    <Label htmlFor="name">Category Name</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g. Technology, Gaming, Science"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      placeholder="Describe what this category is about..."
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>
                      <ColorLensIcon style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                      Category Color
                    </Label>
                    <ColorPicker>
                      {colorOptions.map(color => (
                        <ColorOption 
                          key={color}
                          color={color}
                          selected={formData.color === color}
                          onClick={() => handleColorSelect(color)}
                          type="button"
                        />
                      ))}
                    </ColorPicker>
                  </FormGroup>
                </form>
              </ModalBody>
              
              <ModalFooter>
                <Button 
                  variant="outlined" 
                  color="secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateCategory}>
                  Create Category
                </Button>
              </ModalFooter>
            </ModalContent>
          </CreateCategoryModal>
        )}
      </AnimatePresence>
    </CategoriesPageContainer>
  );
};

export default CategoriesPage; 