import { store } from "../store";
import { clearToken, setAccessToken } from "../store/token";
import { clearUser } from "../store/user";
import { fetchOptions } from "./api.service";
const ERROR_MESSAGE = "에러가 발생했습니다. 잠시 후 다시 시도해주세요.";
const EXPIRED_MESSAGE = "세션이 만료되었습니다. 다시 로그인 해주세요.";

export const refresh = async () => {
  const token = store.getState().token.refreshToken;
  const email = store.getState().user.email;

  try {
    const refreshResponse = await fetch(
      "http://localhost:8000/auth/refresh",
      fetchOptions("POST", { authorization: token, userInfo: email })
    );

    if (refreshResponse.status >= 400) {
      window.alert(EXPIRED_MESSAGE);
      signOut();
      return;
    }

    const newAccessToken = await refreshResponse.json();

    store.dispatch(setAccessToken(newAccessToken));

    return true;
  } catch (error) {
    console.log(error);
    window.alert(ERROR_MESSAGE);
    return false;
  }
};

export const signOut = () => {
  store.dispatch(clearUser());
  store.dispatch(clearToken());
  window.location.href = "http://localhost:3000";
};
