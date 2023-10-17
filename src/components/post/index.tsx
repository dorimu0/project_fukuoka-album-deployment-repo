import React, { useState, useEffect } from "react";
import { Post as PostType } from "../../types/post.interface";
import { PostStyles } from "./PostStyles";
import Modal from "./modal";
import likeIcon from "../post/like.svg";
import commentIcon from "../post/comment.svg";

interface Props extends PostType {
  isLoading?: boolean;
  onImageLoad?: () => void;
  comment: Comment[];
}

const Post: React.FC<Props> = (props) => {
  const firstImage = props.image[0];
  const [modalOpen, setModalOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const [likeCount, setLikeCount] = useState(props.likeChecked?.length || 0);
  const [commentCount, setCommentCount] = useState(props.commentId?.length || 0);

  useEffect(() => {
    setLikeCount(props.likeChecked?.length || 0);
    setCommentCount(props.commentId?.length || 0);
  }, [props.likeChecked, props.commentId]);
  
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
                src={likeIcon}
                alt="Likes"
                style={{ width: "50px", height: "50px", opacity: "1" }}
              />{" "}
              : {likeCount}
            </p>

            <p>
              <img
                src={commentIcon}
                alt="Comments"
                style={{ width: "50px", height: "50px", opacity: "1" }}
              />
              : {commentCount}
            </p>
          </div>
        )}
      </PostStyles>
      {modalOpen && <Modal post={props} onClose={() => setModalOpen(false)} onLikeCountChange={handleLikeCountChange} onCommentCountChange={handleCommentCountChange}/>}
    </>
  );
};

export default Post;
