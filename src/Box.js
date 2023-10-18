import "./Box.css";

function Box({ className, children }) {
  const classNames = `Box ${className}`;
  return (
    <div className={classNames}>
      <div className="Box-inner">{children}</div>
    </div>
  );
}

export default Box;
