import { CommentInterface } from "../types/comment.interface";
import { Post as PostType } from "../types/post.interface";
import { api } from "./api.service";

export const getCommentsByPostId = async (
  postId: number
): Promise<CommentInterface[]> => {
  const comments = await api("GET", `comment?postId=${postId}`);

  return comments;
};

export const createComment = async (
  comment: CommentInterface
): Promise<CommentInterface> => {
  const createdComment = await api("POST", `comment`, comment);

  return createdComment;
};

export const deleteComment = async (id: number): Promise<void> => {
  await api("DELETE", `comment/${id}`);
};

export const updateComment = async (
  comment: CommentInterface
): Promise<CommentInterface> => {
  const updatedComment = await api("PUT", `comment/${comment.id}`, comment);

  return updatedComment;
};

export const updateCommentId = async (post: PostType): Promise<PostType> => {
  const updatedCommentId = await api("PUT", `post/${post.id}`, post);

  return updatedCommentId;
};

export const getPost = async (id: number): Promise<PostType> => {
  const post = await api("GET", `post/${id}`);

  return post;
};
