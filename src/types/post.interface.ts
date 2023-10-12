export type Post = {
  id: number;
  postAreaId: number;
  userId: number;
  title: string;
  content: string;
  image: string[];
  like: number;
};
export type Comment = {
  id: number;
  postId: number;
  userId: number;
  commentId: number | null;
  content: string;
};
