"use client";
import { useUserContext } from '@/app/context/Userinfo';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import PrevCources from '@/components/PrevCources';
import { 
  Calendar, Users, Clock, Award, Briefcase, 
  Download, ExternalLink, Shield, Star,
  GraduationCap, FileText, Activity, Sparkles
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { useRouter } from 'next/navigation';
import { saveAs } from 'file-saver';

const HeroBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black" />
    <div className="absolute inset-0 bg-grid-small-white/[0.1] -z-10" />
    <div className="absolute inset-0 bg-dot-white/[0.1] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
    <motion.div 
      className="absolute inset-0 bg-gradient-radial from-neutral-800/20 via-transparent to-transparent"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.4, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    />
  </div>
);

const FriendCard = ({ friend }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl flex items-center space-x-4 hover:bg-neutral-800/50 transition-all duration-300 backdrop-blur-sm group"
  >
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center text-neutral-200 ring-2 ring-neutral-700/50 group-hover:ring-neutral-600/50 transition-all duration-300">
      {friend.name.charAt(0).toUpperCase()}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-neutral-200 font-medium truncate font-heading">{friend.name}</h4>
      <p className="text-sm text-neutral-400 truncate font-sans">{friend.status}</p>
    </div>
    <div className={`flex-shrink-0 w-2 h-2 rounded-full ${friend.isOnline ? 'bg-green-500' : 'bg-neutral-600'} ring-2 ${friend.isOnline ? 'ring-green-500/20' : 'ring-neutral-600/20'}`} />
  </motion.div>
);

const InterviewSlotCard = ({ slot, onJoinMeet }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, boxShadow: "0 15px 30px -8px rgba(0, 0, 0, 0.3)" }}
    className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 border border-neutral-700/50 p-5 rounded-xl backdrop-blur-sm hover:border-neutral-600/80 transition-all duration-300 group"
  >
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500/80 ring-2 ring-blue-500/20" />
          <h4 className="text-neutral-200 font-semibold text-lg font-heading">{slot.internship_name}</h4>
        </div>
        <p className="text-neutral-400 text-sm flex items-center font-sans">
          <Briefcase className="w-4 h-4 mr-1 text-neutral-500" />
          {slot.company_name}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <p className="text-neutral-400 text-sm flex items-center font-sans">
          <Clock className="w-4 h-4 mr-1 text-neutral-500" />
          {new Date(slot.interviw_time).toLocaleString()}
        </p>
        {slot.is_selected && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onJoinMeet(slot)}
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-2 rounded-xl text-white text-sm font-medium hover:from-emerald-500 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-900/20 border border-emerald-500/20"
          >
            Join Meet
          </motion.button>
        )}
      </div>
    </div>
  </motion.div>
);

// UserInfo page skeleton loader
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

