'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Search, Filter, X, ChevronDown, Github, ArrowUpRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import global css
import '../../app/globals.css';



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
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Dynamic Form Builder and Manager',
    date: '2025-01-01',
    description:
      'Internal system for an advertising agency to dynamically create and manage forms for the IT helpdesk, integrated with a ticketing system.',
    skills: ['JavaScript', 'Tailwind CSS', 'PHP', 'Bootstrap'],
    demoLink: 'https://demo.example.com/form-builder',
    githubLink: 'https://github.com/username/form-builder',
    thumbnail: '/project-thumbs/form-builder.png',
    commits: 127,
    context: 'Internal Tool Development'
  },
  {
    id: 2,
    title: 'Visual Exploration of Interpolation Methods',
    date: '2023-07-28',
    description:
      'This demo explains key concepts behind various interpolation methods, Bézier curves and the De Casteljau algorithm through interactive visualization.',
    skills: ['Bootstrap', 'Three.js', 'JavaScript'],
    isExternal: true,
    demoLink: 'https://demo.example.com/interpolation',
    githubLink: 'https://github.com/username/interpolation-visualizer',
    thumbnail: '/project-thumbs/interpolation.png',
    commits: 89,
    context: 'Educational Visualization'
  },
];

const availableSkills = [
  'JavaScript',
  'Tailwind CSS',
  'PHP',
  'Redaxo',
  'Spring',
  'Java',
  'PostgreSQL',
  'React',
  'TypeScript',
];

const sortOptions = [
  'Project Name (A-Z)',
  'Project Name (Z-A)',
  'Date (Newest)',
  'Date (Oldest)',
];

