import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Post as PostType } from "../../../types/post.interface";
import { CommentInterface } from "../../../types/comment.interface";
import { User } from "../../../types/user.interface";
import { getUser } from "../../../services/user.service";
import { updateLike, getPostById } from '../../../services/post.service';
import { getCommentsByPostId, createComment, deleteComment, updateComment } from "../../../services/comment.service";
import { ModalStyles, Icon, ImageContainer, LikeComment, Content } from "./ModalStyles";
import likeIcon from "./like.svg";
import likeCheckedIcon from "./likeChecked.svg";

interface ModalProps {
  post: PostType;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ post:initialPost, onClose }) => {
  const [user, setUser] = useState({ name: '', imageUrl: '' });
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

  const toggleLike = async () => {
    if (!isSignIn) {
        alert('로그인 후 좋아요 기능을 사용할 수 있습니다.');
        return;
    }
    let newLikeStatus = false;
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
      
      setPost(updatedLike)
      setLikeStatus(newLikeStatus);
      setLikeCount(updatedLike.likeChecked ? updatedLike.likeChecked.length : 0);
      
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

  useEffect(() => {
    getPostById(initialPost.id)
      .then(updatedLike => {
        setPost(updatedLike);
        const hasLiked = loggedInUserId ? (updatedLike.likeChecked?.includes(loggedInUserId) ?? false) : false;
        setLikeStatus(hasLiked);
        setLikeCount(updatedLike.likeChecked ? updatedLike.likeChecked.length : 0);
      })
      .catch(err => console.error(err));
  }, [initialPost.id, loggedInUserId]);
  
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
                  disabled={!commentInput}
                    onClick={async () => {
                    if (!loggedInUserId) {
                      alert('로그인 후 댓글을 작성할 수 있습니다.');
                      return;
                    }
                    try {
                      if (editingCommentId) {
                        const updatedComment: CommentInterface = {
                          id: editingCommentId,
                          userId: loggedInUserId,
                          postId: post.id,
                          content: commentInput,
                          commentId: comments.length + 1
                        };

                        const updated = await updateComment(updatedComment);
                        setComments(comments.map(c => c.id === updated.id ? updated : c));
                      } else {
                        const newComment: CommentInterface = {
                          userId: loggedInUserId,
                          postId: post.id,
                          content: commentInput,
                          commentId: comments.length + 1
                        };

                        const created = await createComment(newComment);
                        setComments([...comments, created]);
                      }

                      setEditingCommentId(null);
                      setCommentInput('');
                      
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >{editingCommentId ? '수정' : '게시'}</button>
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
                <div>
                {(loggedInUserId === comment.userId || post.userId === loggedInUserId) && 
                  <div className="comment-delete" onClick={async () => {
                    if(window.confirm('삭제하시겠습니까?')) { 
                      try{
                        if (typeof comment.id === 'number') {
                          await deleteComment(comment.id);
                          setComments(comments.filter(c => c.id !== comment.id));
                        } else {
                          throw new Error('Comment ID is missing');
                        }
                      } catch(error){
                        console.error(error);
                      }
                    }
                  }}>❌</div>}
                </div>
              </div>
              <p className="comment">{comment.content}</p>
              <div className="comment-edit-box">
                <p className="comment-reply">댓글 달기</p>
                <p>{loggedInUserId === comment.userId && 
                <p className="comment-rewrite" onClick={() => {
                  setCommentInput(comment.content);
                  if (typeof comment.id === "number") {
                    setEditingCommentId(comment.id);
                  }
                }}>수정</p>}</p>
              </div>
            </div>
          )}
          <div className="blank"></div>
        </div>
      </div>
    </ModalStyles>
  );
};

export default Modal;
