import HeroBackground from "./HeroBackground";

const UserInfoSkeleton = () => (
    <div className="min-h-screen pt-16 md:pt-20 lg:pt-28 pb-8 md:pb-12 px-3 md:px-4 bg-black overflow-hidden relative">
      <HeroBackground />
      
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
      
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 lg:space-y-12 relative z-10">
        {/* Header skeleton */}
        <div className="text-center mb-6 md:mb-8 animate-pulse">
          <div className="mb-2 md:mb-3 inline-block">
            <div className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 w-36 h-8"></div>
          </div>
          <div className="h-10 md:h-14 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg w-64 mx-auto mb-2"></div>
          <div className="h-4 bg-neutral-800/50 rounded-lg w-96 max-w-full mx-auto"></div>
        </div>
  
        {/* Profile card skeleton */}
        <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 border border-neutral-700/50 p-4 md:p-8 rounded-xl md:rounded-2xl backdrop-blur-sm shadow-xl animate-pulse">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-800/80"></div>
              <div>
                <div className="h-8 bg-neutral-800/80 rounded-lg w-48 mb-2"></div>
                <div className="h-4 bg-neutral-800/60 rounded-lg w-32"></div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
              <div className="w-full sm:w-36 h-10 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-lg"></div>
              <div className="w-full sm:w-36 h-10 bg-gradient-to-r from-blue-600/30 to-teal-600/30 rounded-lg"></div>
            </div>
          </div>
        </div>
  
        {/* Cards grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 animate-pulse">
          {/* Friends card */}
          <div className="bg-neutral-900/50 border border-neutral-800 p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="h-6 w-24 bg-neutral-800/70 rounded-lg"></div>
              <div className="h-4 w-16 bg-neutral-800/50 rounded-lg"></div>
            </div>
            <div className="space-y-3 md:space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 bg-neutral-800/40 rounded-lg border border-neutral-700/30"></div>
              ))}
            </div>
          </div>
  
          {/* Interview slots card */}
          <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 border border-neutral-700/50 p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="h-6 w-40 bg-neutral-800/70 rounded-lg"></div>
              <div className="h-6 w-24 bg-neutral-800/50 rounded-lg"></div>
            </div>
            <div className="space-y-3 md:space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="h-20 bg-neutral-800/40 rounded-lg border border-neutral-700/30"></div>
              ))}
            </div>
          </div>
  
          {/* Under review card */}
          <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 border border-neutral-700/50 p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm shadow-xl">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="h-6 w-32 bg-neutral-800/70 rounded-lg"></div>
              <div className="h-6 w-24 bg-neutral-800/50 rounded-lg"></div>
            </div>
            <div className="space-y-3 md:space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="h-20 bg-neutral-800/40 rounded-lg border border-neutral-700/30"></div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Previous courses skeleton */}
        <div className="bg-neutral-900/50 border border-neutral-800 p-4 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-sm animate-pulse">
          <div className="h-6 w-48 bg-neutral-800/70 rounded-lg mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-32 bg-neutral-800/40 rounded-lg border border-neutral-700/30"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  export default UserInfoSkeleton;