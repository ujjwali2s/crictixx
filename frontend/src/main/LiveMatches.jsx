import React, { useState } from 'react';
import FancodeMatches from './video/FancodeMatches';
import SonyLivMatches from './video/SonyLivMatches';
import SportsMatches from '../odds/Score'; // New Component
import IndiaMatches from '../scorecard/bgt/Match'; // New Component
import ListMatches from '../chennls/List'; // New Component

const LiveMatches = () => {
  const [activeTab, setActiveTab] = useState('sonylive');

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="flex overflow-x-auto space-x-4 mb-6 scrollbar-hide">
        {/* Add horizontal scrolling for the buttons */}
        {/* <button
          onClick={() => setActiveTab('channel')}
          className={`px-6 py-2 whitespace-nowrap rounded-lg transition-colors ${
            activeTab === 'channel'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Channels
        </button> */}
        {/* <button
          onClick={() => setActiveTab('fancode')}
          className={`px-6 py-2 whitespace-nowrap rounded-lg transition-colors ${
            activeTab === 'fancode'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Fancode
        </button> */}
        {/* <button
          onClick={() => setActiveTab('BGT')}
          className={`px-6 py-2 whitespace-nowrap rounded-lg transition-colors ${
            activeTab === 'BGT'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Ind Vs Aus
        </button> */}
        <button
          onClick={() => setActiveTab('sonylive')}
          className={`px-6 py-2 whitespace-nowrap rounded-lg transition-colors ${
            activeTab === 'sonylive'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          SonyLiv
        </button>
        {/* <button
          onClick={() => setActiveTab('Scorecard')}
          className={`px-6 py-2 whitespace-nowrap rounded-lg transition-colors ${
            activeTab === 'Scorecard'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Scorecard
        </button> */}
      </div>

      {/* Content Section */}
      <div>
        {activeTab === 'channel' && <ListMatches />}
        {activeTab === 'fancode' && <FancodeMatches />}
        {activeTab === 'sonylive' && <SonyLivMatches />}
        {activeTab === 'Scorecard' && <SportsMatches />}
        {activeTab === 'BGT' && <IndiaMatches />}
      </div>
    </div>
  );
};

export default LiveMatches;
