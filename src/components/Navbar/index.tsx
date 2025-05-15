import style from "./style.module.css";
import UserAvatar from "../../assets/user-avatar.jpg";
const Navbar = () => {
  return (
    <div className={style.container}>
        <img className={style.user_image} src={UserAvatar} alt="avatar" />
      <div className={style.user_info}>

      </div>
    </div>
  );
};

export default Navbar;
