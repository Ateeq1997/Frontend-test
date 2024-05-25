import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editPost, deletePost, addComment, toggleLike, deleteComment } from '../store/reducers/postSlice';
import CommentList from './CommentList';
import LikeButton from './LikeButton';
import EmoticonPicker from './EmoticonPicker';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { selectCommentCount } from '../store/reducers/postSlice';

interface PostProps {
  post: {
    id: number;
    body: string;
    timestamp: string;
    comments: any[];
    likes: number;
    dislikes: number;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedPostBody, setEditedPostBody] = useState(post.body);
  const dispatch = useDispatch();
  const commentCount = useSelector((state: RootState) => selectCommentCount(state, post.id));

  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  const handleLike = (like: boolean) => {
    dispatch(toggleLike({ postId: post.id, like }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    dispatch(editPost({ postId: post.id, body: editedPostBody }));
    setIsEditing(false);
  };

  const handleEmoticonSelect = (emoticon: string) => {
    setNewComment(newComment + emoticon);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({ postId: post.id, body: newComment }));
      setNewComment('');
    }
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment({ postId: post.id, commentId }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-semibold">User Name</p>
          <p className="text-xs text-gray-500">{post.timestamp}</p>
        </div>
        {!isEditing && (
          <div>
            <button onClick={handleEdit} className="text-xs text-gray-500 hover:text-gray-700">
              Edit
            </button>
            <button onClick={handleDelete} className="text-xs text-gray-500 hover:text-gray-700 ml-2">
              Delete
            </button>
          </div>
        )}
      </div>
      {isEditing ? (
        <textarea
          value={editedPostBody}
          onChange={(e) => setEditedPostBody(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      ) : (
        <p>{post.body}</p>
      )}
      {!isEditing && (
        <>
          <div className="flex items-center mt-2">
            <LikeButton onClick={() => handleLike(true)}>Like {post.likes}</LikeButton>
            <LikeButton onClick={() => handleLike(false)}>Dislike {post.dislikes}</LikeButton>
          </div>
          <div className="relative mt-2 flex items-center">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Add a comment..."
            />
            <div className="absolute right-2">
              <EmoticonPicker onSelect={handleEmoticonSelect} />
            </div>
          </div>
          <button
            onClick={handleAddComment}
            className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
          >
            Comment
          </button>
          <CommentList postId={post.id} comments={post.comments} onDeleteComment={handleDeleteComment} />
        </>
      )}
      {isEditing && (
        <button
          onClick={handleSaveEdit}
          className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
        >
          Save
        </button>
      )}
      <p className="text-xs text-gray-500 mt-2">Comments: {commentCount}</p>
    </div>
  );
};

export default Post;
