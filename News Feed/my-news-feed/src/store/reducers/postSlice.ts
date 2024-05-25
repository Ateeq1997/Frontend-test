// src/store/reducers/postSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comment {
  id: number;
  postId: number;
  body: string;
  timestamp: string;
}

interface Post {
  id: number;
  body: string;
  timestamp: string;
  comments: Comment[];
  likes: number;
  dislikes: number;
}

interface PostsState {
  items: Post[];
}

const initialState: PostsState = {
  items: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.items.push(action.payload);
    },
    editPost: (state, action: PayloadAction<{ postId: number; body: string }>) => {
      const post = state.items.find(post => post.id === action.payload.postId);
      if (post) {
        post.body = action.payload.body;
      }
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(post => post.id !== action.payload);
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      const post = state.items.find(post => post.id === action.payload.postId);
      if (post) {
        post.comments.push(action.payload);
      }
    },
    editComment: (state, action: PayloadAction<{ postId: number; commentId: number; body: string }>) => {
      const post = state.items.find(post => post.id === action.payload.postId);
      if (post) {
        const comment = post.comments.find(comment => comment.id === action.payload.commentId);
        if (comment) {
          comment.body = action.payload.body;
        }
      }
    },
    deleteComment: (state, action: PayloadAction<{ postId: number; commentId: number }>) => {
      const post = state.items.find(post => post.id === action.payload.postId);
      if (post) {
        post.comments = post.comments.filter(comment => comment.id !== action.payload.commentId);
      }
    },
    toggleLike: (state, action: PayloadAction<{ postId: number; like: boolean }>) => {
      const post = state.items.find(post => post.id === action.payload.postId);
      if (post) {
        if (action.payload.like) {
          post.likes += 1;
        } else {
          post.dislikes += 1;
        }
      }
    },
  },
});

export const { addPost, editPost, deletePost, addComment, editComment, deleteComment, toggleLike } = postSlice.actions;

// Selector to get comment count for a post
export const selectCommentCount = (state: RootState, postId: number) => {
  const post = state.posts.items.find(post => post.id === postId);
  return post ? post.comments.length : 0;
};

export default postSlice.reducer;
