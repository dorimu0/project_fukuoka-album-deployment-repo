import React from "react";
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import Footer from "./Layout/Footer";
// import Profile from "./components/Profile/Profile";
import './fonts/font.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Album from "./components/Album/Album";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Map />}/>
          <Route path="/album" element={<Album />} />
        </Routes>
        <hr />
        <Footer />
        {/* <Router index element={<HomePage />} />  HomePage컴포넌트 -> album컴포넌트 수정 필요 나머진 알아서하세요  */}
      </Router>

    </div>
  );
}

export default App;
