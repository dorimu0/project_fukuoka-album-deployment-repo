import React from "react";
import { CommentInterface } from "../../../../types/comment.interface";
import { User as UserType } from "../../../../types/user.interface";
import { Post as PostType } from "../../../../types/post.interface";

interface CommentComponentProps {
  comment: CommentInterface;
  users: UserType[];
  loggedInUserId: number | null;
  post: PostType;
  deleteCommentWithChildren: Function;
  getCommentsByPostId: Function;
  comments: CommentInterface[];
  createComment: (comment: CommentInterface) => Promise<CommentInterface>;
  setComments: React.Dispatch<React.SetStateAction<CommentInterface[]>>;
  updateCommentId: Function;
  setPost: Function;
  isSignIn: boolean;
  showReplyInput: number | null;
  setShowReplyInput: React.Dispatch<React.SetStateAction<number | null>>;
  setCommentInput: React.Dispatch<React.SetStateAction<string>>;
  setEditingCommentId: React.Dispatch<React.SetStateAction<number | null>>;
  onCommentCountChange: ((commentIdLength: number) => void) | undefined;
}

const CommentComponent: React.FC<CommentComponentProps> = ({
  comment,
  comments,
  createComment,
  updateCommentId,
  setPost,
  onCommentCountChange,
  users,
  loggedInUserId,
  post,
  deleteCommentWithChildren,
  getCommentsByPostId,
  setComments,
  isSignIn,
  showReplyInput,
  setShowReplyInput,
  setCommentInput,
  setEditingCommentId,
}) => {

    const [replyInput, setReplyInput] = React.useState("");
    
    return (
        <div key={comment.id}>
            <div className="comment-box">
                <img
                    className="user-icon"
                    src={
                        users.find((user) => user.id === comment.userId)
                            ?.imageUrl
                    }
                    alt={
                        users.find((user) => user.id === comment.userId)?.name
                    }
                />
                <p>
                    {users.find((user) => user.id === comment.userId)?.name}
                </p>
                <div>
                    {(loggedInUserId === comment.userId ||
                        post.userId === loggedInUserId) && (
                        <div
                            className="comment-delete"
                            onClick={async () => {
                                if (window.confirm("삭제하시겠습니까?")) {
                                    await deleteCommentWithChildren(comment);
                                    const latestComments = await getCommentsByPostId(post.id);
                                    setComments(latestComments);
                                }
                            }}
                        >
                            ❌
                        </div>
                    )}
                </div>
            </div>
            <p className="comment">{comment.content}</p>
            <div className="comment-edit-box">
                <div>
                    <p
                        className="comment-reply"
                        onClick={() => {
                            if (!isSignIn) {
                                alert("해당 기능은 로그인 후 이용가능합니다");
                            } else {
                                if (typeof comment.id === "number") {
                                    setShowReplyInput(
                                        showReplyInput === comment.id
                                            ? null
                                            : comment.id
                                    );
                                } else {
                                    console.error("Comment ID is missing");
                                }
                            }
                        }}
                    >
                        댓글 달기
                    </p>
                </div>
                <p>
                    {loggedInUserId === comment.userId && (
                        <p
                            className="comment-rewrite"
                            onClick={() => {
                                setCommentInput(comment.content);
                                if (typeof comment.id === "number") {
                                    setEditingCommentId(comment.id);
                                }
                            }}
                        >
                            수정
                        </p>
                    )}
                </p>
            </div>
            {showReplyInput === comment.id && (
            <div className="reply-container">
                <input
                className="reply-write"
                type="text"
                placeholder="대댓글을 작성하세요."
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                />
                <button
                className={`reply-post ${
                    !replyInput ? "reply-post-none" : "reply-post"
                }`}
                onClick={async () => {
                    if (!loggedInUserId) {
                    alert("로그인 후 대댓글을 작성할 수 있습니다.");
                    return;
                    }
                    try {
                    const newReply: CommentInterface = {
                        userId: loggedInUserId,
                        postId: post.id,
                        parentCommentId: comment.id,
                        content: replyInput,
                        commentId: comments.length + 1,
                    };

                    const created = await createComment(newReply);
                    if (created.id === undefined) {
                        throw new Error("Failed to create reply");
                    }
                    setComments([...comments, created]);

                    let updatedPost = { ...post };

                    if (updatedPost.commentId) {
                        updatedPost.commentId.push(created.id);
                    } else {
                        updatedPost.commentId = [created.id];
                    }

                    try {
                        const resUpdatedPost = await updateCommentId(
                        updatedPost
                        );
                        setPost(resUpdatedPost);

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
                    } catch (error) {
                    console.error(error);
                    }

                    setReplyInput("");
                    setShowReplyInput(null);
                }}
                >
                제출
                </button>
            </div>
            )}
        </div>
    );
};

export default CommentComponent;

// const CommentComponent = (()=>{
//     return (
//         <div>
//             hi
//         </div>
//     )
//     }
// )
// export default CommentComponent;