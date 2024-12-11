import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

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
  const hlsRef = useRef(null);

  useEffect(() => {
    if (!streamData.link) {
      console.error("No stream URL provided.");
      return;
    }

    const customLoader = (config) => {
      const originalLoader = config.loader;
      return class CustomLoader extends originalLoader {
        constructor(config) {
          super(config);
          const { headers } = streamData;
          this.xhrSetup = (xhr) => {
            Object.entries(headers).forEach(([key, value]) => {
              xhr.setRequestHeader(key, value);
            });
          };
        }
      };
    };

    if (Hls.isSupported()) {
      hlsRef.current = new Hls({
        xhrSetup: (xhr, url) => {
          const { headers } = streamData;
          Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
          });
        },
        loader: customLoader(Hls.DefaultConfig),
      });
      hlsRef.current.loadSource(streamData.link);
      hlsRef.current.attachMedia(videoRef.current);

      hlsRef.current.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          console.error('HLS.js error:', data);
        }
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS playback for Safari
      videoRef.current.src = streamData.link;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-center text-xl font-bold mb-4">{streamData.name}</h2>
      <video
        ref={videoRef}
        className="w-full rounded-lg border shadow"
        controls
        autoPlay
      ></video>
    </div>
  );
};

export default VideoPlayer;
