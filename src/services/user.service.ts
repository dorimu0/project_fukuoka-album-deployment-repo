import { User, UserUpdate } from "../types/user.interface";
import { Post } from "../types/post.interface";

export const getUser = async (id: string): Promise<User> => {
  const res = await fetch(`http://localhost:3004/user/${id}`);

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const user = await res.json();
  return user;
};

export const updateUser = async (user: UserUpdate): Promise<User> => {
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

export const getUserPost = async (userId: number) => {
  const res = await fetch(`http://localhost:3004/post`);

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const posts = await res.json();

  const userPosts = posts.filter((post: Post) => post.userId === userId);

  return userPosts;
};
