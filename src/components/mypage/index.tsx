import React, { useState, useEffect } from "react";
import { Container, CardContainer } from "./MyPageStyles";
import Card from "../card";
import Modal from "../modal";
import { getUser } from "../../services/user.service";
import { User } from "../../types/user.interface";

const Profile = () => {
  const [user, setUser] = useState<User>(); // API로 받아온 위치 정보

  // API로부터 위치 정보를 받아옴
  useEffect(() => {
    (async () => {
      const user = await getUser("1"); // TODO: 로그인 기능 구현 후, 로그인한 유저의 id로 변경
      setUser(user);
    })();
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
      내가 작성한 앨범 리스트
    </Container>
  );
};

export default Profile;
