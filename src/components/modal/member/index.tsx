import React, { useState } from "react";
import Modal from "react-modal";
import {
  ModalEdit,
  ButtonContainer,
  SaveBtn,
  CancelBtn,
  InputField,
  Label,
} from "../ModalStyles";
import { Member } from "../../../types/member.interface";
import {
  deleteMember,
  updateMember,
  uploadProfileImage,
} from "../../../services/member.service";

export const MemberModal = ({
  member,
  setMembers,
  onMemberUpdated,
  setCurrentIndex,
}: {
  member: Member;
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  onMemberUpdated?: (member: Member) => void;
  setCurrentIndex: (index: number) => void;
}) => {
  const [name, setName] = useState(member.name);
  const [position, setPosition] = useState(member.position);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(member.imageUrl);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openModal = () => {
    setName(member.name);
    setPosition(member.position);
    setImageUrl(member.imageUrl);
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
      let imageUrlToUpdate = imageUrl;
      if (selectedFile) {
        imageUrlToUpdate = await uploadProfileImage(selectedFile);
      }
      const updatedMember = await updateMember({
        ...member,
        name,
        position,
        imageUrl: imageUrlToUpdate,
      });
      if (!updatedMember) {
        return;
      }
      if (onMemberUpdated) {
        onMemberUpdated(updatedMember);
      }
      window.alert("수정 완료!");
      closeModal();
    } catch (error) {
      console.error("Failed to update user", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <ModalEdit onClick={openModal}>edit</ModalEdit>
      <ModalEdit> </ModalEdit>
      <ModalEdit
        onClick={async () => {
          const deleteSuccess = await deleteMember(member);
          if (deleteSuccess) {
            setMembers((prevMembers) =>
              prevMembers.filter((m) => m.id !== member.id)
            );
            window.alert("삭제 완료!");
            setCurrentIndex(0);
          }
        }}
      >
        delete
      </ModalEdit>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: "999",
          },
          content: {
            top: "30%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            zIndex: "10",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "20px",
          },
        }}
      >
        <h2>멤버 정보 수정</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveInfo();
          }}
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

          <Label htmlFor="position">포지션 수정: </Label>
          <InputField
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <br />

          <ButtonContainer>
            <CancelBtn onClick={closeModal}>close</CancelBtn>
            <SaveBtn disabled={isLoading} type="submit">
              {isLoading ? "Saving..." : "Save"}
            </SaveBtn>
          </ButtonContainer>
        </form>
        <br />
      </Modal>
    </>
  );
};

export default MemberModal;
