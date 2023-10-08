import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 80%;
  height: 80px;
  margin: 0 auto;
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

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 8%;
  transform: translate(0, -50%);
  border: 1px solid black;
  border-radius: 20px;
  overflow: hidden;
`;

export const SearchImage = styled.img`
  width: 30px;
  padding-left: 5px;
`;

export const Search = styled.input`
  width: 150px;
  display: block;
  padding: 5px;
  border: none;
  outline: none;
  font-size: 1.2rem;
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
  z-index: 999;
`;

export const MenuItem = styled.li`
  width: 70px;
  padding: 10px;
  &:hover {
    background-color: rgb(200, 200, 200);
  }
`;
