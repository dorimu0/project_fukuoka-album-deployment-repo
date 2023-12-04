import React, { useEffect, useState } from "react";
import { Container, CardContainer } from "../../components/mypage/MyPageStyles";
import { getMembers } from "../../services/member.service";
import { Member } from "../../types/member.interface";
import MemberCard from "../../components/memberCard";

const TeamPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 표시되는 카드의 인덱스

  useEffect(() => {
    (async () => {
      const membersData = await getMembers();

      setMembers(membersData);
    })();
  }, []);

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
