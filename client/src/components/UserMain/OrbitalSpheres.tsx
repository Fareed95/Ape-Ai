
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

  export default OrbitalSpheres;
  