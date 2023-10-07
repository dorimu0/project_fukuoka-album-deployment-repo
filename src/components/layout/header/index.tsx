import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  LogoBox,
  Logo,
  IconBox,
  IconButton,
  Icon,
  Menu,
  MenuItem,
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

  return (
    <Container>
      <LogoBox onClick={() => navigate("/")}>
        <Logo src="/logo.svg" alt="" />
      </LogoBox>
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
            <MenuItem
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
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
