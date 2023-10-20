import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./user";
import { tokenReducer } from "./token";
import { modalReducer } from "./modal";
import searchReducer from "./search";

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "token"],
};
const rootReducer = combineReducers({
  user: authReducer,
  token: tokenReducer,
  search: searchReducer,
  modal: modalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
