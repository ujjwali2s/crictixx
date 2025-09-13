import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LiveMatches from './main/LiveMatches';
import VideoPlayer from './main/video/VideoPlayer';
import JoinTelegramModal from './main/video/JoinTelegramModal';
import Navbar from './main/video/Navbar';
import Test from './main/video/Test';
import Scorecard from './scorecard/ScoreCard';
import Astro from './chennls/Astro';
import FoxCricket from './chennls/FoxCricket';
import SCricket from './chennls/Scricket';
import SkySports from './chennls/SkySport';
import { detectDevTools, preventDevTools } from './main/utils/devTools';
import { TELEGRAM_CHANNEL } from './main/config/constants.js';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal starts as closed
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenModal'); 
    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.keyCode === 85) { // Ctrl+U
        e.preventDefault();
        alert("View source is disabled!");
      }
    });
    
    if (!hasSeenModal) {
      setIsModalOpen(true); 
    }

    preventDevTools();

    const checkDevTools = () => {
      setIsDevToolsOpen(detectDevTools());
    };

    checkDevTools();
    const interval = setInterval(checkDevTools, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleModalClose = () => {
    localStorage.setItem('hasSeenModal', 'true'); // Store that user has seen the modal
    setIsModalOpen(false); // Close the modal
  };

  if (isDevToolsOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <p className="text-xl font-semibold mb-4">
            Please close DevTools to continue
          </p>
          <a
            href={TELEGRAM_CHANNEL.SUPPORT_URL}
            className="text-blue-600 hover:underline"
          >
            Contact support
          </a>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LiveMatches />} />
          <Route path="/video" element={<VideoPlayer />} />
          <Route path="/" element={<Test />} />
          <Route path="/channel/astro" element={<Astro />} />
          <Route path="/channel/fox" element={<FoxCricket />} />
          <Route path="/channel/scricket" element={<SCricket />} />
          <Route path="/channel/sky" element={<SkySports />} />
        </Routes>
       
        <JoinTelegramModal isOpen={isModalOpen} onClose={handleModalClose} />
      </div>
    </BrowserRouter>
  );
};

export default App;
