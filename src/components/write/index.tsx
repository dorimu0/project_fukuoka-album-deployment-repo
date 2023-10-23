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
  Cancel,
  EndBox,
  Count,
  Address,
  AddressBox,
} from "./writeStyles";
import { MenuItem } from "../layout/header/HeaderStyles";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  uploadPostImage,
  getAllLocation,
  postPost,
  getEditPost,
} from "../../services/write.service";
import { Location } from "../../types/location.interface";
import Slide from "./slide";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../store/modal";
import { Post, WriteProps } from "../../types/post.interface";

const Write = ({ editMode }: WriteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editPost, setEditPost] = useState<Post>();
  // const [imageUrl, setImageUrl] = useState<string[] | null>([]); // 이미지 요청
  const [images, setImages] = useState<string[]>([]); // 이미지 미리보기
  const [imageFile, setImageFile] = useState<File[]>([]); // 이미지 파일
  // const [content, setContent] = useState<string>(""); // 문구
  const [inputCount, setInputCount] = useState<number>(0); // 글자 수
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); // 모달 open 여부
  // const [area, setArea] = useState<string>(""); // 상세 주소
  const [locations, setLocations] = useState<Location[]>([]); // 지역들
  const [postAreaId, setPostAreaId] = useState<number>(0); // 지역Id
  const userInfo = useSelector((state: RootState) => state.user); // 현재 유저 정보
  const dispatch = useDispatch();

  useEffect(() => {
    if (editMode) {
      getEditPost().then((data) => {
        setEditPost(data);
      });
    } else {
      getAllLocation().then((data) => {
        setLocations(data);
      });
    }
  }, []);

  // MODAL
  const onModal = () => {
    setModalIsOpen(true);
    dispatch(setModalOpen(true));
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setInputCount(0);
    setImages([]);
    dispatch(setModalOpen(false));
  };

  const handleImageButton = () => {
    inputRef.current?.click();
  };
  // 이미지 미리보기
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      setImageFile(Array.from(files));
      if (files?.length > 5) {
        alert("이미지는 최대 5개까지 담을 수 있습니다.");
        return;
      }
      const imagesArray: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          imagesArray.push(reader.result as string);
          setImages([...imagesArray]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const inputContent = useRef<HTMLTextAreaElement>(null);
  const inputAddress = useRef<HTMLInputElement>(null);
  const selectLocation = useRef<HTMLSelectElement>(null);

  // 게시글 생성
  const handleAddButton = async () => {
    if (
      inputContent.current &&
      inputAddress.current &&
      selectLocation.current
    ) {
      const location = selectLocation.current.options[
        selectLocation.current.selectedIndex
      ].textContent as string;

      const content: string = inputContent.current.value;
      setPostAreaId(parseInt(selectLocation.current.value));
      const area: string = `${location} ${inputAddress.current.value}`;

      if (imageFile.length === 0) {
        alert("이미지를 넣어주세요");
        return;
      } else if (!content || !area) {
        alert("상세주소문구를 입력해주세요");
        return;
      }

      try {
        const url = await uploadPostImage(imageFile, location);
        console.log(url);
        const imageUrl: string[] = url;

        if (content && imageUrl && userInfo.id) {
          alert("success");
          postPost(imageUrl, content, postAreaId, area, userInfo.id);
          closeModal();
        }
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  const handleInputText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputCount(e.target.value.length);
  };

  return (
    <>
      <MenuItem onClick={onModal}>{editMode ? "수정" : "글쓰기"}</MenuItem>

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
            <Profile
              src={userInfo.imageUrl ? userInfo.imageUrl : ""}
              alt="image"
            />
            <select className="location" ref={selectLocation}>
              {locations
                ? locations.map((location, index) => (
                    <option key={index} value={location.id}>
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
            <AddButton onClick={handleImageButton}> + </AddButton>
            {images && images?.length !== 0 ? <Slide image={images} /> : null}
            <HiddenInput
              type="file"
              multiple
              accept="image/*"
              ref={inputRef}
              onChange={handleOnChange}
            />
          </ContentImg>
          <AddressBox>
            <Address
              placeholder="상세 주소"
              className="address"
              ref={inputAddress}
            />
          </AddressBox>
          <Content>
            <Text
              rows={4}
              placeholder="문구를 입력해주세요."
              className="content"
              maxLength={200}
              onChange={handleInputText}
              ref={inputContent}
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
