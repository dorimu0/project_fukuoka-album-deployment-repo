import Modal from "../modal";
import {
  CardWrapper,
  CardImage,
  CardTextWrapper,
  CardTextTitle,
  CardTextBody,
} from "./CardStyles";
import { User } from "../../types/user.interface";

export default function Card({
  user,
  onUserUpdated,
}: {
  user: User;
  onUserUpdated: (user: User) => void;
}) {
  return (
    <>
      <CardWrapper>
        <CardImage background={user.imageUrl} />
        <CardTextWrapper>
          <CardTextTitle>{user.name}</CardTextTitle>
          <Modal
            name={user.name}
            comment={user.comment}
            imgUrl={user.imageUrl}
            onUserUpdated={onUserUpdated}
          />
          <CardTextBody>{user.comment}</CardTextBody>
        </CardTextWrapper>
      </CardWrapper>
    </>
  );
}
