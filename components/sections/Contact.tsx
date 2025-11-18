'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      icon: Phone,
      label: 'Phone',
      values: ['+91 912 85#5 779', ],
    },
    {
      icon: Mail,
      label: 'Email',
      values: ['Support@uprankly.com'],
    },
    {
      icon: MapPin,
      label: 'Location',
      values: ['New York, USA'],
    }
  ];

  return (
    <div className="min-h-screen px-4 py-12 md:px-8 lg:px-16 xl:px-32">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          Get In Touch
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-300 text-sm md:text-base"
        >
          We&apos;ll create high-quality linkable content and build at least 40 high-authority links to each asset, paving the way for you to grow your rankings, improve brand.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-[380px_1fr] gap-8 max-w-7xl mx-auto">
        {/* Contact Information - Left Side Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative p-8 rounded-md bg-gradient-to-br border-1 border-gray-700 bg-[#1f096f20] to-[#1f096f9f] h-fit overflow-hidden"
        >
          {/* Decorative Circle */}
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br bg-[#766f9091] to-[#1f0c634b] rounded-full translate-x-16 translate-y-16"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-semibold text-white mb-3">Contact Information</h3>
            <p className="text-cyan-50 mb-10 text-sm leading-relaxed">
              We'll create high-quality linkable content and build at least 40 high-authority.
            </p>

            {/* Contact Info Items */}
            <div className="space-y-8">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="mt-1"
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    {item.values.map((value, idx) => (
                      <p key={idx} className="text-white text-sm leading-relaxed">
                        {value}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br border-1 border-gray-700 bg-[#1f096f20] to-[#1f096f9f] p-8 md:p-10 rounded-md shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <label htmlFor="name" className="block text-xs font-medium text-gray-500 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Mr. Rahul"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <label htmlFor="email" className="block text-xs font-medium text-gray-500 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="hello@gmail.com"
                />
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <label htmlFor="subject" className="block text-xs font-medium text-gray-500 mb-2">
                Your Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-0 py-3 bg-transparent border-b-2 border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="I want to hire you quickly"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <label htmlFor="message" className="block text-xs font-medium text-cyan-500 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-0 py-3 bg-transparent border-b-2 border-cyan-500 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-600 transition-colors resize-none"
                placeholder="Write here your message"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-end"
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 px-8 bg-blue-800 hover:bg-cyan-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
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
                  'Send Message'
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;