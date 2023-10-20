import { store } from "../store";
import { refresh } from "./auth.service";

type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const fetchOptions = (
  method: FetchMethod,
  body: object | null | undefined = undefined
) => {
  const token = store.getState().token.accessToken || "";

  const myHeaders = new Headers();
  myHeaders.append("Authorization", token);

  if (body) {
    myHeaders.append("Content-Type", "application/json");
    return {
      headers: myHeaders,
      method,
      body: body ? JSON.stringify(body) : null,
    };
  }

  return {
    method,
    headers: myHeaders,
  };
};

export const api = async (
  method: FetchMethod = "GET",
  endpoint: string = "",
  body: object | null = null
) => {
  const options = fetchOptions(method, body);

  const url = `http://localhost:8000/${endpoint}`;

  let res = await fetch(url, options);

  // 인증 기간이 지났을 경우
  if (res.status === 410) {
    // 리프레쉬가 이뤄지지 않으면 로그아웃 됨
    const auth = await refresh();
    if (!auth) {
      return;
    }
    const options = fetchOptions(method, body);
    res = await fetch(url, options);
  }

  const data = await res.json();

  return data;
};

export const uploadApi = async (
  body: FormData,
  endpoint: string = "user",
  method: FetchMethod = "POST"
) => {
  const url = `http://localhost:8000/upload/${endpoint}`;

  let res = await fetch(url, {
    method,
    body,
  });

  return await res.json();
};
