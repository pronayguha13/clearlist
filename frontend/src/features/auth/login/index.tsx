import { useState, useMemo } from "react";
import Form from "../../../components/Form"
import { FormFields } from "../../../types/FormTypes";
import useAuthContext from "../../../context/AuthContext";
const Login = () => {
  const { login } = useAuthContext();
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //  const [email, setEmail] = useState<string>("");



  const onClickRegister = () => console.log("Clicked on register")

  const handleLogin = () => {
    console.log("Submit button clicked");

    console.group("Form Data")
    console.info("User name : ", username);
    console.info("Password : ", password);
    console.groupEnd()

    login({ username: username, password: password })
  }

  const formFields = useMemo(() => {
    return [
      {
        name: "username",
        label: "User Name",
        type: FormFields.Text,
        value: username,
        onChange: (updatedValue: string) => setUserName(updatedValue),
        isRequired: true,
        isValid: true,
      },
      {
        name: "password",
        label: "Password",
        type: FormFields.Password,
        value: password,
        isRequired: true,
        isValid: true,
        onChange: (updatedPassword: string) => setPassword(updatedPassword)
      },
      /*{
        name: "email",
        label: "Email ID",
        type: FormFields.Email,
        value: email,
        isRequired: false,
        isValid: true,
        onChange: (updatedEmail: string) => setEmail(updatedEmail)

      }*/
    ]
  }, [username, password])

  return <Form
    title="Login"
    headerButtonText="Register"
    onHeaderButtonClick={onClickRegister}
    onSubmit={handleLogin}
    formFields={formFields}


  />;
};

export default Login;
