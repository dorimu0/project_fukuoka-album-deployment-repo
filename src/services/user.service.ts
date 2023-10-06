import { User } from "../types/user.interface";

export const getUser = async (id: string): Promise<User> => {
  const res = await fetch(`http://localhost:3004/user/${id}`);

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const user = await res.json();
  return user;
};
