'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  Github, 
  ArrowUpRight, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Folder, 
  Star,
  GitFork 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  date: string;
  description: string;
  skills: string[];
  isExternal?: boolean;
  demoLink?: string;
  githubLink?: string;
  thumbnail?: string;
  commits?: number;
  context?: string;
  stars?: number;
  forks?: number;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Heart Rate Detector',
    date: '2024-12-01',
    description: 'PPG-based React Native app for real-time heart rate analysis using smartphone camera with TensorFlow integration.',
    skills: ['React Native', 'TensorFlow', 'Expo', 'JavaScript', 'Python'],
    demoLink: 'https://smart-bp-estimator.vercel.app/',
    githubLink: 'https://github.com/anmol-roy/SBP_DBP-prediction-model-with-flutter-application',
    thumbnail: '/project-thumbs/heart-rate.png',
    commits: 156,
    stars: 34,
    forks: 12,
    context: 'Healthcare Mobile App'
  },
  {
    id: 2,
    title: 'Blood Pressure Estimator',
    date: '2024-10-15',
    description: 'Machine learning model for non-invasive blood pressure estimation from facial videos using computer vision.',
    skills: ['Python', 'OpenCV', 'TensorFlow', 'CNN', 'BiLSTM'],
    demoLink: 'https://demo.example.com/bp-estimator',
    githubLink: 'https://github.com/anmol-roy/bp-estimator',
    thumbnail: '/project-thumbs/bp-estimator.png',
    commits: 89,
    stars: 42,
    forks: 8,
    context: 'Medical AI Research'
  },
  {
    id: 3,
    title: 'Voice Assistant AI',
    date: '2024-08-20',
    description: 'AI-powered voice assistant using transformer models with natural language processing and speech recognition.',
    skills: ['Python', 'Transformers', 'FastAPI', 'React', 'TypeScript'],
    demoLink: 'https://demo.example.com/voice-assistant',
    githubLink: 'https://github.com/anmol-roy/voice-assistant',
    thumbnail: '/project-thumbs/voice-assistant.png',
    commits: 203,
    stars: 67,
    forks: 15,
    context: 'Generative AI Project'
  },
];

const availableSkills = [
  'React Native',
  'TensorFlow',
  'Python',
  'OpenCV',
  'JavaScript',
  'TypeScript',
  'React',
  'FastAPI',
  'CNN',
  'BiLSTM',
  'Transformers',
  'Expo'
];

const sortOptions = [
  'Project Name (A-Z)',
  'Project Name (Z-A)',
  'Date (Newest)',
  'Date (Oldest)',
  'Most Stars',
  'Most Forks',
];

