import React, { useState } from 'react';
import { TELEGRAM_CHANNEL } from '../config/constants.js';

const JoinTelegramModal = () => {
  const [isOpen, setIsOpen] = useState(true); // Always start with the modal open

  const handleJoinClick = () => {
    // Open Telegram channel URL
    window.open(TELEGRAM_CHANNEL.URL, '_blank'); // Open in a new tab
  };

  const handleClose = () => {
    // Close the modal
    setIsOpen(false);
  };

  if (!isOpen) return null; // Do not render if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4 text-center">
          Have you joined our Telegram Channel?
        </h2>
        <div className="space-y-3">
          <button
            onClick={handleJoinClick}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Join our Telegram Channel
          </button>
          <button
            onClick={handleClose}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
          >
            Already Joined
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinTelegramModal;
