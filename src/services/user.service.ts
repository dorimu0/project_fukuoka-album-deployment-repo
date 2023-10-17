import { User, UserUpdate } from "../types/user.interface";
import { api, uploadApi } from "./api.service";

export const getUser = async (id: number | null): Promise<User> => {
  if (id === null) {
    window.alert("유저 정보를 불러올 수 없습니다. 다시 로그인하세요.");
  }

  const res = await api("GET", `user/${id}`);

  return res;
};

export const updateUser = async (
  user: UserUpdate,
  prevImage?: string
): Promise<User | undefined> => {
  const res = await api("PUT", `user/update`, { user, prevImage });

  return res;
};

export const uploadProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await uploadApi(formData);

  return res.path;
};
