"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useUserContext } from './context/Userinfo';
import Navbar from "@/components/Navbar";
// Hero section with 3D mesh animation
const HeroSection = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-ai-blue-900/30 z-0" />
      <div className="absolute inset-0 bg-grid-small-white/[0.2] z-0" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 rounded-full bg-ai-teal-500/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Animated spotlight effect */}
      <div className="absolute -left-20 -top-20 z-0">
        <div className="relative w-[600px] h-[600px] bg-ai-blue-500/20 rounded-full blur-[120px] animate-pulse-subtle" />
      </div>
      <div className="absolute -right-20 bottom-40 z-0">
        <div className="relative w-[500px] h-[500px] bg-ai-teal-500/20 rounded-full blur-[120px] animate-pulse-subtle" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center"
        >
          {/* Floating badge */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 relative"
          >
            <span className="px-6 py-2 bg-ai-blue-500/10 border border-ai-blue-500/30 rounded-full flex items-center">
              <span className="animate-pulse w-2 h-2 rounded-full bg-ai-teal-500 mr-2" />
              <span className="text-sm text-neutral-text">
                Next Generation AI Education Platform
              </span>
            </span>
            
            {/* "Most Popular" floating badge */}
            <div className="absolute -top-3 -right-3 bg-ai-purple-500 text-white text-xs px-2 py-1 rounded-md transform rotate-12 animate-pulse-subtle">
              Most Popular
            </div>
          </motion.div>
          
          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-heading text-5xl md:text-6xl lg:text-6xl font-bold text-center mb-6 max-w-4xl tracking-tight font-heading"
          >
            <span className="ai-gradient-text">Master AI</span> With Our 
            <br />Interactive Learning Platform
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-body text-lg md:text-xl text-neutral-accent text-center max-w-2xl mb-8 font-sans"
          >
            Gain hands-on experience and build real AI projects through our immersive curriculum designed for maximum knowledge retention.
          </motion.p>
          
          {/* Animated code block */}
          <motion.div
            variants={itemVariants}
            className="max-w-lg w-full mb-10 overflow-hidden"
          >
            <div className="ai-code-block relative rounded-lg p-4 overflow-hidden">
              <div className="flex items-center gap-1 absolute top-2 left-3">
                <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
              </div>
              <pre className="text-xs sm:text-sm pt-4 overflow-x-auto hide-scrollbar text-neutral-accent">
                <code className="font-mono">
                  <span className="text-ai-teal-400">import</span> <span className="text-ai-purple-400">AIEducation</span> <span className="text-ai-teal-400">from</span> <span className="text-orange-400">'ai-literacy'</span>
                  <br /><br />
                  <span className="text-ai-teal-400">const</span> <span className="text-ai-blue-400">myAI</span> = <span className="text-ai-teal-400">new</span> <span className="text-ai-purple-400">AIEducation</span>()
                  <br />
                  <br />
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
                    className="inline-block overflow-hidden whitespace-nowrap"
                  >
                    <span className="text-ai-blue-400">myAI</span>.<span className="text-green-400">startLearning</span>()<span className="text-neutral-text">;</span>
                    <span className="ml-2 text-neutral-accent">// Your journey begins here!</span>
                  </motion.span>
                </code>
              </pre>
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black to-transparent"></div>
            </div>
          </motion.div>
          
          {/* CTA buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/Login">
              <button className="relative group ai-button px-8 py-3 rounded-md text-lg font-medium overflow-hidden">
                <span className="relative z-10">Get Started Free</span>
                <span className="absolute inset-0 bg-gradient-to-r from-ai-blue-500 to-ai-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </Link>
            <Link href="/Login">
              <button className="px-8 py-3 bg-transparent border border-glass-border hover:border-ai-blue-500/50 rounded-md text-lg font-medium text-neutral-text transition-all hover:bg-glass-hover group">
                <span>Prompt Now !!</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
              </button>
            </Link>
          </motion.div>
          
          {/* Users count */}
          <motion.div
            variants={itemVariants}
            className="flex items-center mt-10 bg-white/5 px-4 py-2 rounded-full"
          >
            <div className="flex -space-x-3 mr-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-black overflow-hidden">
                  <img 
                    src={`https://i.pravatar.cc/100?img=${i+10}`} 
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm text-neutral-accent">
              <span className="text-white font-medium">10,000+</span> learners already enrolled
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-neutral-accent text-sm">Scroll to explore</p>
            <div className="w-6 h-10 border-2 border-ai-blue-500/30 rounded-full flex justify-center">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-ai-blue-500 rounded-full mt-1"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Features section with animated cards
const FeaturesSection = () => {
  const features = [
    {
      icon: "🤖",
      title: "AI-Guided Learning",
      description: "Personalized path adapts to your pace and learning style with AI-driven recommendations.",
      color: "from-ai-blue-500/20 to-ai-blue-500/5",
      borderColor: "group-hover:border-ai-blue-500/50",
    },
    {
      icon: "💻",
      title: "Interactive Code Labs",
      description: "Practice in real-time with our integrated code environment and get instant feedback.",
      color: "from-ai-teal-500/20 to-ai-teal-500/5",
      borderColor: "group-hover:border-ai-teal-500/50",
    },
    {
      icon: "🏆",
      title: "Project-Based Courses",
      description: "Build real-world AI projects that you can showcase in your professional portfolio.",
      color: "from-ai-purple-500/20 to-ai-purple-500/5",
      borderColor: "group-hover:border-ai-purple-500/50",
    },
    {
      icon: "👥",
      title: "Community Collaboration",
      description: "Connect with peers, mentors, and experts in our thriving AI learning community.",
      color: "from-rose-500/20 to-rose-500/5",
      borderColor: "group-hover:border-rose-500/50",
    },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-dot-white/[0.2] -z-10" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-ai-teal-500/10 rounded-full blur-[80px] animate-pulse-subtle" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-ai-purple-500/10 rounded-full blur-[80px] animate-pulse-subtle" />
      
      {/* Decorative accent lines */}
      <div className="absolute h-40 w-[1px] top-1/2 left-[5%] bg-gradient-to-b from-transparent via-ai-blue-500/20 to-transparent" />
      <div className="absolute h-40 w-[1px] top-1/3 right-[5%] bg-gradient-to-b from-transparent via-ai-teal-500/20 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full mb-4"
          >
            Learn Smarter, Not Harder
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-heading text-3xl md:text-5xl font-bold mb-6 font-heading"
          >
            The <span className="ai-gradient-text">Future of Learning</span> is Here
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body text-lg text-neutral-accent max-w-2xl mx-auto font-sans"
          >
            Our platform combines cutting-edge technology with proven educational methods
            to deliver an unparalleled learning experience.
          </motion.p>
        </div>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.2 + index * 0.1,
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className={`group relative bg-transparent border border-white/10 rounded-xl overflow-hidden z-0`}
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
              
              {/* Background glow */}
              <div className="absolute inset-0 bg-black opacity-80 -z-10" />
              
              {/* Card content */}
              <div className="p-6 relative z-10">
                {/* Icon with animated container */}
                <div className="w-14 h-14 rounded-lg glass flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                
                <h3 className="text-heading text-xl font-semibold mb-3 group-hover:text-white transition-colors font-heading">
                  {feature.title}
                </h3>
                <p className="text-body text-neutral-accent group-hover:text-neutral-text transition-colors font-sans">
                  {feature.description}
                </p>
                
                {/* Animated learn more link */}
                <div className="mt-5 overflow-hidden">
                  <Link href="/Login">
                    <button className="text-ai-blue-400 flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform duration-300">
                      Learn more
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-1 group-hover:ml-2 transition-all" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </button>
                  </Link>
                </div>

                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-10 h-10 border-t border-r ${feature.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`absolute bottom-0 left-0 w-10 h-10 border-b border-l ${feature.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link href="/Login">
            <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-xl hover:shadow-ai-blue-500/10">
              Explore All Features
              <span className="ml-2">→</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

// Learning path section with animated steps
const LearningPathSection = () => {
  const steps = [
    {
      number: "01",
      title: "Discover Your Path",
      description: "Take our AI assessment to determine your skill level and customize your learning journey.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ai-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      ),
      color: "from-ai-blue-500 to-ai-teal-500"
    },
    {
      number: "02",
      title: "Master Core Concepts",
      description: "Learn essential AI and ML principles through interactive lessons and expert-led videos.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ai-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      ),
      color: "from-ai-teal-500 to-ai-purple-500"
    },
    {
      number: "03",
      title: "Build Real Projects",
      description: "Apply your knowledge through hands-on projects with our guided, step-by-step approach.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ai-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      color: "from-ai-purple-500 to-ai-blue-500"
    },
    {
      number: "04",
      title: "Earn Certification",
      description: "Complete courses and projects to earn industry-recognized certifications in AI specializations.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-ai-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      ),
      color: "from-ai-blue-500 to-ai-teal-500"
    },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="py-24 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ai-purple-900/10 to-transparent z-0" />
      <div className="absolute inset-0 bg-grid-small-white/[0.05] z-0" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-ai-teal-500/10 rounded-full blur-[80px] animate-pulse-subtle" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-ai-purple-500/10 rounded-full blur-[80px] animate-pulse-subtle" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full mb-4"
          >
            Step-by-Step Growth
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-heading text-3xl md:text-5xl font-bold mb-6 font-heading"
          >
            Your AI <span className="ai-gradient-text">Learning Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body text-lg text-neutral-accent max-w-2xl mx-auto font-sans"
          >
            From beginner to expert, our structured approach ensures you gain both theoretical knowledge
            and practical skills in artificial intelligence.
          </motion.p>
        </div>
        
        <motion.div
          ref={ref}
          className="relative"
        >
          {/* Connecting line with animated gradient */}
          <motion.div 
            initial={{ height: "0%" }}
            animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-ai-blue-500 via-ai-purple-500 to-ai-teal-500 hidden md:block z-0"
          />
          
          <div className="space-y-24 md:space-y-32">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.3 + index * 0.2,
                  ease: "easeOut"
                }}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
              >
                {/* Content side */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'} relative z-10`}>
                  <motion.div 
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                    className="mb-6"
                  >
                    <div className={`inline-block text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${step.color} mb-4`}>
                      {step.number}
                    </div>
                    <h3 className="text-heading text-2xl font-semibold mb-3 font-heading">{step.title}</h3>
                    <p className="text-body text-neutral-accent font-sans">{step.description}</p>
                  </motion.div>
                  
                  {/* Decorative line pointing to the timeline */}
                  <div className={`absolute top-10 hidden md:block h-0.5 w-12 bg-gradient-to-r ${step.color} ${index % 2 === 0 ? 'right-0' : 'left-0'}`} />
                </div>
                
                {/* Timeline marker with icon */}
                <div className="relative w-full md:w-2/12 flex justify-center py-8 md:py-0">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={inView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.6 + index * 0.2 
                    }}
                    className={`w-24 h-24 rounded-full bg-black border-2 border-white/10 flex items-center justify-center relative z-20 group hover:border-ai-blue-500 transition-all duration-500 shadow-lg shadow-ai-blue-500/20`}
                    style={{
                      background: `radial-gradient(circle at center, rgba(20, 20, 20, 0.8) 0%, rgba(0, 0, 0, 1) 70%)`
                    }}
                  >
                    {/* Icon background with gradient glow */}
                    <div className={`absolute inset-0.5 rounded-full bg-gradient-to-br ${step.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    {/* Animated rings */}
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className={`absolute inset-0 rounded-full border-2 border-ai-blue-500/30`} 
                    />
                    
                    {/* Icon */}
                    <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                      {step.icon}
                    </div>
                  </motion.div>
                  
                  {/* Pulsing dot for extra flair */}
                </div>
                
                {/* Empty space to balance the layout on desktop */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <Link href="/Login">
            <button className="relative px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-xl hover:shadow-ai-blue-500/10 group overflow-hidden">
              <span className="relative z-10 flex items-center justify-center">
                Start Your Journey
                <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
              
              {/* Button highlight effects */}
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-ai-blue-500 to-ai-teal-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="absolute top-0 right-0 h-0.5 w-full bg-gradient-to-r from-ai-teal-500 to-ai-blue-500 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

// Testimonials section with floating cards and carousel
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Data Scientist at TechCorp",
      image: "https://i.pravatar.cc/100?img=1",
      quote: "This platform drastically accelerated my AI learning curve. The interactive approach makes complex concepts much easier to grasp.",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      role: "Software Engineer at InnovateTech",
      image: "https://i.pravatar.cc/100?img=5",
      quote: "The hands-on projects helped me build a portfolio that landed me my dream job in machine learning. Worth every minute invested!",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "AI Researcher at DataLabs",
      image: "https://i.pravatar.cc/100?img=12",
      quote: "As someone already in the field, I was impressed by the advanced content and community support. It's kept me at the cutting edge.",
      rating: 4,
    },
    {
      name: "Emma Wilson",
      role: "ML Engineer at AIStartup",
      image: "https://i.pravatar.cc/100?img=20",
      quote: "The mentorship and community aspect sets this platform apart. I've made valuable connections that have accelerated my career growth.",
      rating: 5,
    },
    {
      name: "David Park",
      role: "Product Manager at FutureTech",
      image: "https://i.pravatar.cc/100?img=25",
      quote: "Learning AI concepts here helped me bridge the gap between product and engineering teams. Now I can communicate effectively with our ML team.",
      rating: 4,
    },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State to track current testimonial index
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0); // -1 for left, 1 for right
  const [isMobile, setIsMobile] = React.useState(false);
  
  // Detect mobile view
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Auto-advance carousel (slower on mobile)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, isMobile ? 7000 : 5000); // Slower on mobile for better reading time
    return () => clearInterval(interval);
  }, [testimonials.length, isMobile]);

  // Handle manual navigation
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Calculate visible testimonials based on screen size
  const visibleTestimonials = React.useMemo(() => {
    const result = [];
    
    // On mobile, show just one testimonial, on larger screens show more
    const cardsToShow = isMobile ? 1 : (window.innerWidth < 1024 ? 2 : 3);
    
    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push({
        ...testimonials[index],
        position: i, // 0 = current, 1 = next, 2 = next+1
      });
    }
    return result;
  }, [currentIndex, testimonials, isMobile]);

  return (
    <div className="py-16 md:py-24 relative overflow-hidden">
      <Navbar />
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-ai-purple-900/10 to-black z-0" />
      <div className="absolute inset-0 bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] z-0" />
      
      {/* Animated light beams */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
          animate={{ opacity: [0.1, 0.2, 0.1], rotate: -45, scale: 1 }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -top-24 -right-24 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-t from-ai-blue-500/0 to-ai-blue-500/10 blur-lg"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
          animate={{ opacity: [0.1, 0.2, 0.1], rotate: 45, scale: 1 }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-24 -left-24 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-b from-ai-teal-500/0 to-ai-teal-500/10 blur-lg"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full mb-4"
          >
            Hear From Our Community
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-heading text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-heading"
          >
            Success <span className="ai-gradient-text">Stories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body text-base md:text-lg text-neutral-accent max-w-2xl mx-auto font-sans"
          >
            Join thousands of learners who have transformed their careers through our platform.
          </motion.p>
        </div>
        
        {/* Testimonial Carousel - Simplified on mobile */}
        <motion.div 
          ref={ref}
          className="relative w-full mx-auto"
        >
          <div className="relative py-4 md:py-8">
            {/* Mobile-optimized testimonial view */}
            {isMobile && (
              <div className="flex justify-center items-center">
                <motion.div
                  key={`mobile-${testimonials[currentIndex].name}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-[300px] mx-auto"
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-md rounded-xl overflow-hidden relative">
                    <div className="p-5">
                      {/* Quote */}
                      <div className="relative">
                        <svg className="absolute top-0 left-0 w-6 h-6 text-ai-blue-500/20 transform -translate-x-2 -translate-y-2" 
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                        </svg>
                        <p className="text-neutral-text text-sm pt-4 italic mb-4 relative z-10 min-h-[80px]">
                          "{testimonials[currentIndex].quote}"
                        </p>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < testimonials[currentIndex].rating ? 'text-yellow-400' : 'text-neutral-600'}`} 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      {/* User */}
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-ai-teal-500/50">
                          <img 
                            src={testimonials[currentIndex].image} 
                            alt={testimonials[currentIndex].name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <h4 className="text-heading text-sm font-semibold font-heading">{testimonials[currentIndex].name}</h4>
                          <p className="text-xs text-neutral-accent font-sans">{testimonials[currentIndex].role}</p>
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-ai-blue-500/30 blur-sm" />
                      <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-ai-teal-500/10 blur-lg" />
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
            
            {/* Desktop carousel view */}
            {!isMobile && (
              <div className="flex justify-center h-[380px]">
                {visibleTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.name}-${testimonial.position}`}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.8,
                      x: direction * 100 
                    }}
                    animate={{ 
                      opacity: testimonial.position === 0 ? 1 : 0.7 - (testimonial.position * 0.2),
                      scale: testimonial.position === 0 ? 1 : 0.9 - (testimonial.position * 0.05),
                      x: 0,
                      y: testimonial.position === 0 ? 0 : testimonial.position === 1 ? 20 : 40,
                      zIndex: 30 - testimonial.position * 10
                    }}
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                    className={`absolute top-0 transform ${
                      testimonial.position === 0 
                        ? 'left-1/2 -translate-x-1/2' 
                        : testimonial.position === 1 
                          ? 'left-[60%] sm:left-[65%] lg:left-[60%] -translate-x-1/2' 
                          : 'left-[40%] sm:left-[35%] lg:left-[40%] -translate-x-1/2'
                    }`}
                  >
                    <div 
                      className={`w-[280px] sm:w-[340px] md:w-[360px] lg:w-[400px] backdrop-blur-md rounded-xl overflow-hidden relative
                                ${testimonial.position === 0 
                                  ? 'bg-gradient-to-br from-white/10 to-white/5 border border-white/20' 
                                  : 'bg-white/5 border border-white/10'}`}
                    >
                      {/* Content */}
                      <div className="p-4 xs:p-5 sm:p-6">
                        {/* Quote */}
                        <div className="relative">
                          <svg className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 text-ai-blue-500/20 transform -translate-x-3 -translate-y-3" 
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                          </svg>
                          <p className="text-neutral-text text-sm xs:text-base pt-4 italic mb-4 xs:mb-6 relative z-10 line-clamp-4 min-h-[5rem]">"{testimonial.quote}"</p>
                        </div>
                        
                        {/* Rating */}
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-neutral-600'}`} 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        
                        {/* User */}
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-ai-teal-500/50">
                            <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-heading text-sm font-semibold font-heading">{testimonial.name}</h4>
                            <p className="text-xs text-neutral-accent font-sans">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Decorative element */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-ai-blue-500/30 blur-sm" />
                      <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-ai-teal-500/10 blur-lg" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Navigation controls - Improved for better mobile experience */}
            <div className="flex justify-center items-center space-x-2 sm:space-x-4 mt-6">
              {/* Touch-friendly buttons with improved tap targets */}
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="p-2 sm:p-3 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 transition-colors hover:border-white/30"
                aria-label="Previous testimonial"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              {/* Dots indicator - Improved mobile experience */}
              <div className="flex space-x-1 sm:space-x-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-ai-blue-500 w-4 sm:w-6' 
                        : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="p-2 sm:p-3 rounded-full bg-white/5 border border-white/20 hover:bg-white/10 transition-colors hover:border-white/30"
                aria-label="Next testimonial"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Button - Improved responsive design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <Link href="/Login">
            <button className="px-5 sm:px-6 py-2 sm:py-2.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-xl hover:shadow-ai-blue-500/10 group">
              Join Our Community
              <span className="ml-2 group-hover:ml-3 transition-all">→</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

