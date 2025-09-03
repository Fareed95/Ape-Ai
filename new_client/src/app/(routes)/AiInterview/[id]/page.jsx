"use client"
import React, { useState, useEffect, useRef, use } from 'react';
import Avatar from '@/components/avatar/Avatar';
import { useUserContext } from '@/app/context/Userinfo';

import { useToast } from "@/hooks/use-toast";

const Page = () => {
  const { setcontextInterview,contextInterview ,contextInterviewdeets,contextemail,contextSpeaking} = useUserContext(); // Updated hook
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const { toast } = useToast();

  // Speech recognition states
  const [isListening, setIsListening] = useState(false);

  const [interviewee_name, setinterviewee_name] = useState('');
  const [course_name, setcourse_name] = useState('');
  const [company_email, setcompany_email] = useState('');
  const [company_data, setcompany_data] = useState('');
  const [internship_data, setinternship_data] = useState('');
  const [ans,setans] = useState('Not');
  const [ID, setID] = useState(1);

  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const timeoutRef = useRef(null);
  const interimTranscriptRef = useRef('');

  // Add avatar-related states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [response, setResponse] = useState('')

  useEffect(() => {
    setcompany_data(contextInterviewdeets.company_description)
    setcompany_email(contextInterviewdeets.company_email)
    setinternship_data(contextInterviewdeets.internship_description)
    setcourse_name(contextInterviewdeets.internship_name)
    setinterviewee_name(contextInterviewdeets.user_name)
    // console.log(contextInterviewdeets)
  }, [contextInterviewdeets]);
  



  const Interview = async () => {
  

    try {
      const response = await fetch('http://localhost:8010/api/interviews/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "interviewee_email": contextemail,
          "interviewee_name":interviewee_name,
          "course_name": course_name,
          "company_email": company_email,
          "company_data": company_data,
          "internship_data": internship_data,
           "answer":ans,
          "question_id": ID
      }),
      });
      // console.log(contextemail)
      // console.log(interviewee_name)
      // console.log(course_name)
      // console.log(company_email)
      // console.log(company_data)
      // console.log(internship_data)
      // console.log(ans)
      // console.log(ID)

      // Log the response status and status text
      // console.log('Response Status:', response.status, response.statusText);

      if (!response.ok) {
        // console.error("Error Ai responce not got", response);
      
        return;
      }

      const result = await response.json();
      
      setResponse(result.question)
      setID(result.question_id)
      // console.log("result",result)

    } catch (error) {
      // console.error("Error Getting from Ai", error);
    
    }
  };

  useEffect(() => {
    if(company_email){
      Interview()
    }
  
  }, [ transcript,company_email]);

  useEffect(() => {
    // console.log(response);
    setcontextInterview(response)
  }, [response]);
  
  // Get list of available camera devices
  const getVideoDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      
      // Select the first device by default if available
      if (videoDevices.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    } catch (err) {
      // console.error('Error getting video devices:', err);
      setCameraError('Unable to access camera devices');
    }
  };

  // Initialize devices on component mount
  useEffect(() => {
    getVideoDevices();
  }, [internship_data]);

  // Start or stop the camera
  const toggleCamera = async () => {
    if (isCameraActive) {
      // Stop the camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
    } else {
      // Start the camera
      try {
        const constraints = {
          video: selectedDeviceId ? { deviceId: { exact: selectedDeviceId } } : true
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        setIsCameraActive(true);
        setCameraError(null);
      } catch (err) {
        // console.error('Error accessing camera:', err);
        setCameraError('Unable to access camera: ' + err.message);
      }
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      // console.error('Speech recognition is not supported in this browser');
      toast("Speech recognition is not supported in this browser")
      return;
    }

    // Create the recognition object
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    
    // Configure the recognition
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';
    
    // Set up event handlers
    recognitionInstance.onresult = (event) => {
      clearTimeout(timeoutRef.current);
      
      let finalTranscript = '';
      let interimTranscript = '';
      
      // Process the results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptText = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          // This is a final result (sentence ended naturally)
          finalTranscript += transcriptText;
          // console.log('Final speech (sentence complete):', transcriptText);
          setTranscript(transcriptText);
        } else {
          // This is an interim result
          interimTranscript += transcriptText;
        }
      }
      
      // Save the interim transcript to check for pauses
      if (interimTranscript) {
        interimTranscriptRef.current = interimTranscript;
        
        // Set a timeout to detect pauses
        timeoutRef.current = setTimeout(() => {
          // console.log('Final speech (after 2-second pause):', interimTranscriptRef.current);
          setTranscript(interimTranscriptRef.current);
          interimTranscriptRef.current = '';
        }, 2000);
      }
    };
    
    recognitionInstance.onerror = (event) => {
      // console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    
    recognitionInstance.onend = () => {
      if (isListening) {
        recognitionInstance.start();
      }
    };
    
    setRecognition(recognitionInstance);
    
    // Cleanup
    return () => {
      if (recognition) {
        recognition.stop();
      }
      clearTimeout(timeoutRef.current);
    };
  }, [isListening]);
  
  const toggleListening = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      clearTimeout(timeoutRef.current);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  // Handle device selection change
  const handleDeviceChange = (e) => {
    setSelectedDeviceId(e.target.value);
    
    // If camera is already active, restart with new device
    if (isCameraActive) {
      toggleCamera().then(() => toggleCamera());
    }
  };

  useEffect(() => {
    // Start camera immediately on component mount
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: true
        });
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        setIsCameraActive(true);
      } catch (err) {
        // console.error('Error accessing camera:', err);
        toast("Unable to access camera: " + err.message)
        setCameraError('Unable to access camera: ' + err.message);
      }
    };

    startCamera();
   
    // Cleanup
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  useEffect(() => {
    if(transcript!==''){
      setans(transcript)

    }
    if(ID!==1){
      setans(transcript)
    }
  }, [transcript]);
  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 to-neutral-900/80 backdrop-blur-3xl -z-10" />

      {/* Main Content */}
      <div className="relative h-screen flex flex-col">
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6 border-b border-neutral-800/50">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">AI</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-white text-base sm:text-lg font-semibold">AI Interview Session</h1>
                <p className="text-neutral-400 text-[10px] sm:text-xs">Powered by Advanced AI</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-neutral-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-neutral-800">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-neutral-400 text-[10px] sm:text-xs">Live Interview</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interview Content */}
        <div className="flex-1 relative flex flex-col lg:flex-row p-3 sm:p-4 md:p-6">
          {/* Left Panel - Avatar */}
          <div className="flex-1 relative h-[calc(100vh-8rem)] lg:h-auto rounded-xl sm:rounded-2xl border border-neutral-800/50 bg-neutral-900/50 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="w-full max-w-xl sm:max-w-2xl aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden">
                <Avatar />
              </div>
            </div>
            
            {/* AI Status Indicator */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-black/70 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-neutral-800">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] sm:text-xs text-neutral-300">AI Interviewer Active</span>
              </div>
            </div>

            {/* Camera Feed Overlay for Mobile/Tablet - Made Bigger */}
            <div className="absolute top-3 right-3 lg:hidden z-10">
              <div className="relative w-32 sm:w-48 md:w-64 aspect-video rounded-lg overflow-hidden border border-neutral-800/50 shadow-xl bg-black/50 backdrop-blur-sm">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
                {cameraError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                    <p className="text-red-400 text-[10px] sm:text-xs px-2 text-center">{cameraError}</p>
                  </div>
                )}
                <div className="absolute bottom-2 left-2">
                  <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full border border-neutral-800">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-white/70 text-[10px] sm:text-xs">You</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Camera and Controls (Desktop Only) */}
          <div className="hidden lg:flex w-[400px] flex-col gap-4 ml-4">
            {/* Camera Feed */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-800/50 shadow-xl bg-black/50 backdrop-blur-sm">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
              {cameraError && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                  <p className="text-red-400 text-sm px-4 text-center">{cameraError}</p>
                </div>
              )}
              <div className="absolute bottom-3 left-3">
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-neutral-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-white/70 text-xs">Your Camera</span>
                </div>
              </div>
            </div>

            {/* Speech Recognition Panel */}
            <div className="flex-1 bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800/50 p-4">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-neutral-600'}`} />
                    <span className="text-neutral-400 text-sm">{isListening ? 'Listening...' : 'Click to start'}</span>
                  </div>
                  <button
                    onClick={toggleListening}
                    className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${
                      isListening 
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                        : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    }`}
                  >
                    {isListening ? 'Stop' : 'Start'} Listening
                  </button>
                </div>
                <div className="flex-1 bg-neutral-900/50 rounded-lg p-4 overflow-y-auto">
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {transcript || "Your speech will appear here..."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Speech Recognition Panel for Mobile/Tablet */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800/50 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-neutral-600'}`} />
                <span className="text-neutral-400 text-xs">{isListening ? 'Listening...' : 'Click to start'}</span>
              </div>
              <button
                onClick={toggleListening}
                className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                  isListening 
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                    : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                }`}
              >
                {isListening ? 'Stop' : 'Start'} Listening
              </button>
            </div>
            <div className="bg-neutral-900/50 rounded-lg p-2 max-h-20 overflow-y-auto">
              <p className="text-neutral-300 text-xs leading-relaxed">
                {transcript || "Your speech will appear here..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;