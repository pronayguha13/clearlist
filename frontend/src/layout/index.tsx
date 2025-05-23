import Navbar from "../components/Navbar";
import HeaderContainer from "./HeaderContainer";
import style from "./style.module.css";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className={style.wrapper}>
      <HeaderContainer />
      <div className={style.body}>
        <div className={style.left}>
          <Navbar />
        </div>
        <div className={style.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
