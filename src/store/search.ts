import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../types/post.interface";

interface SearchState {
  posts: Post[];
}

const initialState: SearchState = {
  posts: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
});

export const { setPosts, clearPosts } = searchSlice.actions;

export default searchSlice.reducer;
