import { RootState } from "../store";
import { Location } from "../types/location.interface";
import { useSelector } from "react-redux";
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
  area: string
): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("image", file);
  });

  const res = await uploadApi(formData, area);

  return res.path;
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
