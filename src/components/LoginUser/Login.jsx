import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Pages/LoginPageStyle.scss";
import Button from "../UI/Button";

function Login(props) {
  const [formData, setFormData] = useState({});

  // Handling login input change to set is value an email or login and setting it in formData
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

  // Handling password input change and setting it in formData
  const handlePasswordOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginUser = () => {
    // console.log(formData);
    props.loginUser(formData);
  };

  return (
    <div className="page">
      <p> {props.loginError} </p>
      <div className="page__loginbox">
        <input type="text" onChange={handleLoginOnChange} placeholder="Login / email" />
        <input type="password" name="user_password" onChange={handlePasswordOnChange} placeholder="Password" />
      </div>
      <div className="page__button-container">
        <Link to="/signup">
          <Button tag="Sign in" />
        </Link>
        <Button tag="Log In" onClick={handleLoginUser} />
      </div>
    </div>
  );
}

export default Login;
