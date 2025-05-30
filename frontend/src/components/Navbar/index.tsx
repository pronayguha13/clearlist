import { Fragment } from "react/jsx-runtime";
import style from "./style.module.css";
import UserAvatar from "../../assets/user-avatar.jpg";
import { NAV_MENU_ITEMS } from "../../types";
import NavItem from "./components/NavItem";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/api";
const Navbar = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile
  })
  return (
    <div className={style.container}>
      <div className={style.user_info}>
        {isLoading ? <p> Loading....</p> : <Fragment>
          <img className={style.user_image} src={UserAvatar} alt="avatar" />
          <h3 className={style.user_name}> {data.username}</h3>
          <p className={style.user_email}>{data.email}</p>
        </Fragment>}

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
