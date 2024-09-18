import React from 'react';

const PLAYLIST_ID = '4hieafgpZeurKZPCZCSNfV';

const SpotifyPlayer: React.FC = () => {
  return (
    <div className="w-full max-w-xl mx-auto">
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