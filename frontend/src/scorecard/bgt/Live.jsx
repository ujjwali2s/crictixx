import React, { useEffect, useRef } from 'react';
import dashjs from 'dashjs';

const DashPlayer = ({ videoUrl, onError }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      const player = dashjs.MediaPlayer().create();

      player.updateSettings({
        debug: {
          logLevel: dashjs.Debug.LOG_LEVEL_DEBUG,
        },
        streaming: {
          lowLatencyEnabled: true,
          liveDelay: 1,
          stableBufferTime: 1.5,
          bufferTimeAtTopQuality: 0.5,
          bufferTimeAtTopQualityLongForm: 0.5,
        },
      });

      player.extend(
        'RequestModifier',
        () => ({
          modifyRequestHeader: (xhr) => {
            xhr.setRequestHeader('Accept', '*/*');
            xhr.setRequestHeader(
              'Authorization',
              'Bearer YOUR_AUTHORIZATION_TOKEN'
            );
            return xhr;
          },
        }),
        true
      );

      // Handle errors
      player.on(dashjs.MediaPlayer.events.ERROR, (e) => {
        console.error('Dash.js Error:', e);
        onError(); // Call parent component's error handler
      });

      // Initialize Dash.js
      player.initialize(videoRef.current, videoUrl, true);

      // Cleanup player on unmount
      return () => {
        player.reset();
      };
    }
  }, [videoUrl, onError]);

  return (
    <video ref={videoRef} controls muted className="video-player" width="100%" height="auto" />
  );
};

export default DashPlayer;
