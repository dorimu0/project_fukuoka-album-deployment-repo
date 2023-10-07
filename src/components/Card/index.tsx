import {
  CardWrapper,
  CardImage,
  CardTextWrapper,
  CardTextTitle,
  CardTextBody,
  CardStatWrapper,
  CardStats,
  LinkText,
} from "./CardStyles";
import { CardType } from "../../types/card.interface";

export default function Card({ title, imgUrl }: CardType) {
  return (
    <CardWrapper>
      {/* <CardImage background={imgUrl} /> */}
      <CardImage background={imgUrl} />
      <CardTextWrapper>
        {/* <CardTextDate>{date} days ago</CardTextDate> */}
        <CardTextTitle>{title}</CardTextTitle>
        <CardTextBody>
          Lorem ipsum dolor sit amet consectetur, Ducimus, repudiandae
          temporibus omnis illum maxime quod deserunt eligendi dolor
        </CardTextBody>
      </CardTextWrapper>
      <CardStatWrapper>
        <CardStats>
          <LinkText href="#">edit</LinkText>
        </CardStats>
        <CardStats>
          <LinkText href="#">github</LinkText>
        </CardStats>
      </CardStatWrapper>
    </CardWrapper>
  );
}
