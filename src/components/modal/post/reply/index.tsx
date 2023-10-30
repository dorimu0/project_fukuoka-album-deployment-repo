import React from "react";
import { CommentInterface } from "../../../../types/comment.interface";
import { User as UserType } from "../../../../types/user.interface";
import { Post as PostType } from "../../../../types/post.interface";

interface ReplyComponentProps {
  reply: CommentInterface;
  users: UserType[];
  loggedInUserId: number | null;
  post: PostType;
  deleteComment: Function;
  getCommentsByPostId: Function;
  setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>;
  isSignIn: boolean;
  showReplyInput: number | null;
  setShowReplyInput: React.Dispatch<React.SetStateAction<number | null>>;
  setCommentInput: React.Dispatch<React.SetStateAction<string>>;
  setEditingCommentId: React.Dispatch<React.SetStateAction<number | null>>;
  comments: CommentInterface[];
  updateCommentId: Function;
  setPost: React.Dispatch<React.SetStateAction<PostType>>;
  onCommentCountChange: ((commentIdLength: number) => void) | undefined;
}

const ReplyComponent: React.FC<ReplyComponentProps> = ({
  reply,
  users,
  loggedInUserId,
  post,
  deleteComment,
  setComments,
  comments,
  updateCommentId,
  setPost,
  onCommentCountChange,
  setCommentInput,
  setEditingCommentId
}) => {
    return (
        <div key={reply.id}>
            <div className="reply-user-box">
                <p>ㄴ</p>
                <img
                    className="user-icon"
                    src={
                        users.find((user) => user.id === reply.userId)
                            ?.imageUrl
                    }
                    alt={
                        users.find((user) => user.id === reply.userId)
                            ?.name
                    }
                />
                <p>
                    {
                        users.find((user) => user.id === reply.userId)
                            ?.name
                    }
                </p>
                {(loggedInUserId === reply.userId ||
                    post.userId === loggedInUserId) && (
                    <div
                        className="comment-delete"
                        onClick={async () => {
                            if (window.confirm("삭제하시겠습니까?")) {
                                try {
                                    if (typeof reply.id === "number") {
                                        await deleteComment(reply.id);
                                        setComments(
                                            comments.filter(
                                              (c) => c.id !== reply.id
                                            )
                                          );

                                        let updatedPost = { ...post };
                                        if (updatedPost.commentId) {
                                            updatedPost.commentId =
                                                updatedPost.commentId.filter(
                                                    (id) => id !== reply.id
                                                );

                                            try {
                                                await updateCommentId(updatedPost);
                                                setPost(updatedPost);

                                                if (onCommentCountChange) {
                                                    onCommentCountChange(
                                                        updatedPost.commentId
                                                            ? updatedPost.commentId.length
                                                            : 0
                                                    );
                                                }
                                            } catch (error) {
                                                console.error(error);
                                            }
                                        }
                                    } else {
                                        throw new Error("Comment ID is missing");
                                    }
                                } catch (error) {
                                    console.error(error);
                                }
                            }
                        }}
                    >
                        ❌
                    </div>
                )}
            </div>
            <div className="reply-content-box">
                <p className="reply-content">{reply.content}</p>
                <p>
                    {loggedInUserId === reply.userId && (
                        <p
                            className="reply-rewrite"
                            onClick={async () => {
                                setCommentInput(reply.content);
                                if (typeof reply.id === "number") {
                                    setEditingCommentId(reply.id);
                                }
                            }}
                        >
                            수정
                        </p>
                    )}
                </p>
            </div>
        </div>
    );
};

export default ReplyComponent;

// const ReplyComponent = (()=>{
//     return (
//         <div>
//             hi
//         </div>
//     )
//     }
// )
// export default ReplyComponent;