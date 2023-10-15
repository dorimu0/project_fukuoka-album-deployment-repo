import styled from "styled-components";

export const PostStyles = styled.div`
  position: relative;
  border-radius: 10px;

  .info {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  &:hover {
    .info {
      display: block;
    }
    img {
      opacity: 0.3;
    }
  }
`;
