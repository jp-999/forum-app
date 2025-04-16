import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NeonHeading, Button } from '../components/common/StyledComponents';

// Material UI Icons
import BookIcon from '@mui/icons-material/Book';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TagIcon from '@mui/icons-material/Tag';

const BlogContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const HeadingWithIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
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

const PageDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const BlogLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const BlogPosts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const BlogPost = styled.article`
  background: var(--background-lighter);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--card-shadow);
  }
`;

const PostImage = styled.div`
  width: 100%;
  height: 250px;
  background-image: ${props => `url(${props.src})`};
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: linear-gradient(to top, var(--background-lighter), transparent);
  }
`;

const PostContent = styled.div`
  padding: 1.5rem;
`;

const PostTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: var(--text);
  
  &:hover {
    color: var(--primary-light);
  }
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PostExcerpt = styled.p`
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ReadMoreButton = styled(Link)`
  color: var(--primary-light);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.95rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SidebarWidget = styled.div`
  background: var(--background-lighter);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const WidgetTitle = styled.h4`
  font-size: 1.1rem;
  color: var(--text);
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.5rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(to right, var(--primary), var(--secondary));
    border-radius: 2px;
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li`
  margin-bottom: 0.5rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    color: var(--text-secondary);
    transition: var(--transition);
    
    &:hover {
      color: var(--primary-light);
      transform: translateX(5px);
    }
  }
`;

const TagCloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled(Link)`
  padding: 0.35rem 0.75rem;
  background: rgba(110, 0, 255, 0.1);
  border-radius: 20px;
  font-size: 0.8rem;
  color: var(--primary-light);
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &:hover {
    background: var(--primary);
    color: white;
  }
`;

const PopularPost = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    h5 {
      color: var(--primary-light);
    }
  }
`;

const PopularPostImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-image: ${props => `url(${props.src})`};
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
`;

const PopularPostContent = styled.div`
  h5 {
    font-size: 0.9rem;
    color: var(--text);
    margin-bottom: 0.25rem;
    transition: var(--transition);
  }
  
  span {
    font-size: 0.8rem;
    color: var(--text-secondary);
  }
`;

const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "The Future of Online Communities in 2023",
    excerpt: "Explore how online communities are evolving with new technologies and changing user expectations. From AI-powered moderation to immersive spaces, discover what's next.",
    date: "July 25, 2023",
    author: "Alex Johnson",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    categories: ["Technology", "Community"]
  },
  {
    id: 2,
    title: "5 Tips for Effective Moderation in Large Forums",
    excerpt: "Maintaining a healthy community atmosphere requires skilled moderation. Learn proven strategies that work for forums with thousands of daily active users.",
    date: "July 18, 2023",
    author: "Maya Peterson",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    categories: ["Moderation", "Community"]
  },
  {
    id: 3,
    title: "How NexusTalk Built Its Recommendation Algorithm",
    excerpt: "A behind-the-scenes look at our content recommendation system. Discover how we use machine learning to connect users with discussions they'll love.",
    date: "July 10, 2023",
    author: "David Chen",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    categories: ["Development", "AI"]
  }
];

// Mock categories with post counts
const categories = [
  { name: "Technology", count: 24 },
  { name: "Development", count: 18 },
  { name: "Community", count: 15 },
  { name: "Design", count: 12 },
  { name: "AI & ML", count: 10 },
  { name: "Product Updates", count: 8 }
];

// Mock tags
const tags = [
  "Technology", "Development", "Community", "Design", "AI", "Forum", 
  "Moderation", "UX", "Performance", "Security", "API", "Future"
];

// Mock popular posts
const popularPosts = [
  {
    id: 101,
    title: "Introducing Dark Mode for NexusTalk",
    date: "July 5, 2023",
    image: "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
  },
  {
    id: 102,
    title: "Community Spotlight: Interview with Top Contributors",
    date: "June 28, 2023",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  },
  {
    id: 103,
    title: "The Role of Forums in a Social Media Dominated World",
    date: "June 20, 2023",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
  }
];

const BlogPage = () => {
  return (
    <BlogContainer
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <PageHeader>
        <HeadingWithIcon>
          <HeaderIcon>
            <BookIcon fontSize="large" />
          </HeaderIcon>
          <NeonHeading>NexusTalk Blog</NeonHeading>
        </HeadingWithIcon>
        <PageDescription>
          Insights, updates, and stories from the NexusTalk team. Learn about our platform,
          online communities, and the future of digital discussion spaces.
        </PageDescription>
      </PageHeader>
      
      <BlogLayout>
        <BlogPosts>
          {blogPosts.map(post => (
            <BlogPost key={post.id}>
              <PostImage src={post.image} />
              <PostContent>
                <PostTitle as={Link} to={`/blog/${post.id}`}>{post.title}</PostTitle>
                <PostMeta>
                  <MetaItem>
                    <CalendarTodayIcon fontSize="small" /> {post.date}
                  </MetaItem>
                  <MetaItem>
                    <PersonIcon fontSize="small" /> {post.author}
                  </MetaItem>
                </PostMeta>
                <PostExcerpt>{post.excerpt}</PostExcerpt>
                <ReadMoreButton to={`/blog/${post.id}`}>
                  Read More <ArrowForwardIcon fontSize="small" />
                </ReadMoreButton>
              </PostContent>
            </BlogPost>
          ))}
          
          <Button style={{ alignSelf: 'center' }}>
            Load More Articles
          </Button>
        </BlogPosts>
        
        <Sidebar>
          <SidebarWidget>
            <WidgetTitle>Categories</WidgetTitle>
            <CategoryList>
              {categories.map(category => (
                <CategoryItem key={category.name}>
                  <Link to={`/blog/category/${category.name.toLowerCase()}`}>
                    {category.name}
                    <span>{category.count}</span>
                  </Link>
                </CategoryItem>
              ))}
            </CategoryList>
          </SidebarWidget>
          
          <SidebarWidget>
            <WidgetTitle>Popular Posts</WidgetTitle>
            {popularPosts.map(post => (
              <PopularPost key={post.id} to={`/blog/${post.id}`}>
                <PopularPostImage src={post.image} />
                <PopularPostContent>
                  <h5>{post.title}</h5>
                  <span>{post.date}</span>
                </PopularPostContent>
              </PopularPost>
            ))}
          </SidebarWidget>
          
          <SidebarWidget>
            <WidgetTitle>Tags</WidgetTitle>
            <TagCloud>
              {tags.map(tag => (
                <Tag key={tag} to={`/blog/tag/${tag.toLowerCase()}`}>
                  <TagIcon fontSize="small" /> {tag}
                </Tag>
              ))}
            </TagCloud>
          </SidebarWidget>
        </Sidebar>
      </BlogLayout>
    </BlogContainer>
  );
};

export default BlogPage; 