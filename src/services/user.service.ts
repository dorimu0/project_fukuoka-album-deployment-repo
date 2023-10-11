import { User, UserUpdate } from "../types/user.interface";
import { verify } from "./auth.service";

export const getUser = async (id: number | null): Promise<User> => {
  if (id === null) {
    window.alert("유저 정보를 불러올 수 없습니다. 다시 로그인하세요.")
  }
  const res = await fetch(`http://localhost:3004/user/${id}`);

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const user = await res.json();
  return user;
};

export const updateUser = async (user: UserUpdate): Promise<User | undefined> => {
  const auth = await verify();
  if (!auth) {
    return;
  }

  const res = await fetch(`http://localhost:3004/user/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const updatedUser = await res.json();
  return updatedUser;
};

export const uploadProfileImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`http://localhost:3004/user`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const data = await res.json();

  return data.imageUrl;
};
