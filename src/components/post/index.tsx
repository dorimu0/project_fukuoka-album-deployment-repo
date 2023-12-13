import React, { useState, useEffect } from "react";
import { Post as PostType } from "../../types/post.interface";
import { PostStyles } from "./PostStyles";
import { getCommentsByPostId } from "../../services/comment.service";
import Modal from "../modal/post";
import likeIcon from "../post/like.svg";
import commentIcon from "../post/comment.svg";
import likeCheckedIcon from "../post/likeChecked.svg";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

interface Props extends PostType {
  isLoading?: boolean;
  onImageLoad?: () => void;
  comment: Comment[];
}

const Post: React.FC<Props> = (props) => {
  const firstImage = props.image[0];
  const [modalOpen, setModalOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const loggedInUserId = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    (async () => {
      const comments = await getCommentsByPostId(props.id);
      setCommentCount(comments.length);
    })();
  }, [props.id]);

  const [likeCount, setLikeCount] = useState(props.likeChecked?.length || 0);
  const [commentCount, setCommentCount] = useState(
    props.commentId?.length || 0
  );
  const [likeStatus, setLikeStatus] = useState(false);

  useEffect(() => {
    setLikeCount(props.likeChecked?.length || 0);
    setCommentCount(props.commentId?.length || 0);
  }, [props.likeChecked, props.commentId]);

  useEffect(() => {
    const hasLiked = loggedInUserId
      ? props.likeChecked?.includes(loggedInUserId) ?? false
      : false;
    setLikeStatus(hasLiked);
  }, [props.likeChecked, loggedInUserId]);

  const handleLikeCountChange = (newLikeCount: number) => {
    setLikeCount(newLikeCount);
  };
  const handleCommentCountChange = (newCommentCount: number) => {
    setCommentCount(newCommentCount);
  };

  return (
    <>
      <PostStyles className="post">
        <img
          src={`${firstImage}`}
          alt={props.title}
          onClick={() => setModalOpen(true)}
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
          style={props.isLoading ? { display: "none" } : {}}
          onLoad={props.onImageLoad}
        />

        {showInfo && (
          <div className="info">
            <p>
              <img
                src={likeStatus ? likeCheckedIcon : likeIcon}
                alt="Likes"
                style={{
                  width: "30px",
                  height: "30px",
                  opacity: "1",
                  margin: "5px",
                }}
              />{" "}
              {likeCount}
              <img
                src={commentIcon}
                alt="Comments"
                style={{
                  width: "30px",
                  height: "30px",
                  opacity: "1",
                  margin: "5px",
                }}
              />
              {commentCount}
            </p>
          </div>
        )}
      </PostStyles>
      {modalOpen && (
        <Modal
          post={props}
          onClose={() => setModalOpen(false)}
          onLikeCountChange={handleLikeCountChange}
          onCommentCountChange={handleCommentCountChange}
          onLikeStatusChange={setLikeStatus}
        />
      )}
    </>
  );
};

export default Post;
