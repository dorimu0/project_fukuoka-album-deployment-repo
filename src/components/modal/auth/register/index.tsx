import React, { useState } from "react";
import {
  ButtonContainer,
  SaveBtn,
  CancelBtn as SwitchBtn,
  Label,
} from "../../ModalStyles";
import { InputField } from "../ModalStyles";
import { checkId, register } from "../../../../services/auth.service";

interface RegisterContentProps {
  switchContent: () => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const RegisterContent: React.FC<RegisterContentProps> = ({
  switchContent,
  setError,
}) => {
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // 회원 가입
  const handleRegister = async () => {
    setError("");

    if (!name) {
      setError("이름을 입력하세요.");
      return;
    }

    if (!id) {
      setError("id를 입력하세요.");
      return;
    }

    if (!password) {
      setError("비밀번호를 입력하세요.");
      return;
    }

    const MIN_PASSWORD_LENGTH =
      Number(process.env.REACT_APP_MIN_PASSWORD_LENGTH) || 8;

    // 비밀번호 확인
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(
        `비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`
      );
      return;
    }

    // 아이디 중복
    const isAvailableId = await checkId(id);

    if (!isAvailableId) {
      setError("누군가가 사용중인 id 입니다.");
      return;
    }

    // 회원 가입
    register({ email: id, name, password });

    window.alert("회원가입 성공.");

    switchContent();
  };

  return (
    <>
      <h2>회원 가입</h2>

      <Label htmlFor="profileImg">닉네임</Label>
      <InputField
        type="text"
        placeholder="닉네임"
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

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
        <SwitchBtn onClick={switchContent}>회원이세요?</SwitchBtn>

        <SaveBtn onClick={handleRegister}>회원가입</SaveBtn>
      </ButtonContainer>
    </>
  );
};

export default RegisterContent;
