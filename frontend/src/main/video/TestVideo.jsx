import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import poster from "../6226751042536718146.jpg"

const TestVideo = () => {
  const [testUrl, setTestUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const handleTestUrl = () => {
    if (!testUrl) return;

    setIsPlaying(true);

    const videoNode = videoRef.current;

    if (playerRef.current) {
      playerRef.current.dispose();
    }

    playerRef.current = videojs(videoNode, {
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: [{
        src: testUrl,
        type: 'application/x-mpegURL'
      }],
      html5: {
        hls: {
          enableLowInitialPlaylist: true,
          smoothQualityChange: true,
          overrideNative: true
        }
      }
    });

    playerRef.current.ready(() => {
      // Player is ready
    });

    playerRef.current.on('error', () => {
      console.error('Video.js error:', playerRef.current.error()?.message);
    });
  };

  const handleStop = () => {
    setIsPlaying(false);
    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Test Video URL</h1>

        {/* URL Input */}
        <div className="mb-6">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Video URL
          </label>
          <input
            type="text"
            id="url"
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
            placeholder="https://smart.bengaldigital.live/Star-Plus/index.m3u8"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={handleTestUrl}
            disabled={!testUrl}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Test URL
          </button>
          {isPlaying && (
            <button
              onClick={handleStop}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Stop
            </button>
          )}
        </div>

        {/* Video Player */}
        {isPlaying && (
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="video-js vjs-default-skin w-full h-full"
              controls
              autoPlay
              playsInline
            />
          </div>
        )}

        <a href="https://khelotoss.in/" target='_blank' rel="noreferrer">
          <img src={poster} alt="img" className='w-full h-full mt-4' />
        </a>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center">
        <p className="text-gray-600 mb-2">Contact Developer</p>
        <a
          href="https://t.me/webdevloper_7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Telegram
        </a>
      </footer>
    </div>
  );
};

export default TestVideo;
