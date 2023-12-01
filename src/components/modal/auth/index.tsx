import React, { useState } from "react";
import Modal from "react-modal";
import { ErrorField, CloseBtn } from "./ModalStyles";
import LogInContent from "./logIn";
import RegisterContent from "./register";

interface AuthModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isModalOpen, onClose }) => {
  const [error, setError] = useState<string>("");
  const [onRegisterModalOpen, setOnRegisterModalOpen] =
    useState<boolean>(false);

  const switchContent = () => {
    setOnRegisterModalOpen(!onRegisterModalOpen);
    setError("");
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={onClose}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: "9999",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "20px",
            zIndex: "9999",
            width: "300px",
          },
        }}
      >
        <CloseBtn onClick={onClose}>X</CloseBtn>

        {onRegisterModalOpen ? (
          <RegisterContent switchContent={switchContent} setError={setError} />
        ) : (
          <LogInContent
            onClose={onClose}
            switchContent={switchContent}
            setError={setError}
          />
        )}
        {error && <ErrorField>{error}</ErrorField>}
      </Modal>
    </>
  );
};

export default AuthModal;
