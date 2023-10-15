import styled from "styled-components";
import Slider from "react-slick";

export const Container = styled.div`
  width: 485px;
  height: 530px;
  margin: auto;
  overflow: hidden;
`;

export const UserInfo = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gray;
  font-size: 1.3rem;
`;

export const Profile = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 8px 10px;
`;

export const Cancel = styled.button`
  position: absolute;
  right: 10px;
  margin-right: 0;
  background-color: inherit;
  border: none;
  font-size: 1.5rem;
`;

export const ContentImg = styled.div`
  width: 485px;
  height: 325px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SliderBox = styled(Slider)`
  width: 485px;

  button {
    color: black;
    z-index: 999;
    margin: 0 10px;
  }
  div {
    width: 100%;
  }
  .slick-prev {
    left: 0;
  }
  .slick-next {
    right: 0;
  }
  .slick-slide {
    width: 485px;
    height: 325px;

    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
`;

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
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const PostImg = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
`;

export const Content = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const Text = styled.textarea`
  display: block;
  width: 95%;
  box-sizing: border-box;
  resize: none;
  border: none;
  border-radius: 10px;
  padding: 10px 0;
  margin: 10px auto;
  outline: none;
`;

export const EndBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
`;

export const Count = styled.div`
  width: 70px;
  text-align: center;
  span {
    display: inline-block;
    width: 25px;
  }
`;

export const FinishButton = styled.button`
  display: block;
  width: 60px;
  height: 30px;
  background-color: inherit;
  border: 1.5px solid black;
  border-radius: 10px;

  &:hover {
    background-color: black;
    color: white;
  }
`;
