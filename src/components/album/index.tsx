import React, { useEffect, useState } from "react";
import { Post as PostType } from "../../types/post.interface";
import AreaPost from "../post";

interface Props {
  areaId: number;
}

const Album: React.FC<Props> = ({ areaId }) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  // FIXME: 수정 요함
  useEffect(() => {
    fetch("http://localhost:3004/post")
      .then((response) => response.json())
      .then((data: PostType[]) => {
        console.log(data); // 받아온 데이터 확인용

        if (data) {
          const matchedPosts = data.filter(
            (post: PostType) => Number(post.postAreaId) === areaId
          );
          setPosts(matchedPosts);
        } else {
          console.error("Unexpected response:", data); // 예상하지 못한 응답 출력
        }
      })
      .catch((error) => console.error("Error:", error)); // 네트워크 요청 중 발생한 에러 출력
  }, [areaId]);

  return (
    <div>
      {posts.map((post, index) => (
        // FIXME: 수정 요함
        <AreaPost
          key={index}
          title={post.title}
          content={post.content}
          image={post.image}
          id={0}
          postAreaId={0}
          userId={0}
        />
      ))}
    </div>
  );
};

export default Album;
