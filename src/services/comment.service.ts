import { CommentInterface } from '../types/comment.interface';
import { Post as PostType } from '../types/post.interface';

export const getCommentsByPostId = async (postId: number): Promise<CommentInterface[]> => {
    const response = await fetch(`http://localhost:3004/comment?postId=${postId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const createComment = async (comment: CommentInterface): Promise<CommentInterface> => {
    const res = await fetch(`http://localhost:3004/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    });
  
    if (!res.ok) {
      throw new Error("에러 발생!");
    }
  
    const createdComment = await res.json();
  
    return createdComment;
};


export const deleteComment = async (id: number): Promise<void> => {
  const res = await fetch(`http://localhost:3004/comment/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error("Failed to delete comment");
  }
};

export const updateComment = async (comment: CommentInterface): Promise<CommentInterface> => {
  const res = await fetch(`http://localhost:3004/comment/${comment.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  });
  
  if (!res.ok) {
    throw new Error("Failed to update comment");
  }

  return await res.json();
};
  
export const updateCommentId = async (post: PostType): Promise<PostType> => {
  const res = await fetch(`http://localhost:3004/post/${post.id}`,{
      method: 'PUT',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify(post)
  });

  if (!res.ok){
      throw new Error("Network response was not ok");
  }

  return await res.json();
}

export const getPost = async (id: number): Promise<PostType> => {
  const res = await fetch(`http://localhost:3004/post/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return await res.json();
};