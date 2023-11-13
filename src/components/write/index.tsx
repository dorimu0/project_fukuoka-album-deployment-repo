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
  LocationSelect,
} from "./writeStyles";
import { MenuItem } from "../layout/header/HeaderStyles";
import { PostMenuItem } from "../post/modal/ModalStyles";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  uploadPostImage,
  getAllLocation,
  postPost,
  getEditPost,
  uploadEditPost,
} from "../../services/write.service";
import { Location } from "../../types/location.interface";
import Slide from "./slide";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../store/modal";
import { WriteProps } from "../../types/post.interface";
import { setPosts } from "../../store/search";

const Write = ({ editMode, postId }: WriteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]); // 이미지 미리보기
  const [imageFile, setImageFile] = useState<File[]>([]); // 이미지 파일
  const [content, setContent] = useState<string>(""); // 문구
  const [inputCount, setInputCount] = useState<number>(0); // 글자 수
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); // 모달 open 여부
  const [address, setAddress] = useState<string>("");
  const [area, setArea] = useState<string>(""); // 상세 주소
  const [locations, setLocations] = useState<Location[]>([]); // 지역들
  const [postAreaId, setPostAreaId] = useState<number>(1); // 지역Id
  const [location, setLocation] = useState<string>("후쿠오카시"); // 지역 이름
  const userInfo = useSelector((state: RootState) => state.user); // 현재 유저 정보
  const dispatch = useDispatch();

  useEffect(() => {
    let slLocation: Location[];
    getAllLocation().then((data) => {
      setLocations(data);
      slLocation = data;
    });
    if (editMode && postId) {
      getEditPost(postId).then((data) => {
        console.log(data);
        const removeWord = slLocation.find(
          (location) => location.id === data.postAreaId
        )?.area;
        console.log(removeWord);
        if (removeWord) {
          setLocation(removeWord);
        }
        setContent(data.content);
        setPostAreaId(data.postAreaId);
        setAddress(data.area.replace(`${removeWord} `, ""));
        setImages(data.image);
        setArea(data.area);
      });
    }
  }, []);

  // 값 불러오기
  const handleChangeLocation = (e: ChangeEvent<HTMLSelectElement>) => {
    setPostAreaId(Number(e.target.value));
    const locationName = e.target.options[e.target.selectedIndex]
      .textContent as string;
    setLocation(locationName);
  };

  const handleInputArea = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    console.log(area, location, address);
    setArea(`${location} ${address}`);
  }, [location, address]);

  const handleInputText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    setInputCount(content.length);
  }, [content]);

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

  // IMAGE
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

  // 게시글 생성
  const handleAddButton = async () => {
    if (imageFile.length === 0 && !editMode) {
      alert("이미지를 넣어주세요");
      return;
    } else if (!address) {
      alert("상세주소문구를 입력해주세요");
      return;
    } else if (!content) {
      alert("문구를 입력해주세요");
      return;
    }
    try {
      console.log(editMode);
      const url =
        editMode && imageFile.length === 0
          ? images
          : await uploadPostImage(imageFile, location);
      console.log(
        content,
        ",",
        url,
        ",",
        userInfo.id,
        ",",
        postAreaId,
        ",",
        area
      );
      if (content && url && userInfo.id && postAreaId && area) {
        alert("success");
        if (editMode && postId) {
          uploadEditPost(url, postAreaId, content, area, postId);
        } else {
          const newPost = await postPost(
            url,
            content,
            postAreaId,
            area,
            userInfo.id
          );
          dispatch(setPosts(newPost));
        }
        closeModal();
      } else {
        alert("값이 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return (
    <>
      {editMode ? (
        <PostMenuItem onClick={onModal}>수정</PostMenuItem>
      ) : (
        <MenuItem onClick={onModal}>글쓰기</MenuItem>
      )}

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
            zIndex: "1500",
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
            <LocationSelect
              className="location"
              onChange={handleChangeLocation}
              value={postAreaId}
            >
              {locations
                ? locations.map((location, index) => (
                    <option key={index} value={location.id}>
                      {location.area}
                    </option>
                  ))
                : ""}
            </LocationSelect>
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
              accept=".jpeg, .png, .jpg"
              ref={inputRef}
              onChange={handleOnChange}
            />
          </ContentImg>
          <AddressBox>
            <Address
              value={address}
              placeholder="상세 주소"
              className="address"
              onChange={handleInputArea}
            />
          </AddressBox>
          <Content>
            <Text
              value={content}
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
              <FinishButton onClick={handleAddButton}>
                {editMode ? "수정" : "생성"}
              </FinishButton>
            </EndBox>
          </Content>
        </Container>
      </Modal>
    </>
  );
};

export default Write;
