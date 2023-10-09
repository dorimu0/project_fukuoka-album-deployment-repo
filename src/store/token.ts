import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface TokenInitialState {
  accessToken: string | null;
  refreshToken: string | null;
}

interface SetAccessTokenPayload {
  accessToken: string;
};

interface SetTokenPayload {
  accessToken: string;
  refreshToken: string;
};

const initialState: TokenInitialState = {
  accessToken: null,
  refreshToken: null
}

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<SetAccessTokenPayload>) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
    setToken: (state, action: PayloadAction<SetTokenPayload>) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    clearToken: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    }
  }
})

export const { setAccessToken, setToken, clearToken } = tokenSlice.actions;

export const tokenReducer = tokenSlice.reducer;
