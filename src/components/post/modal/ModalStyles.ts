import styled from "styled-components";

export const ModalStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999; // 1000으로 되긴 하는데 일단 9999로 고정해주세요

  .modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    max-width: 485px;
    max-height: 585px;
    border-radius: 12px;


    .post-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border: 0.1px solid gray;
      border-radius: 5px;
      margin: auto;
    }
    h2,
    p {
      padding-left: 10px;
    }
    h3{
      margin: 10px;
    }
  }

  .user-info {
    display: flex;
    align-items: center;

    img.user-image {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
`;

export const Icon = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin : 0px 5px;
  display : flex;
  border: none;
`;

export const ImageContainer = styled.div`
  width: 485px;
  height: 323.325px;

  .post-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border: 0.1px solid gray;
    border-radius: 5px;
    margin: auto;
  }
`;

export const LikeComment = styled.div`
  margin:5px;
  width: 30px;
  height: 30px;
  display : flex;
`;

export const Comment = styled.div`
  width: 485px;
  padding : 0px 15px 10px 15px;
  box-sizing: border-box;
  height: auto; 
  display : flex;
  flex-direction: column;
  overflow-wrap: break-word;
`;