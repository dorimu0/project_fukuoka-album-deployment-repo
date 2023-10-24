import { UserUpdate } from "../types/user.interface";
import { api, deleteImageApi, uploadApi } from "./api.service";

export const getUser = async (id: number | null) => {
  if (id === null) {
    window.alert("유저 정보를 불러올 수 없습니다. 다시 로그인하세요.");
  }

  const data = await api("GET", `user/${id}`);

  return data;
};

export const updateUser = async (user: UserUpdate, prevImage?: string) => {
  // 이전 사진 삭제
  if (prevImage) {
    const result = await deleteImageApi([prevImage]);
    if (!result.ok) {
      window.alert("문제가 생겼습니다. 잠시 후 다시 시도하세요.");
      return;
    }
  }

  // 정보 수정
  const data = await api("PUT", `user/${user.id}`, user);

  return data;
};

export const uploadProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await uploadApi(formData);

  return res.path;
};
