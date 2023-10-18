import { store } from "../store";
import { refresh, verify } from "./auth.service";

type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const fetchOptions = (
  method: string,
  body: object | null,
  includeImage: boolean = false
) => {
  const token = store.getState().token.accessToken || "";

  const headers: HeadersInit = {
    Authorization: token,
  };

  if (body) {
    headers["Content-Type"] = "application/json";
  }
  if (includeImage) {
    headers["Content-Type"] = "multipart/form-data";
  }

  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
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

  if (res.status === 410 || res.status === 410) {
    const auth = await refresh();
    if (!auth) {
      return;
    }
    const options = fetchOptions(method, body);
    res = await fetch(url, options);
  }

  return await res.json();
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
