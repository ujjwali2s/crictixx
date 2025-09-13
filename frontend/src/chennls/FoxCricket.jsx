import React from 'react';

const ChannelDetail = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Fox Cricket</h1>
      </div>

      {/* Video Section */}
      <div className="w-full max-w-md aspect-video rounded-lg overflow-hidden shadow-lg bg-black">
        <iframe
          className="w-full h-full"
          src="https://tmsbd.top/tt/play.php?id=369"
          title="Fox Cricket"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Description Section */}
      <h2 className="text-lg font-medium text-gray-700 mt-4 text-center">
        Click on the video to start the match
      </h2>
    </div>
  );
};

export default ChannelDetail;
