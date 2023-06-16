import { useState } from "react";
import Button from "./UI/Button";

function Login() {
  const [formData, setFormData] = useState({});

  const handleLoginOnChange = (e) => {
    const userLogin = e.target.value;
    if (userLogin.includes("@")) {
      const { user_login, ...updatedData } = formData;
      setFormData({ ...updatedData, user_email: userLogin });
    } else {
      const { user_email, ...updatedData } = formData;
      setFormData({ ...updatedData, user_login: userLogin });
    }
  };

  const handlePasswordOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginUser = () => {
    console.log(formData);
  };

  return (
    <div className="page">
      <div className="page__loginbox">
        <input type="text" onChange={handleLoginOnChange} placeholder="Login / email" />
        <input type="password" name="user_password" onChange={handlePasswordOnChange} placeholder="Password" />
      </div>
      <div className="page_button-container">
        <Button tag="Sign in" />
        <Button tag="Log In" onClick={handleLoginUser} />
      </div>
    </div>
  );
}

export default Login;
