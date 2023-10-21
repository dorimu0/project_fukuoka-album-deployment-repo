import { store } from "../store";
import { refresh, signOut } from "./auth.service";

type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const fetchOptions = (
  method: FetchMethod,
  body: object | undefined = undefined
) => {
  const token = store.getState().token.accessToken || "";

  const myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  myHeaders.append("Cache-Control", "no-store");
  myHeaders.append("Pragma", "no-cache");

  if (body) {
    myHeaders.append("Content-Type", "application/json");
    return {
      headers: myHeaders,
      method,
      body: JSON.stringify(body),
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
  body: object | undefined = undefined
) => {
  const options = fetchOptions(method, body);

  const url = `http://localhost:8000/${endpoint}`;

  let res = await fetch(url, options);

  if (!res.ok) {
    const { status } = res;

    switch (status) {
      // 유효기간 만료 - 리프레쉬 후 새로 요청
      case 410: {
        await refresh();
        const newOption = fetchOptions(method, body);
        res = await fetch(url, newOption);

        const data = await res.json();
        return data;
      }
      // 올바르지 않은 토큰
      case 401: {
        window.alert("권한이 없습니다.");
        signOut();
        break;
      }
      default: {
        window.alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        window.location.href = "http://localhost:3000";
        break;
      }
    }
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
