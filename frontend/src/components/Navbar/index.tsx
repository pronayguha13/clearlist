import style from "./style.module.css";
import UserAvatar from "../../assets/user-avatar.jpg";
import { NAV_MENU_ITEMS } from "../../types";
import NavItem from "./components/NavItem";
const Navbar = () => {
  return (
    <div className={style.container}>
      <div className={style.user_info}>
        <img className={style.user_image} src={UserAvatar} alt="avatar" />
        <h3 className={style.user_name}> Pronay Guha</h3>
        <p className={style.user_email}>pronayguha13@gmail.com</p>
      </div>
      <div className={style.nav_items_container}>
        {NAV_MENU_ITEMS.map((item, index) => (
          <NavItem key={index} label={item.label} route={item.route} />
        ))}
      </div>
    </div>
  );
};

export default Navbar;
