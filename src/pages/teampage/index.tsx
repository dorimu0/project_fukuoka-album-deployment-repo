import React, { useState } from "react";
import { Container, CardContainer } from "../../components/mypage/MyPageStyles";
import MemberCard from "../../components/memberCard";
import { Member } from "../../types/member.interface";

const mockMembers: Member[] = [
  {
    id: 1,
    name: "강주원",
    position: "프론트엔드, 백엔드",
    imageUrl: "https://example.com/test1.jpg",
  },
  {
    id: 2,
    name: "김범창",
    position: "프론트엔드",
    imageUrl: "https://example.com/test2.jpg",
  },
  {
    id: 3,
    name: "김유민",
    position: "프론트엔드",
    imageUrl: "https://example.com/test3.jpg",
  },
  {
    id: 4,
    name: "박정민",
    position: "프론트엔드",
    imageUrl: "https://example.com/test4.jpg",
  },
  {
    id: 5,
    name: "석진석",
    position: "프론트엔드",
    imageUrl: "https://example.com/test5.jpg",
  },
];

const TeamPage = () => {
  // const [members, setMembers] = useState<Member[]>([]); // 여러 사용자를 관리하도록 변경
  const [members, setMembers] = useState<Member[]>(mockMembers);
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
        {members.length > 0 && (
          <MemberCard
            member={members[currentIndex]}
            onMemberUpdated={(updatedMember) => {
              const updatedMembers = [...members];
              updatedMembers[currentIndex] = updatedMember;
              setMembers(updatedMembers);
            }}
          />
        )}
      </CardContainer>
      <button
        onClick={() =>
          setCurrentIndex(
            currentIndex === 0 ? members.length - 1 : currentIndex - 1
          )
        }
      >
        prev
      </button>
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % members.length)}
      >
        next
      </button>
      <button onClick={() => {}}>add</button>
    </Container>
  );
};

export default TeamPage;
