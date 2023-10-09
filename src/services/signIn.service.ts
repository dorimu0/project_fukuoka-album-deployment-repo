import { CredentialResponse } from "@react-oauth/google";
import { store } from "../store";
import { setUser } from "../store/user";
import { setToken } from "../store/token";

export const signInByGoogle = async (googleResponse: CredentialResponse) => {
  const response = await fetch("http://localhost:8000/auth", {
    headers: {
      authorization: googleResponse.credential as string
    }
  })
  const userData = await response.json();
  const { token } = userData;

  store.dispatch(setUser(userData));
  store.dispatch(setToken(token));
}