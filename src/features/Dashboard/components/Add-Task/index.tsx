import { Fragment, useState } from "react";
import Modal from "../../../../components/Modal";

import style from "./style.module.css";
import CheckBoxInput from "./CheckBoxInput";
import { useTodoContext } from "../../../../context";

type AddTaskProps = {
  onClose: () => void;
};
type Priority = "Extreme" | "Moderate" | "Low";

type FormState = {
  title: string;
  creationDate: string;
  priority: null | Priority;
  description: string;
};

const AddTask = ({ onClose }: AddTaskProps) => {
  const { create } = useTodoContext();
  const [formData, setFormData] = useState<FormState>({
    title: "",
    creationDate: new Date().toDateString(),
    priority: null,
    description: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleTaskCreation = async () => {
    setIsLoading(true);
    console.log("Clicked on done button", formData);
    try {
      const response = await create({
        title: formData.title,
        description: formData.description,
        priority: formData.priority ?? "Low",
        createdAt: formData.creationDate,
        isComplete: false,
        status: "Not started",
      });
      if (response) {
        window.alert("Successfully added a new todo to the list");
        onClose();
      }
    } catch (error) {
      console.error("Error while creating task", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormField = <K extends keyof FormState>(
    fieldName: K,
    value: FormState[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  const updatePriority = (priority: string, state: boolean) => {
    updateFormField("priority", state ? (priority as Priority) : null);
  };

  return (
    <Fragment>
      <Modal
        title="Add Task"
        onClose={onClose}
        footerEl={
          <div className={style.footer}>
            <button
              onClick={handleTaskCreation}
              disabled={isLoading || !formData.title.length}
            >
              {isLoading ? "Pending" : "Done"}
            </button>
          </div>
        }
      >
        <div className={style.form}>
          <div className={style.form_field}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter your task title"
              value={formData.title}
              onChange={(event) =>
                updateFormField("title", event?.target.value)
              }
            />
          </div>
          <div className={style.form_field}>
            <label htmlFor="creationDate">Date</label>
            <input
              type="date"
              name="creationDate"
              id="creationDate"
              placeholder="Enter your due date"
              value={
                new Date(formData.creationDate).toISOString().split("T")[0]
              }
              onChange={(event) =>
                updateFormField("creationDate", event.target.value)
              }
            />
          </div>
          <div className={style.form_field}>
            <label htmlFor="priority">Priority</label>
            <div className={style.checkboxes}>
              {["Extreme", "Moderate", "Low"].map((priority, index) => (
                <CheckBoxInput
                  key={index}
                  priority={priority}
                  selected={
                    formData.priority ? priority === formData.priority : false
                  }
                  onChange={(checked) => updatePriority(priority, checked)}
                />
              ))}
            </div>
          </div>
          <div className={style.form_field} style={{ flex: 1 }}>
            <label htmlFor="description">Title</label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={(event) =>
                updateFormField("description", event.target.value)
              }
            />
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default AddTask;
