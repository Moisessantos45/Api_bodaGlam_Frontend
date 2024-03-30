import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

const Layout = (): JSX.Element => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
