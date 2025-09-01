"use client";

import React, { createContext, useContext, useState } from 'react';

// Create a context for the roadmap
const RoadmapContext = createContext<{ roadmap: any, setRoadmap: (roadmap: any) => void }>({ roadmap: null, setRoadmap: () => {} });


export const RoadmapProvider = ({ children }: { children: React.ReactNode }) => {
  const [roadmap, setRoadmap] = useState({
    roadmap_id: null,
    total_components: null,
    first_component: null,
  });
  return (
    <RoadmapContext.Provider value={{ roadmap, setRoadmap }}>
      {children}
    </RoadmapContext.Provider>
  );
};

// Custom hook to use the Roadmap context
export const useRoadmap = () => {
  return useContext(RoadmapContext);
};
