import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
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

  export default LearningPathSection;