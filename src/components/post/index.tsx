import React, { useEffect, useState } from "react";
import { Post as PostType } from "../../types/post.interface";
import { PostStyles } from "./PostStyles";
import { getCommentsByPostId } from "../../services/comment.service";
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
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    (async () => {
      const comments = await getCommentsByPostId(props.id);
      setCommentCount(comments.length);
    })();
  }, [props.id]); // props.id가 변경될 때마다 실행

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
                style={{
                  width: "30px",
                  height: "30px",
                  opacity: "1",
                  margin: "10px",
                }}
              />{" "}
              {props.like}
              <img
                src={commentIcon}
                alt="Comments"
                style={{
                  width: "30px",
                  height: "30px",
                  opacity: "1",
                  margin: "10px",
                }}
              />
              {commentCount}
            </p>
          </div>
        )}
      </PostStyles>
      {modalOpen && <Modal post={props} onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default Post;
