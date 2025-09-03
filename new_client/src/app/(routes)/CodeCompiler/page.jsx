'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Loader2, Clock, Play, Eye, Lock, Code, XCircle, ChevronDown } from 'lucide-react';
import { useUserContext } from '@/app/context/Userinfo';
import { useRoadmap } from '@/app/context/RoadmapContext';
import LanguageSelector from '@/components/editor/LanguageSelector';
import Output from '@/components/editor/Output';
import { Editor } from "@monaco-editor/react";

const HeroBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-neutral-950" />
    <div className="absolute inset-0 bg-grid-small-white/[0.05] -z-10" />
    <div className="absolute inset-0 bg-dot-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
    <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent" />
  </div>
);

// Language configurations
const languages = [
  {
    id: 'javascript',
    name: 'JavaScript',
    startingCode: `console.log("Hello")`,
  },
  {
    id: 'python',
    name: 'Python',
    startingCode: `def reverse_string(s):
      # Write your solution here
      print("Hello")`,
  },
  {
    id: 'java',
    name: 'Java',
    startingCode: `class Solution {
      public void reverseString(char[] s) {
          // Write your solution here
      }

      // Example usage:
      // char[] s1 = {'h','e','l','l','o'};
      // reverseString(s1);
      // System.out.println(Arrays.toString(s1)); // ['o','l','l','e','h']
    }`,
  },
  {
    id: 'cpp',
    name: 'C++',
    startingCode: `class Solution {
    public:
      void reverseString(vector<char>& s) {
          // Write your solution here
      }

      // Example usage:
      // vector<char> s1 = {'h','e','l','l','o'};
      // reverseString(s1);
      // print(s1); // {'o','l','l','e','h'}
    };`,
  },
  {
    id: 'go',
    name: 'Go',
    startingCode: `func reverseString(s []byte) {
      // Write your solution here
    }

    // Example usage:
    // s1 := []byte{'h','e','l','l','o'}
    // reverseString(s1)
    // fmt.Println(string(s1)) // "olleh"`,
  },
  {
    id: 'ruby',
    name: 'Ruby',
    startingCode: `# @param {Character[]} s
    # @return {Void} Do not return anything, modify s in-place instead.
    def reverse_string(s)
      # Write your solution here
    end

    # Example usage:
    # s1 = ["h","e","l","l","o"]
    # reverse_string(s1)
    # puts s1.inspect # ["o","l","l","e","h"]`,
  },
];

