'use client';

import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';

const VisitorCounter = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

    const fetchAndTrack = async () => {
      try {
        const alreadyTracked = sessionStorage.getItem('visit_tracked_2025');

        if (!alreadyTracked) {
          const res = await fetch(`${API_BASE_URL}/`);
          const data = await res.json();
          setVisitCount(data.visits);
          sessionStorage.setItem('visit_tracked_2025', 'true');
        } else {
          const res = await fetch(`${API_BASE_URL}/api/visits`);
          const data = await res.json();
          setVisitCount(data.visits);
        }
      } catch (err) {
        console.error(err);
        setError('Could not load visitor count.');
      }
    };

    fetchAndTrack();
  }, []);

  // ✅✅✅ BLOCK SSR: don’t render at all until mounted.
  if (!hasMounted) return null;

  if (error) {
    return <div className="text-xs text-red-500">{error}</div>;
  }

  if (visitCount === null) {
    return <div className="text-xs text-slate-500 animate-pulse">Loading visitors...</div>;
  }

  return (
    <div className="flex items-center text-xs text-slate-400">
      <FaEye className="mr-1.5" />
      <span>Total Visitors:</span>
      <span className="font-semibold text-white ml-1">
        {visitCount.toLocaleString('en-IN')}
      </span>
    </div>
  );
};

export default VisitorCounter;
