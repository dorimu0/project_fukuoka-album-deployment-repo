import type { IProps } from "../../types/common.interface";
import { BrowserRouter as Router } from "react-router-dom";
import Body from "./body";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }: IProps) => {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Body>{children}</Body>
      </div>
      <Footer />
    </Router>
  );
};

export default Layout;
