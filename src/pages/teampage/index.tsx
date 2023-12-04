import React, { useEffect, useState } from "react";
import { Container, CardContainer } from "../../components/mypage/MyPageStyles";
import Card from "../../components/card";
import { User } from "../../types/user.interface";
import {
  createMember,
  deleteMember,
  getMembers,
  updateMember,
} from "../../services/member.service";
import { Member, MemberWithoutId } from "../../types/member.interface";

const TeamPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 표시되는 카드의 인덱스

  useEffect(() => {
    (async () => {
      const membersData = await getMembers();

      setMembers(membersData);

      /**
       * Create Test
       *
       * const testData: MemberWithoutId = {
       * name: "testName",
       * position: "testPosition",
       * imageUrl: "testImageUrl",
       * };
       *
       * const createTest = await createMember(testData);
       */

      /**
       * Update Test
       * const testData: Member = {
       * id: 7,
       * name: "updateName",
       * position: "updatePosition",
       * imageUrl: "updateImageUrl",
       * };
       *
       * const updateTest = await updateMember(testData);
       */

      /** Delete Test
       * const testData: number = 7;
       *
       * const deleteTest = await deleteMember(testData);
       */
    })();
  }, []);

  // if (!users) return null;

  return (
    <Container>
      <CardContainer>
        {/* {users.length > 0 && ( // users 배열에 값이 있는 경우에만 Card 컴포넌트 렌더링
          // <Card
          //   user={users[currentIndex]}
          //   onUserUpdated={(updatedUser) => {
          //     const updatedUsers = [...users];
          //     updatedUsers[currentIndex] = updatedUser;
          //     setUsers(updatedUsers);
          //   }}
          // />
        )} */}
      </CardContainer>
      <button
        onClick={() =>
          setCurrentIndex(
            currentIndex === 0 ? members.length - 1 : currentIndex - 1
          )
        }
      >
        이전
      </button>
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % members.length)}
      >
        다음
      </button>
      <hr />
    </Container>
  );
};

export default TeamPage;
