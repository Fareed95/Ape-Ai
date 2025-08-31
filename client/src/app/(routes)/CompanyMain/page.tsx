'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { motion } from 'framer-motion'

export default function CompanyMainPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/Login')
    } else if (!isLoading && isAuthenticated && !user?.is_company) {
      router.push('/Main')
    }
  }, [isAuthenticated, isLoading, user, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated || !user?.is_company) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">Company Dashboard</h1>
          <p className="text-gray-400 mb-8">Welcome back, {user?.name}!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Company Dashboard Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-4">Company Profile</h3>
              <p className="text-gray-400">Manage your company information</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-4">Job Postings</h3>
              <p className="text-gray-400">Create and manage job opportunities</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-4">Applications</h3>
              <p className="text-gray-400">Review candidate applications</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-4">Interviews</h3>
              <p className="text-gray-400">Schedule and manage interviews</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-4">Analytics</h3>
              <p className="text-gray-400">View hiring analytics and reports</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-4">Settings</h3>
              <p className="text-gray-400">Configure company preferences</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
