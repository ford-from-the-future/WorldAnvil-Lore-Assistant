import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex justify-start">
        <div className="flex items-center space-x-2 bg-[#000000]/40 text-[#d8e4dd] px-4 py-2 rounded-lg">
            <div className="w-2 h-2 bg-[#cd8032] rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 bg-[#cd8032] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-[#cd8032] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
    </div>
  );
};