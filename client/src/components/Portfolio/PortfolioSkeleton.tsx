export const PortfolioSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navbar skeleton */}
        <div className="flex items-center justify-between mb-12 animate-pulse">
          <div className="h-8 w-28 bg-neutral-800/70 rounded-lg"></div>
          <div className="flex space-x-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-8 w-16 bg-neutral-800/70 rounded-lg"></div>
            ))}
          </div>
        </div>
        
        {/* Header skeleton */}
        <div className="mb-12 animate-pulse">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-32 h-32 rounded-full bg-neutral-800/50 mb-4"></div>
            <div className="flex-1">
              <div className="h-10 w-64 bg-neutral-800/70 rounded-lg mb-4"></div>
              <div className="h-5 w-40 bg-neutral-800/50 rounded-lg mb-6"></div>
              <div className="h-20 w-full bg-neutral-800/30 rounded-lg"></div>
            </div>
          </div>
        </div>
        
        {/* Skills section skeleton */}
        <div className="mb-16 animate-pulse">
          <div className="h-8 w-32 bg-neutral-800/70 rounded-lg mb-6"></div>
          <div className="flex flex-wrap gap-3">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="h-10 w-24 bg-neutral-800/40 rounded-full"></div>
            ))}
          </div>
        </div>
        
        {/* Projects section skeleton */}
        <div className="mb-16 animate-pulse">
          <div className="h-8 w-36 bg-neutral-800/70 rounded-lg mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800/50">
                <div className="h-8 w-48 bg-neutral-800/70 rounded-lg mb-4"></div>
                <div className="h-4 w-full bg-neutral-800/40 rounded-md mb-3"></div>
                <div className="h-4 w-2/3 bg-neutral-800/40 rounded-md mb-3"></div>
                <div className="h-4 w-3/4 bg-neutral-800/40 rounded-md mb-6"></div>
                <div className="flex gap-2">
                  {[1, 2, 3].map(j => (
                    <div key={j} className="h-6 w-16 bg-neutral-800/50 rounded-full"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Education section skeleton */}
        <div className="animate-pulse">
          <div className="h-8 w-44 bg-neutral-800/70 rounded-lg mb-6"></div>
          <div className="space-y-4">
            {Array(2).fill(0).map((_, i) => (
              <div key={i} className="bg-neutral-900/50 rounded-xl p-5 border border-neutral-800/50">
                <div className="h-7 w-64 bg-neutral-800/70 rounded-lg mb-3"></div>
                <div className="h-4 w-40 bg-neutral-800/50 rounded-lg mb-2"></div>
                <div className="h-4 w-full bg-neutral-800/40 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};