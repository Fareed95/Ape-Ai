import { motion } from "framer-motion";
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

  export default TechStackSection;