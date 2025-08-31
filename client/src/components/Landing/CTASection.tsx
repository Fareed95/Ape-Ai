import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";


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

  export default CTASection;