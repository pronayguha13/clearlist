import { useLocation, useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import { type NavType } from "../../../../types";
import style from "./style.module.css";

const NavItem = ({ label, route }: NavType) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSelected = route === location.pathname;

  const getIconByLabel = () => {
    switch (label) {
      case "Dashboard":
        return "material-symbols:dashboard";
      case "Vital Tasks":
        return "humbleicons:exclamation";
      case "My Tasks":
      default:
        return "bx:task";
    }
  };

  const onMenuItemClick = () => {
    !isSelected && navigate(route);
  };

  return (
    <div
      className={`${style.navitem_container} ${
        isSelected ? style.selected : ""
      }`}
      onClick={onMenuItemClick}
    >
      <Icon icon={getIconByLabel()} width="24" height="24" />
      <p>{label}</p>
    </div>
  );
};

export default NavItem;
