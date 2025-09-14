import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import poster from "../6226751042536718146.jpg"

const TestVideo = () => {
  const [testUrl, setTestUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  const handleTestUrl = () => {
    if (!testUrl) return;

    setIsPlaying(true);

    if (Hls.isSupported()) {
      hlsRef.current = new Hls();
      hlsRef.current.loadSource(testUrl);
      hlsRef.current.attachMedia(videoRef.current);

      hlsRef.current.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          console.error('HLS.js error:', data);
        }
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = testUrl;
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    if (hlsRef.current) {
      hlsRef.current.destroy();
    }
    if (videoRef.current) {
      videoRef.current.src = '';
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
              className="w-full aspect-video"
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
