import { useState, useEffect } from "react";


// Spotlight effect following mouse position
const Spotlight = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    
    return (
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px sm:400px md:600px circle at ${position.x}px ${position.y}px, rgba(120, 119, 198, 0.15), transparent 40%)`
        }}
      />
    );
  };

  export default Spotlight;