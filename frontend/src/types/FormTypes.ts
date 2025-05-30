export const FormFields = Object.freeze({
  Text: "Text",
  Password: "Password",
  Email: "Email"
})

export type FormFieldType = keyof typeof FormFields;

export type IFormField = {
  name: string;
  label?: string; //if label is not provided then name will be used and vice versa
  value: string | number;
  type: FormFieldType;
  isRequired: boolean;
  isValid: boolean;
  errorMessage?: string;
  onChange: (value: string) => void;
}

export type IForm = {
  formFields: IFormField[];
  title: string;
  headerButtonText: string;
  onHeaderButtonClick: () => void;
  onSubmit: () => void;
}
