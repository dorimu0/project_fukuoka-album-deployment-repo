import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./pages";
import MyPage from "./pages/mypage";
import WritePage from "./pages/write";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/write" element={<WritePage />} />
    </Routes>
  );
};

export default Router;
