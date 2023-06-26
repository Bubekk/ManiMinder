import axios from "axios";
import "../../../styles/Pages/SettingsStyle.scss";
import Button from "../../UI/Button";
import { useEffect, useState } from "react";

function UserSettings() {
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [passwordData, setPasswordData] = useState({});
  const [emailData, setEmailData] = useState({});
  const [lang, setLang] = useState(sessionStorage.getItem("userSettings_lang"));
  const [theme, setTheme] = useState(sessionStorage.getItem("userSettings_theme"));

  const handlePassChange = async (e) => {
    e.preventDefault();
    if (passwordData.new_password === passwordData.confirm_new_password) {
      try {
        const response = await axios.post("http://127.0.0.1:5000/api/users/update_credentials", {
          user_id: userId,
          old_password: passwordData.old_password,
          new_password: passwordData.new_password,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("wrong password");
    }
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/users/update_credentials", {
        user_id: userId,
        old_email: emailData.old_email,
        new_email: emailData.new_email
      })
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  };

  const handleLangSwitch = async (e) => {
    const selectedLang = e.target.value;
    setLang(selectedLang);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/users/update_settings", {
        user_id: userId,
        lang: selectedLang,
      });
      sessionStorage.setItem("userSettings_lang", selectedLang);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleThemeSwitch = async (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/users/update_settings", {
        user_id: userId,
        theme: selectedTheme,
      });
      sessionStorage.setItem("userSettings_theme", selectedTheme);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="usersettings">
      <div className="usersettings__formdiv">
        <h3>Change your password</h3>
        <form className="usersettings__formdiv__form usersettings__formdiv__form--passchange" action="submit" onSubmit={handlePassChange}>
          <label htmlFor="oldpass">Old Password</label>
          <input
            type="password"
            id="oldpass"
            name="old_password"
            onChange={(e) => {
              setPasswordData((prevState) => ({ ...prevState, old_password: e.target.value }));
            }}
          />
          <label htmlFor="newpass">New Password</label>
          <input
            type="password"
            id="newpass"
            name="new_password"
            onChange={(e) => {
              setPasswordData((prevState) => ({ ...prevState, new_password: e.target.value }));
            }}
          />
          <label htmlFor="confirmpass">Confirm New Password</label>
          <input
            type="password"
            id="confirmpass"
            name="confirm_new_password"
            onChange={(e) => {
              setPasswordData((prevState) => ({ ...prevState, confirm_new_password: e.target.value }));
            }}
          />
          <Button tag="Save" />
        </form>
      </div>
      <div className="usersettings__formdiv">
        <h3>Change your email</h3>
        <form className="usersettings__formdiv__form usersettings__formdiv__form--emailchange" action="submit" onSubmit={handleEmailChange}>
          <label htmlFor="oldmail">Old Email</label>
          <input
            type="email"
            id="oldmail"
            onChange={(e) => {
              setEmailData((prevState) => ({ ...prevState, old_email: e.target.value }));
            }}
          />
          <label htmlFor="newmail">New Email</label>
          <input
            type="email"
            id="newmail"
            onChange={(e) => {
              setEmailData((prevState) => ({ ...prevState, new_email: e.target.value }));
            }}
          />
          <Button tag="Save" />
        </form>
      </div>
      <div className="usersettings__formdiv usersettings__formdiv--radio">
        <h3>Language</h3>
        <form className="usersettings__formdiv__form usersettings__formdiv__form--langchange" action="submit">
          <label htmlFor="eng">ENG</label>
          <input type="radio" name="lang" id="eng" value="eng" onChange={handleLangSwitch} checked={lang === "eng"} />
          <label htmlFor="pl">PL</label>
          <input type="radio" name="lang" id="pl" value="pl" onChange={handleLangSwitch} checked={lang === "pl"} />
        </form>
      </div>
      <div className="usersettings__formdiv usersettings__formdiv--radio">
        <h3>Theme</h3>
        <form className="usersettings__formdiv__form usersettings__formdiv__form--themechange" action="submit">
          <label htmlFor="dark">DARK</label>
          <input type="radio" name="theme" id="dark" value="dark" onChange={handleThemeSwitch} checked={theme === "dark"} />
          <label htmlFor="light">LIGHT</label>
          <input type="radio" name="theme" id="light" value="light" onChange={handleThemeSwitch} checked={theme === "light"} />
        </form>
      </div>
    </div>
  );
}

export default UserSettings;
