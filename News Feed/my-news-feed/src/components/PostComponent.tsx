import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { selectCommentCount } from '../store/reducers/postSlice';
import CommentList from './CommentList';

interface PostComponentProps {
  post: {
    id: number;
    body: string;
    timestamp: string;
    likes: number;
    dislikes: number;
    comments: { id: number; body: string }[]; // Change the structure here
  };
}

const PostComponent: React.FC<PostComponentProps> = ({ post }) => {
  const commentCount = useSelector((state: RootState) => selectCommentCount(state, post.id));

  return (
    <div className="post mb-4">
      <p>{post.body}</p>
      <p className="text-xs text-gray-500">{post.timestamp}</p>
      <p className="text-xs text-gray-500">Likes: {post.likes} | Dislikes: {post.dislikes}</p>
      <p className="text-xs text-gray-500">Comments: {commentCount}</p>
      <CommentList postId={post.id} comments={post.comments} />
    </div>
  );
};

export default PostComponent;
