// src/components/CommentList.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComment, deleteComment } from '../store/reducers/postSlice';
import EmoticonPicker from './EmoticonPicker';

interface Comment {
  id: number;
  body: string;
}

interface CommentListProps {
  postId: number;
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ postId, comments }) => {
  const [editedComment, setEditedComment] = useState('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const dispatch = useDispatch();

  const handleDelete = (commentId: number) => {
    dispatch(deleteComment({ postId, commentId }));
  };

  const handleEdit = (commentId: number, body: string) => {
    setIsEditing(commentId);
    setEditedComment(body);
  };

  const handleSaveEdit = (commentId: number) => {
    if (isEditing !== null) {
      dispatch(editComment({ postId, commentId, body: editedComment }));
      setIsEditing(null);
    }
  };

  return (
    <div className="mt-2">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-center mb-2">
          <p className="text-gray-500 mr-2">{comment.body}</p>
          <button onClick={() => handleEdit(comment.id, comment.body)} className="text-xs text-gray-500 hover:text-gray-700">
            Edit
          </button>
          <button onClick={() => handleDelete(comment.id)} className="text-xs text-gray-500 hover:text-gray-700 ml-2">
            Delete
          </button>
        </div>
      ))}
      {isEditing !== null && (
        <div className="mt-2">
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
          <button
            onClick={() => handleSaveEdit(isEditing)}
            className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentList;
