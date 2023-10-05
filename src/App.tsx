import React from "react";
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import './fonts/font.css'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Header />
      <Map />

      <Routes>
        {/* <Route index element={<HomePage />} />  HomePage컴포넌트 -> album컴포넌트 수정 필요 나머진 알아서하세요  */}
      </Routes>

    </div>
  );
}

export default App;
