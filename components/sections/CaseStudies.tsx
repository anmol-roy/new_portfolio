'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
  color: string;
  icon: string;
}

const CaseStudies = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const skillCategories: SkillCategory[] = [
    {
      id: 'programming',
      name: 'Programming Languages',
      skills: ['C++', 'Python', 'JavaScript', 'TypeScript'],
      color: 'from-blue-500 to-cyan-500',
      icon: '💻'
    },
    {
      id: 'frontend',
      name: 'Frontend Development',
      skills: ['HTML', 'CSS', 'TailwindCSS', 'React', 'Next.js', 'Three.js'],
      color: 'from-purple-500 to-pink-500',
      icon: '🎨'
    },
    {
      id: 'backend',
      name: 'Backend & Databases',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Django'],
      color: 'from-green-500 to-emerald-500',
      icon: '⚙️'
    },
    {
      id: 'tools',
      name: 'Tools & Platforms',
      skills: ['AWS', 'Git', 'GitHub', 'Figma'],
      color: 'from-orange-500 to-red-500',
      icon: '🛠️'
    }
  ];

  const allSkills = skillCategories.flatMap(category => category.skills);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2
      }
    }
  };

  const getSkillsToShow = () => {
    if (activeCategory === 'all') return allSkills;
    const category = skillCategories.find(cat => cat.id === activeCategory);
    return category ? category.skills : [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SKILLS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            My key expertises and technical proficiencies
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3 mb-12 justify-center"
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
            All Skills
          </motion.button>
          {skillCategories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white border-transparent`
                  : 'bg-gray-800/50 text-gray-300 border-gray-600 hover:border-gray-400'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12"
        >
          {getSkillsToShow().map((skill, index) => (
            <motion.div
              key={skill}
              variants={skillVariants}
              whileHover="hover"
              className="group relative"
            >
              <div className="aspect-square bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:border-blue-500/50 group-hover:bg-gray-800/50">
                {/* Skill Icon/Badge */}
                <div className="text-2xl mb-2 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-300">
                  {getSkillIcon(skill)}
                </div>
                
                {/* Skill Name */}
                <span className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors duration-300">
                  {skill}
                </span>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </motion.div>

        {/* Category-wise Detailed View */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-8"
        >
          {(activeCategory === 'all' ? skillCategories : skillCategories.filter(cat => cat.id === activeCategory)).map((category) => (
            <motion.section
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="p-8 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50"
            >
              {/* Category Header */}
              <motion.div 
                className="flex items-center gap-4 mb-6"
                whileHover={{ x: 10 }}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white text-2xl`}>
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                  <p className="text-gray-400">{category.skills.length} technologies</p>
                </div>
              </motion.div>

              {/* Skills List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300"
                  >
                    <div className="text-lg">{getSkillIcon(skill)}</div>
                    <span className="text-white font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-center backdrop-blur-sm"
          >
            <div className="text-2xl mb-2">🚀</div>
            <div className="text-3xl font-bold text-white mb-1">{allSkills.length}</div>
            <div className="text-blue-300 text-sm">Total Skills</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-center backdrop-blur-sm"
          >
            <div className="text-2xl mb-2">💻</div>
            <div className="text-3xl font-bold text-white mb-1">{skillCategories[0].skills.length}</div>
            <div className="text-purple-300 text-sm">Languages</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 text-center backdrop-blur-sm"
          >
            <div className="text-2xl mb-2">🎨</div>
            <div className="text-3xl font-bold text-white mb-1">{skillCategories[1].skills.length}</div>
            <div className="text-green-300 text-sm">Frontend Tech</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 text-center backdrop-blur-sm"
          >
            <div className="text-2xl mb-2">🛠️</div>
            <div className="text-3xl font-bold text-white mb-1">{skillCategories[3].skills.length}</div>
            <div className="text-orange-300 text-sm">Tools & Platforms</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Helper function to get icons for skills
const getSkillIcon = (skill: string) => {
  const icons: { [key: string]: string } = {
    'C++': '🔷',
    'Python': '🐍',
    'JavaScript': '🟨',
    'TypeScript': '🔷',
    'HTML': '🌐',
    'CSS': '🎨',
    'TailwindCSS': '💨',
    'React': '⚛️',
    'Next.js': '▲',
    'Node.js': '🟢',
    'Express.js': '🚂',
    'MongoDB': '🍃',
    'MySQL': '🐬',
    'Django': '🐍',
    'AWS': '☁️',
    'Three.js': '✨',
    'Git': '📚',
    'GitHub': '🐙',
    'Figma': '🎨'
  };

  return icons[skill] || '💼';
};

export default CaseStudies;