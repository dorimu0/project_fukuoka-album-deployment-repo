import { Location } from "../types/location.interface";
import { Post } from "../types/post.interface";
import { api, deleteTempImageFromDb, uploadApi } from "./api.service";

export const getAllLocation = async (): Promise<Location[]> => {
  const locations = await api("GET", "location");
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
      console.log(res);
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

export const getEditPost = async (userId: number): Promise<Post> => {
  const post = await api("GET", `post?userId=${userId}`);
  return post;
};

export const uploadEditPost = async (
  image: string[],
  postAreaId: number,
  content: string,
  area: string,
  postId: number
) => {
  const editPost = {
    postAreaId: postAreaId,
    content: content,
    image: image,
    area: area,
  };

  await api("PATCH", `post/${postId}`, editPost);
};
