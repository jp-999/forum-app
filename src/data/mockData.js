// Icons for categories
import CodeIcon from '@mui/icons-material/Code';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import ScienceIcon from '@mui/icons-material/Science';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PaletteIcon from '@mui/icons-material/Palette';

// Mock users
export const users = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    username: '@alexj',
    avatar: 'https://i.pravatar.cc/150?img=11',
    joinDate: '2023-01-15',
    karma: 1250,
    bio: 'Full-stack developer passionate about React and Node.js',
    location: 'San Francisco, CA',
    website: 'https://alexjohnson.dev',
    isAdmin: false
  },
  {
    id: 'user2',
    name: 'Sophia Chen',
    username: '@sophiac',
    avatar: 'https://i.pravatar.cc/150?img=5',
    joinDate: '2023-02-20',
    karma: 890,
    bio: 'Game designer and 3D artist. Currently working on my indie game.',
    location: 'Seattle, WA',
    website: 'https://sophiachen.art',
    isAdmin: false
  },
  {
    id: 'user3',
    name: 'Marcus Williams',
    username: '@marcusw',
    avatar: 'https://i.pravatar.cc/150?img=12',
    joinDate: '2023-03-10',
    karma: 1560,
    bio: 'AI researcher focusing on computer vision and natural language processing',
    location: 'Boston, MA',
    website: 'https://marcuswilliams.ai',
    isAdmin: true
  },
  {
    id: 'user4',
    name: 'Zoe Parker',
    username: '@zoep',
    avatar: 'https://i.pravatar.cc/150?img=9',
    joinDate: '2023-02-05',
    karma: 720,
    bio: 'UX/UI designer with a passion for accessible and beautiful interfaces',
    location: 'Austin, TX',
    website: 'https://zoeparker.design',
    isAdmin: false
  },
  {
    id: 'user5',
    name: 'Ethan Rivera',
    username: '@ethanr',
    avatar: 'https://i.pravatar.cc/150?img=13',
    joinDate: '2023-04-22',
    karma: 430,
    bio: 'Music producer and sound engineer. Love discussing audio tech.',
    location: 'Los Angeles, CA',
    website: 'https://ethanrivera.music',
    isAdmin: false
  }
];

// Mock categories
export const categories = [
  {
    id: 'cat1',
    name: 'Programming',
    description: 'Discuss programming languages, frameworks, tools, and best practices',
    icon: <CodeIcon fontSize="large" />,
    color: '#6e00ff',
    threadCount: 235,
    memberCount: 3420,
    backgroundImage: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2831&q=80'
  },
  {
    id: 'cat2',
    name: 'Gaming',
    description: 'For discussions about video games, game development, eSports, and gaming hardware',
    icon: <VideogameAssetIcon fontSize="large" />,
    color: '#00e5ff',
    threadCount: 412,
    memberCount: 5680,
    backgroundImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
  },
  {
    id: 'cat3',
    name: 'Science & Tech',
    description: 'Share news and discussions about scientific discoveries and emerging technologies',
    icon: <ScienceIcon fontSize="large" />,
    color: '#00ff9d',
    threadCount: 187,
    memberCount: 2940,
    backgroundImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80'
  },
  {
    id: 'cat4',
    name: 'Design',
    description: 'For UI/UX designers, graphic artists, and all design-related discussions',
    icon: <DesignServicesIcon fontSize="large" />,
    color: '#ff00e5',
    threadCount: 156,
    memberCount: 2340,
    backgroundImage: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
  },
  {
    id: 'cat5',
    name: 'AI & Machine Learning',
    description: 'Deep dive into artificial intelligence, machine learning, and data science',
    icon: <SmartToyIcon fontSize="large" />,
    color: '#ff3d71',
    threadCount: 201,
    memberCount: 2870,
    backgroundImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad0f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80'
  },
  {
    id: 'cat6',
    name: 'Photography',
    description: 'Share your photos, discuss techniques, equipment, and editing software',
    icon: <CameraAltIcon fontSize="large" />,
    color: '#ffcf00',
    threadCount: 132,
    memberCount: 1980,
    backgroundImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
  },
  {
    id: 'cat7',
    name: 'Music',
    description: 'Discuss all genres of music, production, instruments, and industry news',
    icon: <MusicNoteIcon fontSize="large" />,
    color: '#4285F4',
    threadCount: 178,
    memberCount: 2560,
    backgroundImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
  },
  {
    id: 'cat8',
    name: 'Art',
    description: 'For digital artists, traditional artists, and art enthusiasts',
    icon: <PaletteIcon fontSize="large" />,
    color: '#34A853',
    threadCount: 145,
    memberCount: 2120,
    backgroundImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80'
  }
];

