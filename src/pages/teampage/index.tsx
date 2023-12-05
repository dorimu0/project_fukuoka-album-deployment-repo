import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, CardContainer } from "../../components/mypage/MyPageStyles";
import { getMembers } from "../../services/member.service";
import { Member } from "../../types/member.interface";
import MemberCard from "../../components/memberCard";
import AddMemberModal from "../../components/modal/addMember";

const StyledButton = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddButtonContainer = styled.div`
  position: absolute;
  right: 15%;
`;

const TeamPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const membersData = await getMembers();

      setMembers(membersData);
    })();
  }, []);

  return (
    <Container>
      <AddButtonContainer>
        <StyledButton
          onClick={() => {
            setIsAddMemberModalOpen(true);
          }}
        >
          +
        </StyledButton>
      </AddButtonContainer>
      <AddMemberModal
        members={members}
        setMembers={setMembers}
        isOpen={isAddMemberModalOpen}
        onRequestClose={() => setIsAddMemberModalOpen(false)}
      />
      <ButtonContainer>
        <CardContainer>
          <StyledButton
            onClick={() =>
              setCurrentIndex(
                currentIndex === 0 ? members.length - 1 : currentIndex - 1
              )
            }
          >
            &lt;-
          </StyledButton>
          {members.length > 0 && (
            <MemberCard
              member={members[currentIndex]}
              setMembers={setMembers}
              setCurrentIndex={setCurrentIndex}
              onMemberUpdated={(updatedMember) => {
                setMembers((prevMembers) =>
                  prevMembers.map((m) =>
                    m.id === updatedMember.id ? updatedMember : m
                  )
                );
              }}
            />
          )}
          <StyledButton
            onClick={() => setCurrentIndex((currentIndex + 1) % members.length)}
          >
            -&gt;
          </StyledButton>
        </CardContainer>
      </ButtonContainer>
    </Container>
  );
};

export default TeamPage;
