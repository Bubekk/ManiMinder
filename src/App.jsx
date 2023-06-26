import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";
import Login from "./components/LoginUser/Login";
import CreateUser from "./components/CreateUser/CreateUser";
import UserPage from "./components/UserPage/UserPage";
import UserProfile from "./components/UserPage/Profile/UserProfile";
import UserSettings from "./components/UserPage/Settings/UserSettings";

function App() {
  // POST function to create new user with input values
  const createNewUser = async (userData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/users", userData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // State for response user id for showing valid user page, checking if userId is set on logged userId
  const [userId, setUserId] = useState(() => {
    const storedUser = sessionStorage.getItem("userId");
    return storedUser ? storedUser : "";
  });

  // State for invalid login credentials which is viewed after wrong login or password
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  // Login function which post userCredentials and gets user id to show user page
  const loginUser = async (userCredentials) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/users/login", userCredentials);
      setUserId(response.data.user_id);
      sessionStorage.setItem("userId", response.data.user_id);
      sessionStorage.setItem("userLogin", response.data.user_login);
      console.log(response.data);
      setLoginError(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userId");
    if (loginError === undefined && userId !== "") {
      setUserId(storedUser);
      navigate(`/${storedUser}`);

      //I don't like it that I used autorefresh on login, but if i haven't button in userPage dont work properly :(
      window.location.reload(false);
    }
  }, [loginError, navigate, userId]);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login loginUser={loginUser} loginError={loginError} userId={userId} />}></Route>
        <Route path="/signup" element={<CreateUser createNewUser={createNewUser} />}></Route>
        <Route path="/:userId" element={<UserPage navigate={navigate} />}>
          <Route path="profile" element={<UserProfile />}></Route>
          <Route path="settings" element={<UserSettings />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
