import React from 'react';

const Html5Player = ({ fallbackUrl, onRetry }) => {
  return (
    <div className="html5-player-container">
      <video
        src={fallbackUrl}
        controls
        autoPlay
        muted
        width="100%"
        height="auto"
      >
        Your browser does not support the video tag.
      </video>
      <p>Playing video using native HTML5 player.</p>
      <button onClick={onRetry} style={{ marginTop: '10px' }}>
        Retry with Dash.js Player
      </button>
    </div>
  );
};

export default Html5Player;
