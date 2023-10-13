import React, { useEffect, useState } from "react";
import { Post as PostType } from "../../../types/post.interface";
import { CommentInterface } from "../../../types/comment.interface";
import { User } from "../../../types/user.interface";
import { ModalStyles, Icon, ImageContainer, LikeComment, Comment } from "./ModalStyles";
import likeIcon from "./like.svg";
import commentIcon from "./comment.svg";
import { getUser } from "../../../services/user.service";
import { getCommentsByPostId } from "../../../services/comment.service";

interface ModalProps {
  post: PostType;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ post, onClose }) => {
  const [user, setUser] = useState({ name: '', imageUrl: '' });
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<CommentInterface[]>([]);

  useEffect(() => {
    Promise.all(comments.map(comment =>
      getUser(Number(comment.userId))))
      .then(usersData =>
        setUsers(usersData))
      .catch(err =>
        console.error(err));
  }, [comments]);

  useEffect(() => {
    getUser(Number(post.userId))
    .then(user => setUser({ name: user.name, imageUrl: user.imageUrl }))
      .catch(err => console.error(err));
  }, [post.userId]);

  useEffect(() => {
    getCommentsByPostId(post.id)
      .then(comments => setComments(comments))
      .catch(err => console.error(err));
  }, [post.id]);

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
          <div>
            <h2>{user.name}</h2>
            <p>{post.location}</p>
          </div>
        </div>
        {post.image && 
          <ImageContainer>
            <img className="post-image" src={post.image[0]} alt={post.title} />
          </ImageContainer>
        }
        <LikeComment>
            <Icon src={likeIcon} alt="like" />
            <Icon src={commentIcon} alt="comment" />
        </LikeComment>
        <h3>좋아요  {post.like}개</h3>
        <Comment>
          {post.content}
        </Comment>
      </div>
      <div className="modal-comment-content">
      {comments.map((comment) =>
         <div key={comment.id}>
          <div className="comment-box">
            <img
              className="user-icon"
              src={users.find(user =>
              user.id === comment.userId)?.imageUrl} alt={users.find(user =>
                user.id === comment.userId)?.name} />
            <p>{users.find(user =>
                user.id === comment.userId)?.name}</p>
          </div>
           <p className="comment">{comment.content}</p>
           <p className="comment-reply">댓글 달기</p>
         </div>
       )}
      </div>
    </ModalStyles>
  );
};

export default Modal;
