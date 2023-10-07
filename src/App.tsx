import React from "react";
import Modal from "react-modal";
import Router from "./Router";
import "./fonts/font.css";
import Layout from "./components/layout";

Modal.setAppElement("#root");

function App(): JSX.Element {
  return (
    <Layout>
      <Router />
    </Layout>
  );
}

export default App;
