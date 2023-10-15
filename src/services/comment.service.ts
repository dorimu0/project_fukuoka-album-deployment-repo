import { CommentInterface } from '../types/comment.interface';

export const getCommentsByPostId = async (postId: number): Promise<CommentInterface[]> => {
    const response = await fetch(`http://localhost:3004/comment?postId=${postId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};