import axios from "axios";
import { useState, useRef } from "react";
import Button from "./UI/Button";

function CreateUser() {
  const [formData, setFormData] = useState({});

  const inputRefs = useRef({});

  // POST function to create new user with input values
  const createNewUser = async (userData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/users", userData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handling input value change
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handling button "Create User" function. First creating new user, then setting input value to ""
  const handleCreateUser = () => {
    createNewUser(formData)
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
      <div className="page_button-container">
        <Button tag="Create account" onClick={handleCreateUser} />
        <Button tag="Log In" />
      </div>
    </div>
  );
}

export default CreateUser;
