import React from 'react';
import { Post } from "../../types/post.interface";
import './Post.css';

const Posts: React.FC<Post> = ({ title, content, image }) => {
    // 첫 번째 이미지 선택 
    const firstImage = image[0];
  
    return (
      <div className='post'>
        <h2>{title}</h2>
        <img src={`/img/${firstImage}`} alt={title} /> {/* 이미지 표시 */}
        <p>{content}</p>
      </div>
    );
};

export default Posts;
