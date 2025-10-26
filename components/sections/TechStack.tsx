'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface TechCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
}

interface TechItem {
  id: string;
  name: string;
  category: string;
  level: number; // 1-5
  experience: string;
  description: string;
  icon: string;
  color: string;
  projects: number;
  isLearning?: boolean;
  isFavorite?: boolean;
}

const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Modern user interface development',
    icon: '🎨',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500'
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Server-side application logic',
    icon: '⚙️',
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Data storage and management',
    icon: '💾',
    color: 'from-purple-500 to-pink-500',
    gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    id: 'tools',
    name: 'Tools & DevOps',
    description: 'Development workflow and deployment',
    icon: '🛠️',
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
  },
  {
    id: 'mobile',
    name: 'Mobile',
    description: 'Cross-platform mobile development',
    icon: '📱',
    color: 'from-indigo-500 to-purple-500',
    gradient: 'bg-gradient-to-r from-indigo-500 to-purple-500'
  }
];

const techStack: TechItem[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    level: 5,
    experience: '3+ years',
    description: 'Building dynamic and interactive user interfaces',
    icon: '⚛️',
    color: 'bg-blue-500/20 border-blue-500/30',
    projects: 12,
    isFavorite: true
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    level: 5,
    experience: '2+ years',
    description: 'Full-stack React framework for production',
    icon: '▲',
    color: 'bg-gray-500/20 border-gray-500/30',
    projects: 8,
    isFavorite: true
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    level: 4,
    experience: '2+ years',
    description: 'Type-safe JavaScript development',
    icon: '📘',
    color: 'bg-blue-600/20 border-blue-600/30',
    projects: 10
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 5,
    experience: '2+ years',
    description: 'Utility-first CSS framework',
    icon: '💨',
    color: 'bg-cyan-500/20 border-cyan-500/30',
    projects: 15,
    isFavorite: true
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'frontend',
    level: 3,
    experience: '1 year',
    description: 'Progressive JavaScript framework',
    icon: '🟢',
    color: 'bg-green-500/20 border-green-500/30',
    projects: 3
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    level: 4,
    experience: '3+ years',
    description: 'JavaScript runtime for server-side development',
    icon: '🟢',
    color: 'bg-green-600/20 border-green-600/30',
    projects: 9
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    level: 4,
    experience: '3+ years',
    description: 'Minimal web framework for Node.js',
    icon: '🚂',
    color: 'bg-gray-600/20 border-gray-600/30',
    projects: 7
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    level: 4,
    experience: '2+ years',
    description: 'Versatile programming language',
    icon: '🐍',
    color: 'bg-yellow-500/20 border-yellow-500/30',
    projects: 6
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    level: 3,
    experience: '1 year',
    description: 'Modern Python web framework',
    icon: '⚡',
    color: 'bg-green-500/20 border-green-500/30',
    projects: 3,
    isLearning: true
  },

  // Database
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    level: 4,
    experience: '2+ years',
    description: 'NoSQL document database',
    icon: '🍃',
    color: 'bg-green-500/20 border-green-500/30',
    projects: 8
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    level: 3,
    experience: '1 year',
    description: 'Powerful open-source relational database',
    icon: '🐘',
    color: 'bg-blue-700/20 border-blue-700/30',
    projects: 4
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'database',
    level: 3,
    experience: '1 year',
    description: 'In-memory data structure store',
    icon: '🔴',
    color: 'bg-red-500/20 border-red-500/30',
    projects: 3
  },

  // Tools & DevOps
  {
    id: 'docker',
    name: 'Docker',
    category: 'tools',
    level: 3,
    experience: '1 year',
    description: 'Containerization platform',
    icon: '🐳',
    color: 'bg-blue-500/20 border-blue-500/30',
    projects: 5
  },
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    level: 5,
    experience: '3+ years',
    description: 'Version control system',
    icon: '📚',
    color: 'bg-orange-500/20 border-orange-500/30',
    projects: 20
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'tools',
    level: 3,
    experience: '1 year',
    description: 'Cloud computing services',
    icon: '☁️',
    color: 'bg-orange-600/20 border-orange-600/30',
    projects: 4,
    isLearning: true
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'tools',
    level: 4,
    experience: '2+ years',
    description: 'Cloud platform for static sites',
    icon: '▲',
    color: 'bg-black/20 border-black/30',
    projects: 8
  },

  // Mobile
  {
    id: 'react-native',
    name: 'React Native',
    category: 'mobile',
    level: 3,
    experience: '1 year',
    description: 'Cross-platform mobile development',
    icon: '⚛️',
    color: 'bg-blue-400/20 border-blue-400/30',
    projects: 2,
    isLearning: true
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'mobile',
    level: 2,
    experience: '6 months',
    description: 'Google\'s UI toolkit for mobile',
    icon: '💙',
    color: 'bg-blue-500/20 border-blue-500/30',
    projects: 1,
    isLearning: true
  }
];

