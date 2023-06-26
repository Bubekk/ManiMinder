import "../../../styles/Pages/SettingsStyle.scss";
import Button from "../../UI/Button";

function UserSettings() {
  return (
    <div className="usersettings">
      <div className="usersettings__formdiv">
        <h3>Change your password</h3>
        <form className="usersettings__formdiv__form usersettings__formdiv__form--passchange" action="submit">
          <label htmlFor="oldpass">Old Password</label>
          <input type="text" id="oldpass" />
          <label htmlFor="newpass">New Password</label>
          <input type="text" id="newpass" />
          <label htmlFor="confirmpass">Confirm New Password</label>
          <input type="text" id="confirmpass" />
          <Button tag="Save" />
        </form>
      </div>
      <div className="usersettings__formdiv">
        <h3>Change your email</h3>
        <form className="usersettings__formdiv__form usersettings__formdiv__form--emailchange" action="submit">
          <label htmlFor="oldmail">Old Email</label>
          <input type="text" id="oldmail" />
          <label htmlFor="newmail">New Email</label>
          <input type="text" id="newmail" />
          <Button tag="Save" />
        </form>
      </div>
      <div className="usersettings__formdiv">
        <h3>Language</h3>
        <form className="usersettings__formdiv__form usersettings__formdiv__form--langchange" action="submit">
            <label htmlFor="eng">ENG</label>
            <input type="radio" name="lang" id="eng" defaultChecked />
            <label htmlFor="pl">PL</label>
            <input type="radio" name="lang" id="pl" />
        </form>
      </div>
      <div className="usersettings__formdiv">
        <h3>Theme</h3>
        <form className="usersettings__formdiv__form usersettings__formdiv__form--themechange" action="submit">
            <label htmlFor="dark">DARK</label>
            <input type="radio" name="theme" id="dark" defaultChecked />
            <label htmlFor="light">LIGHT</label>
            <input type="radio" name="theme" id="light" />
        </form>
      </div>
    </div>
  );
}

export default UserSettings;
