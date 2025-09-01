"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import OrgAnalytics from "@/components/CompanyProfile/OrgAnalytics";
import OrgSettings from "@/components/CompanyProfile/OrgSettings";
import InterviewPanels from "@/components/CompanyProfile/InterviewPanels";
import {
  BarChart3,
  Users,
  Settings,
  ChevronDown,
  Calendar,
  MessageSquare,
  LayoutDashboard,
  Briefcase,
  Menu,
  X,
  Clock,
  Video,
  Link as LinkIcon,
  Plus,
  User,
  CalendarDays,
  Check,
} from "lucide-react";
import { useRouter } from "next/navigation"

const StatCard = ({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend: any }) => (
  <div className="bg-black p-4 sm:p-6 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-neutral-400">{title}</p>
        <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{value}</h3>
      </div>
      <div className="p-2 sm:p-3 bg-neutral-800/50 rounded-lg">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center">
        <div className={`text-xs sm:text-sm ${trend.type === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend.value}
        </div>
        <span className="text-xs sm:text-sm text-neutral-500 ml-2">vs last month</span>
      </div>
    )}
  </div>
);

const MeetingScheduler = () => {
  const router = useRouter();

  const [meetings, setMeetings] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      date: "2023-06-15",
      time: "14:30",
      duration: "30",
      type: "interview",
      status: "scheduled"
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    duration: "30",
    type: "interview",
    notes: ""
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newMeeting = {
      id: Date.now(),
      ...formData,
      status: "scheduled"
    };
    setMeetings(prev => [...prev, newMeeting]);
    setFormData({
      name: "",
      email: "",
      date: "",
      time: "",
      duration: "30",
      type: "interview",
      notes: ""
    });
    setShowForm(false);
  };

  const getMeetingTypeIcon = (type : any) => {
    switch (type) {
      case "interview": return <Users className="w-4 h-4 text-blue-400" />;
      case "followup": return <MessageSquare className="w-4 h-4 text-green-400" />;
      case "technical": return <Briefcase className="w-4 h-4 text-purple-400" />;
      default: return <Calendar className="w-4 h-4 text-neutral-400" />;
    }
  };

  const getMeetingTypeLabel = (type : any) => {
    switch (type) {
      case "interview": return "Interview";
      case "followup": return "Follow-up";
      case "technical": return "Technical";
      default: return "General";
    }
  };

  const handleMeetingClick = (meeting : any) => {
    console.log( meeting.email);
    router.push(`/VideoCall/${meeting.email}`);
  };

  return (
    <div className="space-y-6 bg-black">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Scheduled Meetings</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Meeting</span>
        </motion.button>
      </div>

      {/* Meeting Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Schedule New Meeting</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-1 hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Participant Name */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm text-neutral-300">
                      <User className="w-4 h-4 text-neutral-400" />
                      <span>Participant Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter participant name"
                      className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm text-neutral-300">
                      <MessageSquare className="w-4 h-4 text-neutral-400" />
                      <span>Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter email address"
                      className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-200"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm text-neutral-300">
                      <CalendarDays className="w-4 h-4 text-neutral-400" />
                      <span>Date</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-200"
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm text-neutral-300">
                      <Clock className="w-4 h-4 text-neutral-400" />
                      <span>Time</span>
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-200"
                    />
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm text-neutral-300">
                      <Clock className="w-4 h-4 text-neutral-400" />
                      <span>Duration (minutes)</span>
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-200"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="90">90 minutes</option>
                    </select>
                  </div>

                  {/* Meeting Type */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm text-neutral-300">
                      <Video className="w-4 h-4 text-neutral-400" />
                      <span>Meeting Type</span>
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-200"
                    >
                      <option value="interview">Interview</option>
                      <option value="followup">Follow-up</option>
                      <option value="technical">Technical Assessment</option>
                      <option value="general">General Meeting</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm text-neutral-300">
                    <MessageSquare className="w-4 h-4 text-neutral-400" />
                    <span>Meeting Notes</span>
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Add any additional notes or agenda items"
                    rows={3}
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20 transition-all duration-200"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-2">
                  <motion.button
                    type="button"
                    onClick={() => setShowForm(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-neutral-800 text-neutral-300 hover:bg-neutral-700 rounded-lg transition-all duration-200 text-sm"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 text-sm"
                  >
                    Schedule Meeting
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Meetings List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meetings.map((meeting) => (
          <motion.div
            key={meeting.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => handleMeetingClick(meeting)}
            className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-all duration-300 cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-neutral-800/80 rounded-lg mt-1">
                  {getMeetingTypeIcon(meeting.type)}
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">{meeting.name}</h3>
                  <p className="text-sm text-neutral-400">{meeting.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <CalendarDays className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="text-xs text-neutral-400">
                      {new Date(`${meeting.date}T${meeting.time}`).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <Clock className="w-3.5 h-3.5 text-neutral-500 ml-1" />
                    <span className="text-xs text-neutral-400">
                      {new Date(`2000-01-01T${meeting.time}`).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    <span className="text-xs text-neutral-500">({meeting.duration} min)</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  meeting.status === 'completed'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                }`}>
                  {meeting.status === 'completed' ? 'Completed' : 'Scheduled'}
                </span>
                <span className="text-xs text-neutral-500 mt-2">{getMeetingTypeLabel(meeting.type)}</span>
              </div>
            </div>
            <div className="flex justify-end mt-3 space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <LinkIcon className="w-4 h-4 text-neutral-400" />
              </motion.button>
              {meeting.status !== 'completed' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4 text-green-400" />
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function OrganizationDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { data: session } = useSession();
  const orgName = session?.user?.name || "Organization";

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "interviews", label: "Interviews", icon: Briefcase },
    { id: "meetings", label: "Meetings", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const stats = [
    {
      title: "Total Interviews",
      value: "2,834",
      icon: Users,
      trend: { type: "up", value: "+14.2%" }
    },
    {
      title: "Completion Rate",
      value: "94.2%",
      icon: BarChart3,
      trend: { type: "up", value: "+5.1%" }
    },
    {
      title: "Active Sessions",
      value: "48",
      icon: Calendar,
      trend: { type: "down", value: "-2.5%" }
    },
    {
      title: "Avg. Response Time",
      value: "1.2h",
      icon: MessageSquare,
      trend: { type: "up", value: "+12.5%" }
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6 bg-black">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-neutral-900/50 p-4 sm:p-6 rounded-xl border border-neutral-800">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                {/* Add recent activity content */}
              </div>
              <div className="bg-neutral-900/50 p-4 sm:p-6 rounded-xl border border-neutral-800">
                <h3 className="text-lg font-semibold text-white mb-4">Upcoming Interviews</h3>
                {/* Add upcoming interviews content */}
              </div>
            </div>
          </div>
        );
      case "analytics":
        return <OrgAnalytics />;
      case "interviews":
        return <InterviewPanels />;
      case "meetings":
        return <MeetingScheduler />;
      case "settings":
        return <OrgSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 h-20">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-neutral-800 rounded-lg"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="w-5 h-5 text-neutral-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 top-32 bg-black/50 z-40"
              onClick={() => setShowMobileMenu(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="lg:hidden fixed top-32 left-0 bottom-0 w-64 bg-neutral-900 border-r border-neutral-800 z-50"
            >
              <div className="flex items-center justify-between p-4 border-b border-neutral-800">
                <h2 className="text-lg font-bold text-white">{orgName}</h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 hover:bg-neutral-800 rounded-lg"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>
              <nav className="p-4 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setShowMobileMenu(false);
                      }}
                      className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? "bg-white/10 text-white"
                          : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed top-16 left-0 bottom-0 w-64 bg-neutral-900/80 backdrop-blur-xl border-r border-neutral-800 z-40">
        <div className="flex flex-col w-full">
          <div className="p-6 border-b border-neutral-800">
            <h1 className="text-xl font-bold text-white">{orgName}</h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-white/10 text-white"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-neutral-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {orgName.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{orgName}</p>
                <p className="text-xs text-neutral-400 truncate">Organization Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:pl-64 bg-black">
        <div className="pt-20 lg:pt-8 px-4 pb-12">

          <div className="max-w-7xl mx-auto">
            {/* Top Bar - Desktop */}
            <div className="hidden lg:flex justify-between items-center mb-8">
              {/* <div>
                <h2 className="text-2xl font-bold text-white">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                <p className="text-neutral-400 mt-1">Manage your organization's {activeTab}</p>
              </div> */}
              {/* <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-neutral-800/50 text-neutral-200 pl-9 pr-4 py-2 rounded-lg border border-neutral-700 focus:outline-none focus:border-neutral-600 w-64"
                  />
                </div>
                <button className="p-2 hover:bg-neutral-800 rounded-lg">
                  <Bell className="w-5 h-5 text-neutral-400" />
                </button>
              </div>*/}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}