const UserInfoPage = () => {
  const { email, name, isLoggedIn } = useAuth();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    role: '',
    joinDate: '',
    lastActive: '',
    preferences: {
      theme: 'dark',
      notifications: true,
      language: 'en',
    }
  });
  const [interviewSlots, setInterviewSlots] = useState([]);
  const [interviewreview, setInterviewreview] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { data: session } = useSession();
  const { contextsetIsLoggedIn, contextsetEmail, contextsetName, contextisLoggedIn, setcontextInterviewdeets, contextInterviewdeets } = useUserContext();

  const Getuserinfo = async () => {
    setIsLoading(true); // Set loading to true when fetching starts
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.log("no token")
      setIsLoading(false); // Set loading to false if no token
      return;
    }

    try {
      const response = await fetch('https://api-ape.crodlin.in/api/user', {
        method: 'GET',
        headers: {
          "Authorization": token,
          'Content-Type': "application/json",
        },
        credentials: 'include',
      });

      console.log('Response Status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error Response:', errorText);

        if (response.status === 401) {
          console.error('Unauthorized: Check your token and permissions.');
        } else if (response.status === 404) {
          console.error('Not Found: The requested resource does not exist.');
        } else {
          console.error(`HTTP Error: ${response.statusText}`);
        }

        throw new Error(`HTTP Error: ${response.statusText}`);
      }

      const result = await response.json();

      setInterviewSlots(result.interview_selected);
      setInterviewreview(result.internship_under_review);
      contextsetIsLoggedIn(true);
      contextsetEmail(result.email);
      contextsetName(result.name);

    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setIsLoading(false); // Set loading to false when fetching ends
    }
  };

  useEffect(() => {
    Getuserinfo();
  }, [contextisLoggedIn]);

  const router = useRouter();

  const friends = [
    { id: 1, name: 'Sarah Chen', status: 'Working on Web Development', isOnline: true },
    { id: 2, name: 'Mike Johnson', status: 'Learning React', isOnline: false },
    { id: 3, name: 'Emily Davis', status: 'Studying Data Structures', isOnline: true },
    { id: 4, name: 'Alex Thompson', status: 'Practicing Algorithms', isOnline: true },
    { id: 5, name: 'Jessica Lee', status: 'Taking a break', isOnline: false },
  ];

  const handleJoinMeet = (slot) => {
    setcontextInterviewdeets(slot);
    router.push(`/AiInterview/${slot.id}`);
    console.log(contextInterviewdeets);
    console.log(slot.id);
  };

  const handleDownloadResume = async () => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`https://api-ape.crodlin.in/api/resume/${session?.user?.email}`, {
      method: 'GET',
      headers: {
        "Authorization": token,
        'Content-Type': "application/json",
      },
      credentials: 'include',
    });
    const data = await response.blob();
    saveAs(data, `${session?.user?.name}.pdf`);
  }

  if (isLoading) {
    return <UserInfoSkeleton />;
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-28 pb-12 px-4 bg-black overflow-hidden relative">
      <HeroBackground />

      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="mb-3 inline-block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm text-sm font-medium text-purple-300 mb-3 inline-block"
            >
              <span className="flex items-center">
                <Shield className="w-3.5 h-3.5 mr-1.5" />
                Personal Dashboard
              </span>
            </motion.div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-blue-300 to-teal-300 font-heading drop-shadow-sm">
            User Profile
          </h1>
          <p className="text-neutral-400 mt-3 font-sans max-w-xl mx-auto">
            Manage your account settings, track your learning progress, and connect with your peers
          </p>
        </motion.div>

        {/* User info card with glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 border border-neutral-700/50 p-8 rounded-2xl backdrop-blur-sm shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-shrink-0 relative group">
                <div className="relative">
                  <AnimatedTooltip
                    items={[{
                      id: 1,
                      name: session?.user?.name || "User",
                      designation: "Member",
                      image: session?.user?.image || "/default-avatar.png",
                    }]}
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 font-heading">{session?.user?.name}</h2>
                <p className="text-sm text-neutral-400 font-sans flex items-center mt-1">
                  <GraduationCap className="w-4 h-4 mr-1.5 text-neutral-500" />
                  {session?.user?.email}
                </p>
                
                <div className="flex mt-3 gap-3">

                  {/* <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
                    Student
                  </div>
                  <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
                    Developer
                  </div> */}

                </div>
              </div>
            </div>

            <motion.div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg shadow-purple-600/25 border border-purple-500/20 font-sans flex items-center justify-center gap-2"
                onClick={handleDownloadResume}
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push(`/portfolio/${session?.user?.email}`)}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white rounded-xl text-sm font-medium transition-all duration-200 shadow-lg shadow-blue-600/25 border border-blue-500/20 font-sans flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Portfolio</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-300" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-200 font-heading">Friends</h3>
              </div>
              <span className="text-sm text-neutral-400 font-sans">{friends.length} friends</span>
            </div>
            <div className="space-y-4">
              <AnimatePresence>
                {friends.map((friend) => (
                  <FriendCard key={friend.id} friend={friend} />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 border border-neutral-700/50 p-6 rounded-2xl backdrop-blur-sm shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-teal-300" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-200 font-heading">Interview Slots</h3>
              </div>
              <div className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.45, type: "spring" }}
                  className="px-2.5 py-1 rounded-full bg-gradient-to-r from-teal-500/10 to-emerald-500/10 text-xs text-teal-300 border border-teal-500/20"
                >
                  <span className="flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {interviewSlots.length} interviews
                  </span>
                </motion.div>
              </div>
            </div>
            <div className="space-y-4">
              {interviewSlots.length > 0 ? (
                interviewSlots.map((slot) => (
                  <InterviewSlotCard
                    key={slot.id}
                    slot={slot}
                    onJoinMeet={handleJoinMeet}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-neutral-800/30 border border-neutral-700/30 rounded-xl p-6 text-center"
                >
                  <Calendar className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
                  <p className="text-neutral-400 font-sans">No interview slots scheduled</p>
                  <p className="text-neutral-500 text-sm mt-1">Your upcoming interviews will appear here</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 border border-neutral-700/50 p-6 rounded-2xl backdrop-blur-sm shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-300" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-200 font-heading">Under Review</h3>
              </div>
              <div className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-xs text-amber-300 border border-amber-500/20"
                >
                  <span className="flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {interviewreview.length} interviews
                  </span>
                </motion.div>
              </div>
            </div>
            <div className="space-y-4">
              {interviewreview.length > 0 ? (
                interviewreview.map((slot) => (
                  <InterviewSlotCard
                    key={slot.id}
                    slot={slot}
                    onJoinMeet={handleJoinMeet}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-neutral-800/30 border border-neutral-700/30 rounded-xl p-6 text-center"
                >
                  <Award className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
                  <p className="text-neutral-400 font-sans">No interviews under review</p>
                  <p className="text-neutral-500 text-sm mt-1">Interviews awaiting review will appear here</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        <PrevCources />
      </div>
    </div>
  );
};

export default UserInfoPage;