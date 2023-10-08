import React from 'react';
import { Post } from "../../types/post.interface";
import {PostStyles} from "./PostStyles"
import { useNavigate } from 'react-router-dom';

const Posts: React.FC<Post> = ({ id, title, content, image }) => {
    // 첫 번째 이미지 선택 
    const firstImage = image[0];
    const navigate = useNavigate();

    const handlePostClick = () => {
      navigate(`/post/${id}`);
    };
  
    return (
      <PostStyles className='post' onClick={handlePostClick}>
        <img src={`${firstImage}`} alt={title} /> {/* 이미지 표시 */}
      </PostStyles>
    );
};

export default Posts;