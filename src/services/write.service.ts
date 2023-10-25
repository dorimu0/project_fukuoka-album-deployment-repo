import { Location } from "../types/location.interface";
import { Post } from "../types/post.interface";
import { api, deleteTempImageFromDb, uploadApi } from "./api.service";

export const getAllLocation = async (): Promise<Location[]> => {
  const res = await fetch(`http://localhost:3004/location`);

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const locations = await res.json();

  return locations;
};

export const uploadPostImage = async (
  files: File[],
  area: string
): Promise<string[]> => {
  const images: string[] = [];

  await Promise.all(
    files.map(async (file) => {
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadApi(formData, area);
      images.push(res.pathF);
    })
  );

  return images;
};

export const postPost = async (
  image: string[],
  content: string,
  postAreaId: number,
  area: string,
  userId: number
) => {
  const likeChecked: number[] = [];
  const commentId: number[] = [];

  const post = {
    commentId,
    postAreaId,
    userId,
    content,
    image,
    area,
    likeChecked,
  };

  const postedData = await api("POST", "post", post);

  // 임시 저장소 이미지 삭제
  if (image?.length) {
    await deleteTempImageFromDb(image);
  }

  return postedData;
};

export const getEditPost = async (): Promise<Post> => {
  const res = await fetch(`http://localhost:3004/post`);

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const post = await res.json();
  return post;
};

export const uploadEditPost = async () => {
  const res = await fetch("http://localhost:3004/post", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }
};
