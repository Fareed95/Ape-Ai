import React from 'react'
import UserDashboard from '@/components/dashboard/UserDashboard'
import JobMatchingDashboard from '@/components/jobs/JobMatchingDashboard'
function page() {
  return (
    <div>
    <UserDashboard />

    <div className='text-white text-2xl font-bold bg-gray-900'>
      <p className='text-center py-4 font-bold text-6xl'>AI-Powered Job Matching & Resume Builder</p>
    </div>


    <JobMatchingDashboard />
    </div>


  )
}

export default page

