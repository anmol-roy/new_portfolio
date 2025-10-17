// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Star, GitFork, Calendar, MapPin, Clock, Users, Folder } from "lucide-react";

export default function Overview() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: mounted ? heroRef : undefined,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
      title: "Heart Rate Detector",
      description: "PPG-based React Native app for heart rate analysis",
      tech: ["React Native", "TensorFlow", "Expo"],
      link: "#projects"
    },
    {
      title: "Blood Pressure Estimator", 
      description: "ML model for non-invasive BP estimation from facial videos",
      tech: ["Python", "OpenCV", "TensorFlow"],
      link: "#projects"
    },
    {
      title: "Voice Assistant",
      description: "AI-powered assistant using transformer models",
      tech: ["Python", "Transformers", "FastAPI"],
      link: "#projects"
    }
  ];

  const currentFocus = [
    "Building a hybrid CNN-BiLSTM model for Blood Pressure Estimation",
    "Exploring Generative AI (LLMs & Transformers)",
    "Improving UI/UX in my React Native apps"
  ];

  const techStack = [
    { name: "Python", icon: "🐍" },
    { name: "React Native", icon: "⚛️" },
    { name: "TensorFlow", icon: "🧠" },
    { name: "Pandas", icon: "🐼" },
    { name: "TailwindCSS", icon: "🎨" },
    { name: "Node.js", icon: "🟢" }
  ];

  const activities = [
    { date: "Oct 2025", description: "Started working on Voice Assistant using Transformers" },
    { date: "Sept 2025", description: "Completed Generative AI mini-project" },
    { date: "Aug 2025", description: "Deployed Blood Pressure Estimation App" }
  ];

  const achievements = [
    { icon: "🏆", title: "Built & published 3 AI-based apps", year: "2025" },
    { icon: "🌐", title: "Completed 45-Day Vocational AI/ML Training", year: "2025" },
    { icon: "🎓", title: "Presented ML Project at IIIT", year: "2024" }
  ];

  if (!mounted) {
    return (
      <section ref={heroRef} className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 md:py-32">
        <div className="container mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
              <span className="block">Hi, I&apos;m</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Anmol Roy
              </span>
            </h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 md:py-32"
        style={{ opacity }}
      >
        {/* <div className="container mx-auto flex max-w-5xl flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
          <motion.div
            className="flex flex-col items-center text-center md:items-start md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-white">
              <span className="block">Hi, I&apos;m</span>
              <motion.span
                className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% center", "100% center"] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                style={{ backgroundSize: "200% auto" }}
              >
                Anmol Roy
              </motion.span>
            </h1>

            <motion.p
              className="mb-6 max-w-md text-lg text-blue-100"
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
                className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-xl transition-all duration-300 border border-blue-400/30 shadow-lg shadow-blue-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
            <div className="relative h-64 w-64 overflow-hidden border border-white/20 bg-white/10 shadow-xl backdrop-blur-md md:h-80 md:w-80 rounded-lg">
              <Image
                src="/profile.jpg?height=320&width=320"
                alt="Anmol Roy"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                priority
              />
            </div>
          </motion.div>
        </div> */}

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="h-8 w-8 text-white" />
        </motion.div>
      </motion.section>

      {/* GitHub-Style Overview Sections */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">
        {/* About Me Summary */}
        {/* <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">About Me</h2>
          <div className="text-gray-300 space-y-4 text-lg">
            <p>👋 Hey, I'm <strong>Anmol Roy</strong> — an AI & ML Developer passionate about creating intelligent mobile and web applications.</p>
            <p>I love combining <strong>data science</strong> and <strong>React Native</strong> to turn innovative ideas into real-world solutions.</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>🧠 Currently exploring <strong>Generative AI & Signal Processing</strong> for health-tech projects.</span>
            </p>
          </div>
        </motion.section> */}

        {/* Quick Stats */}
        {/* <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {quickStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                whileHover={{ scale: 1.05 }}
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
        </motion.section> */}

        {/* Pinned Projects Preview */}
        {/* <motion.section
          id="projects"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Pinned Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pinnedProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="border border-gray-700 rounded-lg p-4 hover:border-gray-500 transition-all duration-300 cursor-pointer group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
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
                  href={project.link}
                  className="text-blue-400 text-sm hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                >
                  See full project →
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section> */}

        {/* Current Focus */}
        {/* <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">🧠 Current Focus</h2>
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
        </motion.section> */}

        {/* Tech Stack Snapshot */}
        {/* <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">🧰 Tech I Use</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech.name}
                className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 border border-gray-700 hover:border-gray-500 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span>{tech.icon}</span>
                <span>{tech.name}</span>
              </motion.span>
            ))}
          </div>
        </motion.section> */}

        {/* Recent Activity */}
        {/* <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Recent Activity</h2>
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
        </motion.section> */}

        {/* Achievements */}
        {/* <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="text-center p-4 border border-gray-700 rounded-lg hover:border-gray-500 transition-colors"
                whileHover={{ y: -2 }}
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
        </motion.section> */}
      </div>
    </div>
  );
}