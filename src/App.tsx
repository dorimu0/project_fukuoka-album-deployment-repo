import React from "react";
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import './fonts/font.css'
// import { Routes, Route, Outlet } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Header />
      <Map />

    </div>
  );
}

export default App;
