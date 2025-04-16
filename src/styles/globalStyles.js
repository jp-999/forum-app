import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #6e00ff;
    --primary-light: #9a42ff;
    --secondary: #00e5ff;
    --accent: #ff00e5;
    --background: #080924;
    --background-light: #101235;
    --background-lighter: #191c45;
    --text: #e6e6ff;
    --text-secondary: #adb5bd;
    --success: #00ff9d;
    --warning: #ffcf00;
    --danger: #ff3d71;
    --border-radius: 0.5rem;
    --card-border-radius: 0.75rem;
    --box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.18);
    --neon-shadow: 0 0 10px rgba(110, 0, 255, 0.5), 0 0 20px rgba(110, 0, 255, 0.3);
    --card-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
    --transition: all 0.3s ease-in-out;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: var(--background);
    color: var(--text);
    overflow-x: hidden;
    transition: background-color 0.3s ease;
    min-height: 100vh;
    line-height: 1.6;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background-light);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-light);
  }

  a {
    color: var(--secondary);
    text-decoration: none;
    transition: var(--transition);
  }

  a:hover {
    color: var(--primary-light);
    text-decoration: none;
  }

  button {
    font-family: 'Inter', sans-serif;
    cursor: pointer;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Glassmorphism utility classes */
  .glass {
    background: rgba(16, 18, 53, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  /* Neon text effect */
  .neon-text {
    color: var(--text);
    text-shadow: 0 0 5px var(--primary), 0 0 10px var(--primary);
  }

  /* Container */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Animation for page transitions */
  .fade-enter {
    opacity: 0;
  }
  
  .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  
  .fade-exit {
    opacity: 1;
  }
  
  .fade-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`;

export default GlobalStyles; 