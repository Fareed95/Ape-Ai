// Congratulations page skeleton loader
const CongratualtionsSkeleton = () => {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center relative overflow-hidden py-16 px-4">
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
        
        {/* Card skeleton */}
        <div className="w-full max-w-lg bg-neutral-900/30 border border-neutral-800/50 p-6 sm:p-8 rounded-2xl text-center relative z-10 shadow-2xl backdrop-blur-sm animate-pulse">
          {/* Header skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-r from-neutral-800/70 to-neutral-700/70 mx-auto mb-4"></div>
            <div className="h-8 w-48 bg-neutral-800/70 rounded-lg mx-auto mb-2"></div>
            <div className="h-4 w-32 bg-neutral-800/50 rounded-lg mx-auto"></div>
          </div>
          
          {/* Progress circle skeleton */}
          <div className="my-6 sm:my-8 flex items-center justify-center">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <div className="absolute inset-0 rounded-full border-8 border-neutral-800/40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-10 w-16 bg-neutral-800/70 rounded-lg"></div>
              </div>
            </div>
          </div>
          
          {/* Message skeleton */}
          <div className="space-y-3 mb-6">
            <div className="h-6 w-2/3 bg-neutral-800/70 rounded-lg mx-auto"></div>
            <div className="h-4 w-1/2 bg-neutral-800/50 rounded-lg mx-auto"></div>
          </div>
          
          {/* Buttons skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="w-full sm:w-auto h-12 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-lg"></div>
            <div className="w-full sm:w-auto h-12 bg-neutral-800/50 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  };

  export default CongratualtionsSkeleton