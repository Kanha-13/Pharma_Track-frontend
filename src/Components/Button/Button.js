const Button = ({ m = "", br, w, h, bg, color, cursor, ta, fs, b , onAdd}) => {
  return (
    <button onClick={onAdd} style={{
      marginTop: "5%", width: "20%", height: "8%", borderRadius: "0.8vw", border: "none", backgroundColor: "#5E48E8", color: "#ffffff", fontSize: "1.15rem",
      cursor: "pointer", textAlign: "center", alignItems: "center", display: "flex", justifyContent: "center"
    }}>
      <span style={{ fontSize: "2rem", marginRight: "5px" }}>+</span> Add Vendor</button>
  );
}
export default Button;