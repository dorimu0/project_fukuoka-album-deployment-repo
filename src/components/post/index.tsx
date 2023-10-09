import React, { useState } from "react";
import { Post as PostType } from "../../types/post.interface";
import { PostStyles } from "./PostStyles";
import Modal from "./modal";

const Posts: React.FC<PostType> = (props) => {
  const firstImage = props.image[0];
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <PostStyles className="post">
        <img src={`${firstImage}`} alt={props.title} onClick={() => setModalOpen(true)} />
      </PostStyles>
      {modalOpen && (
        <Modal post={props} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};

export default Posts;