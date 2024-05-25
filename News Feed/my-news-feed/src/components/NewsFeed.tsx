// src/components/NewsFeed.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const NewsFeed: React.FC = () => {
  const news = useSelector((state: RootState) => state.news);

  return (
    <div>
      <h1>News Feed</h1>
      <ul>
        {news.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
