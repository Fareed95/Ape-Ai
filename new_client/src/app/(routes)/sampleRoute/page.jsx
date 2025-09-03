"use client";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";



export default function SampleRoute() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://api-ape.crodlin.in/api/user");
        const data = await response.json();
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-black p-6 mt-20">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Panel - Students for Interview */}
          <div className="bg-neutral-glass border border-glass-border p-6 rounded-2xl backdrop-blur-md">
            <h2 className="text-xl font-bold text-neutral-text mb-4">Students for Interview</h2>
            <div className="space-y-4">
              {userData.map((student) => (
                <div key={student.id}>
                  <h3>{student.user_name}</h3>
                  <p>{student.internship_name}</p>
                  <p>{student.company_name}</p>
                  <p>{student.interviw_time}</p>
                  <p>{student.registered_at}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Students Under Review */}
          <div className="bg-neutral-glass border border-glass-border p-6 rounded-2xl backdrop-blur-md">
            <h2 className="text-xl font-bold text-neutral-text mb-4">Students Under Review</h2>
            <div className="space-y-4">
              {studentsUnderReview.map((student) => (
                <div key={student.id}>
                  <h3>{student.user_name}</h3>
                  <p>{student.internship_name}</p>
                  <p>{student.company_name}</p>
                  <p>{student.interviw_time}</p>
                  <p>{student.registered_at}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
