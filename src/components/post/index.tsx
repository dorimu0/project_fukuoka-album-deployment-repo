import React, { useState } from "react";
import { Post as PostType } from "../../types/post.interface";
import { PostStyles } from "./PostStyles";
import Modal from "./modal";

interface Props extends PostType {
  isLoading?: boolean;
  onImageLoad?: () => void;
  comment: Comment[];
}

const Post: React.FC<Props> = (props) => {
  const firstImage = props.image[0];
  const [modalOpen, setModalOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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
            <p>Likes: {props.like}</p>
            <p>Comments: {props.comment.length}</p>
          </div>
        )}
      </PostStyles>
      {modalOpen && <Modal post={props} onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default Post;
