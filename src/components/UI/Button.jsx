function Button(props) {
  return <button onClick={props.onClick}> {props.tag} </button>;
}

export default Button;
