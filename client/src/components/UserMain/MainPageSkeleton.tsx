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


  export default MainPageSkeleton;