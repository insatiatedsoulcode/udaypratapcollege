'use client';

import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';

const VisitorCounter = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const fetchAndTrack = async () => {
      try {
        const alreadyTracked = sessionStorage.getItem('visit_tracked_2025');
        let res;

        if (!alreadyTracked) {
          res = await fetch('/api/visits', { method: 'POST' });
          sessionStorage.setItem('visit_tracked_2025', 'true');
        } else {
          res = await fetch('/api/visits');
        }

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();

        if (typeof data.visits === 'number') {
          setVisitCount(data.visits);
        } else {
          throw new Error('Invalid data format');
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
