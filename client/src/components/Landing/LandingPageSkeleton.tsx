"use client";
// Landing page skeleton component
const LandingPageSkeleton = () => {
    return (
      <div className="min-h-screen overflow-hidden bg-black">
        {/* Background skeleton */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-ai-blue-900/30 z-0" />
        <div className="absolute inset-0 bg-grid-small-white/[0.2] z-0" />
        
        {/* Navbar skeleton */}
        <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-neutral-800/50 bg-black/60">
          <div className="container mx-auto py-4 px-4">
            <div className="flex items-center justify-between">
              <div className="h-8 w-28 bg-neutral-800/70 rounded-lg animate-pulse"></div>
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-8 w-16 bg-neutral-800/70 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero skeleton */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
            {/* Badge skeleton */}
            <div className="mb-8 w-64 h-10 bg-ai-blue-500/10 rounded-full animate-pulse"></div>
            
            {/* Title skeleton */}
            <div className="h-16 w-3/4 bg-neutral-800/70 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-16 w-2/3 bg-neutral-800/70 rounded-lg mb-8 animate-pulse"></div>
            
            {/* Subtitle skeleton */}
            <div className="h-6 w-1/2 bg-neutral-800/50 rounded-lg mb-4 animate-pulse"></div>
            <div className="h-6 w-2/5 bg-neutral-800/50 rounded-lg mb-8 animate-pulse"></div>
            
            {/* Code block skeleton */}
            <div className="max-w-lg w-full mb-10 overflow-hidden bg-neutral-900/50 rounded-lg">
              <div className="h-40 w-full p-4 animate-pulse">
                <div className="flex items-center gap-1 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                </div>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`h-4 bg-neutral-800/70 rounded mb-3 w-${Math.floor(Math.random() * 3) + 7}/12`}></div>
                ))}
              </div>
            </div>
            
            {/* CTA buttons skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="h-12 w-40 bg-gradient-to-r from-ai-blue-500/30 to-ai-teal-500/30 rounded-md animate-pulse"></div>
              <div className="h-12 w-40 bg-neutral-800/30 border border-glass-border rounded-md animate-pulse"></div>
            </div>
            
            {/* Users count skeleton */}
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-full w-56 h-12 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LandingPageSkeleton;