function CodeCompilerPage() {
  const { contextinput } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabWarnings, setTabWarnings] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const timerRef = useRef(null);
  const router = useRouter();
  const { setRoadmap, roadmap } = useRoadmap();
  const [roadmapId, setRoadmapId] = useState(null);
  const dropdownRef = useRef(null);
  const editorRef = useRef();
  const [language, setLanguage] = useState('javascript');

  // Current coding challenge
  const challenge = {
    title: "Reverse a String",
    description: "Write a function that reverses a string. The input string is given as an array of characters s.",
    examples: [
      {
        input: 'Input: s = ["h","e","l","l","o"]',
        output: 'Output: ["o","l","l","e","h"]'
      },
      {
        input: 'Input: s = ["H","a","n","n","a","h"]',
        output: 'Output: ["h","a","n","n","a","H"]'
      }
    ],
    constraints: [
      "1 <= s.length <= 105",
      "s[i] is a printable ascii character."
    ]
  };

  // Set starting code based on selected language
  useEffect(() => {
    const selectedLang = languages.find(l => l.id === language);
    if (selectedLang) {
      setCode(selectedLang.startingCode);
    }
  }, [language]);

  // Countdown timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          // Auto-submit when time runs out
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Tab visibility detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabWarnings(prev => {
          const newWarnings = prev + 1;
          setShowWarning(true);

          // Hide warning after 3 seconds
          setTimeout(() => {
            setShowWarning(false);
          }, 3000);

          // Auto-fail if too many warnings
          if (newWarnings >= 3) {
            clearInterval(timerRef.current);
            router.push(`/coding/results?status=failed&reason=proctoring`);
          }

          return newWarnings;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [router]);

  // Prevent copy paste
  useEffect(() => {
    const handleCopyPaste = (e) => {
      e.preventDefault();
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 3000);
    };

    const handleKeyDown = (e) => {
      // Detect Ctrl+V or Cmd+V
      if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'c')) {
        handleCopyPaste(e);
      }
    };

    document.addEventListener('paste', handleCopyPaste);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('paste', handleCopyPaste);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format time
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Run the code
  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('');

    // Simulate code execution
    setTimeout(() => {
      try {
        // Mock output for different languages
        switch (selectedLanguage.id) {
          case 'javascript':
            setOutput('JavaScript code executed successfully.');
            break;
          case 'python':
            setOutput('Python code executed successfully.');
            break;
          case 'java':
            setOutput('Java code executed successfully.');
            break;
          case 'cpp':
            setOutput('C++ code executed successfully.');
            break;
          case 'go':
            setOutput('Go code executed successfully.');
            break;
          case 'ruby':
            setOutput('Ruby code executed successfully.');
            break;
          default:
            setOutput('Unknown language.');
        }
      } catch (err) {
        setOutput(`Error: ${err.message}`);
      } finally {
        setIsRunning(false);
      }
    }, 500);
  };

  // Submit the solution
  const handleSubmit = () => {
    if (isSubmitted) return;

    setIsSubmitted(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Run the code one last time to check solution
    handleRunCode();

    // In a real app, you would send the solution to a backend here
    setTimeout(() => {
      // Navigate to results
      router.push(`/coding/results?status=completed&timeRemaining=${timeLeft}&language=${selectedLanguage.id}`);
    }, 1500);
  };

  // Editor mount handler
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Language change handler
  const onLanguageSelect = (lang) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <HeroBackground />
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-400">Loading challenge...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <HeroBackground />
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-neutral-800 text-neutral-200 rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 pt-16 pb-8 relative mt-10">
      <HeroBackground />

      {/* Tab change warning */}
      {showWarning && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-0 right-0 z-50 mx-auto max-w-md bg-red-900/70 text-white p-4 rounded-lg border border-red-500/50 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold">Warning: Prohibited action detected!</p>
            <p>Tab changes: {tabWarnings}/3</p>
          </div>
          <p className="text-sm mt-1">Copy/paste is not allowed in this environment.</p>
        </motion.div>
      )}

      {/* Timer bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-neutral-900/80 backdrop-blur-sm px-4 py-2 mt-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-blue-400" />
            <span className={`${timeLeft < 60 ? 'text-red-400 font-bold' : 'text-blue-400'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-neutral-400 text-sm mr-4">Proctored Exam</span>
            <Lock className="w-4 h-4 text-yellow-500" />
          </div>

          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-2 text-neutral-400" />
            <span className="text-neutral-400 text-sm">
              Warnings: {tabWarnings}/3
            </span>
          </div>
        </div>

        {/* Timer progress bar */}
        <div className="w-full h-1 bg-neutral-800 mt-2 overflow-hidden">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / 600) * 100}%` }}
            className={`h-full ${
              timeLeft > 300
                ? 'bg-green-500'
                : timeLeft > 60
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
            }`}
          />
        </div>
      </div>

      <div className="flex flex-row h-[calc(100vh-9rem)] pt-12 px-4">
        {/* Left panel - Challenge description */}
        <div className="w-1/2 pr-2 overflow-y-auto">
          <div className="bg-neutral-900/30 border border-neutral-800/50 p-6 rounded-2xl backdrop-blur-sm shadow-xl h-full">
            <h1 className="text-2xl text-neutral-200 font-semibold mb-4">{challenge.title}</h1>

            <div className="mb-6">
              <p className="text-neutral-300">{challenge.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg text-neutral-200 font-medium mb-2">Examples:</h2>
              <div className="space-y-4">
                {challenge.examples.map((example, idx) => (
                  <div key={idx} className="bg-neutral-800/30 p-4 rounded-lg border border-neutral-700/50">
                    <p className="text-neutral-300 font-mono text-sm mb-1">{example.input}</p>
                    <p className="text-neutral-300 font-mono text-sm">{example.output}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg text-neutral-200 font-medium mb-2">Constraints:</h2>
              <ul className="list-disc list-inside space-y-1">
                {challenge.constraints.map((constraint, idx) => (
                  <li key={idx} className="text-neutral-400 font-mono text-sm">{constraint}</li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-800/30 p-4 rounded-lg">
              <h2 className="text-lg text-yellow-300 font-medium mb-2 flex items-center">
                <XCircle className="w-5 h-5 mr-2" />
                Proctoring Rules:
              </h2>
              <ul className="space-y-2">
                <li className="text-yellow-200/80 text-sm">• You have 10 minutes to complete this challenge</li>
                <li className="text-yellow-200/80 text-sm">• Changing tabs 3 times will result in disqualification</li>
                <li className="text-yellow-200/80 text-sm">• Copy and paste functionality is disabled</li>
                <li className="text-yellow-200/80 text-sm">• Your solution will be automatically submitted when time expires</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right panel - Code editor and output */}
        <div className="w-1/2 pl-2 flex flex-col h-full">
          {/* Code editor */}
          <div className="flex-1 bg-neutral-900/30 border border-neutral-800/50 rounded-2xl backdrop-blur-sm shadow-xl mb-2 overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-neutral-800">
              <div className="flex items-center">
                <Code className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-neutral-300 font-medium">Solution Editor</span>
              </div>

              {/* Language selector */}
              <LanguageSelector 
                language={language} 
                onSelect={onLanguageSelect} 
              />
            </div>

            <Editor
              height="calc(100% - 3rem)"
              language={language}
              value={code}
              onChange={setCode}
              onMount={onMount}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                lineNumbers: "on",
                roundedSelection: false,
                padding: { top: 16, bottom: 16 },
                cursorStyle: "line",
                tabSize: 2,
                wordWrap: "on",
                formatOnPaste: true,
                formatOnType: true,
              }}
            />
          </div>

          {/* Output component */}
          <div className="h-2/5">
            <Output 
              editorRef={editorRef} 
              language={language}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeCompilerPage;
