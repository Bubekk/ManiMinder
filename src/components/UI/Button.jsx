import '../../styles/UIElements/ButtonStyle.scss';

function Button(props) {
  return <button onClick={props.onClick} value={props.value}> {props.tag} </button>;
}

export default Button;
