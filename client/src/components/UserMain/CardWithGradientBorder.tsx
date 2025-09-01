import { useState } from "react";
import { useRef } from "react";
import { useMotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion";


const CardWithGradientBorder = ({ children, onClick, progress }: { children: React.ReactNode, onClick: () => void, progress: number }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    
  
    const transformStyle = useTransform(
      [rotateX, rotateY],
      // Enhanced 3D effect that's more subtle
      ([latestRotateX, latestRotateY]: [number, number]) => `perspective(1000px) rotateX(${latestRotateX * 0.5}deg) rotateY(${latestRotateY * 0.5}deg)`
    );
  
    const updateMousePosition = (e: MouseEvent) => {
      if (!cardRef.current) return;
  
        const rect = cardRef.current.getBoundingClientRect();
      
      // Set mouse position for gradient effect
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      
      // Calculate rotations for subtle 3D card tilt effect
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Limit the rotation to a small amount
      const rotationIntensity = 1.5; // Reduced intensity
      rotateX.set((centerY - mouseY) / centerY * rotationIntensity);
      rotateY.set((mouseX - centerX) / centerX * rotationIntensity);
    };
    
    const resetCardRotation = () => {
      rotateX.set(0);
      rotateY.set(0);
    };
  
    return (
      <motion.div
        ref={cardRef}
        onMouseMove={updateMousePosition}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          resetCardRotation();
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ transform: transformStyle }}
        className="group relative rounded-xl cursor-pointer transition-all duration-500"
        onClick={onClick}
      >
        {/* Animated gradient border */}
        <motion.div 
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
        />
        
        {/* Content area with glass effect */}
        <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-white/10 p-5 sm:p-6 rounded-xl z-10 transition-all duration-300 group-hover:border-white/20">
          {children}
        </div>
      </motion.div>
    );
  };

  export default CardWithGradientBorder;