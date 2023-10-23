import { store } from "../store";
import { clearUser } from "../store/user";

export const signOut = () => {
  store.dispatch(clearUser());
  window.location.href = "http://localhost:3000";
};
