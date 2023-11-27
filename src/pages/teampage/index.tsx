import React, { useState } from "react";
import { Container, CardContainer } from "../../components/mypage/MyPageStyles";
import Card from "../../components/card";
import { User } from "../../types/user.interface";

const mockUsers: User[] = [
  {
    id: 1,
    email: "test1@test.com",
    name: "Test User 1",
    comment: "This is test user 1.",
    imageUrl: "https://example.com/test1.jpg",
    isSignIn: false,
  },
  {
    id: 2,
    email: "test2@test.com",
    name: "Test User 2",
    comment: "This is test user 2.",
    imageUrl: "https://example.com/test2.jpg",
    isSignIn: false,
  },
  {
    id: 3,
    email: "test3@test.com",
    name: "Test User 3",
    comment: "This is test user 3.",
    imageUrl: "https://example.com/test3.jpg",
    isSignIn: false,
  },
  {
    id: 4,
    email: "test4@test.com",
    name: "Test User 4",
    comment: "This is test user 4.",
    imageUrl: "https://example.com/test4.jpg",
    isSignIn: false,
  },
  {
    id: 5,
    email: "test5@test.com",
    name: "Test User 5",
    comment: "This is test user 5.",
    imageUrl: "https://example.com/test5.jpg",
    isSignIn: false,
  },
];

const TeamPage = () => {
  // const [users, setUsers] = useState<User[]>([]); // 여러 사용자를 관리하도록 변경
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 표시되는 카드의 인덱스

  // useEffect(() => {
  //   (async () => {
  //     const user = await getUser(userInfo?.id);
  //     setUsers([...users, user]); // 여러 사용자를 관리하도록 변경
  //   })();
  // }, []);

  // if (!users) return null;

  return (
    <Container>
      <CardContainer>
        {users.length > 0 && ( // users 배열에 값이 있는 경우에만 Card 컴포넌트 렌더링
          <Card
            user={users[currentIndex]}
            onUserUpdated={(updatedUser) => {
              const updatedUsers = [...users];
              updatedUsers[currentIndex] = updatedUser;
              setUsers(updatedUsers);
            }}
          />
        )}
      </CardContainer>
      <button
        onClick={() =>
          setCurrentIndex(
            currentIndex === 0 ? users.length - 1 : currentIndex - 1
          )
        }
      >
        이전
      </button>
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % users.length)}
      >
        다음
      </button>
      <hr />
    </Container>
  );
};

export default TeamPage;
