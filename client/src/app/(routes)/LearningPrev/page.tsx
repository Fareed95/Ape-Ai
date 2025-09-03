"use client"
import { useUserContext } from '@/context/UserInfo';
import { useState, useEffect, useRef } from 'react';
import { Clock, FileText, ArrowRight, ArrowLeft, BookOpen, Award, BarChart, Code, Play, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useRoadmap } from '@/context/RoadmapContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LearningCodeEditor from '@/components/Learning/LearningCodeEditor';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export default function Home() {
  const { contextsetinput, contextFirstRoadmap } = useUserContext();
  const { roadmap } = useRoadmap();
  const [componentData, setComponentData] = useState<any>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roadmapId, setRoadmapId] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [PDF, setPDF] = useState([]);
  const [pdfErrors, setPdfErrors] = useState({});
  const [activeSection, setActiveSection] = useState('videos'); // 'videos', 'overview', 'materials', 'quiz'
  const editorRef = useRef(null);
  const router = useRouter();
  const DJANGO_API_SERVER = process.env.NEXT_PUBLIC_DJANGO_API_SERVER;
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  console.log("Hello", contextFirstRoadmap)

  useEffect(() => {
    if (roadmap?.roadmap_id) {
      setRoadmapId(roadmap.roadmap_id);
      fetchRoadmapData(roadmap.roadmap_id);
    } else {
      router.push('/');
    }
  }, [roadmap]);

  const fetchComponentData = async (roadmapId : number, componentNumber : number) => {
    try {
      const response = await fetch(`https://model-ape.crodlin.in/roadmaps/${roadmapId}/component`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ component_number: componentNumber }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched component data:", data);
      contextsetinput(data.name)
      console.log(data.name)

      setComponentData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching component data:", error);
      setError("Failed to fetch component data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRoadmapData = async (roadmapId : number) => {
    try {
      const response = await fetch(`https://model-ape.crodlin.in/roadmaps/${roadmapId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setIsCompleted(data.is_completed);
      setTotal(data.roadmap_json.total_components);
      setPDF(data.roadmap_json.pdf_links);
      console.log("Total components:", data.roadmap_json.total_components);

      // Set the current component index based on isCompleted
      setCurrentComponentIndex(data.is_completed);
      fetchComponentData(roadmapId, data.is_completed);
      console.log(data.is_completed, roadmapId);
    } catch (error) {
      console.error("Error fetching roadmap data:", error);
      setError("Failed to fetch roadmap data. Please try again." as string);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Updated isCompleted:", isCompleted);
  }, [isCompleted]);

  const handleNextComponent = async () => {
    console.log("Totals", total);
    if (currentComponentIndex + 1 < total && total !== null && total !== undefined) {
      try {
        const newCompletedIndex = currentComponentIndex + 1;
        const response = await fetch(`http://localhost:8001/roadmaps/${roadmapId}/complete`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_completed: newCompletedIndex }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setIsCompleted(newCompletedIndex as any);
        setCurrentComponentIndex(newCompletedIndex);
        fetchComponentData(roadmapId as number, newCompletedIndex);
        setQuizAnswers({});
        setQuizCompleted(false);
        setActiveSection('videos'); // Reset to videos section for new component
      } catch (error) {
        console.error("Error updating completion status:", error);
        setError("Failed to update completion status. Please try again." as string);
      }
    } else {
      router.push('/Quiz');
    }
  };

  const handlePreviousComponent = async () => {
    if (currentComponentIndex > 0) {
      try {
        const newCompletedIndex = currentComponentIndex - 1;
        const response = await fetch(`http://localhost:8001/roadmaps/${roadmapId}/complete`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_completed: newCompletedIndex }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setIsCompleted(newCompletedIndex as any);
        setCurrentComponentIndex(newCompletedIndex);
        fetchComponentData(roadmapId as number, newCompletedIndex);
        setQuizAnswers({});
        setQuizCompleted(false);
        setActiveSection('videos'); // Reset to videos section for new component
      } catch (error) {
        console.error("Error updating completion status:", error);
        setError("Failed to update completion status. Please try again." as string);
      }
    }
  };

  // const chatBot = async (question : string, component : string) => {
  //   try {
  //     const response = await fetch(`${DJANGO_API_SERVER}/ai-mentor`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ question, component }),
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     console.log("Chatbot response:", data);
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching chatbot response:", error);
  //     return null;
  //   }
  // };

  const handleQuizAnswer = (questionIndex : number, selectedAnswer : string) => {
    setQuizAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedAnswer,
    }));
  };

  const checkQuizCompletion = () => {
    if (!componentData || !componentData.component || !componentData.component.test_series) {
      setQuizCompleted(false);
      return;
    }

    const allQuestionsAnswered = componentData.component.test_series.every(
      (_ : any, index : number) => quizAnswers[index as keyof typeof quizAnswers] !== undefined
    );
    setQuizCompleted(allQuestionsAnswered);
  };

  useEffect(() => {
    checkQuizCompletion();
  }, [quizAnswers]);

  const getLayoutClasses = () => {
    if (isEditorOpen) {
      return {
        container: "w-full md:w-1/2 transition-all duration-300 ease-in-out overflow-y-auto h-[calc(100vh-8rem)] mt-20",
        content: "space-y-6 pr-0 md:pr-4"
      };
    }
    return {
      container: "w-full transition-all duration-300 ease-in-out mt-20",
      content: "space-y-6"
    };
  };

  // Progress bar component
  const ProgressBar = ({ current, total } : { current: number, total: number }) => {
    const percentage = Math.round((current + 1) / total * 100);
    
    return (
      <div className="w-full bg-neutral-800/70 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-600 to-blue-500 h-full rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  // Navigation tabs for content sections
  const NavTabs = () => {
    const tabs = [
      { id: 'videos', label: 'Videos', icon: <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
      { id: 'overview', label: 'Overview', icon: <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
      { id: 'materials', label: 'Materials', icon: <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> },
      { id: 'quiz', label: 'Quiz', icon: <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> }
    ];

    return (
      <div className="mb-4 sm:mb-6 overflow-x-auto no-scrollbar">
        <div className="flex space-x-1 bg-neutral-900/50 p-1 rounded-lg border border-neutral-800/50 min-w-max">
          {tabs.map((tab : any) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md whitespace-nowrap transition-all duration-200 ${
                activeSection === tab.id 
                  ? 'bg-blue-600/20 text-blue-400 font-medium' 
                  : 'text-neutral-400 hover:text-neutral-300 hover:bg-neutral-800/50'
              }`}
            >
              <span className="mr-1.5 sm:mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const VideoGrid = ({ videos, componentName } : { videos: any, componentName: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className={`grid ${isEditorOpen ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'} gap-3 sm:gap-6`}
    >
      {videos && videos.length > 0 ? (
        videos.map((video : any, index : number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="aspect-video bg-neutral-800/40 rounded-lg sm:rounded-xl overflow-hidden border border-neutral-700/60 hover:border-neutral-500/70 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300"
          >
            <iframe
              src={video}
              title={`${componentName} Video ${index + 1}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-8 sm:py-10 text-center">
          <Play className="w-8 h-8 sm:w-12 sm:h-12 text-neutral-600 mb-3 sm:mb-4" />
          <p className="text-sm sm:text-base text-neutral-500">No videos available for this component</p>
        </div>
      )}
    </motion.div>
  );

  const PDFGrid = ({ pdfs } : { pdfs: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
    >
      {pdfs && pdfs.length > 0 ? (
        pdfs.map((pdf : any, index : number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-neutral-800/40 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-neutral-700/60 hover:border-neutral-500/70 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300 flex flex-col items-center justify-center text-center"
          >
            {pdfErrors[pdf as keyof typeof pdfErrors] ? (
              <div className="text-red-500 flex flex-col items-center">
                <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3" />
                <p className="text-sm sm:text-base">Failed to load PDF</p>
              </div>
            ) : (
              <>
                <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-neutral-300 mb-3 sm:mb-4 font-medium">Learning Material {index + 1}</p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={pdf}
                  download
                  className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors border border-blue-500/30 text-xs sm:text-sm"
                >
                  <FileText className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
                  <span>Download PDF</span>
                </motion.a>
              </>
            )}
          </motion.div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-8 sm:py-10 text-center">
          <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-neutral-600 mb-3 sm:mb-4" />
          <p className="text-sm sm:text-base text-neutral-500">No PDF materials available for this component</p>
        </div>
      )}
    </motion.div>
  );
  
  // Loading Skeleton
  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 p-4 pt-20">
      <div className="container mx-auto">
        {/* Skeleton header */}
        <div className="flex flex-col space-y-4 mb-6 animate-pulse">
          <div className="flex items-start justify-between flex-wrap sm:flex-nowrap gap-3 sm:gap-4">
            <div className="w-full max-w-xs">
              <div className="h-8 sm:h-10 bg-neutral-800/70 rounded-lg mb-2"></div>
              <div className="h-4 w-28 bg-neutral-800/60 rounded-md"></div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 bg-neutral-800/50 px-3 sm:px-4 py-4 sm:py-5 rounded-lg border border-neutral-800/30">
              <div className="w-14 h-12 bg-neutral-700/50 rounded-md"></div>
            </div>
          </div>
          
          <div className="w-full bg-neutral-800/50 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600/40 to-blue-500/40 h-full rounded-full w-1/3">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-500/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Skeleton tabs */}
        <div className="mb-6 overflow-x-auto no-scrollbar">
          <div className="flex space-x-1 bg-neutral-900/30 p-1 rounded-lg border border-neutral-800/30 min-w-max">
            {[1, 2, 3, 4].map((tab) => (
              <div 
                key={tab}
                className={`flex items-center px-8 py-2.5 rounded-md ${tab === 1 ? 'bg-blue-600/20' : 'bg-neutral-800/30'}`}
              >
                <div className="w-16 h-4 bg-neutral-700/60 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Skeleton video grid */}
        <div className="animate-pulse mb-8">
          <div className="h-7 bg-neutral-800/60 w-44 rounded-md mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="aspect-video bg-neutral-800/40 rounded-lg border border-neutral-700/30 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-neutral-700/50"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Skeleton navigation buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
          <div className="w-full h-12 sm:h-14 rounded-lg bg-neutral-800/60 animate-pulse"></div>
          <div className="w-full h-12 sm:h-14 rounded-lg bg-gradient-to-r from-blue-600/30 to-blue-500/30 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  // Error State
  if (error) return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 flex items-center justify-center">
      <motion.div
        {...fadeIn}
        className="glass p-5 sm:p-8 rounded-xl sm:rounded-2xl text-center max-w-md mx-4 bg-neutral-900/50 border border-neutral-800/50 backdrop-blur-sm"
      >
        <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 text-red-500">⚠️</div>
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-200 mb-3 sm:mb-4">Error</h2>
        <p className="text-sm sm:text-base text-neutral-300 mb-5 sm:mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:brightness-110 transition-all text-sm sm:text-base"
        >
          Try Again
        </button>
      </motion.div>
    </div>
  );

  // No Content Available
  if (!componentData) return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 flex items-center justify-center">
      <motion.div
        {...fadeIn}
        className="glass p-5 sm:p-8 rounded-xl sm:rounded-2xl text-center max-w-md mx-4 bg-neutral-900/50 border border-neutral-800/50 backdrop-blur-sm"
      >
        <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-300 mx-auto mb-4 sm:mb-6 opacity-75" />
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-200 mb-3 sm:mb-4">No Content Available</h2>
        <p className="text-sm sm:text-base text-neutral-400 mb-5 sm:mb-8">Please select a learning path to begin your educational journey.</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:brightness-110 transition-all text-sm sm:text-base"
        >
          Go to Dashboard
        </button>
      </motion.div>
    </div>
  );

  // Render the main content based on active section
  const renderContent = () => {
    if (!componentData || !componentData.component) return null;
    
    const comp = componentData.component;
    
    return (
      <AnimatePresence mode="wait">
        {activeSection === 'videos' && (
          <motion.div
            key="videos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-200 mb-3 sm:mb-4 flex items-center">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-blue-400" />
              Video Lessons
            </h2>
            <VideoGrid videos={comp.videos} componentName={comp.name} />
          </motion.div>
        )}
        
        {activeSection === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-neutral-800/40 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-neutral-700/60"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-200 mb-3 sm:mb-4 flex items-center">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-blue-400" />
              Overview
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">{comp.description}</p>
          </motion.div>
        )}
        
        {activeSection === 'materials' && (
          <motion.div
            key="materials"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-200 mb-3 sm:mb-4 flex items-center">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-blue-400" />
              Learning Materials
            </h2>
            <PDFGrid pdfs={PDF} />
          </motion.div>
        )}
        
        {activeSection === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <h2 className="text-lg sm:text-xl font-semibold text-neutral-200">Knowledge Check</h2>
            </div>
            
            <div className="bg-neutral-800/40 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-neutral-700/60">
              {comp.test_series && comp.test_series.length > 0 ? (
                <>
                  {comp.test_series.map((question : any, index : number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-6 sm:mb-8 last:mb-4"
                    >
                      <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-neutral-100 leading-relaxed">
                        <span className="inline-block bg-blue-600/20 text-blue-400 rounded-full w-5 h-5 sm:w-6 sm:h-6 text-center text-xs sm:text-sm mr-2">
                          {index + 1}
                        </span>
                        {question.question}
                      </h3>
                      
                      <div className="space-y-2 sm:space-y-3 ml-6 sm:ml-8">
                        {question.options.map((option : string, optionIndex : number) => (
                          <motion.label
                            key={optionIndex}
                            whileHover={{ x: 4 }}
                            className={`flex items-center p-2.5 sm:p-3 rounded-lg cursor-pointer transition-all ${
                              quizAnswers[index as keyof typeof quizAnswers] === option 
                                ? 'bg-blue-600/20 border border-blue-500/30' 
                                : 'bg-neutral-800/30 border border-neutral-700/50 hover:bg-neutral-700/30'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={option}
                              checked={quizAnswers[index as keyof typeof quizAnswers] === option}
                              onChange={() => handleQuizAnswer(index, option)}
                              className="form-radio text-blue-500 mr-2 sm:mr-3"
                            />
                            <span className={`text-xs sm:text-sm ${
                              quizAnswers[index as keyof typeof quizAnswers] === option ? 'text-blue-400' : 'text-neutral-300'
                            } transition-colors`}>
                              {option}
                            </span>
                          </motion.label>
                        ))}
                      </div>
                    </motion.div>
                  ))}

                  {quizCompleted && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 sm:mt-8 bg-neutral-800/40 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-neutral-700/60"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-neutral-100 mb-3 sm:mb-4 flex items-center">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-green-500" />
                        Quiz Results
                      </h3>
                      
                      {comp.test_series.map((question : any, index : number) => {
                        const isCorrect = quizAnswers[index as keyof typeof quizAnswers] === question.answer;
                        
                        return (
                          <div key={index} className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-lg bg-neutral-900/50 border border-neutral-800/70">
                            <p className="font-medium text-sm sm:text-base text-neutral-200 mb-2">{question.question}</p>
                            <div className={`mt-2 p-2.5 sm:p-3 rounded-lg ${
                              isCorrect
                                ? 'bg-green-900/20 border border-green-700/30'
                                : 'bg-red-900/20 border border-red-700/30'
                            }`}>
                              <p className={`flex items-center text-xs sm:text-sm ${
                                isCorrect ? 'text-green-400' : 'text-red-400'
                              }`}>
                                {isCorrect 
                                  ? <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                                  : <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                                }
                                Your answer: {quizAnswers[index as keyof typeof quizAnswers]}
                              </p>
                              {!isCorrect && (
                                <p className="text-green-400 mt-2 flex items-center text-xs sm:text-sm">
                                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                                  Correct answer: {question.answer}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 sm:py-10 text-center">
                  <Clock className="w-8 h-8 sm:w-12 sm:h-12 text-neutral-600 mb-3 sm:mb-4" />
                  <p className="text-sm sm:text-base text-neutral-500">No quiz available for this component</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <>
      <div className="bg-gradient-to-b from-neutral-950 to-neutral-900 text-white min-h-screen pb-16">
        <div className="flex flex-col md:flex-row items-start">
          {/* Left Panel */}
          <div className={getLayoutClasses().container}>
            <motion.div {...fadeIn} className={`bg-neutral-900/40 border border-neutral-800/50 rounded-2xl shadow-xl backdrop-blur-sm p-6 ${getLayoutClasses().content}`}>
              {/* Progress Header */}
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex items-start justify-between flex-wrap sm:flex-nowrap gap-3 sm:gap-4">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-neutral-100 mb-1 sm:mb-2">{componentData?.component?.name}</h1>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <BarChart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" />
                      <span className="text-xs sm:text-sm text-neutral-400">
                        Progress: {Math.round(((currentComponentIndex + 1) / (total as number)) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 bg-neutral-900/70 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-neutral-800/70">
                    <div className="text-right">
                      <p className="text-xs sm:text-sm text-neutral-400">Component</p>
                      <p className="text-base sm:text-lg font-bold text-neutral-200">
                        {currentComponentIndex + 1} / {total}
                      </p>
                    </div>
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                  </div>
                </div>
                
                <ProgressBar current={currentComponentIndex} total={total as number} />
              </div>

              <NavTabs />
              
              {/* Content Section - Render based on active tab */}
              {renderContent()}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-6 sm:mt-8">
                {currentComponentIndex > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02, x: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePreviousComponent}
                    className="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Previous</span>
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextComponent}
                  className="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 hover:brightness-110 transition-all text-sm sm:text-base"
                >
                  <span>{currentComponentIndex + 1 === total ? "Complete Course" : "Next Component"}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right Panel - Code Editor */}
          {isEditorOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full md:w-1/2 h-[calc(100vh-8rem)] md:pl-4 mt-4 md:mt-20"
            >
              <div className="bg-neutral-900/40 border border-neutral-800/50 rounded-2xl shadow-xl backdrop-blur-sm h-full overflow-hidden">
                <LearningCodeEditor
                  isOpen={true}
                  onClose={() => setIsEditorOpen(false)}
                  editorRef={editorRef}
                />
              </div>
            </motion.div>
          )}

          {/* Code Editor Toggle Button - Only show when editor is closed and screen is larger than md breakpoint */}
          {!isEditorOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsEditorOpen(true)}
              className="fixed bottom-16 sm:bottom-24 right-4 sm:right-6 z-50 p-3 sm:p-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-900/30 transition-all duration-200 backdrop-blur-sm"
            >
              <Code className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          )}
        </div>
      </div>
    </>
  );
}