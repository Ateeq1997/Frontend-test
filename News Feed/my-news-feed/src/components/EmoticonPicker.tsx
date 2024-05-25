// src/components/EmoticonPicker.tsx
import React, { useState } from 'react';

const emoticons = ['😀', '😂', '😊', '😍', '😎', '🤩', '😜', '😇', '🥳'];

interface EmoticonPickerProps {
  onSelect: (emoticon: string) => void;
}

const EmoticonPicker: React.FC<EmoticonPickerProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmoticonSelect = (emoticon: string) => {
    onSelect(emoticon);
    setIsOpen(false);
  };

  const togglePicker = () => {
    setIsOpen(!isOpen);
  };

  const closePicker = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={togglePicker} className="absolute right-2 top-2 p-1 text-lg">
        😊
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-8 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <div className="flex flex-wrap p-2">
            {emoticons.map((emoticon, index) => (
              <button
                key={index}
                onClick={() => handleEmoticonSelect(emoticon)}
                className="text-lg m-1"
              >
                {emoticon}
              </button>
            ))}
          </div>
        </div>
      )}
      {isOpen && (
        <div
          onClick={closePicker}
          className="inset-0 bg-black opacity-25 cursor-default z-0"
        ></div>
      )}
    </div>
  );
};

export default EmoticonPicker;