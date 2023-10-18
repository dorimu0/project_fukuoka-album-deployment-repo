import { RootState } from "../store";
import { Location } from "../types/location.interface";
import { useSelector } from "react-redux";

export const getAllLocation = async (): Promise<Location[]> => {
  const res = await fetch(`http://localhost:3004/location`);

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const locations = await res.json();

  return locations;
};

export const PostImg = async (
  images: File[],
  area: string
): Promise<string[]> => {
  const formData = new FormData();
  const token = useSelector((state: RootState) => state.token); // 현재 유저 정보

  images.forEach((image) => {
    formData.append("image", image);
  });
  console.log(area);

  const res = await fetch(`http://localhost:8000/${area}`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `${token.accessToken}`,
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }

  const urls = await res.json();
  return urls;
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
      // "Content-Type": "multipart/form-data",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!res.ok) {
    throw new Error("エラーが発生しました。");
  }
};
