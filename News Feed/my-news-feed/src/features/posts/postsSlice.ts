import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comment {
  id: number;
  body: string;
}

interface Post {
  id: number;
  body: string;
  username: string;
  createdAt: string;
  comments: Comment[];
  likes: number;
}

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [
    {
      id: 1,
      body: 'This is a dummy post',
      username: 'JohnDoe',
      createdAt: new Date().toISOString(),
      comments: [
        { id: 1, body: 'This is a dummy comment' },
      ],
      likes: 0,
    },
  ],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post>) {
      state.posts.push(action.payload);
    },
    editPost(state, action: PayloadAction<{ id: number; body: string }>) {
      const { id, body } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      if (post) {
        post.body = body;
      }
    },
    deletePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    addComment(state, action: PayloadAction<{ postId: number; comment: Comment }>) {
      const { postId, comment } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.comments.push(comment);
      }
    },
    editComment(state, action: PayloadAction<{ postId: number; commentId: number; body: string }>) {
      const { postId, commentId, body } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        const comment = post.comments.find((comment) => comment.id === commentId);
        if (comment) {
          comment.body = body;
        }
      }
    },
    deleteComment(state, action: PayloadAction<{ postId: number; commentId: number }>) {
      const { postId, commentId } = action.payload;
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.comments = post.comments.filter((comment) => comment.id !== commentId);
      }
    },
    toggleLike(state, action: PayloadAction<number>) {
      const post = state.posts.find((post) => post.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
  },
});

export const {
  addPost,
  editPost,
  deletePost,
  addComment,
  editComment,
  deleteComment,
  toggleLike,
} = postSlice.actions;

export default postSlice.reducer;
