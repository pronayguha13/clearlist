import { useRef, type CSSProperties, type MouseEvent } from "react";
import { type ITODO, getPriorityColor, getStatusColor } from "../../types";
import style from "./style.module.css";
import dummyImage from "../../assets/pexels-1173285862-32039255.webp";
import { getPriority, getStatus } from "../../types/Todo";

type SmallCardProps = {
  todo: ITODO;
  onClick?: (todo: ITODO) => void;
};
const SmallCard = ({ todo, onClick }: SmallCardProps) => {
  const inputBtnRef = useRef(null);

  const onSmallCardClick = (event: MouseEvent) => {
    const composedPathEl = Array.from(event.nativeEvent.composedPath());
    if (
      !composedPathEl.find(
        (el) => (el as HTMLElement).id === "radio-input-container"
      ) &&
      onClick
    ) {
      onClick(todo);
    }
  };

  return (
    <div className={style.wrapper} onClick={onSmallCardClick}>
      <div className={style.header}>
        <div className={style.three_dot}>
          <div className={style.dot}></div>
          <div className={style.dot}></div>
          <div className={style.dot}></div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.radiobtn_container}>
          <div id="radio-input-container" className={style.mock_radioinput}>
            <input type="radio" ref={inputBtnRef} />
          </div>
        </div>
        <div className={style.center_content}>
          <h3 className={style.title}>{todo.title}</h3>
          <span className={style.description}>{todo.description}</span>
        </div>
        <img src={dummyImage} alt="" />
      </div>
      <div className={style.footer}>
        <span className={style.priority}>
          Priority:{" "}
          <p style={getPriorityColor(todo.priority) as CSSProperties}>
            {getPriority(todo.priority) ?? "Low"}
          </p>
        </span>
        <span className={style.status}>
          Status:{" "}
          <p style={getStatusColor(todo.status) as CSSProperties}>
            {getStatus(todo.status) ?? "Not started"}
          </p>
        </span>
        <span>Created on: {new Date().toLocaleDateString("en-GB")}</span>
      </div>
    </div>
  );
};

export default SmallCard;
