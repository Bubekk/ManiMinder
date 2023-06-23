import { Outlet, useNavigate } from "react-router-dom";

function UserPage() {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate("profile");
  };

  //userLogin variable for setting page welcoming text for logged user
  const userLogin = () => {
    const storedUser = sessionStorage.getItem("userLogin");
    return storedUser ? storedUser : "";
  };

  return (
    <div className="userpage">
      <p>Hello {userLogin()} </p>
      <button onClick={handleRoute}>Go to Profile</button>
      <Outlet />
    </div>
  );
}

export default UserPage;
