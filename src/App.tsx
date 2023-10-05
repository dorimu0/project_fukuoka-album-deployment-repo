import React from "react";
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import Album from "./components/Album/Album";
import Footer from "./Layout/Footer";
// import Profile from "./components/Profile/Profile";
// import { Routes, Route, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header />
      <Map />
      {/* <Profile /> */}
      <hr />
      <Footer />
    </div>
  );
}

export default App;
