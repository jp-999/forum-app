import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Main = styled(motion.main)`
  min-height: calc(100vh - 70px);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Main
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <Outlet />
        </Main>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default MainLayout; 