// Stats section with animated counters
const StatsSection = () => {
  interface Stat {
    value: string;
    label: string;
    startValue: number;
    endValue: number;
    suffix: string;
    color: string;
    precision?: number;
  }

  const stats: Stat[] = [
    { 
      value: "50+", 
      label: "AI Courses", 
      startValue: 0,
      endValue: 50,
      suffix: "+",
      color: "text-ai-blue-400"
    },
    { 
      value: "100K+", 
      label: "Active Learners", 
      startValue: 0,
      endValue: 100,
      suffix: "K+",
      color: "text-ai-teal-400"
    },
    { 
      value: "95%", 
      label: "Completion Rate", 
      startValue: 0,
      endValue: 95,
      suffix: "%",
      color: "text-ai-purple-400"
    },
    { 
      value: "4.8", 
      label: "Average Rating", 
      startValue: 0,
      endValue: 4.8,
      suffix: "",
      precision: 1,
      color: "text-rose-400"
    },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Custom counter component with animation
  interface CounterProps {
    startValue: number;
    endValue: number;
    suffix: string;
    precision?: number;
    color: string;
  }

  const Counter: React.FC<CounterProps> = ({ startValue, endValue, suffix = "", precision = 0, color }) => {
    const controls = useAnimation();
    const [count, setCount] = React.useState(startValue);
    
    React.useEffect(() => {
      if (inView) {
        let startTimestamp: number | undefined;
        const duration = 2000; // 2 seconds animation
        
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const currentCount = progress * (endValue - startValue) + startValue;
          
          setCount(currentCount);
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        
        window.requestAnimationFrame(step);
        controls.start({ opacity: 1, scale: 1 });
      }
    }, [inView, startValue, endValue]);
    
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        transition={{ duration: 0.5 }}
        className={`text-4xl md:text-5xl font-bold ${color} font-heading`}
      >
        {precision > 0 ? count.toFixed(precision) : Math.floor(count)}
        {suffix}
      </motion.span>
    );
  };

  return (
    <div className="py-20 bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-ai-blue-900/20 via-transparent to-ai-purple-900/20 z-0" />
      
      <div className="absolute inset-0 z-0">
        {/* Animated light beams */}
        <motion.div
          initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
          animate={{ opacity: [0.1, 0.2, 0.1], rotate: -45, scale: 1 }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-t from-ai-blue-500/0 to-ai-blue-500/10 blur-lg"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
          animate={{ opacity: [0.1, 0.2, 0.1], rotate: 45, scale: 1 }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-b from-ai-teal-500/0 to-ai-teal-500/10 blur-lg"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-heading text-3xl md:text-4xl font-bold mb-4 font-heading">
            Trusted by <span className="ai-gradient-text">Thousands</span> of Learners
          </h2>
          <p className="text-neutral-accent max-w-xl mx-auto font-sans">
            Join our growing community of AI enthusiasts and professionals building the future.
          </p>
        </motion.div>
        
        <motion.div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative z-10 group"
            >
              <div className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:transform group-hover:-translate-y-2">
                <div className="mb-2 relative">
                  <Counter 
                    startValue={stat.startValue} 
                    endValue={stat.endValue} 
                    suffix={stat.suffix} 
                    precision={stat.precision} 
                    color={stat.color} 
                  />
                  <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
                </div>
                <div className="text-neutral-accent font-medium uppercase tracking-wider text-sm font-sans">
                  {stat.label}
                </div>
              </div>
              
              {/* Connector lines */}
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[1px] bg-white/10" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Final CTA section with gradient background and interactive elements
const CTASection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="py-24 relative overflow-hidden">
      {/* Enhanced background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-ai-blue-900/20 via-ai-purple-900/20 to-ai-teal-900/20 opacity-30 animate-gradient-shift" />
      <div className="absolute inset-0 bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      
      {/* Animated blurred shapes */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.2, 0.4, 0.2], 
          scale: [0.8, 1, 0.8],
          rotate: [0, 10, 0] 
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-20 w-80 h-80 rounded-full bg-ai-blue-500/10 blur-[100px] mix-blend-screen"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.2, 0.3, 0.2], 
          scale: [0.9, 1.1, 0.9],
          rotate: [0, -10, 0] 
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 left-20 w-64 h-64 rounded-full bg-ai-teal-500/10 blur-[100px] mix-blend-screen"
      />
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-small-white/[0.1] bg-[radial-gradient(circle_at_center,_var(--neutral-accent)_0%,_transparent_60%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Glass card container */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden p-8 md:p-12 shadow-xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-ai-blue-500 via-ai-teal-500 to-ai-purple-500"></div>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-ai-blue-500/10 to-ai-blue-500/5 absolute -top-12 -right-12 blur-lg"></div>
            
            <div className="text-center relative z-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3 }}
                className="inline-block px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white mb-6 font-sans"
              >
                <span className="animate-pulse inline-block w-2 h-2 bg-ai-teal-500 rounded-full mr-2"></span>
                Get Started Today
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-heading text-3xl md:text-5xl font-bold mb-6 font-heading"
              >
                Ready to <span className="ai-gradient-text">Transform Your Future</span> with AI?
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-body text-lg text-neutral-accent mb-8 font-sans"
              >
                Start your journey today and join our community of innovative learners mastering
                the technologies that are reshaping our world.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row justify-center gap-4 relative"
              >
                {/* Spotlight effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl bg-gradient-to-r from-ai-blue-500/20 to-ai-teal-500/20 -z-10"></div>
                
                <Link href="/Login">
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(10, 132, 255, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group overflow-hidden px-8 py-4 rounded-xl text-lg font-medium text-white shadow-lg"
                  >
                    {/* Button background with gradient animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-ai-blue-600 via-ai-teal-600 to-ai-blue-600 bg-[length:200%_100%] animate-gradient-shift"></div>
                    
                    {/* Top highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                    
                    {/* Button content */}
                    <span className="relative z-10 flex items-center justify-center font-sans">
                      Get Started Free
                      <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition duration-500 group-hover:blur-xl bg-gradient-to-r from-ai-blue-500 via-ai-teal-500 to-ai-purple-500"></div>
                  </motion.button>
                </Link>
                
                <Link href="/Login">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 bg-transparent border border-white/10 hover:border-white/30 rounded-xl text-lg font-medium text-white transition-all hover:bg-white/5 group"
                  >
                    <span className="relative z-10 flex items-center justify-center font-sans">
                      View Curriculum
                      <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 text-sm text-neutral-accent flex items-center justify-center gap-2 font-sans"
              >
                <svg className="w-5 h-5 text-ai-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p>No credit card required. Start with our free tier today.</p>
              </motion.div>
              
              {/* Avatars showing recent sign ups */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 flex justify-center"
              >
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-black overflow-hidden ring-2 ring-ai-blue-500/20">
                        <img 
                          src={`https://i.pravatar.cc/100?img=${i+10}`} 
                          alt="User avatar" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="ml-4 text-sm text-neutral-accent font-sans">
                    <span className="text-white font-medium">10+ people</span> joined in the last hour
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Tech stack section with infinite scroll
const TechStackSection = () => {
  const techs = [
    { name: "TensorFlow", icon: "🤖" },
    { name: "PyTorch", icon: "🔥" },
    { name: "Scikit-learn", icon: "📊" },
    { name: "Hugging Face", icon: "🤗" },
    { name: "OpenAI", icon: "🧠" },
    { name: "Keras", icon: "⚡" },
    { name: "NumPy", icon: "🔢" },
    { name: "Pandas", icon: "🐼" },
    { name: "Jupyter", icon: "📝" },
    { name: "Matplotlib", icon: "📈" },
    { name: "Seaborn", icon: "🎨" },
    { name: "NLTK", icon: "📚" },
    { name: "SpaCy", icon: "🔍" },
    { name: "FastAI", icon: "⚡" },
    { name: "Transformers", icon: "🔄" },
    { name: "DALL-E", icon: "🎨" },
    { name: "Stable Diffusion", icon: "✨" },
    { name: "LangChain", icon: "⛓️" },
    { name: "Excel", icon: "📊" },
    { name: "Cooking", icon: "👨‍🍳" },
    { name: "Swimming", icon: "🏊‍♂️" },
    { name: "Photography", icon: "📷" },
    { name: "Public Speaking", icon: "🎤" },
    { name: "Yoga", icon: "🧘" },
    { name: "Dancing", icon: "💃" },
    { name: "Chess", icon: "♟️" },
    { name: "Video Editing", icon: "🎬" },
    { name: "Guitar", icon: "🎸" },
    { name: "Piano", icon: "🎹" },
    { name: "Meditation", icon: "🕉️" },
    { name: "Digital Marketing", icon: "📢" },
    { name: "Stock Market", icon: "📈" },
    { name: "Car Repair", icon: "🔧" },
    { name: "Gardening", icon: "🌱" },
    { name: "Calligraphy", icon: "✒️" },
    { name: "Origami", icon: "📄" },
    { name: "Astronomy", icon: "🔭" },
    { name: "Magic Tricks", icon: "🎩" },
    { name: "Self-Defense", icon: "🥋" },
    { name: "Baking", icon: "🍞" },
    { name: "Wine Tasting", icon: "🍷" },
    { name: "Fashion Design", icon: "👗" },
    { name: "Woodworking", icon: "🪵" },
    { name: "Fishing", icon: "🎣" },
    { name: "Podcasting", icon: "🎙️" },
    { name: "First Aid", icon: "🚑" },
    { name: "Sign Language", icon: "🤟" },
    { name: "Time Management", icon: "⏳" },
    { name: "Psychology", icon: "🧠" },
    { name: "AI Ethics", icon: "⚖️" }
];

  // Duplicate techs for seamless infinite scroll
  const duplicatedTechs = [...techs, ...techs];
  
  // Animation settings - optimized for smoother performance
  const scrollLeftAnimation = {
    x: [0, -1920],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20, // Faster animation
        ease: "linear"
      }
    }
  };
  
  const scrollRightAnimation = {
    x: [-1920, 0],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20, // Faster animation
        ease: "linear"
      }
    }
  };

  // Calculate ideal card width based on screen size
  const getResponsiveCardWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 110; // Small mobile
      if (window.innerWidth < 768) return 130; // Mobile
      if (window.innerWidth < 1024) return 160; // Tablet
      return 180; // Desktop
    }
    return 180; // Default (SSR)
  };

  // Generate CSS with will-change for better performance
  const optimizedScrollStyle = {
    willChange: 'transform',
    backfaceVisibility: 'hidden' as 'hidden',
    WebkitFontSmoothing: 'subpixel-antialiased'
  };

  return (
    <div className="py-12 md:py-16 lg:py-24 relative overflow-hidden border-t border-glass-border">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ai-blue-900/5 to-transparent" />
      
      {/* Blurred background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-ai-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-ai-teal-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-10 lg:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 font-heading"
          >
            Master Today's <span className="ai-gradient-text">Leading AI Technologies</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-body text-sm sm:text-base md:text-lg text-neutral-accent max-w-2xl mx-auto font-sans"
          >
            Stay ahead of the curve with our comprehensive curriculum covering the latest AI tools and frameworks.
          </motion.p>
        </div>

        {/* Infinite scroll container - First row - with performance optimizations */}
        <div className="relative w-full overflow-hidden mb-4 md:mb-6">
          <motion.div 
            className="flex"
            animate={scrollLeftAnimation}
            style={{ 
              width: "max-content",
              ...optimizedScrollStyle 
            }}
          >
            {duplicatedTechs.map((tech, index) => (
              <motion.div
                key={`row1-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: Math.min(index * 0.03, 0.9) // Cap the delay for better performance
                }}
                viewport={{ once: true }}
                className="flex-shrink-0 mx-1.5 sm:mx-2 md:mx-3"
              >
                <div className="glass p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl w-[110px] sm:w-[130px] md:w-[160px] lg:w-[180px] text-center group hover:border-ai-teal-500/30 transition-all duration-300 font-sans transform hover:translate-y-[-2px]">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-1.5 sm:mb-2 md:mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="text-heading text-xs sm:text-sm md:text-base font-semibold text-neutral-text group-hover:text-ai-teal-400 transition-colors font-heading truncate">
                    {tech.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-l from-black to-transparent z-10" />
        </div>
        
        {/* Second row - moving in opposite direction - with performance optimizations */}
        <div className="relative w-full overflow-hidden">
          <motion.div 
            className="flex"
            animate={scrollRightAnimation}
            style={{ 
              width: "max-content",
              ...optimizedScrollStyle  
            }}
          >
            {duplicatedTechs.slice().reverse().map((tech, index) => (
              <motion.div
                key={`row2-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: Math.min(index * 0.03, 0.9) // Cap the delay for better performance
                }}
                viewport={{ once: true }}
                className="flex-shrink-0 mx-1.5 sm:mx-2 md:mx-3"
              >
                <div className="glass p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl w-[110px] sm:w-[130px] md:w-[160px] lg:w-[180px] text-center group hover:border-ai-blue-500/30 transition-all duration-300 font-sans transform hover:translate-y-[-2px]">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-1.5 sm:mb-2 md:mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="text-heading text-xs sm:text-sm md:text-base font-semibold text-neutral-text group-hover:text-ai-blue-400 transition-colors font-heading truncate">
                    {tech.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-l from-black to-transparent z-10" />
        </div>
      </div>
    </div>
  );
};

// Landing page skeleton component
const LandingPageSkeleton = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-black">
      {/* Background skeleton */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-ai-blue-900/30 z-0" />
      <div className="absolute inset-0 bg-grid-small-white/[0.2] z-0" />
      
      {/* Navbar skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-neutral-800/50 bg-black/60">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-28 bg-neutral-800/70 rounded-lg animate-pulse"></div>
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-8 w-16 bg-neutral-800/70 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero skeleton */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 flex flex-col items-center">
        <div className="w-full flex flex-col items-center">
          {/* Badge skeleton */}
          <div className="mb-8 w-64 h-10 bg-ai-blue-500/10 rounded-full animate-pulse"></div>
          
          {/* Title skeleton */}
          <div className="h-16 w-3/4 bg-neutral-800/70 rounded-lg mb-4 animate-pulse"></div>
          <div className="h-16 w-2/3 bg-neutral-800/70 rounded-lg mb-8 animate-pulse"></div>
          
          {/* Subtitle skeleton */}
          <div className="h-6 w-1/2 bg-neutral-800/50 rounded-lg mb-4 animate-pulse"></div>
          <div className="h-6 w-2/5 bg-neutral-800/50 rounded-lg mb-8 animate-pulse"></div>
          
          {/* Code block skeleton */}
          <div className="max-w-lg w-full mb-10 overflow-hidden bg-neutral-900/50 rounded-lg">
            <div className="h-40 w-full p-4 animate-pulse">
              <div className="flex items-center gap-1 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
              </div>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-4 bg-neutral-800/70 rounded mb-3 w-${Math.floor(Math.random() * 3) + 7}/12`}></div>
              ))}
            </div>
          </div>
          
          {/* CTA buttons skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="h-12 w-40 bg-gradient-to-r from-ai-blue-500/30 to-ai-teal-500/30 rounded-md animate-pulse"></div>
            <div className="h-12 w-40 bg-neutral-800/30 border border-glass-border rounded-md animate-pulse"></div>
          </div>
          
          {/* Users count skeleton */}
          <div className="flex items-center bg-white/5 px-4 py-2 rounded-full w-56 h-12 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { contextisLoggedIn } = useUserContext();
  const router = useRouter();
  
  useEffect(() => {
    // If user is logged in, redirect to main page
    if (contextisLoggedIn) {
      router.push('/Main');
    }
    
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [contextisLoggedIn, router]);
  
  if (isLoading) {
    return <LandingPageSkeleton />;
  }

  return (
    <div className="bg-black text-white overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <LearningPathSection />
      <TestimonialsSection />
      <CTASection />
      <TechStackSection />
    </div>
  );
}