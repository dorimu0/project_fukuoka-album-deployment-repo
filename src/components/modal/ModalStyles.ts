import styled from "styled-components";

export const ModalEdit = styled.span`
  color: rgb(255, 7, 110);
  font-size: 17px;
  &:hover {
    cursor: pointer;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SaveBtn = styled.button`
  text-decoration: none;
  border-radius: 30px;
  cursor: pointer;
  background-color: rgb(204, 153, 255);
  color: #fff;
  border: none;
  padding: 10px 20px;
  transition: all 0.3s ease-in-out;
  margin-left: 10px;
  &:hover {
    background-color: #fff;
    color: rgb(204, 153, 255);
    border: 1px solid rgb(204, 153, 255);
  }
`;

export const CancelBtn = styled.span`
  color: rgb(204, 153, 255);
  font-size: 17px;
  transform: translate(0%, 23%);
  &:hover {
    cursor: pointer;
  }
`;

export const InputField = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 80%;
`;

export const Label = styled.label`
  font-weight: bold;
  display: block;
`;
