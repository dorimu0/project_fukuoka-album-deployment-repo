import React, { useEffect, useState } from "react";
import { Post } from "../../types";
import AreaPost from '../Post/Post';

interface Props {
  area?: string | null;
}

const Album: React.FC<Props> = ({ area }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (area) { // area가 null이 아닐 때만 요청을 보냄
      fetch('http://localhost:3004/post')
        .then(response => response.json())
        .then(data => {
          console.log(data); // 받아온 데이터 확인용
  
          if (data) {
            const matchedPosts = data.filter((post: Post) => post.postAreaId === area + '1');
            setPosts(matchedPosts);
          } else {
            console.error('Unexpected response:', data); // 예상하지 못한 응답 출력
          }
        })
        .catch(error => console.error('Error:', error)); // 네트워크 요청 중 발생한 에러 출력
    }
  }, [area]);

  return (
    <div>
      {posts.map((post, index) => (
        <AreaPost key={index} title={post.title} content={post.content} />
      ))}
  </div>
  );
};

export default Album;