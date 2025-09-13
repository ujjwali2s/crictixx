import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import poster from "../6226751042536718146.jpg"

const SonyLivMatches = () => {
  const streams = [
    { name: "Sony Liv Live Match", url: "https://edge3-moblive.yuppcdn.net/drm/smil:tencricketdrm.smil/chunklist_b996000.m3u8" },
    { name: "Sony Sports 1", url: "https://live20.bozztv.com/akamaissh101/ssh101/starsports/chunks.m3u8" },
    { name: "Sony 3 Asia Cup", url: "https://tiger-hub.vercel.app/Star_Sports-1/tracks-v1a1/mono.m3u8" }
  ];

  const [selectedStream, setSelectedStream] = useState(streams[0]);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current || !selectedStream) {
      return;
    }

    if (Hls.isSupported()) {
      hlsRef.current = new Hls();
      hlsRef.current.loadSource(selectedStream.url);
      hlsRef.current.attachMedia(videoRef.current);

      hlsRef.current.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          console.error('HLS.js error:', data);
        }
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = selectedStream.url;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
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
          <video
            ref={videoRef}
            className="w-full aspect-video"
            controls
            autoPlay
            playsInline
          />
        </div>
        <a href="https://khelotoss.in/" target='_blank' rel="noreferrer">
          <img src={poster} alt="img" className='w-full h-full mt-4' />
        </a>
      </div>
    </div>
  );
};

export default SonyLivMatches;