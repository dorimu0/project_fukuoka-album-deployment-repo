import { Post as PostType } from "../types/post.interface";

export const fetchPosts = async (areaId: number): Promise<PostType[]> => {
  const response = await fetch("http://localhost:3004/post");
  if (!response.ok) {
    throw new Error("エラーが発生しました。");
  }

  const data: PostType[] = await response.json();

  if (data) {
    const matchedPosts = data.filter(
      (post: PostType) => Number(post.postAreaId) === areaId
    );
    return matchedPosts;
  } else {
    throw new Error("エラーが発生しました。");
  }
};