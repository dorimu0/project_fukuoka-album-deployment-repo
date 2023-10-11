// import styled from "styled-components";

// export const PostStyles = styled.div`
//   width: 250px;
//   height: 200px;
//   border-radius: 10px;
//   border: 11px solid white;
//   padding: 0;
//   margin-right: 10px;
//   margin-bottom: 10px;
//   &:hover {
//     opacity: 0.6;
//   }
// `;

import styled from "styled-components";

export const PostStyles = styled.div`
  position: relative; // Add this line
  width: 250px;
  height: 200px;
  border-radius: 10px;
  border: 11px solid white;
  padding: 0;
  margin-right: 10px;
  margin-bottom: 10px;

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
      opacity: 0.5;
    }
  }
`;
