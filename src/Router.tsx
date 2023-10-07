import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages";
import MyPage from "./pages/mypage";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default Router;
