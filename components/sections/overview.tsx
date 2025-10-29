// @ts-nocheck
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Star, GitFork, Calendar, MapPin, Clock, Users, Folder, ExternalLink } from "lucide-react";

// Typing Animation Component
const TypingAnimation = ({ text, delay = 150, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, delay, text, isComplete, onComplete]);

  return (
    <span>
      {displayText}
      {!isComplete && (
        <span className="animate-pulse ml-1">|</span>
      )}
    </span>
  );
};

export default function Overview() {
  const [mounted, setMounted] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: mounted ? heroRef : undefined,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const [wavePoints, setWavePoints] = useState([]);
  const [lastMouseMove, setLastMouseMove] = useState(0);

  const triggerWave = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const posX = event.clientX - bounds.left;
    const posY = event.clientY - bounds.top;

    const wave = { key: Date.now(), posX, posY };
    setWavePoints((prev) => [...prev, wave]);

    // remove the wave after animation ends
    setTimeout(() => {
      setWavePoints((prev) => prev.filter((w) => w.key !== wave.key));
    }, 1000);
  };

  const handleMouseMove = (event) => {
    const now = Date.now();
    // Throttle mouse move events to every 100ms to avoid too many ripples
    if (now - lastMouseMove > 100) {
      setLastMouseMove(now);
      triggerWave(event);
    }
  };

  // GitHub-style data
  const quickStats = [
    { icon: Users, label: "Followers", value: "120" },
    { icon: Folder, label: "Projects", value: "25" },
    { icon: Star, label: "Stars", value: "80" },
    { icon: Clock, label: "Experience", value: "2+ years" },
    { icon: MapPin, label: "Location", value: "New Delhi, India" },
  ];

  const pinnedProjects = [
    {
      title: "Blood Pressure Estimation App",
      description: "AI-powered mobile app for non-invasive blood pressure estimation using PPG signals.",
      tech: ["Flutter", "TensorFlow", "Dart"],
      link: "https://github.com/anmol-roy/SBP_DBP-prediction-model-with-flutter-application",
      icon: "🩺"
    },
    {
      title: "STEM Education Platform",
      description: "A comprehensive educational platform that makes STEM education engaging and accessible through gamification",
      tech: ["HTML5", "CSS3", "JavaScript","firebase","Phaser.js"],
      link: "https://github.com/anmol-roy/SIH2025",
      icon: "📚"
    },
    {
      title: "AI Resume Analyzer",
      description: "AI-powered resume analyzer providing instant feedback, ATS scores, and job-specific improvement tips for better applications.",
      tech: ["React","TailwindCSS","Puter.js","Pdf.js"],
      link: "https://github.com/anmol-roy/Resume-Analyzer",
      icon: "📋"
    }
  ];

  const currentFocus = [
    "Learning backend development with Node.js and Express.js",
    "Exploring advanced AI/ML techniques and frameworks",
    "Building more full-stack web applications",
    "Contributing to open-source projects"
  ];

  const techStack = [
    { name: "C++", icon: "⚡", category: "language" },
    { name: "Python", icon: "🐍", category: "language" },
    { name: "JavaScript", icon: "🟨", category: "language" },
    { name: "TypeScript", icon: "🔷", category: "language" },
    { name: "HTML", icon: "🌐", category: "frontend" },
    { name: "CSS", icon: "🎨", category: "frontend" },
    { name: "TailwindCSS", icon: "💨", category: "frontend" },
    { name: "React", icon: "⚛️", category: "frontend" },
    { name: "Next.js", icon: "▲", category: "frontend" },
    { name: "Node.js", icon: "🟢", category: "backend" },
    { name: "Express.js", icon: "🚂", category: "backend" },
    { name: "MongoDB", icon: "🍃", category: "backend" },
    { name: "MySQL", icon: "🐬", category: "backend" },
    { name: "Django", icon: "🐍", category: "backend" },
    { name: "AWS", icon: "☁️", category: "tools" },
    { name: "Three.js", icon: "✨", category: "frontend" },
    { name: "Git", icon: "📚", category: "tools" },
    { name: "GitHub", icon: "🐙", category: "tools" },
    { name: "Figma", icon: "🎨", category: "tools" }
  ];

  const activities = [
    { date: "Oct 2025", description: "Started working on Voice Assistant using Transformers" },
    { date: "Sept 2025", description: "Completed Generative AI mini-project" },
    { date: "Aug 2025", description: "Deployed Blood Pressure Estimation App" }
  ];

  const achievements = [
    { icon: "🏆", title: "Built & published 3 apps", year: "2025" },
    { icon: "🌐", title: "Completed 45-Day Vocational AI/ML Training", year: "2025" },
    { icon: "🎓", title: "Presented ML Project at IIIT", year: "2024" }
  ];

  // Show typing animation until both mounted AND typing is complete
  if (!mounted || !typingComplete) {
    return (
      <section ref={heroRef} className="relative flex min-h-screen flex-2 items-center justify-center px-10 py-20">
        <div className="container mx-auto flex max-w-4xl flex-col items-baseline justify-center gap-4 md:flex-row md:gap-16">
          <div className="flex flex-col items-baseline text-center md:items-start md:text-left">
            <h1 className="mb-0 text-4xl font-bold md:text-5xl lg:text-6xl text-white">
              <span className="block">Hi, I&apos;m</span>
              <span className="bg-gradient-to-r from-[#60a5fa] via-[#a78bfa] to-[#60a5fa] bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text">
                <TypingAnimation
                  text="Anmol Roy"
                  delay={150}
                  onComplete={handleTypingComplete}
                />
              </span>
            </h1>
            <p className="text-xl text-gray-300 mt-4">

            </p>
          </div>
        </div>
        <div className="container mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
          <div className="flex flex-col items-baseline text-center md:items-start md:text-left">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl text-white">
              {/* <span className="block">Hi, I&apos;m</span> */}
              <span className="bg-gradient-to-r from-[#60a5fa] via-[#a78bfa] to-[#60a5fa] bg-[length:200%_auto] animate-gradient text-transparent bg-clip-text">
                {/* <TypingAnimation 
                  text="" 
                  delay={1000} 
                  onComplete={handleTypingComplete}
                /> */}
              </span>
            </h1>
            <p className="text-xl text-gray-300 mt-4">

            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative flex  h-[540px] flex-col  border-amber-400 items-center justify-center px-0 py-20"
      >
        <div className="container mx-5 flex max-w-5xl  border-amber-400 flex-col items-center justify-center gap-12 md:flex-row md:gap-16">
          <motion.div
            className="flex flex-col items-center text-center md:items-start md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl text-white"
            >
              <span className="block text-gray-300">Hi, I&apos;m</span>
              <motion.span
                className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% center", "100% center"] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                style={{ backgroundSize: "200% auto" }}
              >
                Anmol Roy
              </motion.span>
            </motion.h1>

            <motion.p
              className="mb-8 max-w-lg text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              AI & ML Developer passionate about creating intelligent mobile and web experiences.
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Projects
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              onClick={triggerWave}
              onWheel={triggerWave}
              onTouchMove={triggerWave}
              onMouseDown={triggerWave}
              onMouseMove={handleMouseMove}
              className="relative h-72 w-72 md:h-96 md:w-96 overflow-hidden rounded-md border border-gray-700 bg-[#131337d8] grayscale hover:grayscale-0 cursor-pointer"
            >
              <Image
                src="/images/githubdp.jpg"
                alt="Anmol Roy"
                fill
                className="object-cover transition duration-300"
                priority
              />

              {/* Ripple Layer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {wavePoints.map((wave) => (
                  <motion.span
                    key={wave.key}
                    initial={{ scale: 0, opacity: 0.6 }}
                    animate={{ scale: 8, opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                      top: wave.posY,
                      left: wave.posX,
                      transform: "translate(-50%, -50%)",
                    }}
                    className="absolute w-4 h-4 rounded-full bg-white/40 pointer-events-none"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="h-8 w-8 text-gray-400" />
        </motion.div>
      </motion.section>

      {/* Content Sections */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
        </motion.section>

        {/* Pinned Projects */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pinnedProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="border border-gray-700 rounded-md p-4 bg-[#131337d8] hover:border-gray-500 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{project.icon}</span>
                  <h3 className="font-semibold text-white text-lg">
                    {project.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                target="_blank" rel="noopener noreferrer"
                  href={project.link}
                  className="text-blue-400 text-sm hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                >
                  View Details
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Current Focus */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Current Focus</h2>
          <div className="border border-gray-700 rounded-md p-6 bg-[#131337d8]">
            <ul className="text-gray-300 space-y-3">
              {currentFocus.map((focus, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-green-400 mt-1">•</span>
                  <span>{focus}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Skills</h2>
          <div className="border border-gray-700 rounded-md p-6 bg-[#131337d8]">
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="px-4 py-2 bg-[#21215ad8] rounded-md text-white border border-gray-600 flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  viewport={{ once: true }}
                >
                  <span>{tech.icon}</span>
                  <span className="font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="border border-gray-700 rounded-md p-6 bg-[#131337d8]">
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 py-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-gray-300">{activity.description}</p>
                    <p className="text-gray-500 text-sm">{activity.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Achievements</h2>
          <div className="border border-gray-700 rounded-md p-6 bg-[#131337d8]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="text-center p-4 border border-gray-600 rounded-md bg-[#21215ad8]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h3 className="text-white font-medium mb-1">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm">{achievement.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}