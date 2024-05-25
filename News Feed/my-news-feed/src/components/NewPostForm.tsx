// src/components/NewPostForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/reducers/postSlice';
import EmoticonPicker from './EmoticonPicker';

const NewPostForm: React.FC = () => {
  const [postBody, setPostBody] = useState('');
  const dispatch = useDispatch();

  const handleEmoticonSelect = (emoticon: string) => {
    setPostBody(postBody + emoticon);
  };

  const handleAddPost = () => {
    if (postBody.trim()) {
      const newPost = {
        id: Date.now(),
        body: postBody,
        timestamp: new Date().toISOString(),
        comments: [],
        likes: 0,
        dislikes: 0,
      };
      dispatch(addPost(newPost));
      setPostBody('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="relative flex items-center">
        <textarea
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          className="w-full p-2 border rounded-lg"
          placeholder="What's on your mind?"
        />
        <div className="absolute right-2">
          <EmoticonPicker onSelect={handleEmoticonSelect} />
        </div>
      </div>
      <button
        onClick={handleAddPost}
        className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
      >
        Post
      </button>
    </div>
  );
};

export default NewPostForm;
