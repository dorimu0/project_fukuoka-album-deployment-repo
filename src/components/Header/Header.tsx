import React, { useRef, useState } from "react";
import styled from "styled-components";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'

const Header = () => {
  const [view, setView] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  window.addEventListener('mousedown', (event: MouseEvent) => {
    const clickElement = event.target as HTMLElement
    const container = containerRef.current
    if (container && view && !container.contains(clickElement))
      setView(!view)
  })

  return (
    <Container>
      <LogoBox>
        <Logo src="/logo.svg" alt="logo" />
      </LogoBox>
      <IconBox ref={containerRef}>
        <IconButton onClick={() => { setView(!view) }}>
          <Icon src="/menu.svg" alt="menu" />
        </IconButton>
        {view ?
          <Menu>
            <MenuItem>
              로그인
              <FakeBox>
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
                  <GoogleLogin
                    type={"standard"}
                    size="medium"
                    onSuccess={(res) => console.log(res)}
                  />
                </GoogleOAuthProvider>
              </FakeBox>
            </MenuItem>
            <MenuItem>내정보</MenuItem>
          </Menu>
          : ''}
      </IconBox>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  height: 120px;
`

const LogoBox = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);
`

const Logo = styled.img`
  width: 200px;
  height: 120px;
`

const IconBox = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0%, -50%);
  margin-right: 20px;
  text-align: center;
`

const IconButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`

const Icon = styled.img`
  width: 50px;
`

const Menu = styled.ul`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.2rem;
`

const MenuItem = styled.li`
  width: 90px;
  padding: 6px;
  cursor: pointer;
  &:hover {
    background-color: rgb(200, 200, 200);
  }
`
const FakeBox = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  overflow-x: hidden;
`
export default Header