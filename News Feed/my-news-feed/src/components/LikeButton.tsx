// src/components/LikeButton.tsx
import React from 'react';

interface LikeButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="text-xs text-gray-500 hover:text-gray-700 mr-2">
      {children}
    </button>
  );
};

export default LikeButton;
