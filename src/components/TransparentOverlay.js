// Updated Overlay Component with Transparent Background
import React from 'react';

// This component creates an overlay that shows the background behind it
// by using a combination of transparent background with backdrop blur
// Similar to the technique used in your DatabasePage component

const TransparentOverlay = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      {/* Backdrop - semi-transparent dark layer */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-2xl p-6 m-4 rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-gray-200">
        {children}
      </div>
    </div>
  );
};

export default TransparentOverlay;