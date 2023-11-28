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
  onMemberUpdated,
}: {
  member: Member;
  onMemberUpdated: (member: Member) => void;
}) {
  return (
    <>
      <CardWrapper>
        <CardImage background={member.imageUrl} />
        <CardTextWrapper>
          <CardTextTitle>{member.name}</CardTextTitle>
          <MemberModal
            id={member.id}
            name={member.name}
            position={member.position}
            imgUrl={member.imageUrl}
            onMemberUpdated={onMemberUpdated}
          />
          <CardTextBody>{member.position}</CardTextBody>
        </CardTextWrapper>
      </CardWrapper>
    </>
  );
}
