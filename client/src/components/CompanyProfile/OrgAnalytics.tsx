import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, Clock, Award, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { apeService } from "@/api/userProfileService";
import { useAuth } from "@/context/AuthContext";

export default function OrgAnalytics() {
  const [metrics, setMetrics] = useState([
    { 
      label: "Total Internships", 
      value: "0", 
      change: "0%",
      icon: Award,
      color: "from-emerald-500/20 to-teal-500/20"
    },
    { 
      label: "Total Applications", 
      value: "0", 
      change: "0%",
      icon: Users,
      color: "from-blue-500/20 to-indigo-500/20"
    },
    { 
      label: "Selected Candidates", 
      value: "0", 
      change: "0%",
      icon: Star,
      color: "from-purple-500/20 to-pink-500/20"
    },
    { 
      label: "Completion Rate", 
      value: "0%", 
      change: "0%",
      icon: Clock,
      color: "from-amber-500/20 to-orange-500/20"
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('auth_token') || '';
        if (!token || !user) {
          setIsLoading(false);
          return;
        }

        // Get user data to find company ID
        const userData = await apeService.getUser(token);
        const companyId = userData.companies?.[0]?.id;
        
        if (!companyId) {
          setError('No company found');
          setIsLoading(false);
          return;
        }

        // Try to get analytics (if endpoint exists)
        try {
          const analytics = await apeService.getCompanyAnalytics(token, companyId);
          
          if (analytics) {
            setMetrics([
              { 
                label: "Total Internships", 
                value: analytics.total_internships?.toString() || "0", 
                change: analytics.internships_change || "0%",
                icon: Award,
                color: "from-emerald-500/20 to-teal-500/20"
              },
              { 
                label: "Total Applications", 
                value: analytics.total_applications?.toString() || "0", 
                change: analytics.applications_change || "0%",
                icon: Users,
                color: "from-blue-500/20 to-indigo-500/20"
              },
              { 
                label: "Selected Candidates", 
                value: analytics.selected_candidates?.toString() || "0", 
                change: analytics.selection_change || "0%",
                icon: Star,
                color: "from-purple-500/20 to-pink-500/20"
              },
              { 
                label: "Completion Rate", 
                value: analytics.completion_rate || "0%", 
                change: analytics.completion_change || "0%",
                icon: Clock,
                color: "from-amber-500/20 to-orange-500/20"
              },
            ]);
          }
        } catch (analyticsError) {
          // Fallback: Get basic data from internships endpoint
          try {
            const internships = await apeService.getCompanyInternships(token, companyId);
            const totalInternships = internships?.length || 0;
            const totalApplications = internships?.reduce((sum: number, internship: any) => 
              sum + (internship.students_under_review?.length || 0) + (internship.students_for_interview?.length || 0), 0) || 0;
            const selectedCandidates = internships?.reduce((sum: number, internship: any) => 
              sum + (internship.students_for_interview?.length || 0), 0) || 0;

            setMetrics([
              { 
                label: "Total Internships", 
                value: totalInternships.toString(), 
                change: "+0%",
                icon: Award,
                color: "from-emerald-500/20 to-teal-500/20"
              },
              { 
                label: "Total Applications", 
                value: totalApplications.toString(), 
                change: "+0%",
                icon: Users,
                color: "from-blue-500/20 to-indigo-500/20"
              },
              { 
                label: "Selected Candidates", 
                value: selectedCandidates.toString(), 
                change: "+0%",
                icon: Star,
                color: "from-purple-500/20 to-pink-500/20"
              },
              { 
                label: "Completion Rate", 
                value: totalApplications > 0 ? `${Math.round((selectedCandidates / totalApplications) * 100)}%` : "0%", 
                change: "+0%",
                icon: Clock,
                color: "from-amber-500/20 to-orange-500/20"
              },
            ]);
          } catch (fallbackError) {
            console.error('Error fetching fallback data:', fallbackError);
          }
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError('Failed to load analytics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-lg animate-pulse">
              <div className="h-4 bg-neutral-800 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-neutral-800 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-neutral-800 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
          <p className="text-red-400 font-semibold mb-2">Error Loading Analytics</p>
          <p className="text-neutral-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${metric.color} rounded-lg blur-xl opacity-25 group-hover:opacity-50 transition-opacity duration-300`} />
              <div className="relative bg-neutral-900/90 border border-neutral-800 p-4 rounded-lg backdrop-blur-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-neutral-800/50 rounded-lg">
                    <Icon className="w-4 h-4 text-neutral-300" />
                  </div>
                  <div className="flex items-center space-x-1 bg-neutral-800/50 px-2 py-1 rounded-full">
                    {parseFloat(metric.change) >= 0 ? (
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-400" />
                    )}
                    <span className={`text-xs font-medium ${
                      parseFloat(metric.change) >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
                <p className="text-xs text-neutral-400">{metric.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-lg backdrop-blur-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">Learning Progress</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Daily progress tracking</p>
            </div>
            <button className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">More options</span>
              •••
            </button>
          </div>
          <div className="h-48 sm:h-64 flex items-center justify-center border border-dashed border-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-400">Chart Placeholder</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-lg backdrop-blur-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">Course Engagement</h3>
              <p className="text-xs text-neutral-400 mt-0.5">User interaction metrics</p>
            </div>
            <button className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">More options</span>
              •••
            </button>
          </div>
          <div className="h-48 sm:h-64 flex items-center justify-center border border-dashed border-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-400">Chart Placeholder</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-neutral-900/90 border border-neutral-800 p-4 rounded-lg backdrop-blur-sm"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">Monthly Activity Overview</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Comprehensive activity analysis</p>
            </div>
            <button className="text-neutral-400 hover:text-white transition-colors">
              <span className="sr-only">More options</span>
              •••
            </button>
          </div>
          <div className="h-48 sm:h-64 flex items-center justify-center border border-dashed border-neutral-800 rounded-lg">
            <p className="text-sm text-neutral-400">Chart Placeholder</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 