// Extracted SkillDropdown Component
interface SkillDropdownProps {
  selectedSkills: string[];
  toggleSkill: (skill: string) => void;
  showSkillDropdown: boolean;
  setShowSkillDropdown: (show: boolean) => void;
  skillSearch: string;
  setSkillSearch: (search: string) => void;
  filteredSkills: string[];
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const SkillDropdown: React.FC<SkillDropdownProps> = ({
  selectedSkills,
  toggleSkill,
  showSkillDropdown,
  setShowSkillDropdown,
  skillSearch,
  setSkillSearch,
  filteredSkills,
  dropdownRef,
}) => {
  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setShowSkillDropdown((prev) => !prev)}
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-[#242b3d43] border border-gray-700 rounded-lg text-gray-200 hover:bg-[#2a31424c] transition-colors whitespace-nowrap"
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
            transition={{ duration: 0.4 }}
            className="absolute top-full mt-2 left-0 w-64 bg-[#242b3d77] border border-gray-700 rounded-lg shadow-2xl z-50 backdrop-blur-sm hide-scrollbar "
          >
            <div className="p-[5px] border-b border-gray-700">
              <input
                type="text"
                placeholder="Search skills..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="w-full px-3 py-2 bg-[#1a1f2ed5] border border-gray-700 rounded text-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-600"
              />
            </div>
            <div className="max-h-80 overflow-y-auto">
              {filteredSkills.map((skill, index) => (
                <motion.label
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#04040500] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedSkills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                    className="w-4 h-4 rounded border-gray-600 bg-[#1a1f2ee2] text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span className="text-gray-300">{skill}</span>
                </motion.label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Extracted SortDropdown Component
interface SortDropdownProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
  showSortDropdown: boolean;
  setShowSortDropdown: (show: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortBy,
  setSortBy,
  showSortDropdown,
  setShowSortDropdown,
  dropdownRef,
}) => {
  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setShowSortDropdown((prev) => !prev)}
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 px-4 py-3 bg-[#242b3d0d] border border-gray-700 rounded-lg text-gray-200 hover:bg-[#2a31423d] transition-colors min-w-[200px] justify-between whitespace-nowrap"
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
            className="absolute top-full mt-2 right-0 w-full bg-[#242b3d3b] border border-gray-700 rounded-lg shadow-2xl z-50 backdrop-blur-sm"
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
                className="w-full px-4 py-3 text-left hover:bg-[#2a3142] transition-colors text-gray-300 first:rounded-t-lg last:rounded-b-lg text-sm"
              >
                {option}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Project Card Component with Header-like Animations
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

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
        scale: 1.0,
        y: -2
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-gradient-to-br from-[#0f172a] to-[#1a1f2e] p-0 rounded-xl border border-gray-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group overflow-hidden"
    >
      {/* Animated Gradient Border Effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500/200 via-purple-500/200 to-pink-500/200 rounded-l"
      />
      
      {/* Glow Effect */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: 1
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500/ to-purple-500/1 blur-xl rounded-xl"
      />

      {/* Thumbnail/Preview Area */}
      <div className="relative h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
        {/* Placeholder for thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl opacity-20"
          >
            📊
          </motion.div>
        </div>
        
        {/* Top right action icons with header-like animations */}
        <div className="absolute top-3 right-3 flex gap-2">
          {project.githubLink && (
            <motion.a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all duration-200 group/icon"
              title="View Code"
            >
              <Github className="w-4 h-4 text-white" />
            </motion.a>
          )}
          {project.demoLink && (
            <motion.a 
              href={project.demoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-blue-600/80 backdrop-blur-sm rounded-full hover:bg-blue-500 transition-all duration-200 group/icon"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4 text-white" />
            </motion.a>
          )}
        </div>

        {/* Context Badge */}
        {project.context && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-3 left-3"
          >
            <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-gray-300">
              {project.context}
            </span>
          </motion.div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 relative z-10">
        {/* Header with title and external indicator */}
        <div className="flex items-start justify-between mb-2">
          <motion.h3 
            whileHover={{ x: 2 }}
            className="text-lg font-semibold text-gray-100 flex items-center gap-2"
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
          className="text-gray-400 text-sm mb-3"
        >
          {project.date}
        </motion.p>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 mb-4 leading-relaxed text-sm line-clamp-3"
        >
          {project.description}
        </motion.p>

        {/* Tech Stack Badges with staggered animation */}
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
              className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg text-xs text-gray-300 hover:bg-gray-700/50 transition-colors cursor-default"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* Action Buttons with header-like hover effects */}
        <motion.div 
          className="flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {project.demoLink && (
            <motion.a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors duration-200 group/button shadow-lg hover:shadow-blue-500/20"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </motion.a>
          )}
          {project.githubLink && (
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors duration-200 group/button shadow-lg hover:shadow-gray-500/20"
            >
              <Github className="w-4 h-4" />
              <span>View Code</span>
            </motion.a>
          )}
        </motion.div>

        {/* Activity/Progress Info */}
        {(project.commits || project.context) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-3 pt-3 border-t border-gray-800/50"
          >
            <div className="flex items-center justify-between text-xs text-gray-500">
              {project.context && (
                <motion.span
                  whileHover={{ x: 2 }}
                  className="cursor-default"
                >
                  Built during {project.context}
                </motion.span>
              )}
              {project.commits && (
                <motion.span
                  whileHover={{ x: -2 }}
                  className="cursor-default"
                >
                  {project.commits} commits
                </motion.span>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Active Section Indicator (like header) */}
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

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [skillSearch, setSkillSearch] = useState('');
  const [sortBy, setSortBy] = useState('Project Name (A-Z)');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const skillDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click with pointerdown for better UX
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (
        skillDropdownRef.current &&
        !skillDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSkillDropdown(false);
      }
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
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

  // Filter and Sort Projects with useMemo for performance
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
        default:
          return 0;
      }
    });
  }, [projects, searchTerm, selectedSkills, sortBy]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#1a1f2e0a] text-gray-200 p-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl font-semibold mb-6"
        >
          Projects
        </motion.h1>

        {/* Fixed Control Panel with stable layout */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col lg:flex-row gap-4 mb-8"
        >
          {/* Left: Search Bar - Fixed width that doesn't collapse */}
          <div className="flex-1 lg:flex-none lg:w-80 xl:w-96 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#242b3d39] border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:bg-[#2a3142] text-sm"
            />
          </div>

          {/* Middle: Filters and Skills - Takes remaining space */}
          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-3 min-w-0">
            {/* Filter Controls Row */}
            <div className="flex items-center gap-3 flex-wrap">
              <SkillDropdown
                selectedSkills={selectedSkills}
                toggleSkill={toggleSkill}
                showSkillDropdown={showSkillDropdown}
                setShowSkillDropdown={setShowSkillDropdown}
                skillSearch={skillSearch}
                setSkillSearch={setSkillSearch}
                filteredSkills={filteredSkills}
                dropdownRef={skillDropdownRef}
              />

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
                    className="flex items-center gap-2 px-3 py-[10px] bg-[#242b3d44] border border-gray-700 rounded-lg text-gray-200 hover:bg-[#2a314236] transition-colors whitespace-nowrap text-sm"
                  >
                    <X className="w-4 h-4" />
                    <span>Reset</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Selected Skills Pills - Scrollable container */}
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
                      whileHover={{ scale: 1.0, y: -1 }}
                      className="flex items-center gap-1 px-2 py-1 bg-[#5b6ee1] text-white rounded text-xs font-medium whitespace-nowrap flex-shrink-0"
                    >
                      <span>{skill}</span>
                      <motion.button
                        whileHover={{ scale: 1.0 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => toggleSkill(skill)}
                        className="hover:bg-[#4a5dd0] rounded p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right: Sort Dropdown - Fixed width */}
          <div className="lg:w-48">
            <SortDropdown
              sortBy={sortBy}
              setSortBy={setSortBy}
              showSortDropdown={showSortDropdown}
              setShowSortDropdown={setShowSortDropdown}
              dropdownRef={sortDropdownRef}
            />
          </div>
        </motion.div>

        {/* Enhanced Project Grid */}
        {sortedProjects.length > 0 ? (
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
      </div>
    </motion.div>
  );
}