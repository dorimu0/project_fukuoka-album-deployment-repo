import React from 'react';
import { Post } from "../../types/post.interface";
import {PostStyles} from "./PostStyles"

const Posts: React.FC<Post> = ({ title, content, image }) => {
    // 첫 번째 이미지 선택 
    const firstImage = image[0];
  
    return (
      <PostStyles className='post'>
        <h2>{title}</h2>
        <img src={`/img/${firstImage}`} alt={title} /> {/* 이미지 표시 */}
        <p>{content}</p>
      </PostStyles>
    );
};

export default Posts;
