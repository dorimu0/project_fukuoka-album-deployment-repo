import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Container,
  UserInfo,
  Profile,
  ContentImg,
  AddButton,
  Content,
  Text,
  HiddenInput,
  FinishButton,
  PostImg,
  Cancel,
  EndBox,
  Count,
  SliderBox,
  Address,
  AddressBox,
} from "./writeStyles";
import { MenuItem } from "../layout/header/HeaderStyles";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllLocation } from "../../services/write.service";
import { Location } from "../../types/location.interface";

const Write = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [Image, setImage] = useState<FileList>();
  const [content, setContent] = useState<string>("");
  const [inputCount, setInputCount] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [location, setLocation] = useState<Location[]>([]);

  useEffect(() => {
    getAllLocation().then((data) => {
      setLocation(data);
    });
  }, []);

  const onModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files);
    }
  };

  // add image
  const handleImageButton = () => {
    inputRef.current?.click();
  };

  const handleAddButton = () => {
    const inputContent = document.querySelector(
      ".content"
    ) as HTMLTextAreaElement;
    setContent(`${inputContent}`);

    if (content && Image) {
      // api 요청
      alert("success");
    } else if (!Image) {
      alert("이미지를 넣어주세요");
    } else {
      alert("문구를 입력해주세요");
    }
  };

  const handleInputText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <MenuItem onClick={onModal}>글 쓰기</MenuItem>

      <Modal
        isOpen={modalIsOpen}
        style={{
          overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "10",
          },
          content: {
            width: "485px",
            height: "530px",
            zIndex: "150",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid black",
            borderRadius: "15px",
            boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor: "white",
            padding: 0,
          },
        }}
      >
        <Container>
          <UserInfo>
            <Profile src="./img/miku.jpeg" alt="image" />
            {/* <span>doridori</span> */}
            <select>
              {location
                ? location.map((location, index) => (
                    <option key={index} value={location.area}>
                      {location.area}
                    </option>
                  ))
                : ""}
            </select>

            <Cancel onClick={closeModal}>
              <img src="./cancel.svg" alt="X" />
            </Cancel>
          </UserInfo>
          <ContentImg>
            {Image && Image?.length !== 0 ? (
              <SliderBox {...settings}>
                <PostImg src="./img/miku.jpeg" alt="" />
                <PostImg src="./logo.svg" alt="" />
              </SliderBox>
            ) : (
              <>
                <AddButton onClick={handleImageButton}> + </AddButton>
                <HiddenInput
                  type="file"
                  multiple
                  accept="image/*"
                  ref={inputRef}
                  onChange={handleOnChange}
                />
              </>
            )}
          </ContentImg>
          <AddressBox>
            <Address placeholder="상세 주소" />
          </AddressBox>
          <Content>
            <Text
              rows={4}
              placeholder="문구를 입력해주세요."
              className="content"
              maxLength={200}
              onChange={handleInputText}
            />
            <EndBox>
              <Count>
                <span>{inputCount}</span> / 200
              </Count>
              <FinishButton onClick={handleAddButton}> 생성 </FinishButton>
            </EndBox>
          </Content>
        </Container>
      </Modal>
    </>
  );
};

export default Write;
