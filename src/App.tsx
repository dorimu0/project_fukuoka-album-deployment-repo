import React from "react";
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import Album from "./components/Album/Album";
import Footer from "./Layout/Footer";
// import Profile from "./components/Profile/Profile";
import "./fonts/font.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/album" element={<Album />} />
        </Routes>
        <hr />
        <Footer />
      </Router>
    </div>
  );
}
export default App;
