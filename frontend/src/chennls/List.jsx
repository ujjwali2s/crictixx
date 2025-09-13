import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Import the channels.json file (adjust the path if necessary)
import channelData from './channels.json';

const ChannelList = () => {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    // Set the channels from the imported JSON data
    setChannels(channelData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Channels</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {channels.map((channel) => (
          <li
            key={channel.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            <div className="p-4">
              <img
                src={channel.img}
                alt={channel.name}
                className="w-full h-32 object-cover mb-2 rounded-md"
              />
              <Link
                to={channel.url}
                className="block text-lg font-medium text-blue-600 hover:text-blue-800"
              >
                {channel.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
