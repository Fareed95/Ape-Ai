"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserContext } from '@/app/context/Userinfo';
import MainInput from '@/components/MainInput';
import PrevCources from '@/components/PrevCources';
import TrueFocus from '@/components/TrueFocus';
import { useToast } from '@/hooks/use-toast';

// Enhanced animated floating particles component
const FloatingParticles = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 50 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: `${Math.random() * 3 + 0.5}px`,
          height: `${Math.random() * 3 + 0.5}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          backgroundColor: i % 7 === 0 ? 'rgba(139, 92, 246, 0.35)' : // Purple
                          i % 7 === 1 ? 'rgba(59, 130, 246, 0.35)' : // Blue
                          i % 7 === 2 ? 'rgba(14, 165, 233, 0.3)' : // Sky
                          i % 7 === 3 ? 'rgba(236, 72, 153, 0.3)' : // Pink
                          i % 7 === 4 ? 'rgba(45, 212, 191, 0.3)' : // Teal
                          i % 7 === 5 ? 'rgba(168, 85, 247, 0.35)' : // Purple
                          'rgba(99, 102, 241, 0.3)', // Indigo
          filter: 'blur(1px)',
          zIndex: 0
        }}
        animate={{
          y: [0, Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1)],
          x: [0, Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1)],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: Math.random() * 25 + 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Enhanced 3D animated orbital spheres
const OrbitalSpheres = () => (
  <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
    {/* Outer orbit */}
    <div className="relative w-[300px] sm:w-[500px] md:w-[700px] lg:w-[1000px] h-[300px] sm:h-[500px] md:h-[700px] lg:h-[1000px] opacity-20 animate-orbit-slow">
      <div className="absolute top-1/2 left-0 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 bg-blue-500/40 rounded-full blur-md" />
      <div className="absolute top-0 left-1/2 w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 bg-purple-500/40 rounded-full blur-md" />
      <div className="absolute bottom-0 left-1/2 w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 bg-teal-500/40 rounded-full blur-md" />
      <div className="absolute top-1/2 right-0 w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 bg-pink-500/40 rounded-full blur-md" />
      <div className="absolute top-1/4 right-1/4 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-indigo-500/40 rounded-full blur-md" />
      <div className="absolute bottom-1/4 left-1/4 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-cyan-500/40 rounded-full blur-md" />
    </div>
    
    {/* Middle orbit */}
    <div className="absolute w-[200px] sm:w-[400px] md:w-[600px] h-[200px] sm:h-[400px] md:h-[600px] opacity-25 animate-orbit-medium">
      <div className="absolute top-1/4 left-0 w-2 sm:w-3 md:w-3.5 h-2 sm:h-3 md:h-3.5 bg-indigo-500/40 rounded-full blur-md" />
      <div className="absolute bottom-1/4 left-0 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-cyan-500/40 rounded-full blur-md" />
      <div className="absolute top-0 right-1/4 w-2 sm:w-3 md:w-3.5 h-2 sm:h-3 md:h-3.5 bg-fuchsia-500/40 rounded-full blur-md" />
      <div className="absolute bottom-0 right-1/4 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-amber-500/40 rounded-full blur-md" />
      <div className="absolute top-1/3 left-1/5 w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 bg-violet-500/40 rounded-full blur-md" />
    </div>
    
    {/* Inner orbit */}
    <div className="absolute w-[150px] sm:w-[250px] md:w-[350px] h-[150px] sm:h-[250px] md:h-[350px] opacity-30 animate-orbit-fast">
      <div className="absolute top-0 left-1/3 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-rose-500/40 rounded-full blur-md" />
      <div className="absolute bottom-0 left-1/3 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-emerald-500/40 rounded-full blur-md" />
      <div className="absolute top-1/3 right-0 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-violet-500/40 rounded-full blur-md" />
      <div className="absolute bottom-1/3 right-0 w-2 sm:w-2.5 h-2 sm:h-2.5 bg-sky-500/40 rounded-full blur-md" />
      <div className="absolute bottom-1/5 right-2/5 w-2 sm:w-2.5 md:w-3 h-2 sm:h-2.5 md:h-3 bg-purple-500/40 rounded-full blur-md" />
    </div>
  </div>
);

// Spotlight effect following mouse position
const Spotlight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
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

// Animated card for quick stats or info
const StatCard = ({ icon: Icon, title, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className={`bg-gradient-to-br from-black/80 to-${color}-950/30 p-3 sm:p-4 border border-${color}-800/30 rounded-xl backdrop-blur-sm`}
  >
    <div className="flex items-center">
      <div className={`p-2 sm:p-3 rounded-lg bg-${color}-900/20 mr-3 sm:mr-4`}>
        <Icon className={`w-4 h-4 sm:w-6 sm:h-6 text-${color}-400`} />
      </div>
      <div>
        <h3 className="text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">{title}</h3>
        <p className="text-base sm:text-xl font-bold text-white">{value}</p>
      </div>
    </div>
  </motion.div>
);

// Skeleton loading component for main page
const MainPageSkeleton = () => (
  <div className="text-white min-h-screen overflow-x-hidden relative">
    {/* Navbar skeleton */}
    <div className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-lg border-b border-neutral-800/50">
      <div className="container mx-auto py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="h-8 w-28 bg-neutral-800/70 rounded-lg animate-pulse"></div>
          <div className="flex space-x-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-8 w-8 bg-neutral-800/70 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
    
    {/* Content skeleton */}
    <div className="relative z-10">
      <main className="container mx-auto pt-16 sm:pt-20 pb-16 sm:pb-20 px-4">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 mt-6 sm:mt-8 md:mt-10">
          {/* TrueFocus skeleton */}
          <div className="mb-2">
            <div className="flex items-center justify-center h-12 sm:h-16">
              <div className="w-2/3 max-w-xs h-8 sm:h-10 bg-neutral-800/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
          
          {/* MainInput skeleton */}
          <div className="rounded-xl sm:rounded-2xl border border-neutral-800/50 backdrop-blur-md bg-neutral-900/30 p-4 sm:p-6">
            <div className="w-full h-10 sm:h-12 bg-neutral-800/50 rounded-lg mb-4 animate-pulse"></div>
            <div className="flex justify-between">
              <div className="w-24 h-8 bg-neutral-800/50 rounded-lg animate-pulse"></div>
              <div className="w-24 h-8 bg-neutral-800/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
          
          {/* PrevCources skeleton */}
          <div className="rounded-xl sm:rounded-2xl border border-neutral-800/50 backdrop-blur-md bg-neutral-900/30 p-4 sm:p-6">
            <div className="flex items-center mb-4">
              <div className="w-40 h-6 bg-neutral-800/50 rounded-lg animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-neutral-800/40 p-4 rounded-lg border border-neutral-700/30 animate-pulse">
                  <div className="h-5 w-3/4 bg-neutral-700/50 rounded-md mb-3"></div>
                  <div className="h-4 w-1/2 bg-neutral-700/50 rounded-md mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="w-16 h-6 bg-neutral-700/50 rounded-md"></div>
                    <div className="w-8 h-8 bg-neutral-700/50 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
);

export default function MainPage() {
  const router = useRouter();
  const { contextisLoggedIn } = useUserContext();
  const { toast } = useToast();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    if (!contextisLoggedIn) {
      toast({
        title: "Access Denied",
        description: "Please login to access this page",
        variant: "destructive",
      });
      router.push('/');
    } else {
      // Simulate loading time for components
      const timer = setTimeout(() => {
        setIsPageLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [contextisLoggedIn, router, toast]);

  if (!contextisLoggedIn) {
    return null;
  }

  if (isPageLoading) {
    return <MainPageSkeleton />;
  }

  return (
    <div className="text-white min-h-screen overflow-x-hidden relative">
      {/* Background elements */}
      <OrbitalSpheres />
      <FloatingParticles />
      <Spotlight />
      
      {/* Content */}
      <div className="relative z-10">   
        <main className="container mx-auto pt-16 sm:pt-20 pb-16 sm:pb-20 px-4">
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 mt-6 sm:mt-8 md:mt-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-2"
            >
              <TrueFocus
                sentence="Learn Grow Excel"
                manualMode={false}
                blurAmount={3}
                borderColor="#8b5cf6"
                glowColor="rgba(139, 92, 246, 0.7)"
                animationDuration={0.3}
                pauseBetweenAnimations={2}
              />
            </motion.div>
            
            {/* Main input section */}
            <MainInput />
            
            {/* Previous courses section */}
            <PrevCources />
          </div>
        </main>
      </div>
    </div>
  );
}