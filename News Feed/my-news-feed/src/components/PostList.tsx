// src/components/PostList.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Post from './Post';

const PostList: React.FC = () => {
  const posts = useSelector((state: RootState) => state.posts.items);

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
