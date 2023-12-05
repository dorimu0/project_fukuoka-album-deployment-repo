import { ChangeEvent, useEffect, useState } from "react";
import { Button, InputText } from "./IntroStyles";
import {
  getIntro,
  postIntro,
  deleteIntro,
  updateIntro,
} from "../../services/intro.service";

export default function ShowUp() {
  const [intro, setIntro] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    getIntro().then((data) => {
      if (data) setIntro(data.intro);
    });
  }, [intro]);

  const handleAddIntro = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePostData = () => {
    postIntro(inputValue).then((data) => {
      if (data) setIntro(data.intro);
    });
    setInputValue("");
    setEditMode(false);
  };

  const handleUpdateData = () => {
    updateIntro(inputValue).then((data) => {
      if (data) setIntro(data.intro);
    });
    setEditMode(false);
  };

  const handleEditData = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      {intro ? (
        <>
          {editMode ? (
            <>
              <InputText
                type="text"
                value={inputValue}
                onChange={handleEditData}
              />
              <Button onClick={handleUpdateData}>저장</Button>
            </>
          ) : (
            <>
              <h2>"{intro}"</h2>
              <Button
                onClick={() => {
                  setEditMode(true);
                  setInputValue(intro);
                }}
              >
                수정
              </Button>
              <Button
                onClick={() => {
                  deleteIntro().then((data) => setIntro(""));
                }}
              >
                삭제
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          <InputText
            onChange={handleAddIntro}
            placeholder="현지학기제에 소개해주세요"
          />
          <Button onClick={handlePostData}>저장</Button>
        </>
      )}
    </>
  );
}
