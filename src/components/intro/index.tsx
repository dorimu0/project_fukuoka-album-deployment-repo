import { ChangeEvent, useRef, useState } from "react";
import { Container, Button, InputText } from "./IntroStyles";
import YouTube from "react-youtube";

export default function Intro() {
  const [intro, setIntro] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleAddIntro = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePostData = () => {
    setIntro(inputValue);
    setInputValue("");
    setEditMode(false);
  };

  const handleEditData = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Container>
      <h1>현지학기제에 대해서</h1>
      <YouTube
        videoId="h8LgupBsaxQ" //동영상 주소
        opts={{
          width: "100%",
          height: "600px",
          playerVars: {
            autoplay: 1, //자동 재생 여부
            modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
            loop: 1, //반복 재생
            playlist: "h8LgupBsaxQ", //반복 재생으로 재생할 플레이 리스트
          },
        }}
        onReady={(e) => {
          e.target.mute(); //소리 끔
        }}
      />
      {intro ? (
        <>
          {editMode ? (
            <>
              <InputText
                type="text"
                value={inputValue}
                onChange={handleEditData}
              />
              <Button onClick={handlePostData}>저장</Button>
            </>
          ) : (
            <>
              <h2>"{intro}"</h2>
              <Button
                onClick={() => {
                  setEditMode(true);
                  setInputValue(intro);
                }}
              >
                수정
              </Button>
              <Button onClick={() => setIntro("")}>삭제</Button>
            </>
          )}
        </>
      ) : (
        <>
          <InputText
            onChange={handleAddIntro}
            placeholder="현지학기제에 소개해주세요"
          />
          <Button onClick={handlePostData}>저장</Button>
        </>
      )}
    </Container>
  );
}

{
  /* "학생들이 특정 국가에서 학습하고, 그 나라의 문화와 사회를 체험할 수
있는 기회를 제공하는 교육 프로그램입니다. 일본 현지학기제의 경우,
일본에서의 학습과 생활을 통해 일본의 문화, 사회, 역사, 경제 등에 대한
이해를 높이고, 일본어 능력을 향상시키는 것이 주요 목표" */
}
