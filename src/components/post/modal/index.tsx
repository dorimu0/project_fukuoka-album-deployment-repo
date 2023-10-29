import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RootState } from "../../../store";
import { Post as PostType } from "../../../types/post.interface";
import { CommentInterface } from "../../../types/comment.interface";
import { User } from "../../../types/user.interface";
import { getUser } from "../../../services/user.service";
import {
  updateLike,
  getPostById,
  deletePost,
} from "../../../services/post.service";
import {
  getCommentsByPostId,
  createComment,
  deleteComment,
  updateComment,
  updateCommentId,
  getPost,
} from "../../../services/comment.service";
import { getLocationById } from "../../../services/location.service";
import {
  ModalStyles,
  Icon,
  LikeComment,
  Content,
  IconButton,
  PostMenu,
  PostMenuItem,
} from "./ModalStyles";
import likeIcon from "./like.svg";
import likeCheckedIcon from "./likeChecked.svg";
import Write from "../../write";
import Slide from "../../write/slide";

interface ModalProps {
  post: PostType;
  onClose: () => void;
  onLikeCountChange?: (likeCheckedLength: number) => void;
  onCommentCountChange?: (commentIdLength: number) => void;
}

const Modal: React.FC<ModalProps> = ({
  post: initialPost,
  onClose,
  onLikeCountChange,
  onCommentCountChange,
}) => {
  const [user, setUser] = useState({ name: "", imageUrl: "" });
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [post, setPost] = useState(initialPost);
  const isSignIn = useSelector((state: RootState) => state.user.isSignIn);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentPreview = post.content.slice(0, 100);
  const contentRest = post.content.slice(100);
  const loggedInUserId = useSelector((state: RootState) => state.user.id);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeChecked?.length || 0);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [showReplyInput, setShowReplyInput] = useState<number | null>(null);
  const [replyInput, setReplyInput] = useState("");
  const [location, setLocation] = useState<{ area: string; id: number | null }>(
    { area: "", id: null }
  );
  const [menuCheck, setMenuCheck] = useState<boolean>(false);

  const toggleLike = async () => {
    if (!isSignIn) {
      alert("로그인 후 좋아요 기능을 사용할 수 있습니다.");
      return;
    }
    let newLikeStatus = false;
    let checkLike;

    if (likeStatus && post.likeChecked && loggedInUserId !== null) {
      newLikeStatus = false;
      const index = post.likeChecked.indexOf(loggedInUserId);
      const newLikeChecked = [
        ...post.likeChecked.slice(0, index),
        ...post.likeChecked.slice(index + 1),
      ];
      checkLike = { ...post, likeChecked: newLikeChecked };
    } else if (loggedInUserId !== null) {
      newLikeStatus = true;
      if (post.likeChecked) {
        checkLike = {
          ...post,
          likeChecked: [...post.likeChecked, loggedInUserId],
        };
      } else {
        checkLike = { ...post, likeChecked: [loggedInUserId] };
      }
    }

    if (newLikeStatus) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }

    try {
      if (!checkLike) {
        throw new Error("Updated post is not defined");
      }
      const updatedLike = await updateLike(checkLike.id, checkLike);

      setPost(updatedLike);

      if (onLikeCountChange) {
        onLikeCountChange(
          updatedLike.likeChecked ? updatedLike.likeChecked.length : 0
        );
      }

      setLikeStatus(newLikeStatus);
      setLikeCount(
        updatedLike.likeChecked ? updatedLike.likeChecked.length : 0
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Promise.all(comments.map((comment) => getUser(Number(comment.userId))))
      .then((usersData) => setUsers(usersData))
      .catch((err) => console.error(err));
  }, [comments]);

  useEffect(() => {
    getUser(post.userId)
      .then((user) => setUser({ name: user.name, imageUrl: user.imageUrl }))
      .catch((err) => console.error(err));
  }, [post.userId]);

  useEffect(() => {
    getCommentsByPostId(post.id)
      .then((comments) => setComments(comments))
      .catch((err) => console.error(err));
  }, [post.id]);

  useEffect(() => {
    getPostById(initialPost.id)
      .then((updatedLike) => {
        setPost(updatedLike);
        const hasLiked = loggedInUserId
          ? updatedLike.likeChecked?.includes(loggedInUserId) ?? false
          : false;
        setLikeStatus(hasLiked);
        setLikeCount(
          updatedLike.likeChecked ? updatedLike.likeChecked.length : 0
        );
      })
      .catch((err) => console.error(err));
  }, [initialPost.id, loggedInUserId]);

  useEffect(() => {
    getLocationById(post.postAreaId)
      .then((location) => setLocation({ area: location.area, id: location.id }))
      .catch((err) => console.error(err));
  }, [post.postAreaId]);

  return (
    <ModalStyles onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="user-info">
          {user.imageUrl && (
            <img src={user.imageUrl} alt={user.name} className="user-image" />
          )}
          <div>
            <h2>{user.name}</h2>
            <p>
              {location.area}_{post.area}
            </p>
          </div>
        </div>
        {post.image && post.image?.length !== 0 ? (
          <Slide image={post.image} />
        ) : null}
        <div className="post-edit-box">
          <LikeComment>
            <Icon
              src={likeStatus ? likeCheckedIcon : likeIcon}
              alt="like"
              onClick={toggleLike}
            />
          </LikeComment>
          {loggedInUserId === post.userId && (
            // <button className="post-rewrite">게시물 수정</button>
            // 게시글 삭제 함수 추가
            <>
              <LikeComment>
                <IconButton
                  onClick={() => {
                    setMenuCheck(!menuCheck);
                  }}
                >
                  <Icon src="/post_menu.svg" />
                </IconButton>
              </LikeComment>
              {menuCheck ? ( // 모달 창 수정
                <PostMenu>
                  <div>
                    <Write editMode={true} postId={post.id} />
                  </div>
                  <PostMenuItem
                    onClick={async () => {
                      if (window.confirm("정말 삭제하시겠습니까?")) {
                        try {
                          await deletePost(post.id);
                          window.alert("게시글이 삭제되었습니다.");
                          window.location.reload();
                        } catch (error) {
                          console.error("게시글 삭제 실패", error);
                        }
                      }
                    }}
                  >
                    삭제
                  </PostMenuItem>
                </PostMenu>
              ) : null}
            </>
          )}
        </div>
        <h3>좋아요 {likeCount}개</h3>
        <Content expanded={isExpanded}>
          {contentPreview}
          {post.content.length > 100 && !isExpanded && (
            <div className="more-view" onClick={() => setIsExpanded(true)}>
              더보기...
            </div>
          )}
          {isExpanded && contentRest}
        </Content>
        {isSignIn ? (
          <div className="comment-write-box">
            <input
              className="comment-write"
              type="text"
              placeholder="댓글 달기..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            ></input>
            <button
              className={`comment-post ${
                !commentInput ? "comment-post-none" : "comment-post"
              }`}
              disabled={!commentInput}
              onClick={async () => {
                if (!loggedInUserId) {
                  alert("로그인 후 댓글을 작성할 수 있습니다.");
                  return;
                }
                try {
                  if (editingCommentId) {
                    const commentToUpdate = comments.find(
                      (c) => c.id === editingCommentId
                    );
                    if (!commentToUpdate) {
                      console.error("The comment to update was not found");
                      return;
                    }
                    const updatedComment: CommentInterface = {
                      id: editingCommentId,
                      userId: loggedInUserId,
                      postId: post.id,
                      content: commentInput,
                      commentId: comments.length,
                      parentCommentId: commentToUpdate.parentCommentId,
                    };

                    const updated = await updateComment(updatedComment);
                    setComments(
                      comments.map((c) => (c.id === updated.id ? updated : c))
                    );
                  } else {
                    const newComment: CommentInterface = {
                      userId: loggedInUserId,
                      postId: post.id,
                      content: commentInput,
                      commentId: comments.length + 1,
                    };

                    const created = await createComment(newComment);
                    if (created.id === undefined) {
                      throw new Error("Failed to create comment");
                    }
                    setComments([...comments, created]);
                    let updatedPost = { ...post };

                    if (updatedPost.commentId) {
                      updatedPost.commentId.push(created.id);
                    } else {
                      updatedPost.commentId = [created.id];
                    }

                    new Promise((resolve) => setTimeout(resolve, 100));

                    try {
                      const resUpdatedPost = await updateCommentId(updatedPost);
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
                  }

                  setEditingCommentId(null);
                  setCommentInput("");
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              {editingCommentId ? "수정" : "게시"}
            </button>
          </div>
        ) : (
          <div className="comment-write-box">
            <input
              className="comment-write"
              type="text"
              placeholder="댓글은 로그인 후 작성할 수 있습니다"
              disabled
            ></input>
          </div>
        )}
        <div
          className="modal-comment-content"
          onClick={(e) => e.stopPropagation()}
        >
          {comments.map((comment) => {
            if (
              comment.parentCommentId === null ||
              comment.parentCommentId === undefined
            ) {
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
                              const childComments = comments.filter(
                                (c) => c.parentCommentId === comment.id
                              );
                              for (let childComment of childComments) {
                                if (typeof childComment.id === "number") {
                                  try {
                                    await deleteComment(childComment.id);

                                    let updatedPost = { ...post };

                                    if (updatedPost.commentId) {
                                      updatedPost.commentId =
                                        updatedPost.commentId.filter(
                                          (id) => id !== childComment.id
                                        );

                                      const resUpdatedPost =
                                        await updateCommentId(updatedPost);

                                      setComments((comments) =>
                                        comments.filter(
                                          (c) => c.id !== childComment.id
                                        )
                                      );
                                      setPost(resUpdatedPost);

                                      if (onCommentCountChange) {
                                        onCommentCountChange(
                                          resUpdatedPost.commentId
                                            ? resUpdatedPost.commentId.length
                                            : 0
                                        );
                                      }
                                    } else {
                                      throw new Error(
                                        "에러 : 게시물에서 자식의 ID 값을 찾을 수 없음"
                                      );
                                    }
                                  } catch (error) {
                                    console.error(
                                      "에러 : 자식 댓글을 삭제/수정 실패 내용->",
                                      error
                                    );
                                  }
                                } else {
                                  console.error(
                                    "에러 : 자식의 ID 값이 누락되었습니다"
                                  );
                                }
                              }
                              const latestPost = await getPost(post.id);
                              try {
                                if (typeof comment.id === "number") {
                                  await deleteComment(comment.id);

                                  let updatedParent = { ...latestPost };

                                  if (updatedParent.commentId) {
                                    updatedParent.commentId =
                                      updatedParent.commentId.filter(
                                        (id) => id !== comment.id
                                      );

                                    const resUpdatedParent =
                                      await updateCommentId(updatedParent);

                                    setComments(
                                      comments.filter(
                                        (c) => c.id !== comment.id
                                      )
                                    );
                                    setPost(resUpdatedParent);

                                    if (onCommentCountChange) {
                                      onCommentCountChange(
                                        resUpdatedParent.commentId
                                          ? resUpdatedParent.commentId.length
                                          : 0
                                      );
                                    }
                                  } else {
                                    throw new Error(
                                      "에러 : 게시물의 댓글 목록에서 부모 댓글 제거 실패"
                                    );
                                  }
                                } else {
                                  throw new Error(
                                    "에러 : 부모의 댓글 삭제 실패."
                                  );
                                }
                              } catch (error) {
                                console.error(error);
                              }
                              new Promise((resolve) =>
                                setTimeout(resolve, 100)
                              );
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
                  {comments
                    .filter((reply) => reply.parentCommentId === comment.id)
                    .map((reply) => (
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
                    ))}
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
            } else {
              return null;
            }
          })}
          <div className="blank"></div>
        </div>
      </div>
    </ModalStyles>
  );
};

export default Modal;
