import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ChannelList = () => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/byte-capsule/Toffee-Channels-Link-Headers/refs/heads/main/toffee_channel_data.json',
          {
            method: 'GET',
            credentials: 'include', // Include cookies with the request
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch channels: ${response.statusText}`);
        }
        const data = await response.json();
        const filteredChannels = data.channels.filter(
          (channel) =>
            channel.category_name === 'LIVE' || channel.category_name === 'Sports'
        );
        setChannels(filteredChannels);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
      </div>
    );
  }

  if (channels.length === 0) {
    return (
      <div className="text-center text-gray-600 py-8">
        <p>No channels found for the selected categories.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">Toffee Channels</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((channel, index) => (
          <li
            key={index}
            className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <img
              src={channel.logo}
              alt={channel.name}
              className="w-24 h-24 mx-auto mb-4 rounded-full"
            />
            <h3 className="text-lg font-semibold text-center">{channel.name}</h3>
            <p className="text-center text-sm text-gray-600">
              Category: {channel.category_name}
            </p>
            <Link
              to={{
                pathname: '/videO',
                state: { adfreeUrl: channel.link },
              }}
              className="block mt-4 text-center text-blue-600 hover:underline"
            >
              Watch Now
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
