import React from "react";
import { Post } from "../../types/post.interface";
import { PostStyles } from "./PostStyles";

const Posts: React.FC<Post> = ({ title, content, image }) => {
  // 첫 번째 이미지 선택

  const firstImage = image[0];

  console.log(firstImage);

  return (
    <PostStyles className="post">
      <img src={`${firstImage}`} alt={title} />
    </PostStyles>
  );
};

export default Posts;
