import { motion } from "framer-motion";
import Link from "next/link";
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
              {/* <p className="text-neutral-accent text-sm">Scroll to explore</p> */}
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

export default HeroSection;