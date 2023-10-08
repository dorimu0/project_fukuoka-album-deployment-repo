import React, { useEffect, useState } from "react";
import { Post as PostType } from "../../types/post.interface";
import AreaPost from "../post";
import { fetchPosts } from "../../services/album.service";

interface Props {
  areaId: number;
}

const Album: React.FC<Props> = ({ areaId }) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetchPosts(areaId)
      .then((matchedPosts) => {
        setPosts(matchedPosts);
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
