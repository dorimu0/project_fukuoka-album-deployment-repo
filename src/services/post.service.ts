import { Post } from "../types/post.interface";

export const getAllPosts = async (): Promise<Post[]> => {
  const res = await fetch(`http://localhost:3004/post`);

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const posts = await res.json();

  return posts;
};

export const getLocationPosts = async (areaId: number): Promise<Post[]> => {
  const response = await fetch("http://localhost:3004/post");
  if (!response.ok) {
    throw new Error("エラーが発生しました。");
  }

  const data: Post[] = await response.json();

  if (data) {
    const matchedPosts = data.filter(
      (post: Post) => Number(post.postAreaId) === areaId
    );
    return matchedPosts;
  } else {
    throw new Error("エラーが発生しました。");
  }
};

export const getUserPosts = async (userId: number) => {
  const res = await fetch(`http://localhost:3004/post`);

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const posts = await res.json();

  const userPosts = posts.filter((post: Post) => post.userId === userId);

  return userPosts;
};

export const searchPosts = async (term: string): Promise<Post[]> => {
  const res = await fetch(`http://localhost:3004/post`);

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const posts = await res.json();

  return posts.filter((post: Post) => post.area.includes(term));
};
