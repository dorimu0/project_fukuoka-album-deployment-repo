import { store } from "../store";
import { clearToken, setAccessToken } from "../store/token";
import { clearUser } from "../store/user";
const ERROR_MESSAGE = "에러가 발생했습니다. 잠시 후 다시 시도해주세요.";
const EXPIRED_MESSAGE = "세션이 만료되었습니다. 다시 로그인 해주세요.";

interface FetchOptions {
  method: string;
  headers: {
    authorization: string;
    "Content-Type"?: string;
  };
  body?: string | null;
}

const fetchOptions = (
  token: string | null,
  method = "GET",
  body: object | null = null
): FetchOptions => {
  const headers: FetchOptions["headers"] = {
    authorization: token || "",
  };

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };
};

export const verify = async (): Promise<boolean | undefined> => {
  let isAuthorized = true;
  let networkError = false;
  const token = store.getState().token.accessToken;

  try {
    const response = await fetch(
      "http://localhost:8000/auth/verify",
      fetchOptions(token)
    );
    if (response.status === 410) {
      isAuthorized = false;
    }
    if (response.status === 401) {
      window.alert(EXPIRED_MESSAGE);
      signOut();
    }
  } catch (error) {
    console.log(error);
    networkError = true;
    window.alert(ERROR_MESSAGE);
  }

  if (!isAuthorized) {
    try {
      await refresh();
    } catch (error) {
      networkError = true;
      window.alert(ERROR_MESSAGE);
    }
  }

  if (networkError) {
    return false;
  }

  return true;
};

export const signOut = () => {
  store.dispatch(clearUser());
  store.dispatch(clearToken());
  window.location.href = "http://localhost:3000";
};

export const refresh = async () => {
  const token = store.getState().token.refreshToken;
  const email = store.getState().user.email;

  const refreshResponse = await fetch(
    "http://localhost:8000/auth/refresh",
    fetchOptions(token, "POST", { authorization: token, userInfo: email })
  );
  if (refreshResponse.status >= 400) {
    window.alert(EXPIRED_MESSAGE);
    signOut();
    return;
  }
  const newAccessToken = await refreshResponse.json();
  store.dispatch(setAccessToken(newAccessToken));

  return true;
};
