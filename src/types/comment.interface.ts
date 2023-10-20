export interface CommentInterface {
    id?: number;
    postId: number;
    userId: number;
    commentId: number;
    content: string;
    parentCommentId?:number;
  }