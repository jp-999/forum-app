import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { NeonHeading, Button, Flex, Card, Input } from '../common/StyledComponents';
import ThreadCard from './ThreadCard';

// Material UI Icons
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ThreadListContainer = styled.section`
  margin: 2rem 0;
`;

const ThreadListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FilterContainer = styled(Card)`
  margin-bottom: 1.5rem;
  padding: 1.25rem;
`;

const FilterRow = styled(Flex)`
  margin-top: 1rem;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
  max-width: 400px;
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: var(--text-secondary);
`;

const StyledSearchInput = styled(Input)`
  padding-left: 2.5rem;
`;

const SortButton = styled(Button)`
  min-width: 120px;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterButton = styled(Button)`
  svg {
    transition: var(--transition);
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const ThreadCounter = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: var(--text-secondary);
  
  h3 {
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const threadListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const threadItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};

const sortOptions = [
  { label: "Newest", value: "newest", icon: <NewReleasesIcon fontSize="small" /> },
  { label: "Popular", value: "popular", icon: <LocalFireDepartmentIcon fontSize="small" /> },
  { label: "Trending", value: "trending", icon: <TrendingUpIcon fontSize="small" /> },
  { label: "Oldest", value: "oldest", icon: <AccessTimeIcon fontSize="small" /> }
];

const ThreadList = ({ threads, title, showFilters = true }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState(sortOptions[0]);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const toggleSortMenu = () => {
    setSortMenuOpen(!sortMenuOpen);
  };
  
  const handleSortChange = (option) => {
    setActiveSort(option);
    setSortMenuOpen(false);
  };
  
  // Filter threads based on search query
  const filteredThreads = threads.filter(thread => 
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <ThreadListContainer>
      <ThreadListHeader>
        <div>
          {title && <NeonHeading level={2}>{title}</NeonHeading>}
          <ThreadCounter>{filteredThreads.length} thread{filteredThreads.length !== 1 ? 's' : ''}</ThreadCounter>
        </div>
        
        {showFilters && (
          <Flex gap="0.75rem" wrap>
            <SearchContainer>
              <StyledSearchInput 
                placeholder="Search threads..." 
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <SearchIconWrapper>
                <SearchIcon fontSize="small" />
              </SearchIconWrapper>
            </SearchContainer>
            
            <div style={{ position: 'relative' }}>
              <SortButton
                variant="ghost"
                onClick={toggleSortMenu}
              >
                {activeSort.label}
                <SortIcon fontSize="small" />
              </SortButton>
              
              <AnimatePresence>
                {sortMenuOpen && (
                  <Card
                    as={motion.div}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 0.5rem)',
                      right: 0,
                      zIndex: 100,
                      width: '180px',
                      padding: 0
                    }}
                  >
                    {sortOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={activeSort.value === option.value ? 'primary' : 'ghost'}
                        style={{
                          justifyContent: 'flex-start',
                          width: '100%',
                          borderRadius: 0
                        }}
                        onClick={() => handleSortChange(option)}
                      >
                        {option.icon}
                        {option.label}
                      </Button>
                    ))}
                  </Card>
                )}
              </AnimatePresence>
            </div>
            
            <FilterButton
              variant="ghost"
              isOpen={isFilterOpen}
              onClick={toggleFilter}
            >
              <FilterListIcon />
              Filters
            </FilterButton>
          </Flex>
        )}
      </ThreadListHeader>
      
      <AnimatePresence>
        {isFilterOpen && (
          <FilterContainer
            as={motion.div}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <NeonHeading level={4}>Filter Options</NeonHeading>
            <FilterRow>
              <Button variant="ghost" small>All Categories</Button>
              <Button variant="ghost" small>My Following</Button>
              <Button variant="ghost" small>Has Replies</Button>
              <Button variant="ghost" small>No Replies</Button>
              <Button variant="ghost" small>Last 24 Hours</Button>
              <Button variant="ghost" small>Last Week</Button>
            </FilterRow>
          </FilterContainer>
        )}
      </AnimatePresence>
      
      {filteredThreads.length > 0 ? (
        <motion.div
          variants={threadListVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredThreads.map((thread) => (
            <motion.div
              key={thread.id}
              variants={threadItemVariants}
              layout
            >
              <ThreadCard thread={thread} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState>
          <h3>No threads found</h3>
          <p>
            We couldn't find any threads matching your filters. Try adjusting your search or create a new thread.
          </p>
          <Button>Create Thread</Button>
        </EmptyState>
      )}
    </ThreadListContainer>
  );
};

export default ThreadList; 