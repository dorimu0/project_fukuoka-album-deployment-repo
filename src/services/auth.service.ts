import { store } from "../store";
import { clearUser, setUser } from "../store/user";
import { AuthInfo, RegisterInfo } from "../types/auth.interface";
import { api } from "./api.service";

export const signOut = () => {
  store.dispatch(clearUser());
  window.location.href = "http://localhost:3000";
};

// 아이디 중복 확인
export const checkId = async (email: string) => {
  const isAvailableId = await api("GET", `user?email=${email}`);

  return isAvailableId.length ? false : true;
};

// 회원 가입
export const register = async (registerInfo: RegisterInfo) => {
  const res = await api("POST", "user", {
    ...registerInfo,
    comment: "",
    imageUrl: "",
  });

  return res;
};

// 로그인
export const logIn = async (authInfo: AuthInfo) => {
  const res = await api("GET", `user?email=${authInfo.email}`);

  const userInfo = res[0];

  const password = userInfo?.password;

  const isRightInfo = authInfo.password === password && userInfo;

  if (isRightInfo) {
    delete userInfo.password;

    store.dispatch(setUser(userInfo));
  }

  return isRightInfo ? true : false;
};
