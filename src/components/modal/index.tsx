import React, { useState } from "react";
import Modal from "react-modal";
import {
  ModalEdit,
  ButtonContainer,
  SaveBtn,
  CancelBtn,
  InputField,
  Label,
} from "./ModalStyles";
import { User } from "../../types/user.interface";
import { ModalType } from "../../types/modal.interface";
import { updateUser, uploadProfileImage } from "../../services/user.service";

export const DefaultModal = ({
  name: initialName,
  comment: initialComment,
  imgUrl,
  onUserUpdated,
}: ModalType & { onUserUpdated?: (user: User) => void }) => {
  const [name, setName] = useState(initialName);
  const [comment, setComment] = useState(initialComment);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(imgUrl);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openModal = () => {
    setName(initialName);
    setComment(initialComment);
    setImageUrl(imgUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const saveInfo = async () => {
    setIsLoading(true);

    try {
      let imageUrlToUpdate;
      if (selectedFile) {
        imageUrlToUpdate = await uploadProfileImage(selectedFile);
      }

      const updatedUser = await updateUser({
        id: "1", // TODO: 로그인 기능 구현 후, 로그인한 유저의 id로 변경
        name,
        comment,
        imageUrl: imageUrlToUpdate || imageUrl,
        isSignIn: true
      });

      if (onUserUpdated) {
        onUserUpdated(updatedUser);
      }

      alert("수정 완료!");
      closeModal();
    } catch (error) {
      console.error("Failed to update user", error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <ModalEdit onClick={openModal}>edit</ModalEdit>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          content: {
            top: "30%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "20px",
          },
        }}
      >
        <h2>프로필 수정</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveInfo();
          }}
          encType="multipart/form-data"
        >
          <Label htmlFor="profileImg">프로필 사진 등록/수정: </Label>
          <InputField
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={handleFileChange}
          />

          <br />

          <Label htmlFor="name">이름 수정: </Label>
          <InputField
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br />

          <Label htmlFor="comment">코멘트 수정: </Label>
          <InputField
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />

          <ButtonContainer>
            <CancelBtn onClick={closeModal}>close</CancelBtn>
            <SaveBtn disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </SaveBtn>
          </ButtonContainer>
        </form>
        <br />
      </Modal>
    </>
  );
};

export default DefaultModal;
