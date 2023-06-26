import "../../styles/UIElements/NavBarStyle.scss";

function NavBar(props) {
  return (
    <div className="navbar">
      <h1>Hello {props.userLogin}</h1>
    </div>
  );
}

export default NavBar;
