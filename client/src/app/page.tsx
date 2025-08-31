"use client";
import React, { useState, useEffect } from "react";
import LandingPageSkeleton from "@/components/Landing/LandingPageSkeleton";
import HeroSection from "@/components/Landing/HeroSection";
import FeaturesSection from "@/components/Landing/FeaturesSection";
import StatsSection from "@/components/Landing/StatsSection";
import LearningPathSection from "@/components/Landing/LearningPathSection";
import TestimonialsSection from "@/components/Landing/TestimonialsSection";
import CTASection from "@/components/Landing/CTASection";
import TechStackSection from "@/components/Landing/TechStackSection";

export default function LandingPage() {
  // const [isLoading, setIsLoading] = useState(true);
  
  // if (isLoading) {
  //   return <LandingPageSkeleton />;
  // }
  // useEffect(() => {
  //   setIsLoading(false);
  // }, []);

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