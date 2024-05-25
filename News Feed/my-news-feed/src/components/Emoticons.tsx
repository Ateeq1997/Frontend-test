// src/components/Emoticons.tsx
import React, { useState } from 'react';

interface EmoticonsProps {
  onSelect: (emoticon: string) => void;
}

const Emoticons: React.FC<EmoticonsProps> = ({ onSelect }) => {
  const [showEmoticons, setShowEmoticons] = useState(false);

  const handleSelectEmoticon = (emoticon: string) => {
    onSelect(emoticon);
    setShowEmoticons(false); // Hide emoticons after selection
  };

  const toggleEmoticons = () => {
    setShowEmoticons(!showEmoticons);
  };

  return (
    <div className="relative inline-block">
      <button onClick={toggleEmoticons} className="text-2xl">
        🙂
      </button>
      {showEmoticons && (
        <div className="absolute bg-white border rounded-lg p-2 shadow-md mt-1">
          <button onClick={() => handleSelectEmoticon('😀')} className="text-2xl mr-2">
            😀
          </button>
          <button onClick={() => handleSelectEmoticon('😢')} className="text-2xl mr-2">
            😢
          </button>
          <button onClick={() => handleSelectEmoticon('😡')} className="text-2xl mr-2">
            😡
          </button>
          {/* Add more emoticons as needed */}
        </div>
      )}
    </div>
  );
};

export default Emoticons;
