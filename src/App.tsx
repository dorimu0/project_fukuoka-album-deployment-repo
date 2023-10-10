import { useJsApiLoader } from "@react-google-maps/api";
import Modal from "react-modal";
import Router from "./Router";
import "./fonts/font.css";
import Layout from "./components/layout";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store";

Modal.setAppElement("#root");
const persistor = persistStore(store);

function App(): JSX.Element {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY}`,
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Layout>{isLoaded ? <Router /> : <div>Loading...</div>}</Layout>
      </PersistGate>
    </Provider>
  );
}
export default App;
