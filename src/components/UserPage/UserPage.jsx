function UserPage(props) {

  //userLogin variable for setting page welcoming text for logged user
  const userLogin = () => {
    const storedUser = sessionStorage.getItem("userLogin");
    return storedUser ? storedUser : "";
  }

  return (
    <div className="userpage">
      <p>Yellow {userLogin()} </p>
    </div>
  );
}

export default UserPage;