// Mock threads
export const threads = [
  {
    id: 'thread1',
    title: 'Introducing React Server Components - The Future of React',
    content: `I've been experimenting with React Server Components lately and I'm really impressed with the performance gains. The ability to choose which components render on the server vs. client is game-changing. Has anyone else integrated RSC into their projects? I'd love to hear about your experiences and any challenges you've faced.`,
    author: users[0],
    createdAt: '2023-08-15T14:32:00Z',
    updatedAt: '2023-08-15T14:32:00Z',
    category: categories[0],
    upvotes: 128,
    downvotes: 5,
    commentCount: 24,
    viewCount: 1250,
    isPinned: true,
    isLocked: false
  },
  {
    id: 'thread2',
    title: 'The Elder Scrolls 6: What We Know So Far',
    content: `Bethesda has been pretty tight-lipped about The Elder Scrolls 6, but there have been some interesting leaks and rumors lately. From what I've gathered, it might be set in Hammerfell and High Rock, with a completely revamped magic system. What are you hoping to see in the next Elder Scrolls game? Anyone heard any credible rumors I might have missed?`,
    author: users[1],
    createdAt: '2023-08-14T09:17:00Z',
    updatedAt: '2023-08-14T09:17:00Z',
    category: categories[1],
    upvotes: 245,
    downvotes: 12,
    commentCount: 57,
    viewCount: 3210,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread3',
    title: 'Breakthrough in Quantum Computing: Achieving Quantum Advantage',
    content: `A team of researchers at MIT have demonstrated quantum advantage in a practical application for the first time. Their 128-qubit quantum computer solved a complex optimization problem that would take classical supercomputers years to solve. This could have massive implications for cryptography, drug discovery, and material science. What do you think will be the first industry to be truly disrupted by quantum computing?`,
    author: users[2],
    createdAt: '2023-08-13T16:45:00Z',
    updatedAt: '2023-08-13T16:45:00Z',
    category: categories[2],
    upvotes: 189,
    downvotes: 3,
    commentCount: 32,
    viewCount: 2180,
    isPinned: true,
    isLocked: false
  },
  {
    id: 'thread4',
    title: 'Design Trends for 2023: Neomorphism vs. Glassmorphism',
    content: `I've noticed a shift from flat design to more tactile, 3D-like interfaces. Neomorphism had a moment, but now glassmorphism seems to be taking over. What are your thoughts on these trends? Are they just fads or do they offer genuine improvements to user experience? I've included some examples of both styles in my portfolio if you're interested in seeing how I've implemented them.`,
    author: users[3],
    createdAt: '2023-08-12T11:23:00Z',
    updatedAt: '2023-08-12T11:23:00Z',
    category: categories[3],
    upvotes: 156,
    downvotes: 8,
    commentCount: 41,
    viewCount: 1870,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread5',
    title: 'How Large Language Models are Changing Software Development',
    content: `AI coding assistants like GitHub Copilot and ChatGPT are revolutionizing how developers write code. I've found that I'm able to focus more on architecture and design while letting the AI handle boilerplate and routine tasks. How has AI affected your development workflow? Do you think these tools will fundamentally change how programming is taught and practiced?`,
    author: users[0],
    createdAt: '2023-08-11T08:56:00Z',
    updatedAt: '2023-08-11T08:56:00Z',
    category: categories[4],
    upvotes: 203,
    downvotes: 15,
    commentCount: 48,
    viewCount: 2450,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread6',
    title: 'Composition Techniques for Night Photography',
    content: `I've been working on improving my night photography, especially astrophotography and city nightscapes. One technique that's helped me tremendously is using leading lines to draw the viewer's eye to key elements like the Milky Way or illuminated landmarks. What composition techniques have you found most effective for night photography? I'd love to see some of your best night shots!`,
    author: users[4],
    createdAt: '2023-08-10T21:34:00Z',
    updatedAt: '2023-08-10T21:34:00Z',
    category: categories[5],
    upvotes: 118,
    downvotes: 2,
    commentCount: 35,
    viewCount: 1680,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread7',
    title: 'Advances in Spatial Audio: Creating Immersive Soundscapes',
    content: `Spatial audio is becoming increasingly important in music, gaming, and mixed reality applications. I've been experimenting with binaural recording techniques and Dolby Atmos mixing to create truly immersive audio experiences. The difference between standard stereo and properly implemented spatial audio is mind-blowing. Has anyone else been working with spatial audio? What tools and techniques are you using?`,
    author: users[4],
    createdAt: '2023-08-09T15:12:00Z',
    updatedAt: '2023-08-09T15:12:00Z',
    category: categories[6],
    upvotes: 142,
    downvotes: 4,
    commentCount: 27,
    viewCount: 1530,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread8',
    title: 'AI Art Generation: Creative Tool or Copyright Concern?',
    content: `The rise of AI art tools like DALL-E, Midjourney, and Stable Diffusion has sparked intense debate in the art community. While these tools enable amazing creative possibilities, there are serious questions about how they were trained and the rights of artists whose work was used in training data. As both a digital artist and technology enthusiast, I'm torn. What are your thoughts on the ethical implications of AI art generation?`,
    author: users[3],
    createdAt: '2023-08-08T12:48:00Z',
    updatedAt: '2023-08-08T12:48:00Z',
    category: categories[7],
    upvotes: 176,
    downvotes: 21,
    commentCount: 63,
    viewCount: 2870,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread9',
    title: 'Building a Modern JavaScript Project From Scratch in 2023',
    content: `I'm starting a new project and am overwhelmed by the JavaScript ecosystem. Vite or Next.js? TypeScript or plain JS? Tailwind or styled-components? So many choices! What would you consider the most future-proof and developer-friendly stack for a new project in 2023? I'd love to hear about your recent project setups.`,
    author: users[0],
    createdAt: '2023-08-07T10:15:00Z',
    updatedAt: '2023-08-07T10:15:00Z',
    category: categories[0],
    upvotes: 158,
    downvotes: 3,
    commentCount: 42,
    viewCount: 1980,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread10',
    title: 'Rust vs. Go: Which One Should I Learn Next?',
    content: `I'm a Python developer looking to expand my skills with a statically typed language that has better performance characteristics. I've narrowed it down to Rust and Go, but I'm torn between them. Rust seems to have a steeper learning curve but offers memory safety without GC, while Go is simpler but maybe less powerful? Which would you recommend for someone in backend/systems programming, and why?`,
    author: users[2],
    createdAt: '2023-08-06T14:22:00Z',
    updatedAt: '2023-08-06T14:22:00Z',
    category: categories[0],
    upvotes: 142,
    downvotes: 2,
    commentCount: 38,
    viewCount: 1750,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread11',
    title: 'The Steam Deck One Year Later: A Gaming Revolution?',
    content: `It's been over a year since the Steam Deck launched, and I'm curious how people feel about it now that the honeymoon period is over. Has it changed your gaming habits? Do you still use it regularly? I've found that it's completely transformed how I play games - I barely touch my gaming PC anymore for anything but the most demanding titles. It's made my massive Steam library accessible in a way it never was before.`,
    author: users[1],
    createdAt: '2023-08-05T19:10:00Z',
    updatedAt: '2023-08-05T19:10:00Z',
    category: categories[1],
    upvotes: 189,
    downvotes: 4,
    commentCount: 47,
    viewCount: 2150,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread12',
    title: 'Baldur\'s Gate 3: The Return of Classic CRPGs',
    content: `I've been playing Baldur's Gate 3 non-stop since it came out, and I'm blown away by the depth of reactivity and player choice. It feels like a true successor to the classic CRPG genre while being thoroughly modern. For those playing, what class/build are you having the most fun with? Any surprising moments or quests that particularly impressed you?`,
    author: users[4],
    createdAt: '2023-08-04T16:38:00Z',
    updatedAt: '2023-08-04T16:38:00Z',
    category: categories[1],
    upvotes: 204,
    downvotes: 1,
    commentCount: 53,
    viewCount: 2480,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread13',
    title: 'The James Webb Space Telescope: Most Exciting Discoveries So Far',
    content: `The JWST has been delivering incredible images and data for a while now. I'm fascinated by the distant galaxies and exoplanet atmospheres it's been able to observe. What do you think has been the most significant scientific discovery enabled by the JWST so far? And what are you hoping it will help us understand in the coming years?`,
    author: users[2],
    createdAt: '2023-08-03T11:45:00Z',
    updatedAt: '2023-08-03T11:45:00Z',
    category: categories[2],
    upvotes: 172,
    downvotes: 0,
    commentCount: 34,
    viewCount: 1890,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread14',
    title: 'Accessible Design Practices: Beyond WCAG Compliance',
    content: `I've been working on making my designs more accessible, beyond just checking WCAG boxes. I've found that involving users with disabilities in the testing process has revealed issues that technical compliance alone missed. What are some accessibility practices that you've incorporated into your design process that go beyond the basic requirements? Any tools or resources you'd recommend?`,
    author: users[3],
    createdAt: '2023-08-02T09:20:00Z',
    updatedAt: '2023-08-02T09:20:00Z',
    category: categories[3],
    upvotes: 128,
    downvotes: 0,
    commentCount: 29,
    viewCount: 1560,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread15',
    title: 'Minimalist UI Design: When Less Truly Is More',
    content: `I've been experimenting with more minimalist UI designs lately, and the user feedback has been overwhelmingly positive. Stripping away unnecessary elements has improved both aesthetics and usability. I'd love to see examples of minimalist UIs that you think strike the perfect balance between simplicity and functionality. What principles do you follow when aiming for minimalism without sacrificing usability?`,
    author: users[3],
    createdAt: '2023-08-01T13:15:00Z',
    updatedAt: '2023-08-01T13:15:00Z',
    category: categories[3],
    upvotes: 137,
    downvotes: 2,
    commentCount: 31,
    viewCount: 1620,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread16',
    title: 'The Ethics of Training AI on Human-Generated Content',
    content: `With the rise of AI systems trained on massive datasets of human-created content (books, articles, code, art), I've been thinking about the ethical implications. Should creators be compensated when their work is used to train AI? Do we need new frameworks for consent and attribution? I'm especially concerned about the impact on creative professionals whose livelihoods might be affected. What are your thoughts on finding a balance that respects creators while allowing AI to advance?`,
    author: users[2],
    createdAt: '2023-07-31T17:40:00Z',
    updatedAt: '2023-07-31T17:40:00Z',
    category: categories[4],
    upvotes: 195,
    downvotes: 8,
    commentCount: 51,
    viewCount: 2390,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread17',
    title: 'Practical Applications of Reinforcement Learning in Industry',
    content: `I've been studying reinforcement learning algorithms and am fascinated by their potential. Beyond the headline-grabbing applications like beating humans at games, what are some practical, current applications of RL in industry that are creating real value? I'm particularly interested in examples from manufacturing, energy, or finance if anyone has experience in those domains.`,
    author: users[0],
    createdAt: '2023-07-30T10:25:00Z',
    updatedAt: '2023-07-30T10:25:00Z',
    category: categories[4],
    upvotes: 148,
    downvotes: 0,
    commentCount: 32,
    viewCount: 1740,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread18',
    title: 'Astrophotography on a Budget: Getting Started',
    content: `I've always been fascinated by astrophotography, but I always thought it required thousands of dollars of equipment. Recently, I've been experimenting with my basic DSLR, a tripod, and free stacking software with surprisingly good results! For those into astrophotography, what tips would you give to beginners on a tight budget? Any specific techniques or affordable equipment that made a big difference for you?`,
    author: users[1],
    createdAt: '2023-07-29T21:50:00Z',
    updatedAt: '2023-07-29T21:50:00Z',
    category: categories[5],
    upvotes: 112,
    downvotes: 0,
    commentCount: 27,
    viewCount: 1520,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread19',
    title: 'Music Production: Favorite DAW and Why?',
    content: `I've been using Ableton Live for years, but I'm curious about what other DAWs people are using and why they prefer them. Each seems to have strengths for different workflows and music styles. If you're a music producer, what's your DAW of choice, and what do you think it excels at compared to others? Would you recommend it to someone just getting started?`,
    author: users[4],
    createdAt: '2023-07-28T14:15:00Z',
    updatedAt: '2023-07-28T14:15:00Z',
    category: categories[6],
    upvotes: 126,
    downvotes: 3,
    commentCount: 39,
    viewCount: 1670,
    isPinned: false,
    isLocked: false
  },
  {
    id: 'thread20',
    title: 'Digital Art: Making the Transition from Traditional Media',
    content: `After years of working with traditional media (mainly oils and acrylics), I've started exploring digital art using Procreate and a drawing tablet. The transition has been challenging but rewarding. For artists who have made a similar switch, what were your biggest hurdles? Any specific techniques or resources that helped you translate your traditional skills to the digital medium? I'm especially struggling with achieving texture and brush dynamics that feel natural.`,
    author: users[3],
    createdAt: '2023-07-27T11:30:00Z',
    updatedAt: '2023-07-27T11:30:00Z',
    category: categories[7],
    upvotes: 142,
    downvotes: 1,
    commentCount: 36,
    viewCount: 1820,
    isPinned: false,
    isLocked: false
  }
];

