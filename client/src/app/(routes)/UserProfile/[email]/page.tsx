"use client";
import { useUserContext } from '@/context/UserInfo';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import PrevCources from '@/components/UserMain/PrevCources';
import { 
  Calendar, Users, Clock, Award, Briefcase, 
  Download, ExternalLink, Shield, Star,
  GraduationCap, FileText, Activity, Sparkles
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { apeService } from '@/api/userProfileService';
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { useRouter } from 'next/navigation';
import { IMAGES } from '@/constants/image';
import HeroBackground from '@/components/UserProfile/HeroBackground';
import FriendCard from '@/components/UserProfile/FriendCard';
import InterviewSlotCard from '@/components/UserProfile/InterviewSlotCard';
import UserInfoSkeleton from '@/components/UserProfile/UserInfoSkeleton';

const UserInfoPage = () => {
  const { user } = useAuth();
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
  const [interviewSlots, setInterviewSlots] = useState<InterviewSlot[]>([]);
  const [interviewreview, setInterviewreview] = useState<InterviewSlot[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { contextsetIsLoggedIn, contextsetEmail, contextsetName, contextisLoggedIn, contextsetInterviewdeets, contextInterviewdeets } = useUserContext();

  type InterviewSlot = { id: number; internship_name: string; company_name: string; interviw_time: string; is_selected?: boolean };

  const Getuserinfo = async () => {
    setIsLoading(true); // Set loading to true when fetching starts
    const token = localStorage.getItem('auth_token') || '';

    if (!token) {
      console.log("no token")
      setIsLoading(false); // Set loading to false if no token
      return;
    }

    try {
      if (!token) {
        console.log("no token");
        setIsLoading(false);
        return;
      }
      const result = await apeService.getUser(token);

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

  const handleJoinMeet = (slot: InterviewSlot) => {
    contextsetInterviewdeets(slot as any);
    router.push(`/AiInterview/${slot.id}`);
    console.log(contextInterviewdeets);
    console.log(slot.id);
  };

  const handleDownloadResume = async () => {
    try {
      const token = localStorage.getItem('auth_token') || '';
      if (!token || !user?.email) return;
      const blob = await apeService.downloadResume(token, user.email as string);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${user?.name || 'resume'}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download resume:', error);
    }
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
                      name: user?.name || "User",
                      designation: "Student",
                      image: user?.profile_image || IMAGES.DEFAULT_AVATAR,
                    }]}
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400 font-heading">{user?.name}</h2>
                <p className="text-sm text-neutral-400 font-sans flex items-center mt-1">
                  <GraduationCap className="w-4 h-4 mr-1.5 text-neutral-500" />
                  {user?.email}
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
                onClick={() => router.push(`/Portfolio/${user?.email}`)}
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