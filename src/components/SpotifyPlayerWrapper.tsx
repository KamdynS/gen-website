'use client';

import React, { useState } from 'react';
import SpotifyPlayer from './SpotifyPlayer';

const SpotifyPlayerWrapper: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-10">
      <div className="relative">
        <p className="text-pink-500 text-sm mb-2 ml-4">
          Click play to hear my playlist for Gen
          <span className="inline-block ml-2 transform rotate-90">→</span>
        </p>
        <div className="ml-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-pink-500 text-sm hover:text-pink-600 focus:outline-none"
          >
            {isCollapsed ? 'Show Player' : 'Hide Player'}
          </button>
        </div>
        <SpotifyPlayer isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};

export default SpotifyPlayerWrapper;