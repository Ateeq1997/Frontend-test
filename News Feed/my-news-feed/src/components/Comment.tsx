// src/components/Comment.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComment, deleteComment } from '../store/reducers/postSlice';
import Emoticons from './Emoticons';

interface CommentProps {
  postId: number;
  comment: {
    id: number;
    body: string;
  };
}

const Comment: React.FC<CommentProps> = ({ postId, comment }) => {
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [newCommentBody, setNewCommentBody] = useState('');
  const [selectedEmoticon, setSelectedEmoticon] = useState('');
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditCommentId(comment.id);
    setNewCommentBody(comment.body);
  };

  const handleSave = () => {
    dispatch(editComment({ postId, commentId: comment.id, body: newCommentBody + selectedEmoticon }));
    setEditCommentId(null);
    setSelectedEmoticon('');
  };

  const handleDelete = () => {
    dispatch(deleteComment({ postId, commentId: comment.id }));
  };

  const handleEmoticonSelect = (emoticon: string) => {
    setNewCommentBody(newCommentBody + emoticon);
  };

  return (
    <div className="mb-2">
      {editCommentId === comment.id ? (
        <>
          <input
            type="text"
            value={newCommentBody}
            onChange={(e) => setNewCommentBody(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <Emoticons onSelect={handleEmoticonSelect} />
          <button onClick={handleSave} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
            Save
          </button>
        </>
      ) : (
        <>
          <p className="inline">{comment.body}</p>
          <button onClick={handleEdit} className="ml-2 text-xs text-gray-500 hover:text-gray-700">
            Edit
          </button>
          <button onClick={handleDelete} className="ml-2 text-xs text-gray-500 hover:text-gray-700">
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Comment;
