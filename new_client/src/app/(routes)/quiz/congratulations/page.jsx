'use client';
import { useUserContext } from '@/app/context/Userinfo';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import Confetti from 'react-confetti';
import GetUserInfo from '@/components/GetUserInfo';
import { useRoadmap } from '@/app/context/RoadmapContext';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from '../../../../components/ui/use-toast';
import { useSession } from 'next-auth/react';


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

function CongratulationsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const searchParams = useSearchParams();
  const [id, setId] = useState(); 
  const { contextinput, contextemail } = useUserContext();
  const score = parseInt(searchParams.get('score') || '0');
  const total = parseInt(searchParams.get('total') || '12');
  const theme = searchParams.get('theme') || 'Quiz';
  const percentage = Math.round((score / total) * 100);
  const { setRoadmap,roadmap } = useRoadmap();
  const [roadmapId, setRoadmapId] = useState(null);
  const [internshipTitle, setInternshipTitle] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate short loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (roadmap?.roadmap_id) {
      console.log("Id in welcome page context :", roadmap.roadmap_id);
      setRoadmapId(roadmap.roadmap_id);
    }
  }, [roadmap]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(`https://api-ape.crodlin.in/api/userdetails/${contextemail}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user ID');
      }

      const result = await response.json();
      setId(result.id);

    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };
  getUserInfo();

  const downloadCertificateFile = async () => {
    try {
      setIsDownloading(true);
      
      // Request the certificate file
      const response = await fetch(`https://api-ape.crodlin.in/api/certificate-download/${id}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      
      // Set the file name
      const fileName = `${contextinput.replace(/\s+/g, '_')}_Certificate.pdf`;
      a.download = fileName;
      
      // Append to the document, click it, and then remove it
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setIsDownloading(false);
    } catch (error) {
      console.error('Error downloading certificate file:', error);
      setIsDownloading(false);
      alert('Failed to download certificate. Please try again.');
    }
  };

  useEffect(() => {
    if (isDownloading) {
      downloadCertificateFile();
    }
  }, [isDownloading]);

  const DownloadCertificate = async () => {
    try {
      const response = await fetch(`https://api-ape.crodlin.in/api/certificate-generate/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // After generating the certificate, download it locally
      await downloadCertificateFile();
      
    } catch (error) {
      console.error('Error downloading certificate:', error);
    }
  };
  
  useEffect(() => {
    if (roadmap?.roadmap_id) {
      console.log("idhar ka roadmap ka id hai",roadmap.roadmap_id)
      setRoadmapId(roadmap.roadmap_id);
    } else {
      // router.push('/UserInfo');
      console.log("idhar ka roadmap ka id hai1",roadmap.roadmap_id)
    }
  }, [roadmap]);


  // const GetUserTitle = async () => {
  //   try {
  //     const response = await fetch(`https://api-ape.crodlin.in/api/internships/${roadmapId}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Internship data:", data);
  //     setInternshipTitle(data.title);
  //   } catch (error) {
  //     console.error('Error getting internship details:', error);
  //   }
  // };
  // GetUserTitle();

  // useEffect(() => {
  //   if (roadmapId) {
  //     GetUserTitle();
  //   }
  // }, [roadmapId]);


  const handleDownloadCertificate = async () => {
    try {
      setIsDownloading(true);
      await getUserInfo();

      const response = await fetch(`https://api-ape.crodlin.in/api/certificate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contextinput,
          competition_battled: 12,
          competition_won: score,
          user: id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await DownloadCertificate();
    } catch (error) {
      console.error('Error sending certificate:', error);
      setIsDownloading(false);
      alert('Failed to generate certificate. Please try again.');
    }
  };
  console.log(id, score, contextinput)
  console.log(internshipTitle)
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a master!";
    if (percentage >= 70) return "Great job! You've got solid knowledge!";
    if (percentage >= 50) return "Good effort! Keep learning!";
    return "Keep practicing! You'll get better!";
  };

  const getEmoji = () => {
    if (percentage >= 90) return "🏆";
    if (percentage >= 70) return "🌟";
    if (percentage >= 50) return "👍";
    return "💪";
  };

  const handleApplyForInternships = async () => {
    try {
      console.log("Roadmap title:", contextinput);
      console.log("email:", contextemail);
  
      const response = await fetch(`https://api-ape.crodlin.in/api/apply/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "internship_title": contextinput,
          "email": contextemail
        }), 
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Application submitted successfully:', result);
      alert('Successfully applied for internship!');
      router.push(`/UserInfo/${session?.user?.email}`);
    } catch (error) {
      console.error('Error applying for internship:', error);
      router.push(`/UserInfo/${session?.user?.email}`);
    }
  };

  if (isLoading) {
    return <CongratualtionsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center relative overflow-hidden py-16 px-4"> 

      {percentage >= 70 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-neutral-900/30 border border-neutral-800/50 p-6 sm:p-8 rounded-2xl text-center relative z-10 shadow-2xl backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-2"
        >
          <span className="text-4xl sm:text-6xl mb-2 sm:mb-4 block">{getEmoji()}</span>
          <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 text-neutral-200">
            Quiz Completed!
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base">{theme}</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="my-6 sm:my-8"
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-neutral-200">{percentage}%</span>
            </div>
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-neutral-800/50"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * (Math.min(windowSize.width, 400) * 0.45)}
                strokeDashoffset={2 * Math.PI * (Math.min(windowSize.width, 400) * 0.45) * (1 - percentage / 100)}
                className="text-neutral-400"
              />
            </svg>
          </div>
        </motion.div>
                       
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-3"
        >
          <p className="text-xl sm:text-2xl text-neutral-200 font-medium">
            {getMessage()}
          </p>
          <p className="text-sm sm:text-base text-neutral-400">
            You scored {score} out of {total} questions correctly
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-colors border border-neutral-700/50 text-sm sm:text-base flex items-center justify-center"
            onClick={handleDownloadCertificate}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Downloading...
              </>
            ) : (
              'Download Certificate'
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors border border-neutral-700/50 text-sm sm:text-base"
            onClick={handleApplyForInternships}
          >
            Apply for Internships
          </motion.button>
        </motion.div>
      </motion.div>
      <GetUserInfo />
    </div>
  );
}

export default CongratulationsPage;
