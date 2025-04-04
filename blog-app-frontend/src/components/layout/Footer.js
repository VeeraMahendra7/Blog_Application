import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-lg">BlogApp</span>
            <p className="text-sm text-gray-400 mt-1">
              Share your thoughts with the world
            </p>
          </div>
          
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;