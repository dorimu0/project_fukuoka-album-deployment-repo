import Router from "./Router";
import "./fonts/font.css";
import Layout from "./components/layout";

function App(): JSX.Element {
  return (
    <Layout>
      <Router />
    </Layout>
  );
}

export default App;
