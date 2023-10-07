import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import {
  Container,
  LogoBox,
  Logo,
  SearchBox,
  SearchImage,
  Search,
  IconBox,
  IconButton,
  Icon,
  Menu,
  MenuItem,
  FakeBox,
} from "./HeaderStyles";

const Header = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  window.addEventListener("mousedown", (event: MouseEvent) => {
    const clickElement = event.target as HTMLElement;
    const container = containerRef.current;
    if (container && view && !container.contains(clickElement)) setView(!view);
  });

  const handleSearchUpdate = (e : React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }

  return (
    <Container>
      <LogoBox onClick={() => navigate("/")}>
        <Logo src="/logo.svg" alt="" />
      </LogoBox>
      <SearchBox>
        <SearchImage src="./search.svg" />
        <Search type="text" onChange = { handleSearchUpdate }/>
      </SearchBox>
      <IconBox ref={containerRef}>
        <IconButton
          onClick={() => {
            setView(!view);
          }}
        >
          <Icon src="/menu.svg" alt="" />
        </IconButton>
        {view ? (
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
            <MenuItem
              onClick={() => {
                navigate("/mypage");
              }}
            >
              내정보
            </MenuItem>
          </Menu>
        ) : (
          ""
        )}
      </IconBox>
    </Container>
  );
};

export default Header;
