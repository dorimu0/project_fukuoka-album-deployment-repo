import { store } from "../store";
import { clearToken, setAccessToken } from "../store/token";
import { clearUser } from "../store/user";

interface FetchOptions {
  method: string;
  headers: {
    authorization: string;
    'Content-Type'?: string;
  };
  body?: string | null;
};

const fetchOptions = (token: string | null, method = 'GET', body: object | null = null): FetchOptions => {
  const headers: FetchOptions['headers'] = {
    authorization: token || ''
  };

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };
};

export const verify = async (): Promise<boolean> => {
  let isAuthorized = true;
  let networkError = false;
  let token = store.getState().token.accessToken;
  const email = store.getState().user.email;

  try {
    const response = await fetch("http://localhost:8000/auth/verify", fetchOptions(token));
    if (response.status === 401) {
      isAuthorized = false;
      token = store.getState().token.refreshToken;
    }
  } catch (error) {
    networkError = true;
    window.alert("네트워크가 불안정합니다. 잠시 후 다시 시도해주세요.");
  }

  if (!isAuthorized) {
    try {
      const refreshResponse = await fetch("http://localhost:8000/auth/refresh", fetchOptions(token, 'POST', { authorization: token, userInfo: email }));
      if (refreshResponse.status === 401) {
        window.alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        signOut();
        return false;
      }
      const newAccessToken = await refreshResponse.json();
      store.dispatch(setAccessToken(newAccessToken));
    } catch (error) {
      networkError = true;
      window.alert("네트워크가 불안정합니다. 잠시 후 다시 시도해주세요.");
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
