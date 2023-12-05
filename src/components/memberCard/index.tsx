import MemberModal from "../modal/member";
import {
  CardWrapper,
  CardImage,
  CardTextWrapper,
  CardTextTitle,
  CardTextBody,
} from "./CardStyles";
import { Member } from "../../types/member.interface";

export default function MemberCard({
  member,
  setMembers,
  setCurrentIndex,
}: {
  member: Member;
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  onMemberUpdated: (member: Member) => void;
  setCurrentIndex: (index: number) => void;
}) {
  if (!member) return null;

  return (
    <>
      <CardWrapper>
        <CardImage background={member.imageUrl} />
        <CardTextWrapper>
          <CardTextTitle>{member.name}</CardTextTitle>
          <MemberModal
            member={member}
            setMembers={setMembers}
            onMemberUpdated={(updatedMember) => {
              setMembers((prevMembers) =>
                prevMembers.map((m) =>
                  m.id === updatedMember.id ? updatedMember : m
                )
              );
            }}
            setCurrentIndex={setCurrentIndex}
          />
          <CardTextBody>{member.position}</CardTextBody>
        </CardTextWrapper>
      </CardWrapper>
    </>
  );
}
