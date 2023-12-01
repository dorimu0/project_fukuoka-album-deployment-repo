import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "./HeaderStyles";
import { searchPosts } from "../../../services/post.service";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../services/auth.service";
import { clearPosts, setPosts } from "../../../store/search";
import Write from "../../write/";
import AuthModal from "../../modal/auth";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isSignIn = useSelector((state: RootState) => state.user.isSignIn); // 로그인 여부 (user만 사용해서 유저 정보를 원하는대로 이용 가능)
  const debounceTimeoutId = useRef<NodeJS.Timeout | null>(null);
  const modalOpen = useSelector((state: RootState) => state.modal.modalOpen);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const clickElement = event.target as HTMLElement;
      const container = containerRef.current;

      if (
        container &&
        view &&
        !container.contains(clickElement) &&
        !modalOpen
      ) {
        setView(!view);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [modalOpen, view]);

  const handleSearchUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (debounceTimeoutId.current !== null)
      clearTimeout(debounceTimeoutId.current);

    debounceTimeoutId.current = setTimeout(async () => {
      try {
        let results = await searchPosts(query);
        dispatch(setPosts(results));
      } catch (error) {
        console.log(error);
      }
    }, 200);

    console.log(e.target.value);
  };

  // 페이지 이동 시 검색 결과 초기화
  useEffect(() => {
    return () => {
      const clearSearchResults = () => dispatch(clearPosts());
      clearSearchResults();
    };
  }, [dispatch]);

  return (
    <>
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
            <Menu>
              {isSignIn ? (
                <>
                  <MenuItem
                    onClick={() => {
                      navigate("/intro");
                    }}
                  >
                    현지학기
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/team");
                    }}
                  >
                    팀원 소개
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/mypage");
                    }}
                  >
                    내 정보
                  </MenuItem>
                  <Write editMode={false} />
                  <MenuItem
                    onClick={() => {
                      const isSingOut =
                        window.confirm("로그아웃 하시겠습니까?");
                      if (!isSingOut) {
                        return;
                      }
                      signOut();
                    }}
                  >
                    로그아웃
                  </MenuItem>
                </>
              ) : (
                <MenuItem onClick={() => setIsAuthOpen(true)}>로그인</MenuItem>
              )}
            </Menu>
          ) : null}
        </IconBox>
      </Container>
      {isAuthOpen && (
        <AuthModal
          isModalOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
