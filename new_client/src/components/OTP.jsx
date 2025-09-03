"use client"
import { useUserContext } from '@/app/context/Userinfo';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function OTP() {
  const router = useRouter();
  const { toast } = useToast();
  const { 
    contextpassword,
    contextsetPassword,
    contextsetIsLoggedIn,
    contextsetEmail,
    contextsetName,
    contextemail,
    setContextEmail 
  } = useUserContext();
  
  const password = contextpassword;
  const email = contextemail;
  const [otp, setOtp] = useState('');

  const Getuserinfo = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        method: 'GET',
        headers: {
          "Authorization": token,
          'Content-Type': "application/json",
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      if (response.ok) {
        const result = await response.json();
        contextsetIsLoggedIn(true);
        contextsetEmail(result.email);
        contextsetName(result.name);
        toast({
          title: "Successfully registered",
        });
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const Autologin = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      toast({
        title: "Some error happened",
      });
      return;
    }

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem('authToken', result.jwt);
      Getuserinfo();
      changetoHome();
      contextsetPassword("");
    }
  };

  const changetoHome = () => {
    router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (otp.length !== 4) {
      toast({
        title: "Please enter a 4-digit OTP",
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      if (!response.ok) {
        throw new Error('OTP verification failed');
      }

      await Autologin();
    } catch (error) {
      toast({
        title: "Wrong OTP",
        description: error.message,
      });
    }
  };

  const handleResend = () => {
    console.log("Resend OTP");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Enter OTP</h2>
          <p className="text-gray-400 text-sm">
            We've sent a code to <span className="text-blue-400">{contextemail}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center">
            <InputOTP 
              maxLength={4} 
              value={otp}
              onChange={(value) => setOtp(value)}
              className="gap-4"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-14 h-14 text-2xl" />
                <InputOTPSlot index={1} className="w-14 h-14 text-2xl" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={2} className="w-14 h-14 text-2xl" />
                <InputOTPSlot index={3} className="w-14 h-14 text-2xl" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
            >
              Verify OTP
            </button>
          </div>

          <div className="text-center text-sm">
            <p className="text-gray-400">
              Didn't receive code? 
              <button type="button" className="text-blue-400 hover:text-blue-500 ml-2" onClick={handleResend}>
                Resend
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OTP;