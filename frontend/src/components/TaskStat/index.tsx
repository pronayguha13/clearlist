import style from "./style.module.css";
import CircularProgressBar from "../CircularProgressBar";
import type { CSSProperties } from "react";
import { getStatusColor, STATUS_CHOICES } from "../../types";
import { formatter } from "../../utils";

type StatComponentProps = {
  percentage: number;
  status: string;
};
const TaskStat = ({ percentage, status }: StatComponentProps) => {
  const format = formatter()

  const getStatusValue = () => {
    return STATUS_CHOICES[status.toUpperCase() as keyof typeof STATUS_CHOICES] || STATUS_CHOICES.NOTSTARTED
  }

  return (
    <div
      className={style.circle_container}
      style={{ "--status-color": getStatusColor(getStatusValue()).color } as CSSProperties}
    >
      <CircularProgressBar
        percentage={Math.round(percentage)}
        progressColor={getStatusColor(getStatusValue()).color}
      />
      <span className={style.status_infocontainer}>
        <div className={style.status_icon}>&nbsp;</div>
        <p className={style.status_text}>{format(status)}</p>
      </span>
    </div>
  );
};

export default TaskStat;
