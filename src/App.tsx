import React from "react";
import Modal from "react-modal";
import Router from "./Router";
import "./fonts/font.css";
import Layout from "./components/layout";
import { Provider } from "react-redux"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import { store } from "./store"

Modal.setAppElement("#root");
const persistor = persistStore(store)

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout>
          <Router />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
export default App;
