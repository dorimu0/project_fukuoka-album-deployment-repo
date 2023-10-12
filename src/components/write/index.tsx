import { useRef, useState } from "react"
import { Container, UserInfo, Profile, ContentImg, AddButton, Content, Text, HiddenInput, WriteContainer, FinishButton, PostImg, ButtonBox } from "./writeStyles"

const Write = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [Image, setImage] = useState<FileList>();
  const [content, setContent] = useState<string>('')

  const handleClickButton = () => {
    inputRef.current?.click()
  }

  const handleOnChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      setImage(e.target.files)
    }
  }

  const handleAddButton = () => {
    const inputContent = document.querySelector(".content") as HTMLTextAreaElement
    setContent(`${inputContent}`)

    if(content && Image) {
      // api 요청
      alert("success")
    } else if(!Image) {
      alert("이미지를 넣어주세요")
    } else {
      alert("문구를 입력해주세용")
    }
  }

  console.log(content)

  return (
    <WriteContainer>
      <Container>
        <UserInfo>
          <Profile src="./img/miku.jpeg" alt="image" />
          <span>doridori</span>
        </UserInfo>
        <ContentImg>
          { Image && Image?.length !== 0 ? 
            <PostImg src="./img/miku.jpeg" alt="" />
            :
            <>
              <AddButton onClick={handleClickButton}> + </AddButton>
              <HiddenInput type="file" multiple accept="image/*" ref={ inputRef } onChange={handleOnChange}/>
            </>
          }
        </ContentImg>
        <Content>
          <Text rows={5} placeholder="문구를 입력해주세요." className="content"></Text>
        </Content>
      </Container>
      <ButtonBox >
        <FinishButton onClick={handleAddButton}> 완료 </FinishButton>
      </ButtonBox>
    </WriteContainer>
  )
}

export default Write