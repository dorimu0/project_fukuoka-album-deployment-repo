import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages";
import MyPage from "./pages/mypage";
import TeamPage from "./pages/teampage";
import IntroPage from "./pages/intropage";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/intro" element={<IntroPage />} />
    </Routes>
  );
};

export default Router;
