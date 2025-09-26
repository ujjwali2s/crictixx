import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const streamData = {
  name: "BAN vs WI VIP",
  link: "https://bldcmprod-cdn.toffeelive.com/cdn/live/b4u_movies/playlist.m3u8",
  headers: {
    Host: "bldcmprod-cdn.toffeelive.com",
    cookie: "Edge-Cache-Cookie=URLPrefix=aHR0cHM6Ly9ibGRjbXByb2QtY2RuLnRvZmZlZWxpdmUuY29tLw:Expires=1733156229:KeyName=prod_linear:Signature=crGWeXYNw748ro_lBiBnm3yA6bftIy84BuCUqMHVLU-eqwk5A7GMxuU91iUTA8JOCk3KkjQlZa5655R4qhuaDQ",
    "user-agent": "Toffee (Linux;Android 14) AndroidXMedia3/1.1.1/64103898/4d2ec9b8c7534adc",
    "client-api-header": "angM1aXCHQLmmSW6cDlpXMD6tLdwnhMoUeaBBFKmd98bX6Vrae5xCMbm4gg0+u33rnxeGQDZNr2GD1tW0cWwKEpWimNlGqXVQGhpiIBz1JFxN+OxXcQqaMPrjwUhCyI5mO1DGyNv18+Z2EpmHtVnLzV9SrGsQWu4oRKjxE8QIMsRs6LrvL6hWGPlOGQke/qb5QxQZNetPzI39jHhX7Zi2XrCMIT4a+gk2Wu1c3wIybwkqknPcTp4Bj1cEF3Q+q1dV05SBhzpEDfoR2BLyQ6dV3LvmY6MNKxbUjby7hMsg35lFl2Df2mZsr7C27309w/qWi8lLXDjB7B1MozIGKn8rw3bXY5YlrPKBKztyiisAjQQi7kc5ISXyGSwRmhciwkciuitsSL0LlqHY7/Qkkh71EtaK3XEgVpLdH8zRCsTwfu1iIVPiDwTycuuBy4XWkcNnd0iLB35yftQpiL8HfpO2jQnrAwzePxszJ7mewVG+M0P/qyTBD52NkPR8uW0AZmDKp5LHTCGf7sqldDzpZvU+gsSdvtsBUcmHzjINGEoyXk=",
    "accept-encoding": "gzip",
  },
};

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!streamData.link) {
      console.error("No stream URL provided.");
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
        src: streamData.link,
        type: 'application/x-mpegURL'
      }],
      html5: {
        hls: {
          enableLowInitialPlaylist: true,
          smoothQualityChange: true,
          overrideNative: true,
          xhrSetup: (xhr, url) => {
            const { headers } = streamData;
            Object.entries(headers).forEach(([key, value]) => {
              xhr.setRequestHeader(key, value);
            });
          }
        }
      }
    });

    playerRef.current.ready(() => {
      // Player is ready
    });

    playerRef.current.on('error', () => {
      console.error('Video.js error:', playerRef.current.error()?.message);
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-center text-xl font-bold mb-4">{streamData.name}</h2>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin w-full h-full"
        controls
        autoPlay
      ></video>
    </div>
  );
};

export default VideoPlayer;
