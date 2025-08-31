"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService, UserData, RegisterData, LoginData, OTPData, PasswordResetRequestData, PasswordResetData } from '@/api/authService';
import { useToast } from './ToastContext';

// Auth context interface
interface AuthContextType {
  user: UserData | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  register: (data: RegisterData) => Promise<void>;
  verifyOTP: (data: OTPData) => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  requestPasswordReset: (data: PasswordResetRequestData) => Promise<void>;
  resetPassword: (data: PasswordResetData) => Promise<void>;
  updateUserName: (name: string) => Promise<void>;
  deleteUser: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { showSuccess, showError, showInfo } = useToast();

  // Check if user is authenticated
  const isAuthenticated = !!user && !!token;

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('auth_user');

        if (storedToken && storedUser) {
          // Set initial state from localStorage
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          
          // Verify token is still valid by fetching user data
          try {
            const userData = await authService.getUserData(storedToken);
            setUser(userData);
            localStorage.setItem('auth_user', JSON.stringify(userData));
          } catch (error: any) {
            console.log('Token validation failed:', error.message);
            // Token is invalid, clear storage
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            setToken(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Navigate based on user type
  const navigateBasedOnUserType = (userData: UserData) => {
    if (userData.is_company) {
      router.push('/CompanyMain');
    } else {
      router.push('/Main');
    }
  };

  // Register user
  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      await authService.register(data);
      showSuccess('Registration Successful', 'Please check your email for OTP verification');
    } catch (error: any) {
      console.error('Registration error:', error);
      showError('Registration Failed', error.message || 'Failed to register. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async (data: OTPData) => {
    try {
      setIsLoading(true);
      await authService.verifyOTP(data);
      showSuccess('Email Verified', 'Your account has been activated successfully');
      // After OTP verification, user should login
      router.push('/Login');
    } catch (error: any) {
      console.error('OTP verification error:', error);
      showError('Verification Failed', error.message || 'Invalid OTP. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const resendOTP = async (email: string) => {
    try {
      setIsLoading(true);
      await authService.resendOTP(email);
      showInfo('OTP Resent', 'A new OTP has been sent to your email');
    } catch (error: any) {
      console.error('Resend OTP error:', error);
      showError('Resend Failed', error.message || 'Failed to resend OTP. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Login user
  const login = async (data: LoginData) => {
    try {
      setIsLoading(true);
      const response = await authService.login(data);
      
      if (response.jwt) {
        setToken(response.jwt);
        localStorage.setItem('auth_token', response.jwt);
        
        // Fetch user data
        const userData = await authService.getUserData(response.jwt);
        setUser(userData);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        
        showSuccess('Login Successful', `Welcome back, ${userData.name}!`);
        
        // Navigate based on user type
        navigateBasedOnUserType(userData);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      showError('Login Failed', error.message || 'Invalid credentials. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      if (token) {
        await authService.logout(token);
      }
      showInfo('Logged Out', 'You have been successfully logged out');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear auth state regardless of API call success
      setToken(null);
      setUser(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      router.push('/');
    }
  };

  // Request password reset
  const requestPasswordReset = async (data: PasswordResetRequestData) => {
    try {
      setIsLoading(true);
      await authService.requestPasswordReset(data);
      showInfo('Reset Email Sent', 'Please check your email for password reset instructions');
    } catch (error: any) {
      console.error('Password reset request error:', error);
      showError('Reset Failed', error.message || 'Failed to send reset email. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (data: PasswordResetData) => {
    try {
      setIsLoading(true);
      await authService.resetPassword(data);
      showSuccess('Password Reset', 'Your password has been reset successfully');
      // After password reset, redirect to login
      router.push('/Login');
    } catch (error: any) {
      console.error('Password reset error:', error);
      showError('Reset Failed', error.message || 'Failed to reset password. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update user name
  const updateUserName = async (name: string) => {
    try {
      if (!token) throw new Error('No authentication token');
      
      setIsLoading(true);
      await authService.updateUserName(token, name);
      
      // Update local user data
      if (user) {
        const updatedUser = { ...user, name };
        setUser(updatedUser);
        localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete user account
  const deleteUser = async () => {
    try {
      if (!token) throw new Error('No authentication token');
      
      setIsLoading(true);
      await authService.deleteUser(token);
      
      // Clear auth state and redirect to home
      setToken(null);
      setUser(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      router.push('/');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    register,
    verifyOTP,
    resendOTP,
    login,
    logout,
    requestPasswordReset,
    resetPassword,
    updateUserName,
    deleteUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
