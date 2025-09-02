"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Define the UserInfo context interface
interface UserInfoContextType {
  // User basic info
  contextemail: string;
  contextname: string;
  contextimg: string;
  contextisLoggedIn: boolean;
  
  // Roadmap related
  contextRoadmap: any;
  contextFirstRoadmap: any;
  contextinput: string;
  
  // Interview related
  contextInterview: string;
  contextInterviewdeets: string;
  contextSelectedPerson: string;
  contextorganisation: any[];
  
  // Speaking/QR related
  isSpeaking: boolean;
  contextSpeaking: string;
  contextQRInfo: string;
  
  // Setters
  contextsetEmail: (email: string) => void;
  contextsetName: (name: string) => void;
  contextsetimg: (img: string) => void;
  contextsetIsLoggedIn: (isLoggedIn: boolean) => void;
  contextsetRoadmap: (roadmap: any) => void;
  contextsetFirstRoadmap: (roadmap: any) => void;
  contextsetinput: (input: string) => void;
  contextsetInterview: (interview: string) => void;
  contextsetInterviewdeets: (details: string) => void;
  contextSetSelectedPerson: (person: string) => void;
  contextsetorganisation: (org: any[]) => void;
  setIsSpeaking: (speaking: boolean) => void;
  contextsetSpeaking: (speaking: string) => void;
  contextsetQRInfo: (qrInfo: string) => void;
  
  // Utility functions
  clearUserData: () => void;
  updateUserFromAuth: () => void;
}

// Create the UserContext
const UserContext = createContext<UserInfoContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User basic info
  const [contextemail, contextsetEmail] = useState('');
  const [contextname, contextsetName] = useState('');
  const [contextimg, contextsetimg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
  const [contextisLoggedIn, contextsetIsLoggedIn] = useState(false);
  
  // Roadmap related
  const [contextRoadmap, contextsetRoadmap] = useState<any>(null);
  const [contextFirstRoadmap, contextsetFirstRoadmap] = useState<any>(null);
  const [contextinput, contextsetinput] = useState('');
  
  // Interview related
  const [contextInterview, contextsetInterview] = useState('');
  const [contextInterviewdeets, contextsetInterviewdeets] = useState('');
  const [contextSelectedPerson, contextSetSelectedPerson] = useState('');
  const [contextorganisation, contextsetorganisation] = useState<any[]>([]);
  
  // Speaking/QR related
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [contextSpeaking, contextsetSpeaking] = useState('');
  const [contextQRInfo, contextsetQRInfo] = useState('');

  // Get auth context
  const { user, isAuthenticated } = useAuth();

  // Update user data from auth context
  const updateUserFromAuth = () => {
    if (user && isAuthenticated) {
      contextsetEmail(user.email || '');
      contextsetName(user.name || '');
      contextsetimg(user.profile_image || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
      contextsetIsLoggedIn(true);
    } else {
      clearUserData();
    }
  };

  // Clear all user data
  const clearUserData = () => {
    contextsetEmail('');
    contextsetName('');
    contextsetimg('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
    contextsetIsLoggedIn(false);
    contextsetRoadmap(null);
    contextsetFirstRoadmap(null);
    contextsetinput('');
    contextsetInterview('');
    contextsetInterviewdeets('');
    contextSetSelectedPerson('');
    contextsetorganisation([]);
    setIsSpeaking(false);
    contextsetSpeaking('');
    contextsetQRInfo('');
  };

  // Update user data when auth state changes
  useEffect(() => {
    updateUserFromAuth();
  }, [user, isAuthenticated]);

  const value: UserInfoContextType = {
    // User basic info
    contextemail,
    contextname,
    contextimg,
    contextisLoggedIn,
    
    // Roadmap related
    contextRoadmap,
    contextFirstRoadmap,
    contextinput,
    
    // Interview related
    contextInterview,
    contextInterviewdeets,
    contextSelectedPerson,
    contextorganisation,
    
    // Speaking/QR related
    isSpeaking,
    contextSpeaking,
    contextQRInfo,
    
    // Setters
    contextsetEmail,
    contextsetName,
    contextsetimg,
    contextsetIsLoggedIn,
    contextsetRoadmap,
    contextsetFirstRoadmap,
    contextsetinput,
    contextsetInterview,
    contextsetInterviewdeets,
    contextSetSelectedPerson,
    contextsetorganisation,
    setIsSpeaking,
    contextsetSpeaking,
    contextsetQRInfo,
    
    // Utility functions
    clearUserData,
    updateUserFromAuth,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
