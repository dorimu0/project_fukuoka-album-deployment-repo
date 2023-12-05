import { Container } from "./IntroStyles";
import ShowUp from "./ShowUp";
import Video from "./Video";

export default function Intro() {
  return (
    <Container>
      <h1>현지학기제에 대해서</h1>
      <Video />
      <ShowUp />
    </Container>
  );
}

/* "학생들이 특정 국가에서 학습하고, 그 나라의 문화와 사회를 체험할 수
있는 기회를 제공하는 교육 프로그램입니다. 일본 현지학기제의 경우,
일본에서의 학습과 생활을 통해 일본의 문화, 사회, 역사, 경제 등에 대한
이해를 높이고, 일본어 능력을 향상시키는 것이 주요 목표" */
