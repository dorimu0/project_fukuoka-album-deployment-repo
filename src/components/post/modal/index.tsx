import React from "react";
import { Post as PostType } from "../../../types/post.interface";
import { ModalStyles, Icon } from "./ModalStyles";
import likeIcon from "./like.svg";
import commentIcon from "./comment.svg";

interface ModalProps {
  post: PostType;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ post, onClose }) => {
  return (
    <ModalStyles onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{post.title}</h2>
        {post.image && <img className="post-image" src={post.image[0]} alt={post.title} />}
        <div style={{width: '24px', height: '24px', display:"flex"}}>
            <Icon src={likeIcon} alt="like" />
            <Icon src={commentIcon} alt="comment" />
        </div>
        <h3>좋아요  {post.like}개</h3>
        <p>{post.content}</p>
      </div>
    </ModalStyles>
  );
};

export default Modal;
