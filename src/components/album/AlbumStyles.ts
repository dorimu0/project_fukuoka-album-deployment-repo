import styled from "styled-components";

export const AlbumWrapper = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
`;

export const AlbumStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  flex-wrap: wrap;
  justify-content: space-between;
  img {
    width: 250px;
    height: 200px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 10px;
    margin-bottom: 10px;
  }
`;
