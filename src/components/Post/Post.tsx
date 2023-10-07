import React from 'react';
import { Post } from "../../types";
import './Post.css';

const Posts: React.FC<Post> = ({ title, content }) => {
  return (
    <div className='post'>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Posts;