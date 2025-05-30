import type React from "react";
import { type IForm } from "../../types/FormTypes";
import style from "./style.module.css";
type FormProps = IForm;


const Form = ({ title, headerButtonText, onHeaderButtonClick, formFields, onSubmit }: FormProps) => {
  const getFormBody = () => {
    return formFields.map((field, index) => {
      const { name, label, type, value, onChange, isRequired, isValid, errorMessage } = field;
      return (
        <div key={index} className={style.form_field}>
          <label className={style.form_label}>
            {label ?? name}
            {isRequired ? "*" : null}
          </label>
          <input type={type.toLowerCase()} value={value} onChange={(event: React.ChangeEvent) => onChange((event.target as HTMLInputElement).value)} />
          {!isValid && errorMessage ? <p className={style.error_message}> {field.errorMessage} </p> : null}
        </div>
      )
    })
  }
  return (<div className={style.container}>
    <div className={style.card}>
      <div className={style.header}>
        <h3 className={style.title}>
          {title}
        </h3>
        <button className={style.header_button} onClick={onHeaderButtonClick}>{headerButtonText}</button>
      </div>
      <div className={style.form_body}>
        {getFormBody()}
      </div>
      <button className={style.submit_button} onClick={onSubmit}>Submit</button>
    </div>
  </div>);
}

export default Form;
