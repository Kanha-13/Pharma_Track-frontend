const CustomInput = (props) => {

  let { value = "", type = "text", autoFocus, onchange = () => { }, classname = "", id = "", name = "",
    styles = {} } = props;
  styles = {
    ...styles, borderRadius: "0.2rem",
    overFlow: "hidden", width: "50%",
    height: "8%", margin: "5px", padding: "5px"
  };
  return (
    <div style={styles}>
      <input id={id} autoFocus={autoFocus} type={type} style={{ fontSize: styles.fontsize, borderRadius: styles.borderRadius, width: "100%", height: "100%" }} className={classname} name={name} onChange={onchange} value={value} />
    </div>
  );
}
export default CustomInput;