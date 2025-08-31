'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'

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
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-4">Profile</h3>
            <p className="text-gray-400">Manage your profile and settings</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-4">Interviews</h3>
            <p className="text-gray-400">View your interview status</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-4">Internships</h3>
            <p className="text-gray-400">Check internship applications</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
