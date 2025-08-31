import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
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
  
  export default TestimonialsSection;