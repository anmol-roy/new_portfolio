'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, ExternalLink } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@anmolroy.com',
      href: 'mailto:hello@anmolroy.com',
      color: 'hover:bg-red-500/20'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      color: 'hover:bg-green-500/20'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9876543210',
      href: 'tel:+919876543210',
      color: 'hover:bg-blue-500/20'
    }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/anmol-roy',
      icon: Github,
      color: 'hover:bg-gray-500/20',
      description: 'Check out my projects'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/anmol-roy',
      icon: Linkedin,
      color: 'hover:bg-blue-600/20',
      description: 'Connect professionally'
    },
    {
      name: 'Email',
      url: 'mailto:hello@anmolroy.com',
      icon: Mail,
      color: 'hover:bg-red-500/20',
      description: 'Send me a message'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Let&apos;s create something amazing together. I&apos;m always open to discussing new projects, 
            creative ideas, or opportunities to be part of your vision.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 transition-all duration-300 ${item.color}`}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-3 bg-gray-700/50 rounded-xl"
                    >
                      <item.icon className="w-6 h-6 text-blue-400" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-300 text-sm">{item.label}</h3>
                      {item.href ? (
                        <motion.a
                          href={item.href}
                          whileHover={{ x: 5 }}
                          className="text-white text-lg font-medium hover:text-blue-400 transition-colors"
                        >
                          {item.value}
                        </motion.a>
                      ) : (
                        <p className="text-white text-lg font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-6">Let&apos;s Connect</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 text-center group ${social.color} transition-all duration-300`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <social.icon className="w-6 h-6 text-white" />
                      <div>
                        <div className="font-semibold text-white text-sm">{social.name}</div>
                        <div className="text-gray-400 text-xs mt-1">{social.description}</div>
                      </div>
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability Status */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <div>
                  <h4 className="font-semibold text-white">Currently Available</h4>
                  <p className="text-green-300 text-sm">Open for new projects and opportunities</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <motion.form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 space-y-6"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
              <p className="text-gray-400 mb-6">I&apos;ll get back to you as soon as possible.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-700/70 transition-colors"
                    placeholder="Enter your name"
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-700/70 transition-colors"
                    placeholder="your@email.com"
                  />
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-700/70 transition-colors"
                  placeholder="What's this about?"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-gray-700/70 transition-colors resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>

        {/* Quick Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50"
        >
          <p className="text-gray-300 text-lg">
            Prefer a quick chat?{' '}
            <motion.a
              href="mailto:hello@anmolroy.com"
              whileHover={{ scale: 1.05 }}
              className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
            >
              Drop me an email <ExternalLink className="w-4 h-4" />
            </motion.a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;