// Mock comments for the first thread
export const comments = [
  {
    id: 'comment1',
    threadId: 'thread1',
    content: `I've been using React Server Components in a production app for about 3 months now. The performance improvements are noticeable, especially for data-heavy pages. The biggest challenge was rethinking how to structure the application and which parts should be server vs. client components.`,
    author: users[2],
    createdAt: '2023-08-15T15:10:00Z',
    parentId: null,
    upvotes: 42,
    downvotes: 1,
    replies: [
      {
        id: 'comment2',
        threadId: 'thread1',
        content: `@marcusw That's helpful insight. Did you face any issues with third-party libraries that weren't compatible with RSC? I'm worried about having to refactor a lot of our existing code.`,
        author: users[0],
        createdAt: '2023-08-15T15:45:00Z',
        parentId: 'comment1',
        upvotes: 18,
        downvotes: 0,
        replies: [
          {
            id: 'comment3',
            threadId: 'thread1',
            content: `@alexj Yes, that was actually one of the biggest challenges. Libraries that use React context or hooks in components that you want to use as Server Components won't work. We had to create wrapper components or find alternatives. The "use client" directive helps, but it forces some architectural decisions.`,
            author: users[2],
            createdAt: '2023-08-15T16:20:00Z',
            parentId: 'comment2',
            upvotes: 24,
            downvotes: 0,
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: 'comment4',
    threadId: 'thread1',
    content: `I'm concerned about the debugging experience with RSC. When something goes wrong, it can be hard to pinpoint whether the issue is on the server or client side. Has anyone found good tooling or practices to make debugging easier?`,
    author: users[3],
    createdAt: '2023-08-15T17:05:00Z',
    parentId: null,
    upvotes: 29,
    downvotes: 0,
    replies: [
      {
        id: 'comment5',
        threadId: 'thread1',
        content: `@zoep I've found that using the React DevTools with the experimental server components plugin helps a lot. Also, clear separation of concerns and being explicit about the boundaries between server and client components in your folder structure can prevent many common issues.`,
        author: users[0],
        createdAt: '2023-08-15T17:30:00Z',
        parentId: 'comment4',
        upvotes: 15,
        downvotes: 0,
        replies: []
      }
    ]
  },
  {
    id: 'comment6',
    threadId: 'thread1',
    content: `The bundle size reduction is what really impressed me. Our main JS bundle went from 320KB to just 76KB after migrating to RSC and moving data-fetching to the server. The initial page load is lightning fast now.`,
    author: users[1],
    createdAt: '2023-08-15T18:15:00Z',
    parentId: null,
    upvotes: 37,
    downvotes: 0,
    replies: []
  }
];

// Helper function to get all threads by category
export const getThreadsByCategory = (categoryId) => {
  return threads.filter(thread => thread.category.id === categoryId);
};

// Helper function to get thread by id
export const getThreadById = (threadId) => {
  return threads.find(thread => thread.id === threadId);
};

// Helper function to get comments by thread id
export const getCommentsByThreadId = (threadId) => {
  return comments.filter(comment => comment.threadId === threadId && comment.parentId === null);
}; 