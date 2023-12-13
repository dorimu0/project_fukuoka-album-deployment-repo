import styled from "styled-components";

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "image"
    "text"
    "stats";
  border-radius: 18px;
  background: #fdfcfc;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 90vw;
  max-width: 300px;
`;

export const CardImage = styled.div<{ background: string }>`
  grid-area: image;
  background-image: url(${({ background }) => background});
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 30vh;
  max-height: 210px;
  margin: 10px;
`;

export const CardTextWrapper = styled.div`
  grid-area: text;
  margin: 25px;

  @media (max-width: 600px) {
    margin: 10px;
  }
`;

export const CardTextTitle = styled.h2`
  margin-top: 0px;
  font-size: 2vw;
  box-sizing: border-box;
  min-width: 0px;
  line-height: 1.2;
  margin: 0px;
  background: linear-gradient(
    110.78deg,
    rgb(118, 230, 80) -1.13%,
    rgb(249, 214, 73) 15.22%,
    rgb(240, 142, 53) 32.09%,
    rgb(236, 81, 87) 48.96%,
    rgb(255, 24, 189) 67.94%,
    rgb(26, 75, 255) 85.34%,
    rgb(98, 216, 249) 99.57%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

export const CardTextBody = styled.p`
  font-size: 1.5vw;
  font-weight: 300;
`;
