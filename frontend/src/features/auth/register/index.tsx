import { useState, useMemo } from "react";
import Form from "../../../components/Form"
import { FormFields } from "../../../types/FormTypes";
import useAuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router";
const Register = () => {
  const { register } = useAuthContext();
  const navigate = useNavigate()
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");



  const onClickLogin = () => navigate("/login")

  const handleRegister = () => {
    register({ username: username, password: password, email: email })
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
      {
        name: "email",
        label: "Email ID",
        type: FormFields.Email,
        value: email,
        isRequired: false,
        isValid: true,
        onChange: (updatedEmail: string) => setEmail(updatedEmail)

      }
    ]
  }, [username, password, email])

  return <Form
    title="Register"
    headerButtonText="Login"
    onHeaderButtonClick={onClickLogin}
    onSubmit={handleRegister}
    formFields={formFields}


  />;
};

export default Register;
