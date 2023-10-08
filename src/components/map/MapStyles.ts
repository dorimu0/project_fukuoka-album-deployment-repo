import styled from "styled-components";

// 지도 사이즈
export const Wrapper = styled.div`
  .map-container {
    width: 90%;
    height: 500px;
    margin: auto;
    z-index: 1;
  }
`;

// 지도 스타일 옵션
export const Styles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];
