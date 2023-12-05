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
import { createMember } from "../../../services/member.service";

interface AddMemberModalProps {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  isOpen: boolean;
  onRequestClose: () => void;
}

export const AddMemberModal = ({
  members,
  setMembers,
  isOpen,
  onRequestClose,
}: AddMemberModalProps) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const saveInfo = async () => {
    setIsLoading(true);
    try {
      const createdMember = await createMember({
        name: name.trim(),
        position: position.trim(),
      });

      if (!createdMember) {
        return;
      }

      setMembers([...members, createdMember]);
      window.alert("멤버 추가 완료!");
      onRequestClose();
    } catch (error) {
      console.error("Failed to create member", error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
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
        <h2>멤버 정보 등록</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveInfo();
          }}
        >
          <Label htmlFor="name">이름: </Label>
          <InputField
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br />

          <Label htmlFor="position">포지션: </Label>
          <InputField
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

          <br />

          <ButtonContainer>
            <CancelBtn onClick={onRequestClose}>close</CancelBtn>
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

export default AddMemberModal;
