import React, { useState } from "react";
import {
  ButtonContainer,
  SaveBtn,
  CancelBtn as SwitchBtn,
  Label,
} from "../../ModalStyles";
import { InputField } from "../ModalStyles";
import { logIn } from "../../../../services/auth.service";

interface LogInContentProps {
  onClose: () => void;
  switchContent: () => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const LogInContent: React.FC<LogInContentProps> = ({
  onClose,
  setError,
  switchContent,
}) => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    setError("");

    if (!id) {
      setError("id를 입력하세요.");
      return;
    }

    if (!password) {
      setError("비밀번호를 입력하세요.");
      return;
    }

    const logInResult = await logIn({ email: id, password });

    if (!logInResult) {
      setError("올바르지 않은 유저 정보입니다.");
      return;
    }

    window.alert("로그인 성공");

    onClose();
  };

  return (
    <>
      <h2>로그인</h2>

      <Label>아이디</Label>
      <InputField
        type="text"
        placeholder="아이디"
        defaultValue={id}
        onChange={(e) => setId(e.target.value)}
      />
      <br />

      <Label>비밀번호</Label>
      <InputField
        type="password"
        placeholder="비밀번호"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <ButtonContainer>
        <SwitchBtn onClick={switchContent}>회원 가입</SwitchBtn>

        <SaveBtn onClick={handleLogin}>로그인</SaveBtn>
      </ButtonContainer>
    </>
  );
};

export default LogInContent;
