// src/components/VisitorCounter.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';

const VisitorCounter = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

    const fetchAndTrack = async () => {
      // We only track the visit once per browser session
      if (!sessionStorage.getItem('visit_tracked_2025')) {
        try {
          console.log("Attempting to track new visit...");
          await fetch(`${API_BASE_URL}/api/analytics/track-visit`, { method: 'POST' });
          sessionStorage.setItem('visit_tracked_2025', 'true');
          console.log("Visit tracked successfully.");
        } catch (err) {
          console.error('Could not track visit. Is the backend server running?', err);
          // We can still try to fetch the count even if tracking fails
        }
      }

      // Now, fetch the latest count to display
      try {
        console.log("Fetching visit count...");
        const response = await fetch(`${API_BASE_URL}/api/analytics/visits`);
        console.log('Fetch response status:', response.status);

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        const data = await response.json();
        console.log('Visit count data received:', data);
        setVisitCount(data.count);
      } catch (err: any) {
        console.error('Could not fetch visit count. Is the backend server running?', err);
        setError("Could not load visitor count.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndTrack();

  }, []); // Empty array ensures this runs only once

  if (isLoading) {
    return <div className="text-xs text-slate-500 animate-pulse">Loading visitors...</div>;
  }

  if (error) {
    return <div className="text-xs text-red-500">{error}</div>;
  }

  if (visitCount === null) return null;

  return (
    <div className="flex items-center text-xs text-slate-400">
      <FaEye className="mr-1.5" />
      <span>Total Visitors:</span>
      <span className="font-semibold text-white ml-1">{visitCount.toLocaleString('en-IN')}</span>
    </div>
  );
};

export default VisitorCounter;
