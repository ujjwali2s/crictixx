import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import poster from "../6226751042536718146.jpg"

const SonyLivMatches = () => {
  const streams = [
    { name: "Sony Liv Live Match", url: "https://edge3-moblive.yuppcdn.net/drm/smil:tencricketdrm.smil/chunklist_b996000.m3u8" },
    { name: "willow H", url: "http://xxip9.top:8080/live/7656691303/chrisbolden765%40icloud.com/58847.m3u8" },
    { name: "Sony 3 Asia Cup", url: "https://smart.bengaldigital.live/Star-Plus/index.m3u8" }
  ];

  const [selectedStream, setSelectedStream] = useState(streams[0]);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    setError(null); // Clear error when stream changes
  }, [selectedStream]);

  useEffect(() => {
    if (!selectedStream || !videoRef.current) {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      return;
    }

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
        src: selectedStream.url,
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
      setError(`Video cannot be played: ${playerRef.current.error()?.message || 'Unknown error'}`);
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [selectedStream]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Header */}
        <div className="flex overflow-x-auto space-x-4 mb-6 scrollbar-hide">
          {streams.map((stream) => (
            <button
              key={stream.name}
              onClick={() => setSelectedStream(stream)}
              className={`px-6 py-2 whitespace-nowrap rounded-lg transition-colors ${
                selectedStream.name === stream.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {stream.name}
            </button>
          ))}
        </div>

        {/* Video Player */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          {error ? (
            <div className="w-full aspect-video flex items-center justify-center text-white bg-black">
              {error}
            </div>
          ) : (
            <video
              ref={videoRef}
              className="video-js vjs-default-skin w-full h-full"
              controls
              autoPlay
              playsInline
            />
          )}
        </div>
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

export default SonyLivMatches;