'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'
import FloatingParticles from '@/components/UserMain/FloatingParticles'
import Spotlight from '@/components/UserMain/SpotLight'
import OrbitalSpheres from '@/components/UserMain/OrbitalSpheres'
import TrueFocus from '@/components/UserMain/TrueFocus'
import MainInput from '@/components/UserMain/MainInput'
import PrevCources from '@/components/UserMain/PrevCources'


export default function MainPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Redirect company users to their dashboard
  useEffect(() => {
    if (user?.is_company) {
      router.push('/CompanyMain')
    }
  }, [user, router])

  // Don't render if user is a company
  if (user?.is_company) {
    return null
  }

  return (
    <div className="text-white min-h-screen overflow-x-hidden relative">
      {/* Background elements */}
      <OrbitalSpheres />
      <FloatingParticles />
      <Spotlight />
      
      {/* Content */}
      <div className="relative z-10">   
        <main className="container mx-auto pt-16 sm:pt-20 pb-16 sm:pb-20 px-4">
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 mt-6 sm:mt-8 md:mt-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-2"
            >
              <TrueFocus
                sentence="Learn Grow Excel"
                manualMode={false}
                blurAmount={3}
                borderColor="#8b5cf6"
                glowColor="rgba(139, 92, 246, 0.7)"
                animationDuration={0.3}
                pauseBetweenAnimations={2}
              />
            </motion.div>
            
            {/* Main input section */}
            <MainInput />
            
            {/* Previous courses section */}
            <PrevCources />
          </div>
        </main>
      </div>
    </div>
  );
}
