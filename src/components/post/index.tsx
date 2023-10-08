import React, { useState } from "react";
import { Post } from "../../types/post.interface";
import { PostStyles } from "./PostStyles";
import Modal from './modal'; // import your Modal component

const Posts: React.FC<Post> = ({ id, postAreaId, userId, title, content, image }) => {
  // 첫 번째 이미지 선택
  const firstImage = image[0];

  // modal open/close state
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PostStyles className="post">
      {/* When the img is clicked, open the modal */}
      <img src={`${firstImage}`} alt={title} onClick={() => setModalOpen(true)} />

      {/* If modalOpen is true, render the Modal component with current post as prop */}
      {modalOpen && 
        <Modal 
          post={{ id: id,
                  postAreaId: postAreaId,
                  userId: userId,
                  title: title,
                  content: content,
                  image: image }} 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)}
        />
      }
    </PostStyles>
  );
};

export default Posts;
