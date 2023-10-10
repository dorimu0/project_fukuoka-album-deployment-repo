import React, { useEffect, useState } from "react";
import { Post as PostType } from "../../../types/post.interface";
import { ModalStyles, Icon, ImageContainer } from "./ModalStyles";
import likeIcon from "./like.svg";
import commentIcon from "./comment.svg";
import { getUser } from "../../../services/user.service"; // getUser import

interface ModalProps {
  post: PostType;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ post, onClose }) => {
  const [user, setUser] = useState({ name: '', imageUrl: '' });

  useEffect(() => {
    getUser(String(post.userId))
    .then(user => setUser({ name: user.name, imageUrl: user.imageUrl }))
      .catch(err => console.error(err));
  }, [post.userId]);

  return (
    <ModalStyles onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="user-info">
          {user.imageUrl && 
            <img 
              src={user.imageUrl} 
              alt={user.name} 
              className="user-image"
            />
          }
          <h2>{user.name}</h2>
        </div>
        {post.image && 
          <ImageContainer>
            <img className="post-image" src={post.image[0]} alt={post.title} />
          </ImageContainer>
        }
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
