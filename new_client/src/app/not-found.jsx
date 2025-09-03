"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Compass, Map, Search, Home, Sparkles, Radar } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [mapNodes, setMapNodes] = useState([]);
  const [currentMapPath, setCurrentMapPath] = useState([]);
  
  useEffect(() => {
    // Generate map nodes that visually look like a network/sitemap
    const generateMapNodes = () => {
      const nodes = [];
      const nodeCount = 15;
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          id: i,
          x: 20 + Math.random() * 60, // Keep nodes within a reasonable area of the container
          y: 20 + Math.random() * 60,
          size: Math.random() * 4 + 2,
          label: ['Home', 'About', 'Products', 'Blog', 'Contact', 'Login', 'Dashboard'][Math.floor(Math.random() * 80)],
          active: Math.random() > 0.7,
        });
      }
      
      return nodes;
    };
    
    setMapNodes(generateMapNodes());
    
    // Set occasional glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 2000);
    
    // Animate a path through the map
    const animateMapPath = () => {
      const pathLength = Math.floor(Math.random() * 15) + 3; // 3-7 nodes in a path
      const newPath = [];
      
      for (let i = 0; i < pathLength; i++) {
        const nodeIndex = Math.floor(Math.random() * mapNodes.length);
        newPath.push(nodeIndex);
      }
      
      setCurrentMapPath(newPath);
    };
    
    const pathInterval = setInterval(animateMapPath, 4000);
    animateMapPath(); // Initial path
    
    return () => {
      clearInterval(glitchInterval);
      clearInterval(pathInterval);
    };
  }, [mapNodes.length]);
  
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6">
      {/* Background elements */}
      <div className="fixed inset-0 bg-gradient-to-b from-neutral-900 to-blue-950 opacity-80" />
      
      <div className="fixed inset-0 flex items-center justify-center opacity-5">
        <div className="text-[40vh] font-bold text-white">404</div>
      </div>
      
      {/* Grid pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDE1IEwgNjAgMTUgTSAxNSAwIEwgMTUgNjAgTSAwIDMwIEwgNjAgMzAgTSAzMCAwIEwgMzAgNjAgTSAwIDQ1IEwgNjAgNDUgTSA0NSAwIEwgNDUgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg2NiwgMTUzLCAyMjUsIDAuMDgpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')] opacity-10" />
      
      {/* Main content */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col md:flex-row gap-8 items-center">
        {/* Left side - 404 display */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full md:w-1/2 flex flex-col items-center md:items-start"
        >
          <div className="relative mb-8">
            <motion.div
              animate={{ 
                scale: glitchActive ? [1, 1.02, 0.98, 1] : 1,
              }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  x: glitchActive ? [-3, 3, -1, 0] : 0,
                  opacity: glitchActive ? [1, 0.8, 1] : 1,
                }}
                transition={{ duration: 0.2 }}
                className="text-[150px] md:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 leading-none"
              >
                404
              </motion.div>
              
              {glitchActive && (
                <>
                  <div className="absolute inset-0 text-[150px] md:text-[180px] font-bold text-blue-500 opacity-70 transform translate-x-2 translate-y-1 blur-sm">404</div>
                  <div className="absolute inset-0 text-[150px] md:text-[180px] font-bold text-cyan-400 opacity-70 transform -translate-x-2 -translate-y-1 blur-sm">404</div>
                </>
              )}
            </motion.div>
            
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -inset-8 rounded-full bg-blue-500/10 blur-2xl z-[-1]"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-200 mb-4">
              <span className="text-blue-400">Location</span> Not Found
            </h1>
            
            <p className="text-neutral-400 max-w-md mb-8">
              The digital coordinates you're searching for don't exist in our system. 
              Perhaps this realm was deleted, moved, or never existed in the first place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors duration-300"
                >
                  <Home size={18} />
                  <span>Return Home</span>
                </motion.div>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 border border-blue-700/50 hover:border-blue-600 text-blue-400 py-3 px-6 rounded-md transition-colors duration-300"
                onClick={() => window.history.back()}
              >
                <Compass size={18} />
                <span>Go Back</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Right side - Visual map / lost in cyberspace */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full md:w-1/2 aspect-square max-w-md relative"
        >
          <div className="absolute inset-0 rounded-lg border border-blue-900/30 bg-neutral-900/50 backdrop-blur-sm overflow-hidden">
            {/* Map header */}
            <div className="border-b border-blue-900/30 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Map size={16} className="text-blue-500" />
                <span className="text-neutral-300 text-sm font-medium">System Map</span>
              </div>
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-neutral-600"></div>
                <div className="h-2 w-2 rounded-full bg-neutral-600"></div>
              </div>
            </div>
            
            {/* Sitemap visualization */}
            <div className="relative h-full p-4">
              {/* Map nodes (pages) */}
              {mapNodes.map((node, index) => (
                <motion.div
                  key={index}
                  className={`absolute rounded-full flex items-center justify-center 
                    ${currentMapPath.includes(index) ? 'bg-blue-500' : 
                      node.active ? 'bg-neutral-700' : 'bg-neutral-800'}`}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    width: `${node.size * 4}px`,
                    height: `${node.size * 4}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: currentMapPath.includes(index) ? 10 : 1
                  }}
                  animate={{
                    scale: currentMapPath.includes(index) ? [1, 1.3, 1] : 1,
                    boxShadow: currentMapPath.includes(index) ? 
                      ['0 0 0px rgba(59, 130, 246, 0.5)', '0 0 15px rgba(59, 130, 246, 0.7)', '0 0 5px rgba(59, 130, 246, 0.5)'] : 
                      'none'
                  }}
                  transition={{ duration: 1, repeat: currentMapPath.includes(index) ? Infinity : null, repeatDelay: 3 }}
                >
                  {node.size > 4 && (
                    <span className="absolute whitespace-nowrap text-[8px] text-neutral-400 mt-5">
                      {node.label}
                    </span>
                  )}
                </motion.div>
              ))}
              
              {/* Connection lines */}
              <svg className="absolute inset-0 w-full h-full z-0">
                {/* Static connections between some nodes */}
                {mapNodes.map((node, i) => (
                  mapNodes.map((targetNode, j) => {
                    // Only render some connections to avoid clutter
                    if (i < j && Math.random() > 0.85) {
                      return (
                        <line 
                          key={`${i}-${j}`}
                          x1={`${node.x}%`} 
                          y1={`${node.y}%`} 
                          x2={`${targetNode.x}%`} 
                          y2={`${targetNode.y}%`} 
                          stroke="rgba(59, 130, 246, 0.1)" 
                          strokeWidth="1"
                        />
                      );
                    }
                    return null;
                  })
                ))}
                
                {/* Active path connections */}
                {currentMapPath.map((nodeIndex, i) => {
                  if (i < currentMapPath.length - 1) {
                    const node = mapNodes[nodeIndex];
                    const nextNode = mapNodes[currentMapPath[i + 1]];
                    return (
                      <motion.line 
                        key={`path-${i}`}
                        x1={`${node.x}%`} 
                        y1={`${node.y}%`} 
                        x2={`${nextNode.x}%`} 
                        y2={`${nextNode.y}%`} 
                        stroke="rgba(59, 130, 246, 0.8)" 
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                      />
                    );
                  }
                  return null;
                })}
              </svg>
              
              {/* Missing node indication */}
              <motion.div
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute right-[25%] bottom-[30%] flex items-center justify-center"
              >
                <div className="relative">
                  <div className="absolute -inset-6 rounded-full bg-red-500/20 animate-pulse"></div>
                  <div className="w-6 h-6 rounded-full border-2 border-dashed border-red-500 flex items-center justify-center">
                    <span className="text-red-500 text-xs">?</span>
                  </div>
                  <span className="absolute whitespace-nowrap text-[10px] text-red-400 mt-8 font-mono">
                    ERROR: NODE_NOT_FOUND
                  </span>
                </div>
              </motion.div>
            </div>
            
            {/* Map footer with search */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-blue-900/30 p-3 backdrop-blur-md">
              <div className="flex items-center gap-2 w-full">
                <Search size={14} className="text-blue-500" />
                <div className="flex-1 rounded bg-neutral-800/50 px-3 py-1.5 text-sm text-neutral-500 font-mono">
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    location not found in directory...
                  </motion.span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Radar scanning animation */}
          <motion.div
            className="absolute -bottom-4 -right-4 w-32 h-32 opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full border border-blue-500/30"></div>
              <motion.div
                className="absolute left-1/2 top-1/2 w-1 h-1/2 bg-blue-500/20 origin-bottom"
                style={{ transformOrigin: 'bottom center' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full blur-sm"></div>
              </motion.div>
              <div className="absolute left-1/2 top-1/2 w-1 h-1 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Bottom tracker line */}
      <div className="fixed bottom-0 left-0 w-screen h-0.5 bg-blue-900/50">
        <motion.div 
          className="h-full bg-blue-500"
          animate={{ width: ['0%', '100%', '0%'] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
      
      {/* Corner decorations */}
      <div className="fixed top-0 right-0 w-64 h-64 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-px bg-blue-500/40"></div>
        <div className="absolute top-0 right-0 w-px h-32 bg-blue-500/40"></div>
      </div>
      
      <style jsx global>{`
        @keyframes scan {
          0%, 100% { transform: translateY(0); opacity: 0; }
          50% { transform: translateY(100vh); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}