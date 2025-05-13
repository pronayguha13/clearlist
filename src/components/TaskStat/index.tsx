import style from "./style.module.css";
import CircularProgressBar from "../CircularProgressBar";
import type { CSSProperties } from "react";

type StatComponentProps = {
  percentage: number;
  status: "Completed" | "In Progress" | "Not started";
};
const TaskStat = ({ percentage, status }: StatComponentProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "Completed":
        return {
          "--status-color": "var(--color-status-completed)",
        };
      case "In Progress":
        return {
          "--status-color": "var(--color-status-in-progress)",
        };
      default:
        return {
          "--status-color": "var(--color-status-not-started)",
        };
    }
  };

  return (
    <div
      className={style.circle_container}
      style={getStatusColor() as CSSProperties}
    >
      <CircularProgressBar
        percentage={Math.round(
          percentage / 2 + Math.round(Math.random() * 100) / 2
        )}
        progressColor={getStatusColor()["--status-color"]}
      />
      <span className={style.status_infocontainer}>
        <div className={style.status_icon}>&nbsp;</div>
        <p className={style.status_text}>{status}</p>
      </span>
    </div>
  );
};

export default TaskStat;