const SkillLevelBar = ({ level }: { level: number }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(level / 5) * 100}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`h-full rounded-full bg-gradient-to-r from-green-400 to-blue-500`}
        />
      </div>
      <span className="text-xs text-gray-400 w-6">{level}/5</span>
    </div>
  );
};

const TechCard = ({ tech }: { tech: TechItem }) => {
  const category = techCategories.find(c => c.id === tech.category);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        y: -5
      }}
      className={`relative p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 group overflow-hidden ${tech.color}`}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${category?.gradient}`} />
      
      {/* Learning/Favorite Badge */}
      <div className="absolute top-3 right-3 flex gap-1">
        {tech.isLearning && (
          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs border border-yellow-500/30">
            Learning
          </span>
        )}
        {tech.isFavorite && (
          <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs border border-red-500/30">
            Favorite
          </span>
        )}
      </div>

      {/* Tech Icon and Name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl">{tech.icon}</div>
        <div>
          <h3 className="font-semibold text-white text-lg">{tech.name}</h3>
          <p className="text-gray-400 text-sm">{tech.experience}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
        {tech.description}
      </p>

      {/* Skill Level */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-400 text-sm">Proficiency</span>
        </div>
        <SkillLevelBar level={tech.level} />
      </div>

      {/* Projects Count */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">Projects</span>
        <span className="text-white font-semibold">{tech.projects}+</span>
      </div>

      {/* Hover Border */}
      <div className={`absolute inset-0 rounded-xl border-2 opacity-0 group-hover:opacity-2 transition-opacity duration-300 ${category?.gradient.replace('bg-gradient-to-r', 'bg-gradient-to-r')}`} />
    </motion.div>
  );
};

const CategorySection = ({ category }: { category: TechCategory }) => {
  const categoryTech = techStack.filter(tech => tech.category === category.id);
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      {/* Category Header */}
      <motion.div 
        className="flex items-center gap-4 mb-6"
        whileHover={{ x: 10 }}
      >
        <div className={`p-3 rounded-xl ${category.gradient} text-white text-2xl`}>
          {category.icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{category.name}</h2>
          <p className="text-gray-400">{category.description}</p>
        </div>
      </motion.div>

      {/* Tech Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryTech.map((tech, index) => (
          <motion.div
            key={tech.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TechCard tech={tech} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const StatsSection = () => {
  const stats = [
    {
      number: techStack.length,
      label: 'Technologies',
      icon: '🛠️'
    },
    {
      number: techStack.reduce((acc, tech) => acc + tech.projects, 0),
      label: 'Total Projects',
      icon: '🚀'
    },
    {
      number: techStack.filter(tech => tech.level >= 4).length,
      label: 'Advanced Skills',
      icon: '⭐'
    },
    {
      number: techStack.filter(tech => tech.isLearning).length,
      label: 'Currently Learning',
      icon: '📚'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 text-center backdrop-blur-sm"
        >
          <div className="text-2xl mb-2">{stat.icon}</div>
          <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories = activeCategory === 'all' 
    ? techCategories 
    : techCategories.filter(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f230e] via-[#1a1a2e00] to-[#16213e00] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Tech Stack
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Technologies, tools, and frameworks I use to bring ideas to life. 
            Continuously learning and adapting to build better solutions.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <StatsSection />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-3 mb-8 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 rounded-full border transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent'
                : 'bg-gray-800/50 text-gray-300 border-gray-600 hover:border-gray-400'
            }`}
          >
            All Technologies
          </motion.button>
          {techCategories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? `${category.gradient} text-white border-transparent`
                  : 'bg-gray-800/50 text-gray-300 border-gray-600 hover:border-gray-400'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tech Stack by Category */}
        <div className="space-y-12">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <CategorySection category={category} />
            </motion.div>
          ))}
        </div>

        {/* Learning Journey */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Continuous Learning Journey</h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Technology evolves rapidly, and so do I. Currently exploring new frontiers in 
              cloud architecture, AI/ML integration, and performance optimization to build 
              the next generation of web applications.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-6 text-white font-semibold cursor-pointer"
            >
              <span>View Learning Roadmap</span>
              <span>→</span>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}