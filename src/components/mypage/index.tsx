import React, { useState, useEffect } from "react";
import { Container, CardContainer } from "./MyPageStyles";
import Card from "../card";
import { getUser } from "../../services/user.service";
import { getUserPosts } from "../../services/post.service";
import { User } from "../../types/user.interface";
import { AlbumStyle, AlbumWrapper } from "../album/AlbumStyles";
import AreaPost from "../post";
import { Post as PostType } from "../../types/post.interface";

const Profile = () => {
  const [user, setUser] = useState<User>(); // API로 받아온 위치 정보
  const [posts, setPosts] = useState<PostType[]>([]);

  // API로부터 위치 정보를 받아옴
  useEffect(() => {
    (async () => {
      const user = await getUser("1"); // TODO: 로그인 기능 구현 후, 로그인한 유저의 id로 변경
      setUser(user);
    })();
    getUserPosts(1)
      .then((matchedPosts) => {
        setPosts(matchedPosts);
      })
      .catch((error) => console.error("Error:", error)); // 네트워크 요청 중 발생한 에러 출력
  }, []);

  useEffect(() => {}, []);

  if (!user) return null;

  return (
    <Container>
      <CardContainer>
        <Card
          user={user}
          onUserUpdated={(updatedUser) => setUser(updatedUser)}
        />
      </CardContainer>
      <hr />
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
    </Container>
  );
};

export default Profile;
