import { useLocation } from "react-router";
import style from "./style.module.css";
import { NAV_MENU_ITEMS } from "../../types";
import { Icon } from "@iconify/react";
import SearchInput from "../../components/SearchInput";

const HeaderContainer = () => {
  const location = useLocation();

  const getFormattedTitle = () => {
    const strippedTitle = title.split(" ");

    if (strippedTitle.length > 1) {
      //multi word case
      return (
        <span>
          <span className={style.firstPart}>{strippedTitle[0]}</span>
          <span className={style.secondPart}>-{strippedTitle[1]}</span>
        </span>
      );
    } else {
      const middelIndex = strippedTitle[0].length / 2;

      const firstWord = strippedTitle[0].slice(0, middelIndex);
      const secondWord = strippedTitle[0].slice(middelIndex);

      return (
        <span>
          <span className={style.firstPart}>{firstWord}</span>
          <span className={style.secondPart}>{secondWord}</span>
        </span>
      );
    }
  };

  const title =
    NAV_MENU_ITEMS.filter((item) => item.route === location.pathname)[0]
      ?.label ?? "To Do";

  return (
    <div className={style.container}>
      <h1 className={style.title}>{getFormattedTitle()}</h1>
      <div className={style.search_container}>
        <SearchInput />
      </div>
      <div className={style.extra_icon_container}>
        <div className={style.left}>
          <button>
            <Icon icon="iconamoon:notification" width="24" height="24" />
          </button>
          <button>
            <Icon icon="lsicon:calendar-outline" width="24" height="24" />
          </button>
        </div>
        <div className={style.todays_date}>
          <p>Today</p>
          <p>{new Date().toLocaleDateString("en-GB")}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderContainer;
