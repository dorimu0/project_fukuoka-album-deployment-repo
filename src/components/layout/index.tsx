import type { IProps } from "../../types/common.interface";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";

const Layout = ({ children }: IProps) => {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <Body>{children}</Body>
        <Footer />
      </div>
    </Router>
  );
};

export default Layout;
