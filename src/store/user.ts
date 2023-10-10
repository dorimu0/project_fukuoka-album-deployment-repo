import { createSlice } from '@reduxjs/toolkit'

interface User {
  comment: string | null;
  email: string | null;
  id: number | null;
  imageUrl: string | null;
  name: string | null;
  isSignIn: boolean;
}

const initialState: User = {
  comment: null,
  email: null,
  id: null,
  imageUrl: null,
  name: null,
  isSignIn: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {id, name, comment, email, imageUrl} = action.payload;
      state.id = id;
      state.name = name;
      state.comment = comment;
      state.email = email;
      state.imageUrl = imageUrl;
      state.isSignIn = true;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.comment = null;
      state.email = null;
      state.imageUrl = null;
      state.isSignIn = false;
    }
  }
})

export const {setUser, clearUser} = userSlice.actions;

export const authReducer = userSlice.reducer;
