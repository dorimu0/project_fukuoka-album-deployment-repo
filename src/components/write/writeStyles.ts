import styled from "styled-components"

export const WriteContainer = styled.div`
  width: 100%;
  height: 60vh;
  margin: 30px 0;
`;

export const Container = styled.div`
  width: 485px;
  height: 500px;
  margin: auto;
  border: 1px solid gray;
  border-radius: 15px;
  overflow: hidden;
`

export const UserInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  font-size: 1.3rem;
`

export const Profile = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 8px 10px;
`

export const ContentImg = styled.div`
  width: 485px;
  height: 325px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AddButton = styled.button`
  width: 100px;
  height: 100px;
  color: white;
  border: 3px solid white;
  background-color: inherit;
  border-radius: 50%;
  font-size: 4rem;
  transition: width 0.3s ease, height 0.3s ease, font-size 0.3s ease;

  &:hover {
    width: 110px;
    height: 110px;
    font-size: 4.5rem;
  }
`

export const HiddenInput = styled.input`
  display: none;
`

export const PostImg = styled.img`
  display: block;
  width: 100%;
`

export const Content = styled.div`
  width: 100%;
  overflow: scroll;
`

export const Text = styled.textarea`
  display: block;
  width: 95%;
  box-sizing: border-box;
  resize: none;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: 10px auto;
  outline: none;
`

export const ButtonBox = styled.div`
  width: 485px;
  margin: auto;
`

export const FinishButton = styled.button`
  display: block;
  width: 60px;
  height: 30px;
  background-color: inherit;
  border: 1.5px solid black;
  border-radius: 10px;
  margin: 20px auto;

  &:hover {
    background-color: black;
    color: white;
  }
`