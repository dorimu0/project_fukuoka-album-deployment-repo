import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 80px;
`;

export const LogoBox = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);
`;

export const Logo = styled.img`
  width: 200px;
  height: 80px;
`;

export const IconBox = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0%, -50%);
  margin-right: 20px;
  text-align: center;
`;

export const IconButton = styled.button`
  border: none;
  background-color: transparent;
`;

export const Icon = styled.img`
  width: 50px;
`;

export const Menu = styled.ul`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.2rem;
`;

export const MenuItem = styled.li`
  width: 80px;
  padding: 10px;
  &:hover {
    background-color: rgb(200, 200, 200);
  }
`;
