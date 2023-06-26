import { useState } from "react";
import "../../styles/UIElements/SideMenuStyle.scss";
import Button from "./Button";

function SideMenu(props) {

    const [isShown, setIsShown] = useState(false);
    const handleToggleMenu = () => {
        setIsShown(!isShown)
    }

    const handleRoute = (e) => {
        console.log(e.target.value)
        props.handleRoute(e.target.value)
    }

  return (
    <div className={`sidemenu${isShown ? "--shown" : ""}`}>
        <button className="togglemenu" onClick={handleToggleMenu}></button>
        <h2>i am sidemenu</h2>
        <Button  tag="Profile" value="profile" onClick={handleRoute} />
        <Button  tag="Products" value="products" onClick={handleRoute} />
        <Button  tag="Finances" value="finances" onClick={handleRoute} />
        <Button  tag="Settings" value="settings" onClick={handleRoute} />

   </div>
  )
}

export default SideMenu;
