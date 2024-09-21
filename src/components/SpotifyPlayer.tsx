'use client';

import React from 'react';

const PLAYLIST_ID = '4hieafgpZeurKZPCZCSNfV';

interface SpotifyPlayerProps {
  isCollapsed: boolean;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ isCollapsed }) => {
  return (
    <div className={`w-full max-w-xl mx-auto transition-all duration-300 ${isCollapsed ? 'h-0 overflow-hidden' : 'h-[152px]'}`}>
      <iframe 
        style={{borderRadius: '12px'}} 
        src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
        width="100%" 
        height="152" 
        frameBorder="0" 
        allowFullScreen 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer;