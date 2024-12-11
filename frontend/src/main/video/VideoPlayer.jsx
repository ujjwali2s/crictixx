import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Hls from 'hls.js';
import poster from "../6226751042536718146.jpg"

const VideoPlayer = () => {
  const location = useLocation();
  const videoUrl = location.state?.adfreeUrl;
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [viewerCount] = useState(() => Math.floor(Math.random() * (100 - 20 + 1)) + 20);

  useEffect(() => {
    if (!videoUrl || !videoRef.current) {
      return;
    }

    if (Hls.isSupported()) {
      hlsRef.current = new Hls();
      hlsRef.current.loadSource(videoUrl);
      hlsRef.current.attachMedia(videoRef.current);

      hlsRef.current.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          console.error('HLS.js error:', data);
        }
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = videoUrl;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [videoUrl]);

  if (!videoUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Match is not live yet</h2>
        <p className="text-gray-600 mb-6">Please check back later</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="w-full aspect-video"
            controls
            autoPlay
            playsInline
          />
          
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {viewerCount} people watching
          </div>
          
        </div>
       <a href="https://thala7.in/" target='_blank'><img src={poster} alt="img" className='w-full h-full' /></a> 
      </div>
    </div>
  );
};

export default VideoPlayer;
