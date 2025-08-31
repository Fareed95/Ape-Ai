"use client";
import React, { useState, useEffect } from "react";
import HeroSection from "@/components/Landing/HeroSection";
import FeaturesSection from "@/components/Landing/FeaturesSection";
import StatsSection from "@/components/Landing/StatsSection";
import LearningPathSection from "@/components/Landing/LearningPathSection";
import TestimonialsSection from "@/components/Landing/TestimonialsSection";
import CTASection from "@/components/Landing/CTASection";
import TechStackSection from "@/components/Landing/TechStackSection";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && token && user) {
      // Navigate based on user type
      if (user.is_company) {
        router.push('/CompanyMain');
      } else {
        router.push('/Main');
      }
    }
  }, [token, user, isLoading, router]);

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // If user is authenticated, don't render the landing page
  if (token && user) {
    return null;
  }

  return (
    <div className="bg-black text-white overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TechStackSection />
      <CTASection />
      <LearningPathSection />
      <TestimonialsSection />
    </div>
  );
}