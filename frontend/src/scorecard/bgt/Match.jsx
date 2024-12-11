import React, { useState } from 'react';
import DashPlayer from './Live';
import Html5Player from './Live2';

const VideoPlayer = () => {
  const [useDashPlayer, setUseDashPlayer] = useState(true);

  const dashVideoUrl = 'https://d1yws6emo43ny.cloudfront.net/CH5/masterCH5.mpd';
  const html5FallbackUrl = 'https://d1yws6emo43ny.cloudfront.net/CH5/masterCH5.mp4';

  const handleDashError = () => {
    console.error('Switching to HTML5 fallback due to Dash.js error');
    setUseDashPlayer(false);
  };

  const handleRetryWithDash = () => {
    setUseDashPlayer(true); // Retry Dash.js
  };

  return (
    <div className="video-container">
      {useDashPlayer ? (
        <DashPlayer videoUrl={dashVideoUrl} onError={handleDashError} />
      ) : (
        <Html5Player fallbackUrl={html5FallbackUrl} onRetry={handleRetryWithDash} />
      )}
    </div>
  );
};

export default VideoPlayer;
