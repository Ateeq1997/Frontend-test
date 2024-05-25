// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store/store';
import PostList from './components/PostList';
import NewPostForm from './components/NewPostForm';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-lg">My News Feed</h1>
        </header>
        <main className="container mx-auto p-4 max-w-9xl"> {/* Increase max width */}
          <NewPostForm />
          <PostList />
        </main>
      </div>
    </Provider>
  );
};

export default App;
