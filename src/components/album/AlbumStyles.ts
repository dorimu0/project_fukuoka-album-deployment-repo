import styled from "styled-components";

export const AlbumWrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
`;

export const AlbumStyle = styled.div`
  display: grid;
  grid-gap: 10px;

  grid-template-columns: repeat(4, minmax(200px, auto));

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(200px, auto));
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(200px, auto));
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, minmax(200px, auto));
  }

  img {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    object-fit: cover;
  }
`;
