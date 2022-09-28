import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  let navigate = useNavigate();

  const [loginState, setLoginState] = useState(fieldsState);
  const [errorState, setErrorState] = useState("");
  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email: loginState.email,
        password: loginState.password,
      })
      .then(function (response) {
        navigate("/");
      })
      .catch(function (error) {
        setErrorState(error.response.data.message);
      });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      {errorState.length !== 0 && (
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-medium">Failure</span> {errorState}
        </div>
      )}

      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
