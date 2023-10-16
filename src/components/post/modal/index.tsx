import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Post as PostType } from "../../../types/post.interface";
import { CommentInterface } from "../../../types/comment.interface";
import { User } from "../../../types/user.interface";
import { getUser } from "../../../services/user.service";
import { updateLike } from '../../../services/post.service';
import { getCommentsByPostId } from "../../../services/comment.service";
import { ModalStyles, Icon, ImageContainer, LikeComment, Content } from "./ModalStyles";
import likeIcon from "./like.svg";
import commentIcon from "./comment.svg";
import likeCheckedIcon from "./likeChecked.svg";

interface ModalProps {
  post: PostType;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ post, onClose }) => {
  const [user, setUser] = useState({ name: '', imageUrl: '' });
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const isSignIn = useSelector((state: RootState) => state.user.isSignIn);
  const [isExpanded, setIsExpanded] = useState(false);
  const contentPreview = post.content.slice(0, 100);
  const contentRest = post.content.slice(100);
  const loggedInUserId = useSelector((state: RootState) => state.user.id); 
  const hasLiked = loggedInUserId ? post.likeChecked?.includes(loggedInUserId) : false;
  const [likeStatus, setLikeStatus] = useState(hasLiked);
  const [likeCount, setLikeCount] = useState(post.likeChecked?.length || 0);

  const toggleLike = async () => {
    if (!isSignIn) {
        alert('로그인 후 좋아요 기능을 사용할 수 있습니다.');
        return;
    }
    let newLikeStatus;
    let checkLike;
  
    if (likeStatus && post.likeChecked && loggedInUserId !== null) {
      newLikeStatus = false; 
      const index = post.likeChecked.indexOf(loggedInUserId);
      const newLikeChecked = [...post.likeChecked.slice(0, index), ...post.likeChecked.slice(index + 1)];
      checkLike = { ...post, likeChecked: newLikeChecked };
      
    } else if (loggedInUserId !== null) {
      newLikeStatus = true; 
      if (post.likeChecked) {
        checkLike = { ...post, likeChecked: [...post.likeChecked, loggedInUserId] };
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
        throw new Error('Updated post is not defined');
      }
      const updatedLike = await updateLike(checkLike.id, checkLike);
      console.log('Updated post:', updatedLike);
      setLikeStatus(newLikeStatus);
      if (updatedLike.likeChecked) {
        setLikeCount(updatedLike.likeChecked.length);
      } else {
        console.error('likeChecked is undefined');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Promise.all(comments.map(comment =>
      getUser(Number(comment.userId))))
      .then(usersData =>
        setUsers(usersData))
      .catch(err =>
        console.error(err));
  }, [comments]);

  useEffect(() => {
    getUser(post.userId)
      .then((user) => setUser({ name: user.name, imageUrl: user.imageUrl }))
      .catch((err) => console.error(err));
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
            <p>{post.area}</p>
          </div>
        </div>
        {post.image && (
          <ImageContainer>
            <img className="post-image" src={post.image[0]} alt={post.title} />
          </ImageContainer>
        )}
        <LikeComment>
            <Icon src={likeStatus ? likeCheckedIcon : likeIcon} alt="like" onClick={toggleLike} />
            <Icon src={commentIcon} alt="comment"
            onClick={() => {
              if (isSignIn) {
                const commentInput = document.querySelector<HTMLInputElement>('.comment-write');
                if (commentInput) {
                  commentInput.focus();
                }
              } else {
                alert('댓글은 로그인 후 작성할 수 있습니다');
              }
            }}
            />
        </LikeComment>
        <h3>좋아요  {likeCount}개</h3>
        <Content expanded={isExpanded}>
          {contentPreview}
          {post.content.length > 100 && !isExpanded && (
            <div className="more-view" onClick={() => setIsExpanded(true)}>더보기...</div>
          )}
          {isExpanded && contentRest}
        </Content>
        {isSignIn?(
              <div className="comment-write-box">
                <input
                  className="comment-write"
                  type="text"
                  placeholder='댓글 달기...'
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}>
                </input>
                <button
                  className={`comment-post ${!commentInput ? 'comment-post-none' : 'comment-post'}`}
                  disabled={!commentInput}>게시
                </button>
              </div>
              ):(
              <div className="comment-write-box">
                <input
                  className="comment-write"
                  type="text"
                  placeholder='댓글은 로그인 후 작성할 수 있습니다'
                  disabled>
                </input>
              </div>
            )}
        <div className="modal-comment-content" onClick={(e) => e.stopPropagation()}>
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
          <div className="blank"></div>
        </div>
      </div>
    </ModalStyles>
  );
};

export default Modal;