// Enhanced Project Card Component with Overview-like Design
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        y: -5
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-[#131337d8] border border-gray-700 rounded-lg hover:border-gray-500 transition-all duration-300 group overflow-hidden"
    >
      {/* Image/Thumbnail Area */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 overflow-hidden">
        {project.thumbnail ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                onLoad={() => setImageLoaded(true)}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#131337] via-transparent to-transparent opacity-60" />
            </motion.div>
            {!imageLoaded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              </motion.div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="text-4xl opacity-20"
            >
              {project.context?.includes('Healthcare') ? '❤️' : 
               project.context?.includes('Medical') ? '🩺' : 
               project.context?.includes('AI') ? '🤖' : '📊'}
            </motion.div>
          </div>
        )}
        
        {/* Top right badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {project.stars && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-gray-300"
            >
              <Star className="w-3 h-3 text-yellow-400" />
              <span>{project.stars}</span>
            </motion.div>
          )}
          {project.context && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-gray-300"
            >
              {project.context}
            </motion.div>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 left-3 flex gap-2">
          {project.githubLink && (
            <motion.a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-all duration-200 border border-gray-600"
              title="View Code"
            >
              <Github className="w-4 h-4 text-white" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5">
        {/* Header with title */}
        <div className="flex items-start justify-between mb-3">
          <motion.h3 
            whileHover={{ x: 2 }}
            className="text-lg font-semibold text-white flex items-center gap-2"
          >
            {project.title}
            {project.isExternal && (
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowUpRight className="w-4 h-4 text-blue-400" />
              </motion.div>
            )}
          </motion.h3>
        </div>

        {/* Date */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-sm mb-3 flex items-center gap-1"
        >
          <Calendar className="w-3 h-3" />
          {new Date(project.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </motion.p>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 mb-4 leading-relaxed text-sm"
        >
          {project.description}
        </motion.p>

        {/* Tech Stack Badges */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {project.skills.map((skill, skillIndex) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + skillIndex * 0.1 }}
              whileHover={{ scale: 1.05, y: -1 }}
              className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-md text-xs border border-blue-800/50 hover:bg-blue-800/30 transition-colors cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between">
          {/* Stats */}
          <motion.div 
            className="flex items-center gap-4 text-xs text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {project.commits && (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1"
              >
                <Github className="w-3 h-3" />
                <span>{project.commits} commits</span>
              </motion.div>
            )}
            {project.forks && (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1"
              >
                <GitFork className="w-3 h-3" />
                <span>{project.forks} forks</span>
              </motion.div>
            )}
          </motion.div>

          {/* Demo Button */}
          {project.demoLink && (
            <motion.a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-md transition-colors duration-200 shadow-lg hover:shadow-blue-500/20"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Active Section Indicator (like Overview page) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Enhanced Projects Page with Overview-like Design
export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [skillSearch, setSkillSearch] = useState('');
  const [sortBy, setSortBy] = useState('Date (Newest)');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const skillDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (skillDropdownRef.current && !skillDropdownRef.current.contains(event.target as Node)) {
        setShowSkillDropdown(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  const toggleSkill = useCallback((skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedSkills([]);
    setSearchTerm('');
  }, []);

  const filteredSkills = useMemo(() => 
    availableSkills.filter((skill) =>
      skill.toLowerCase().includes(skillSearch.toLowerCase())
    ),
    [skillSearch]
  );

  // Filter and Sort Projects
  const sortedProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.every((skill) => project.skills.includes(skill));

      return matchesSearch && matchesSkills;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'Project Name (A-Z)':
          return a.title.localeCompare(b.title);
        case 'Project Name (Z-A)':
          return b.title.localeCompare(a.title);
        case 'Date (Newest)':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'Date (Oldest)':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'Most Stars':
          return (b.stars || 0) - (a.stars || 0);
        case 'Most Forks':
          return (b.forks || 0) - (a.forks || 0);
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedSkills, sortBy]);

  // Quick Stats like Overview page
  const quickStats = [
    { icon: Folder, label: "Total Projects", value: projects.length.toString() },
    { icon: Star, label: "Total Stars", value: projects.reduce((acc, proj) => acc + (proj.stars || 0), 0).toString() },
    { icon: GitFork, label: "Total Forks", value: projects.reduce((acc, proj) => acc + (proj.forks || 0), 0).toString() },
    { icon: Users, label: "Technologies", value: availableSkills.length.toString() },
  ];

  return (
    <div className="min-h-screen bg-[#05032900]">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Projects</h2>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-md bg-[#131337d8] border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-4 mb-8"
          >
            {/* Search Bar */}
            <div className="flex-1 lg:flex-none lg:w-80 xl:w-96 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#131337d8] border border-gray-700 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-600 text-sm"
              />
            </div>

            {/* Middle: Filters and Skills */}
            <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                {/* SkillDropdown component */}
                <div className="relative" ref={skillDropdownRef}>
                  <motion.button
                    onClick={() => setShowSkillDropdown((prev) => !prev)}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-[#131337d8] border border-gray-700 rounded-md text-gray-200 hover:bg-[#1a1f2e] transition-colors whitespace-nowrap"
                  >
                    <Filter className="w-4 h-4" />
                    <span>Skills</span>
                    {selectedSkills.length > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-xs bg-blue-500 text-white rounded-full w-5 h-4 flex items-center justify-center"
                      >
                        {selectedSkills.length}
                      </motion.span>
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {showSkillDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 left-0 w-64 bg-[#131337d8] border border-gray-700 rounded-md shadow-2xl z-50"
                      >
                        <div className="p-2 border-b border-gray-700">
                          <input
                            type="text"
                            placeholder="Search skills..."
                            value={skillSearch}
                            onChange={(e) => setSkillSearch(e.target.value)}
                            className="w-full px-3 py-2 bg-[#1a1f2e] border border-gray-700 rounded text-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-600"
                          />
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          {filteredSkills.map((skill, index) => (
                            <motion.label
                              key={skill}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-[#1a1f2e] cursor-pointer transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={selectedSkills.includes(skill)}
                                onChange={() => toggleSkill(skill)}
                                className="w-4 h-4 rounded border-gray-600 bg-[#1a1f2e] text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                              />
                              <span className="text-gray-300">{skill}</span>
                            </motion.label>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Reset Button */}
                <AnimatePresence>
                  {(selectedSkills.length > 0 || searchTerm) && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetFilters}
                      className="flex items-center gap-2 px-3 py-2 bg-[#131337d8] border border-gray-700 rounded-md text-gray-200 hover:bg-[#1a1f2e] transition-colors whitespace-nowrap text-sm"
                    >
                      <X className="w-4 h-4" />
                      <span>Reset</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Selected Skills Pills */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
                  <AnimatePresence>
                    {selectedSkills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -1 }}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-900/30 text-blue-300 rounded-md text-xs font-medium whitespace-nowrap flex-shrink-0 border border-blue-800/50"
                      >
                        <span>{skill}</span>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => toggleSkill(skill)}
                          className="hover:bg-blue-800/30 rounded p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="lg:w-48">
              <div className="relative" ref={sortDropdownRef}>
                <motion.button
                  onClick={() => setShowSortDropdown((prev) => !prev)}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-4 py-3 bg-[#131337d8] border border-gray-700 rounded-md text-gray-200 hover:bg-[#1a1f2e] transition-colors min-w-[200px] justify-between whitespace-nowrap"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Sort by</span>
                    <span className="text-gray-200 text-sm">{sortBy}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: showSortDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showSortDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 right-0 w-full bg-[#131337d8] border border-gray-700 rounded-md shadow-2xl z-50"
                    >
                      {sortOptions.map((option, index) => (
                        <motion.button
                          key={option}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => {
                            setSortBy(option);
                            setShowSortDropdown(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-[#1a1f2e] transition-colors text-gray-300 first:rounded-t-md last:rounded-b-md text-sm"
                        >
                          {option}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Projects Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {sortedProjects.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {sortedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Search className="mx-auto mb-4 w-10 h-10 text-gray-500" />
              </motion.div>
              <p className="text-gray-400 text-lg">No projects match your filters.</p>
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
}