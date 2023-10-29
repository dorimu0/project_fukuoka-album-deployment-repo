import { Post } from "../types/post.interface";
import { api } from "./api.service";

export const getAllPosts = async (): Promise<Post[]> => {
  const posts = await api("GET", `post`);

  return posts;
};

export const getLocationPosts = async (areaId: number): Promise<Post[]> => {
  const data = await api("GET", "post");

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
  const posts = await api("GET", `post`);

  const userPosts = posts.filter((post: Post) => post.userId === userId);

  return userPosts;
};

export const searchPosts = async (term: string): Promise<Post[]> => {
  const posts = await api("GET", `post`);

  return posts.filter((post: Post) => post.area.includes(term));
};

export const updateLike = async (
  id: number,
  updatedLike: Post
): Promise<Post> => {
  const post = await api("PUT", `post/${id}`, updatedLike);

  return post;
};

export const getPostById = async (id: number): Promise<Post> => {
  const post = await api("GET", `post/${id}`);
  console.log(post);

  return post;
};

export const deletePost = async (id: number): Promise<Post> => {
  const post = await api("DELETE", `post/${id}`);

  return post;
};
