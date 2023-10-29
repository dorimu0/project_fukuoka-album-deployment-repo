import { Location } from "../types/location.interface";
import { Post } from "../types/post.interface";
import { uploadApi } from "./api.service";

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
  area: string,
  editMode: boolean
): Promise<string[]> => {
  const images: string[] = [];

  await Promise.all(
    files.map(async (file) => {
      const formData = new FormData();
      formData.append("image", file);
      const res = editMode
        ? await uploadApi(formData, area, "PUT")
        : await uploadApi(formData, area);
      images.push(res.pathF);
    })
  );

  console.log(images);
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

  const res = await fetch(`http://localhost:3004/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }
};

export const getEditPost = async (userId: number): Promise<Post> => {
  const res = await fetch(`http://localhost:3004/post/${userId}`);

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const post = await res.json();
  return post;
};

export const uploadEditPost = async (userId: number) => {
  const res = await fetch(`http://localhost:3004/post/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(post),
  });

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }
};
