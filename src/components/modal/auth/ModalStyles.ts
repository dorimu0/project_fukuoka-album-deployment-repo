import styled from "styled-components";

export const InputField = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 90%;
`;

export const ErrorField = styled.div`
  margin-top: 5px;
  text-align: center;
  padding: 10px;
  color: red;
  width: 90%;
`;

export const CloseBtn = styled.p`
  position: absolute;
  top: 0px;
  right: 15px;
  cursor: pointer;
  fontsize: 18px;
`;
