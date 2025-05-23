import { Icon } from "@iconify/react";
import style from "./style.module.css";
import DummyImage from "../../assets/pexels-1173285862-32039255.webp";
import type { ITODO } from "../../types";
import { Fragment, useState } from "react";

type TaskDetailsProps = {
  todo: [string, ITODO];
  showBackButton?: boolean;
  showEditPriorityButton?: boolean;
  onBack?: () => void;
  onDelete: (todo: [string, ITODO]) => void;
};

const TaskDetails = ({
  todo,
  showBackButton = false,
  showEditPriorityButton = false,
  onBack = () => {},
  onDelete,
}: TaskDetailsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleDelete = () => {
    setIsLoading(true);
    onDelete(todo);
    setIsLoading(false);
  };

  return (
    <div className={style.container}>
      {!isLoading ? (
        <Fragment>
          <div className={style.top}>
            <div className={style.left}>
              <img src={DummyImage} alt="" />
              <div className={style.task_info}>
                <h1>{todo[1].title}</h1>
                <p>Priority: {todo[1].priority}</p>
                <p>Status:{todo[1].status}</p>
                <pre>Created on : {new Date().toLocaleDateString("en-GB")}</pre>
              </div>
            </div>
            {showBackButton ? (
              <button className={style.go_back} onClick={onBack}>
                Go Back
              </button>
            ) : null}
          </div>
          <div className={style.body}>
            <span className={style.description}>{todo[1].description}</span>
          </div>
          <div className={style.controls}>
            <button>
              <Icon
                icon="ic:baseline-delete"
                width="32"
                height="32"
                style={{ color: "var(--color-background)" }}
                onClick={handleDelete}
              />
            </button>
            <button>
              <Icon
                icon="mingcute:edit-fill"
                width="32"
                height="32"
                style={{ color: "var(--color-background)" }}
              />
            </button>
            {showEditPriorityButton ? (
              <button>
                <Icon
                  icon="humbleicons:exclamation"
                  width="32px"
                  height="32px"
                  style={{ color: "var(--color-background)" }}
                />
              </button>
            ) : null}
          </div>
        </Fragment>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};

export default TaskDetails;
