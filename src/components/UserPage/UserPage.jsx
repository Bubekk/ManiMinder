import { Outlet, useNavigate } from "react-router-dom";
import "../../styles/Pages/UserPageStyle.scss";
import NavBar from "../UI/NavBar";
import Footer from "../UI/Footer";
import SideMenu from "../UI/SideMenu";

function UserPage() {
  const navigate = useNavigate();

  const handleRoute = (directory) => {
    navigate(directory);
  };

  //userLogin variable for setting page welcoming text for logged user
  const userLogin = () => {
    const storedUser = sessionStorage.getItem("userLogin");
    return storedUser ? storedUser : "";
  };

  return (
    <div className="userpage">
      <NavBar userLogin={userLogin()} />
      <SideMenu handleRoute={handleRoute} />
      <div className="userpage__outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserPage;
