import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./pages";
import MyPage from "./pages/mypage";
import { verify } from "./services/auth.service";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default Router;
