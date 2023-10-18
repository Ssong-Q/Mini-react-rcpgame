import HandIcon from "./HandIcon.js";
import "./HandButton.css";

function HandButton({ value, onClick }) {
  const handleClick = () => onClick(value);
  return (
    <button className="HandButton" onClick={handleClick}>
      <HandIcon className="HandButton-icon" value={value}></HandIcon>
    </button>
  );
}

export default HandButton;
