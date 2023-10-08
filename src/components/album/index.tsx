import React, { useEffect, useState } from "react";
import { Post as PostType } from "../../types/post.interface";
import AreaPost from "../post";
import { getLocationPosts } from "../../services/post.service";
import { AlbumWrapper, AlbumStyle } from "./AlbumStyles";

interface Props {
  areaId: number;
}

const Album: React.FC<Props> = ({ areaId }) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    getLocationPosts(areaId)
      .then((matchedPosts) => {
        setPosts(matchedPosts);
      })
      .catch((error) => console.error("Error:", error)); // 네트워크 요청 중 발생한 에러 출력
  }, [areaId]);

  return (
    <AlbumWrapper>
      <AlbumStyle>
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
      </AlbumStyle>
    </AlbumWrapper>
  );
};

export default Album;
