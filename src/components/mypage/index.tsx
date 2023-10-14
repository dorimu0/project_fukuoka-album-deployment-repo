import React, { useState, useEffect } from "react";
import { Container, CardContainer } from "./MyPageStyles";
import Card from "../card";
import { getUser } from "../../services/user.service";
import { getUserPosts } from "../../services/post.service";
import { User } from "../../types/user.interface";
import { AlbumStyle, AlbumWrapper } from "../album/AlbumStyles";
import AreaPost from "../post";
import { Post as PostType } from "../../types/post.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Profile = () => {
  const [user, setUser] = useState<User>(); // API로 받아온 위치 정보
  const [posts, setPosts] = useState<PostType[]>([]);
  const userInfo = useSelector((state: RootState) => state.user);

  // API로부터 위치 정보를 받아옴
  useEffect(() => {
    (async () => {
      const user = await getUser(userInfo.id);
      setUser(user);
    })();
    getUserPosts(user?.id || 0)
      .then((matchedPosts) => {
        setPosts(matchedPosts);
      })
      .catch((error) => console.error("Error:", error)); // 네트워크 요청 중 발생한 에러 출력
  }, []);

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
        {posts.length ? (
          <AlbumStyle>
            {posts.map((post, index) => (
              <AreaPost
                key={index}
                title={post.title}
                content={post.content}
                image={post.image}
                id={post.id}
                postAreaId={post.postAreaId}
                userId={post.userId}
                like={post.like}
                comment={[]}
                location={post.location}
            />
            ))
          ) : (
            <h1>작성된 글이 없습니다.</h1>
          )}
        </AlbumStyle>
      </AlbumWrapper>
    </Container>
  );
};

export default Profile;
