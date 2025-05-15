import { useRef, type CSSProperties } from "react";
import type { ITODO } from "../../types";
import style from "./style.module.css";
import dummyImage from "../../assets/pexels-1173285862-32039255.webp";

type SmallCardProps = {
  todo: ITODO;
};
const SmallCard = ({ todo }: SmallCardProps) => {
  const inputBtnRef = useRef(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return {
          color: "var(--color-status-completed)",
        };
      case "In Progress":
        return {
          color: "var(--color-status-in-progress)",
        };
      default:
        return {
          color: "var(--color-status-not-started)",
        };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Extreme":
        return {
          color: "var(--color-status-not-started)",
        };
      case "Moderate":
        return {
          color: "var(--color-status-in-progress)",
        };
      default:
        return {
          color: "var(--color-status-completed)",
        };
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.three_dot}>
          <div className={style.dot}></div>
          <div className={style.dot}></div>
          <div className={style.dot}></div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.radiobtn_container}>
          <div className={style.mock_radioinput}></div>
          <input type="radio" ref={inputBtnRef} />
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
            {todo.priority ?? "Low"}
          </p>
        </span>
        <span className={style.status}>
          Status:{" "}
          <p style={getStatusColor(todo.status) as CSSProperties}>
            {todo.status ?? "Not started"}
          </p>
        </span>
        <span>Created on: {new Date().toDateString()}</span>
      </div>
    </div>
  );
};

export default SmallCard;
