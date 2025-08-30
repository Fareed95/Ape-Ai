"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, RotateCcw, Terminal, Server, Activity } from 'lucide-react';
import Link from 'next/link';

export default function ErrorPage({ error, reset }) {
  const [errorCode] = useState(500);
  const [countdown, setCountdown] = useState(10);
  const [showDetails, setShowDetails] = useState(false);
  const [errorLines] = useState([
    "System Error Detected",
    "Attempting to stabilize connection...",
    "Neural pathways disrupted",
    "Diagnostic scan initiated",
    "Searching for viable solution",
    "Quantum recalibration in progress"
  ]);

  useEffect(() => {
    // Countdown effect
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col">
      {/* Fixed position background elements */}
      <div className="fixed inset-0 bg-gradient-radial from-neutral-900 to-neutral-950 opacity-80 z-0" />
      
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute h-px bg-red-500/40"
              style={{
                left: 0,
                right: 0,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
                height: `${Math.random() * 2}px`,
                filter: 'blur(1px)',
                animation: `scanline ${Math.random() * 3 + 2}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Grid pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDE1IEwgNjAgMTUgTSAxNSAwIEwgMTUgNjAgTSAwIDMwIEwgNjAgMzAgTSAzMCAwIEwgMzAgNjAgTSAwIDQ1IEwgNjAgNDUgTSA0NSAwIEwgNDUgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDAsIDAsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')] opacity-10 z-0" />

      {/* Content area - with appropriate padding/margin to prevent overlap */}
      <main className="relative z-10 flex-1 flex flex-col items-center pt-12 pb-8 px-4">
        {/* Error Code Display */}
        <div className="w-full text-center mb-6">
          <div className="text-neutral-500 text-sm">Error Code: {errorCode}</div>
        </div>

        {/* Error visualization */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 1.02, 1],
                rotate: [0, 1, 0, -1, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                ease: "easeInOut"
              }}
              className="text-[120px] font-bold text-red-500 opacity-90 tracking-tighter"
            >
              500
            </motion.div>
            
            <motion.div 
              animate={{ 
                opacity: [0.8, 0.4, 0.8],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
              }}
              className="absolute -inset-4 rounded-full bg-red-500/5 blur-xl"
            />
          </div>
        </div>

        {/* Main content card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-morphism border border-red-900/30 rounded-lg p-8 backdrop-blur-md relative overflow-hidden w-full max-w-2xl mx-auto"
        >
          {/* Alert header */}
          <div className="flex items-center space-x-3 mb-6 border-b border-red-900/20 pb-4">
            <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-200">Server Error Detected</h2>
              <p className="text-neutral-400 text-sm">Status Code: {errorCode}</p>
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-8">
            <p className="text-neutral-400 mb-4">
              We've encountered an unexpected issue on the server. Our team has been notified and is working to resolve it.
            </p>
          </div>

          {/* Terminal output */}
          <motion.div 
            className="bg-neutral-900 border border-neutral-800 rounded-md p-4 font-mono text-xs overflow-hidden mb-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-2">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-1.5"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1.5"></div>
              <div className="h-3 w-3 rounded-full bg-green-500 mr-1.5"></div>
              <span className="text-neutral-500 text-xs ml-2">system_diagnostic.sh</span>
            </div>
            
            <div className="text-neutral-300">
              {errorLines.map((line, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="flex"
                >
                  <span className="text-red-500 mr-2">{'>'}</span>
                  <span>{line}</span>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1, delay: errorLines.length * 0.2 + 0.5 }}
                className="inline-block h-4 w-2 bg-neutral-300 ml-1 align-middle"
              />
            </div>
          </motion.div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md w-full sm:w-auto transition-colors duration-300"
              onClick={() => reset()}
            >
              <RotateCcw size={16} />
              <span>Retry Connection {countdown > 0 && `(${countdown}s)`}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 border border-neutral-700 hover:border-neutral-600 text-neutral-300 py-2 px-4 rounded-md w-full sm:w-auto transition-colors duration-300"
              onClick={() => window.location.href = '/'}
            >
              Return to Home
            </motion.button>
          </div>

          {/* Error details collapsible section */}
          <div className="mt-6 border-t border-neutral-800 pt-4">
            <button 
              className="flex items-center justify-between w-full text-neutral-400 hover:text-neutral-300 text-sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              <span className="flex items-center gap-1.5">
                <Terminal size={14} />
                Technical Details
              </span>
              <span>{showDetails ? '−' : '+'}</span>
            </button>
            
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 text-xs text-neutral-500 font-mono">
                    <p>{error?.message || "Unknown server error occurred"}</p>
                    <p className="mt-2">{error?.stack?.split('\n').slice(0, 3).join('\n') || "No stack trace available"}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* System status indicators */}
        <div className="mt-4 flex justify-between items-center px-2 w-full max-w-2xl mx-auto">
          <div className="flex items-center gap-2 text-neutral-500 text-xs">
            <Server size={12} />
            <span>Server Status: Degraded</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-neutral-500 text-xs">System recovering</span>
          </div>
        </div>
      </main>
      
      {/* Add some CSS for custom animations */}
      <style jsx global>{`
        .glass-morphism {
          background: rgba(20, 20, 20, 0.7);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        
        @keyframes scanline {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}