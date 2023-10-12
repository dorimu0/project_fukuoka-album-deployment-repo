import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
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
import { RootState, store } from "../../../store";
import { signInByGoogle } from "../../../services/signIn.service";
import { useSelector } from "react-redux";
import { signOut } from "../../../services/auth.service";
import { clearUser } from "../../../store/user";
import { clearToken } from "../../../store/token";

const Header = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isSignIn = useSelector((state: RootState) => state.user.isSignIn); // 로그인 여부 (user만 사용해서 유저 정보를 원하는대로 이용 가능)

  window.addEventListener("mousedown", (event: MouseEvent) => {
    const clickElement = event.target as HTMLElement;
    const container = containerRef.current;
    if (container && view && !container.contains(clickElement)) setView(!view);
  });

  const handleSearchUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <Container>
      <LogoBox onClick={() => navigate("/")}>
        <Logo src="/logo.svg" alt="" />
      </LogoBox>
      <SearchBox>
        <SearchImage src="./search.svg" />
        <Search type="text" onChange={handleSearchUpdate} />
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
          <Menu
            onClick={() => setView(false)}
          >
            {isSignIn
              ?
              <>
                <MenuItem
                  onClick={() => {
                    navigate("/mypage");
                  }}
                >
                  내 정보
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/write");
                  }}
                >
                  글쓰기
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    store.dispatch(clearUser());
                    store.dispatch(clearToken());
                    const isSingOut = window.confirm("로그아웃 하시겠습니까?");
                    if (!isSingOut) {
                      return;
                    }
                    signOut();
                  }}
                >
                  로그아웃
                </MenuItem>
              </>
              : (
                <MenuItem>
                  로그인
                  <FakeBox>
                    <GoogleOAuthProvider
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
                    >
                      <GoogleLogin
                        type={"standard"}
                        size="medium"
                        onSuccess={async (res) => {
                          await signInByGoogle(res);
                        }}
                      />
                    </GoogleOAuthProvider>
                  </FakeBox>
                </MenuItem>
              )}
          </Menu>
        ) : null}
      </IconBox>
    </Container>
  );
};

export default Header;
