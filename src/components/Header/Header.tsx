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

  const handleSearchUpdate = (e : React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  return (
    <Container>
      <LogoBox>
        <Logo src="/logo.svg" alt="" />
      </LogoBox>
      <SearchBox>
        <SearchImage src="./search.svg" />
        <Search type="text" onChange = { handleSearchUpdate }/>
      </SearchBox>
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
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0%, -50%);
  margin-right: 20px;
  text-align: center;
`

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translate(0, -50%);
  border: 1px solid black;
  border-radius: 20px;
  overflow: hidden;
`

const SearchImage = styled.img`
  width: 30px;
  padding-left: 5px;

`

const Search = styled.input`
  width: 150px;
  display: block;
  padding: 5px;
  border: none;
  outline: none;
  font-size: 1.2rem;
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