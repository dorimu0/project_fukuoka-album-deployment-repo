import React, { useRef, useState } from "react";
import styled from "styled-components";          

const Header = () => {
  const [ view, setView ] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement | null>(null);

  window.addEventListener('mousedown', (event : MouseEvent) => {
    const clickElement = event.target as HTMLElement
    const container = containerRef.current
    if(container && view && !container.contains(clickElement) )
      setView(!view)
  })

  return (
      <Container>
        <LogoBox>
          <Logo src="/logo.svg" alt="" />
        </LogoBox>
        <IconBox ref={containerRef}>
          <IconButton  onClick={() => { setView(!view) }}>
            <Icon src="/menu.svg" alt="" />
          </IconButton>
          { view ? 
            <Menu>
              <MenuItem>로그인</MenuItem>
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
  width: 80px;
  padding: 10px;
  &:hover {
    background-color: rgb(200, 200, 200)
  }
`

export default Header