import React from 'react';
import { Link } from 'react-router-dom';
import { TvIcon } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <TvIcon className="h-6 w-6" />
          <span className="text-xl font-bold">CrickTixx</span>
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Live Matches</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;