import { Fragment, useEffect, useState } from "react";
import Modal from "../../../../components/Modal";

import style from "./style.module.css";
import CheckBoxInput from "./CheckBoxInput";
import { PRIORITY_CHOICES } from "../../../../types";
import type { UseMutateFunction } from "@tanstack/react-query";
import { getPriorityValue, type PriorityValue } from "../../../../types/Todo";

type AddTaskProps = {
  onCreate: UseMutateFunction<unknown, Error, unknown, unknown>;
  onClose: () => void;
  isPending: boolean;
  isSuccess: boolean
};


type FormState = {
  title: string;
  dueDate: string;
  priority: null | PriorityValue;
  description: string;
};

const AddTask = ({ onCreate, onClose, isPending, isSuccess = false }: AddTaskProps) => {
  const [formData, setFormData] = useState<FormState>({
    title: "",
    dueDate: new Date().toISOString().split("T")[0],
    priority: null,
    description: "",
  });

  const handleTaskCreation = () => {
    const newTODOPayload = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority ?? PRIORITY_CHOICES.LOW,
      dueDate: formData.dueDate,
    };

    onCreate(newTODOPayload);
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
  const updatePriority = (priority: number, state: boolean) => {
    updateFormField("priority", state ? getPriorityValue(priority) : null);
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
              disabled={isPending || !formData.title.length}
            >
              {isPending ? "Pending" : isSuccess ? "Done" : "Create"}
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
            <label htmlFor="dueDate">Date</label>
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              placeholder="Enter your due date"
              value={
                formData.dueDate
              }
              onChange={(event) =>
                updateFormField("dueDate", new Date(event.target.value).toISOString().split("T")[0])
              }
            />
          </div>
          <div className={style.form_field}>
            <label htmlFor="priority">Priority</label>
            <div className={style.checkboxes}>
              {Object.entries(PRIORITY_CHOICES).map((priority, index) => (
                <CheckBoxInput
                  key={index}
                  priority={priority[0]}
                  selected={
                    formData.priority ? getPriorityValue(priority[1]) === formData.priority : false
                  }
                  onChange={(checked) => updatePriority(priority[1], checked)}
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
