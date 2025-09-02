'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, MapPin, ChevronRight, ExternalLink, ArrowDown, Users, Sparkles, GraduationCap, Award } from 'lucide-react';
import { IMAGES } from '@/constants/image';

export default function About() {
  // State for tab selection in stats section
  const [activeTab, setActiveTab] = useState('students');
  
  const team = [
    {
      name: "Nitin Gupta",
      role: "UI/UX Designer & Frontend Developer",
      image: "https://avatars.githubusercontent.com/u/140688515?s=400&u=2c964b96bb84104da1515a863e6425e70063d854&v=4",
      github: "https://github.com/nitin14gupta",
      bio: "Passionate about creating beautiful and intuitive user experiences. Specializes in modern web design and frontend development."
    },
    {
      name: "Fareed Sayyed", 
      role: "ML and Backend Developer",
      image: IMAGES.FAREED,
      github: "https://github.com/Fareed95",
      bio: "Expert in machine learning and backend development. Focuses on building scalable and efficient AI solutions."
    },
    {
      name: "Rehbar Khan",
      role: "Frontend Developer", 
      image: "https://avatars.githubusercontent.com/u/136853370?v=4",
      github: "https://github.com/thisisarsh1",
      bio: "Skilled in modern frontend technologies and responsive design. Creates engaging and performant web applications."
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "Pushing boundaries in AI education through cutting-edge technology and methodologies.",
      icon: "🚀",
      color: "from-ai-blue-500/20 to-ai-purple-500/20"
    },
    {
      title: "Excellence",
      description: "Committed to delivering the highest quality learning experiences and outcomes.",
      icon: "⭐",
      color: "from-ai-yellow-500/20 to-ai-orange-500/20"
    },
    {
      title: "Accessibility",
      description: "Making quality education accessible to everyone, regardless of background.",
      icon: "🌍",
      color: "from-ai-teal-500/20 to-ai-green-500/20"
    },
    {
      title: "Community",
      description: "Building a supportive learning community where everyone can thrive.",
      icon: "🤝",
      color: "from-ai-purple-500/20 to-ai-pink-500/20"
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "Platform Launch",
      description: "Successfully launched Ape.AI with initial course offerings.",
      icon: <Sparkles className="w-6 h-6 text-ai-blue-400" />
    },
    {
      year: "2025",
      title: "Expansion",
      description: "Expanded course catalog and reached 10,000+ active learners.",
      icon: <Users className="w-6 h-6 text-ai-teal-400" />
    },
    {
      year: "2025",
      title: "Innovation",
      description: "Introduced AI-powered learning paths and personalized recommendations.",
      icon: <GraduationCap className="w-6 h-6 text-ai-purple-400" />
    },
    {
      year: "2026",
      title: "Global Recognition",
      description: "Recognized as a leading platform for AI education worldwide.",
      icon: <Award className="w-6 h-6 text-ai-yellow-400" />
    }
  ];

  // Stats for the interactive stats section
  const stats = {
    students: { count: "50,000+", label: "Active Students" },
    courses: { count: "120+", label: "AI Courses" },
    countries: { count: "75+", label: "Countries" },
    rating: { count: "4.8/5", label: "Average Rating" }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Particle effect for hero section
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 20 + 10
  }));

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-ai-blue-900/5 to-black -z-10" />
      <div className="fixed inset-0 bg-grid-small-white/[0.05] -z-10" />
      <div className="fixed inset-0 bg-dot-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] -z-10" />
      
      {/* Animated gradient blobs with enhanced blur and opacity */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="fixed top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-ai-blue-500/10 blur-[180px] -z-5"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.12, 0.18, 0.12],
          scale: [1, 1.1, 1],
          rotate: [0, -15, 0]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="fixed bottom-0 right-1/4 transform translate-x-1/2 w-[600px] h-[600px] rounded-full bg-ai-teal-500/8 blur-[160px] -z-5"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.08, 0.15, 0.08],
          scale: [1, 1.1, 1],
          rotate: [0, 20, 0]
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="fixed top-3/4 right-1/3 transform translate-x-1/2 w-[500px] h-[500px] rounded-full bg-ai-purple-500/8 blur-[150px] -z-5"
      />

      {/* Hero Section with enhanced typography and spacing */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex items-center pt-24 lg:pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="max-w-8xl mx-auto z-10">
          {/* Enhanced floating particles with better visibility */}
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`
              }}
              animate={{
                x: [
                  Math.random() * 120 - 60,
                  Math.random() * 120 - 60,
                  Math.random() * 120 - 60
                ],
                y: [
                  Math.random() * 120 - 60,
                  Math.random() * 120 - 60,
                  Math.random() * 120 - 60
                ],
                opacity: [0.3, 0.9, 0.3]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm md:text-base text-white mb-8 border border-white/20 shadow-lg shadow-white/5">
                <span className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-ai-teal-400 mr-2.5 animate-pulse"></span>
                  <span className="font-medium tracking-wide">Transforming AI Education</span>
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 font-heading tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                  About
                </span>{" "}
                <span className="relative inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-ai-blue-400 to-ai-teal-400">
                    Ape.AI
                  </span>
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-ai-blue-500 to-ai-teal-500 rounded-full" 
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-neutral-300 max-w-2xl leading-relaxed mb-10 font-sans">
                Empowering learners worldwide through innovative AI-driven education solutions. 
                Transform your learning journey with personalized paths and expert guidance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 mb-14">
                <motion.a
                  href="#mission"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-ai-blue-500 to-ai-teal-500 text-white text-lg font-medium flex items-center justify-center transition-all duration-300 shadow-lg shadow-ai-blue-900/30 hover:shadow-ai-blue-900/50"
                >
                  Our Mission
                  <ChevronRight className="w-5 h-5 ml-2" />
                </motion.a>
                
                <motion.a
                  href="#team"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white text-lg font-medium flex items-center justify-center hover:bg-white/10 transition-all duration-300 shadow-lg shadow-black/20"
                >
                  Meet The Team
                </motion.a>
              </div>
              
              {/* Enhanced Interactive Stats Section */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
                <div className="flex flex-wrap gap-3 mb-6">
                  {Object.keys(stats).map((statKey) => (
                    <button
                      key={statKey}
                      onClick={() => setActiveTab(statKey)}
                      className={`px-4 py-2 rounded-lg text-base transition-all duration-300 ${
                        activeTab === statKey 
                          ? 'bg-gradient-to-r from-ai-blue-500/40 to-ai-teal-500/40 text-white font-medium shadow-lg' 
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {statKey.charAt(0).toUpperCase() + statKey.slice(1)}
                    </button>
                  ))}
                </div>
                
                <motion.div
                  key={activeTab}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center p-4"
                >
                  <span className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ai-blue-400 to-ai-teal-400 mb-2">
                    {stats[activeTab].count}
                  </span>
                  <span className="text-neutral-300 text-lg">
                    {stats[activeTab].label}
                  </span>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              {/* Enhanced 3D Interactive Element */}
              <div className="relative aspect-square max-w-2xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-ai-blue-500/30 to-ai-teal-500/30 rounded-3xl blur-xl" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-80 h-80">
                    {/* Enhanced orbiting elements */}
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg"
                        style={{
                          left: "calc(50% - 32px)",
                          top: "calc(50% - 32px)",
                        }}
                        animate={{
                          x: [
                            Math.cos((i * Math.PI) / 2) * 120,
                            Math.cos((i * Math.PI) / 2 + Math.PI / 4) * 120,
                            Math.cos((i * Math.PI) / 2 + Math.PI / 2) * 120,
                            Math.cos((i * Math.PI) / 2 + (3 * Math.PI) / 4) * 120,
                            Math.cos((i * Math.PI) / 2 + Math.PI) * 120,
                            Math.cos((i * Math.PI) / 2 + (5 * Math.PI) / 4) * 120,
                            Math.cos((i * Math.PI) / 2 + (3 * Math.PI) / 2) * 120,
                            Math.cos((i * Math.PI) / 2 + (7 * Math.PI) / 4) * 120,
                            Math.cos((i * Math.PI) / 2 + 2 * Math.PI) * 120,
                          ],
                          y: [
                            Math.sin((i * Math.PI) / 2) * 120,
                            Math.sin((i * Math.PI) / 2 + Math.PI / 4) * 120,
                            Math.sin((i * Math.PI) / 2 + Math.PI / 2) * 120,
                            Math.sin((i * Math.PI) / 2 + (3 * Math.PI) / 4) * 120,
                            Math.sin((i * Math.PI) / 2 + Math.PI) * 120,
                            Math.sin((i * Math.PI) / 2 + (5 * Math.PI) / 4) * 120,
                            Math.sin((i * Math.PI) / 2 + (3 * Math.PI) / 2) * 120,
                            Math.sin((i * Math.PI) / 2 + (7 * Math.PI) / 4) * 120,
                            Math.sin((i * Math.PI) / 2 + 2 * Math.PI) * 120,
                          ],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        {i === 1 && <GraduationCap className="w-8 h-8 text-ai-blue-400" />}
                        {i === 2 && <Users className="w-8 h-8 text-ai-teal-400" />}
                        {i === 3 && <Sparkles className="w-8 h-8 text-ai-purple-400" />}
                        {i === 4 && <Award className="w-8 h-8 text-ai-yellow-400" />}
                      </motion.div>
                    ))}
                    
                    {/* Enhanced center element */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-2xl bg-gradient-to-r from-ai-blue-500/40 to-ai-teal-500/40 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-2xl"
                      animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Image
                        src={IMAGES.LOGO}
                        alt="Ape.AI Logo"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Enhanced scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-neutral-400 text-base mb-3 tracking-wide">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown className="w-6 h-6 text-ai-blue-400" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8"
        id="mission"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={itemVariants}
            className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 sm:p-12 border border-white/10 overflow-hidden"
          >
            {/* Ambient glow effects */}
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-ai-blue-500/10 rounded-full blur-[100px]" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-ai-teal-500/10 rounded-full blur-[100px]" />
            
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-r from-ai-blue-500/[0.05] to-ai-teal-500/[0.05]" />
            
            <div className="relative">
              <div className="flex items-center mb-8">
                <div className="mr-4 p-3 rounded-full bg-gradient-to-r from-ai-blue-500/20 to-ai-teal-500/20 backdrop-blur-md">
                  <Sparkles className="w-6 h-6 text-ai-blue-400" />
                </div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ai-blue-500 to-ai-teal-500">
                  Our Mission
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg text-neutral-300 leading-relaxed mb-6 font-sans">
                    At Ape.AI, we're on a mission to revolutionize education through artificial intelligence. 
                    We believe that everyone deserves access to high-quality education, and we're making that 
                    possible by leveraging cutting-edge AI technology to create personalized learning experiences 
                    that adapt to each student's needs and pace.
                  </p>
                  
                  <p className="text-lg text-neutral-300 leading-relaxed font-sans">
                    Our platform combines the expertise of top educators with the power of AI to deliver 
                    comprehensive courses that are both engaging and effective. Through continuous innovation 
                    and a commitment to excellence, we're building the future of education.
                  </p>
                </div>
                
                <div className="relative">
                  {/* 3D floating blocks */}
                  <div className="relative h-64 w-full">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        className={`absolute rounded-xl backdrop-blur-md border border-white/10 shadow-lg flex items-center p-4 ${
                          i % 2 === 0 
                            ? 'bg-gradient-to-r from-ai-blue-500/10 to-ai-blue-500/5' 
                            : 'bg-gradient-to-r from-ai-teal-500/10 to-ai-teal-500/5'
                        }`}
                        style={{
                          width: `${100 - i * 10}%`,
                          height: `${50 - i * 4}px`,
                          left: `${i * 5}%`,
                          top: `${i * 40}px`,
                          zIndex: 5 - i,
                        }}
                        animate={{
                          y: [0, 10, 0],
                          rotate: [0, i % 2 === 0 ? 1 : -1, 0],
                        }}
                        transition={{
                          duration: 4 + i,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: i * 0.2,
                        }}
                      >
                        <motion.div 
                          className="absolute inset-0 opacity-0 bg-gradient-to-r from-white/5 to-transparent"
                          animate={{ opacity: [0, 0.5, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: i * 0.3,
                          }}
                        />
                        
                        <div className="flex items-center gap-3">
                          {i === 1 && (
                            <>
                              <GraduationCap className="w-5 h-5 text-ai-blue-400" />
                              <span className="text-white font-medium">Personalized Learning</span>
                            </>
                          )}
                          {i === 2 && (
                            <>
                              <Users className="w-5 h-5 text-ai-teal-400" />
                              <span className="text-white font-medium">Expert Guidance</span>
                            </>
                          )}
                          {i === 3 && (
                            <>
                              <Award className="w-5 h-5 text-ai-yellow-400" />
                              <span className="text-white font-medium">Quality Content</span>
                            </>
                          )}
                          {i === 4 && (
                            <>
                              <Sparkles className="w-5 h-5 text-ai-purple-400" />
                              <span className="text-white font-medium">Innovative Approach</span>
                            </>
                          )}
                          {i === 5 && (
                            <>
                              <Mail className="w-5 h-5 text-ai-pink-400" />
                              <span className="text-white font-medium">Global Accessibility</span>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-sm text-white mb-6 border border-white/10">
              <span className="w-2 h-2 bg-ai-teal-400 rounded-full mr-2"></span>
              <span className="font-sans">What Drives Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-ai-blue-500 to-ai-teal-500 font-heading">
              Our Core Values
            </h2>
            <p className="text-lg text-neutral-300 font-sans">
              These principles guide everything we do, from product development to community engagement.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group h-full"
              >
                {/* 3D card effect with gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 blur-xl`} />
                
                <div className="relative h-full flex flex-col bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/10 group-hover:border-white/20 transition-colors duration-300">
                  {/* Icon container with floating animation */}
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl mb-6 border border-white/10 relative"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    {/* Floating particles around icon */}
                    <motion.div 
                      className="absolute w-2 h-2 rounded-full bg-white/30"
                      animate={{
                        x: [0, 10, -10, 0],
                        y: [0, -10, 10, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                      style={{ left: "50%", top: "20%" }}
                    />
                    
                    <motion.div 
                      className="absolute w-1 h-1 rounded-full bg-white/50"
                      animate={{
                        x: [0, -10, 10, 0],
                        y: [0, 10, -10, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                      style={{ right: "30%", bottom: "30%" }}
                    />
                    
                    {value.icon}
                    
                    {/* Shine effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 5,
                      }}
                    />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-ai-blue-300 transition-colors duration-300 font-heading">
                    {value.title}
                  </h3>
                  
                  <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 font-sans">
                    {value.description}
                  </p>
                  
                  {/* Learn more button that appears on hover */}
                  <div className="mt-6 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="text-ai-blue-400 hover:text-ai-blue-300 text-sm flex items-center transition-colors font-sans">
                      Learn more
                      <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8"
        id="team"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-sm text-white mb-6 border border-white/10">
              <span className="w-2 h-2 bg-ai-purple-400 rounded-full mr-2"></span>
              <span className="font-sans">Our Team</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-ai-blue-500 to-ai-purple-500 font-heading">
              Meet The Minds Behind Ape.AI
            </h2>
            <p className="text-lg text-neutral-300 font-sans">
              Passionate experts dedicated to revolutionizing AI education and empowering learners worldwide.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="relative group"
              >
                {/* Ambient glow effect */}
                <div className="absolute inset-x-0 -top-10 h-40 bg-gradient-to-r from-ai-blue-500/5 via-ai-purple-500/5 to-ai-teal-500/5 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500 transform group-hover:translate-y-[-8px]">
                  {/* Curved header background */}
                  <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-r from-ai-blue-500/20 via-ai-purple-500/20 to-ai-teal-500/20" />
                  
                  <div className="relative pt-12 px-6 pb-6">
                    {/* Team member image */}
                    <div className="relative flex justify-center">
                      <div className="absolute -top-2 w-28 h-28 bg-gradient-to-r from-ai-blue-500/30 to-ai-teal-500/30 rounded-full blur-xl opacity-60" />
                      <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-black/30 ring-offset-4 ring-offset-black/50 group-hover:ring-ai-blue-500/30 transition-all duration-300">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 96px, 96px"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-ai-blue-300 transition-colors duration-300 font-heading">
                        {member.name}
                      </h3>
                      <p className="text-ai-teal-400 mb-4">{member.role}</p>
                      
                      <div className="h-[2px] w-16 bg-gradient-to-r from-transparent via-ai-blue-500/50 to-transparent mx-auto mb-4"></div>
                      
                      <p className="text-neutral-400 mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-500 font-sans">
                        {member.bio}
                      </p>
                      
                      <div className="flex justify-center space-x-4">
                        <motion.a 
                          whileHover={{ y: -3, scale: 1.1 }}
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors group/icon"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-ai-blue-500/40 to-ai-purple-500/40 rounded-full opacity-0 group-hover/icon:opacity-100 blur-md transition-opacity" />
                          <Github className="w-5 h-5 text-neutral-300 group-hover/icon:text-white relative z-10" />
                        </motion.a>
                        
                        <motion.a 
                          whileHover={{ y: -3, scale: 1.1 }}
                          href="#"
                          className="relative p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors group/icon"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-ai-blue-500/40 to-ai-purple-500/40 rounded-full opacity-0 group-hover/icon:opacity-100 blur-md transition-opacity" />
                          <Linkedin className="w-5 h-5 text-neutral-300 group-hover/icon:text-white relative z-10" />
                        </motion.a>
                        
                        <motion.a 
                          whileHover={{ y: -3, scale: 1.1 }}
                          href="#"
                          className="relative p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors group/icon"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-ai-blue-500/40 to-ai-purple-500/40 rounded-full opacity-0 group-hover/icon:opacity-100 blur-md transition-opacity" />
                          <Twitter className="w-5 h-5 text-neutral-300 group-hover/icon:text-white relative z-10" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Milestones Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-sm text-white mb-6 border border-white/10">
              <span className="w-2 h-2 bg-ai-yellow-400 rounded-full mr-2"></span>
              Our Progress
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-ai-blue-500 to-ai-yellow-500">
              Milestones on Our Journey
            </h2>
            <p className="text-lg text-neutral-300">
              From launch to global recognition, follow our path of innovation and growth.
            </p>
          </motion.div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Glowing timeline track */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-ai-blue-500/50 via-ai-teal-500/50 to-ai-purple-500/50 rounded-full blur-[1px]" />
            
            {/* Solid timeline track */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-ai-blue-500/80 via-ai-teal-500/80 to-ai-purple-500/80" />
            
            {/* Milestones */}
            <div className="relative space-y-20">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.7,
                        delay: index * 0.2 
                      }
                    }
                  }}
                  className={`relative flex flex-col ${
                    index % 2 === 0 
                      ? 'md:flex-row items-center' 
                      : 'md:flex-row-reverse items-center'
                  }`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div 
                      className="relative w-10 h-10 rounded-full bg-black border-2 border-ai-blue-500 flex items-center justify-center"
                      whileHover={{ scale: 1.2 }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-ai-blue-500/30 to-ai-teal-500/30 animate-pulse" />
                      {milestone.icon}
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-[calc(50%-3rem)] ${
                    index % 2 === 0 
                      ? 'md:pr-16 text-right' 
                      : 'md:pl-16 text-left'
                  } mb-10 md:mb-0`}>
                    <motion.div 
                      className="relative bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors"
                      whileHover={{ 
                        y: -5,
                        boxShadow: "0 10px 30px -10px rgba(2, 132, 199, 0.2)" 
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-ai-blue-500/[0.03] to-ai-teal-500/[0.03] rounded-xl" />
                      
                      <div className="relative">
                        <div className="px-3 py-1 rounded-full bg-white/10 inline-block text-ai-blue-400 font-semibold mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{milestone.title}</h3>
                        <p className="text-neutral-400">{milestone.description}</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Spacer for the right/left side */}
                  <div className="w-full md:w-[calc(50%-3rem)]"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 mb-20"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={itemVariants}
            className="relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10"
          >
            {/* Background patterns and effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
            <div className="absolute inset-0 bg-gradient-to-br from-ai-blue-900/20 via-transparent to-ai-teal-900/20" />
            
            {/* Floating orbs */}
            <motion.div
              className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-r from-ai-blue-500/10 to-ai-blue-500/5 blur-2xl"
              animate={{
                y: [0, 15, 0],
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-gradient-to-r from-ai-teal-500/10 to-ai-teal-500/5 blur-2xl"
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <div className="relative p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <div className="flex items-center mb-8">
                    <div className="mr-4 p-3 rounded-full bg-gradient-to-r from-ai-blue-500/20 to-ai-teal-500/20 backdrop-blur-md">
                      <Mail className="w-6 h-6 text-ai-blue-400" />
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-ai-blue-500 to-ai-teal-500">
                      Get in Touch
                    </h2>
                  </div>
                  
                  <p className="text-lg text-neutral-300 mb-10 max-w-lg">
                    Have questions or feedback? We'd love to hear from you. Reach out to our team using any of the methods below.
                  </p>
                  
                  <div className="space-y-6">
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors border border-white/10 group-hover:border-white/20">
                        <Mail className="w-6 h-6 text-ai-teal-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">Email Us</h3>
                        <a href="mailto:contact@Ape.ai" className="text-neutral-400 group-hover:text-ai-blue-400 transition-colors">
                          contact@Ape.ai
                        </a>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors border border-white/10 group-hover:border-white/20">
                        <MapPin className="w-6 h-6 text-ai-teal-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">Location</h3>
                        <span className="text-neutral-400 group-hover:text-white transition-colors">
                          Mumbai, India
                        </span>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="mt-12">
                    <h3 className="text-white font-medium mb-4">Connect with us</h3>
                    <div className="flex items-center gap-4">
                      <motion.a 
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href="#" 
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-ai-blue-500/40 to-ai-teal-500/40 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
                        <div className="relative p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 group-hover:border-white/20 transition-all duration-300">
                          <Github className="w-6 h-6 text-neutral-300 group-hover:text-white" />
                        </div>
                      </motion.a>
                      
                      <motion.a 
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href="#" 
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-ai-blue-500/40 to-ai-teal-500/40 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
                        <div className="relative p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 group-hover:border-white/20 transition-all duration-300">
                          <Twitter className="w-6 h-6 text-neutral-300 group-hover:text-white" />
                        </div>
                      </motion.a>
                      
                      <motion.a 
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        href="#" 
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-ai-blue-500/40 to-ai-teal-500/40 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
                        <div className="relative p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 group-hover:border-white/20 transition-all duration-300">
                          <Linkedin className="w-6 h-6 text-neutral-300 group-hover:text-white" />
                        </div>
                      </motion.a>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.7 }
                    }
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 -m-2 bg-gradient-to-r from-ai-blue-500/20 to-ai-teal-500/20 rounded-xl blur-xl opacity-70" />
                  
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-medium text-white mb-6">Send us a message</h3>
                    
                    <form className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-ai-blue-500/50 focus:border-transparent transition-all"
                          placeholder="Enter your name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-ai-blue-500/50 focus:border-transparent transition-all"
                          placeholder="you@example.com"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-ai-blue-500/50 focus:border-transparent transition-all resize-none"
                          placeholder="Your message..."
                        />
                      </div>
                      
                      <motion.button
                        whileHover={{ 
                          scale: 1.03,
                          boxShadow: "0 10px 30px -10px rgba(2, 132, 199, 0.5)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-ai-blue-500 to-ai-teal-500 text-white font-medium flex items-center justify-center hover:from-ai-blue-600 hover:to-ai-teal-600 transition-all duration-300"
                      >
                        Send Message
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
} 