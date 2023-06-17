import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import '../../styles/Pages/SignupPageStyle.scss';
import Button from "../UI/Button";

function CreateUser(props) {
  const [formData, setFormData] = useState({});

  const inputRefs = useRef({});

  // Handling input value change
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handling button "Create User" function. First creating new user, then setting input value to ""
  const handleCreateUser = () => {
    props.createNewUser(formData)
    Object.keys(inputRefs.current).forEach((name) => {
      inputRefs.current[name].value = "";
    });
    setFormData({})
  };

  const setInputRef = (name, inputRef) => {
    inputRefs.current[name] = inputRef;
  };

  return (
    <div className="page">
      <div className="page__signinbox">
        <input type="text" name="user_login" ref={(ref) => setInputRef("user_login", ref)} onChange={handleOnChange} placeholder="Login" />
        <input type="mail" name="user_email" ref={(ref) => setInputRef("user_email", ref)} onChange={handleOnChange} placeholder="Email" />
        <input
          type="password"
          name="user_password"
          ref={(ref) => setInputRef("user_password", ref)}
          onChange={handleOnChange}
          placeholder="Password"
        />
      </div>
      <div className="page__button-container">
        <Button tag="Create account" onClick={handleCreateUser} />
        <Link to="/"><Button tag="Log In" /></Link>
      </div>
    </div>
  );
}

export default CreateUser;
