import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./pages";
import MyPage from "./pages/mypage";
import { verify } from "./services/auth.service";
import WritePage from "./pages/write"

const Router: React.FC = () => {
  const location = useLocation();

  const isUser = async () => {
    await verify();
  };

  useEffect(() => {
    if (location.pathname === "/mypage") {
      isUser();
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/write" element={<WritePage />} />
    </Routes>
  );
};

export default Router;
