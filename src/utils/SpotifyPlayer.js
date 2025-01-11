import React from 'react';

const SpotifyPlayer = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <iframe
        className="w-full h-48 rounded-lg"
        src="https://open.spotify.com/embed/playlist/1XHtttwBPLOPXBZ3jBGAvX?utm_source=generator"
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="eager"
        title="Spotify Playlist"
        aria-label="Spotify Music Player"
      ></iframe>
    </div>
    
  );
};

export default SpotifyPlayer;
