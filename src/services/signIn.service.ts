import { CredentialResponse } from "@react-oauth/google";
import { store } from "../store";
import { setUser } from "../store/user";
import { setToken } from "../store/token";

interface FetchOptions {
  method: string;
  headers: {
    "Content-Type": "application/json";
  };
  body: string;
}

const fetchOptions = (userInfo: string | undefined): FetchOptions => {
  const body = userInfo ? JSON.stringify({ userInfo }) : "";

  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };
};

export const signInByGoogle = async (googleResponse: CredentialResponse) => {
  const response = await fetch(
    "http://localhost:8000/auth",
    fetchOptions(googleResponse.credential)
  );

  const { data } = await response.json();

  const { token } = data;

  store.dispatch(setUser(data));
  store.dispatch(setToken(token));
};
