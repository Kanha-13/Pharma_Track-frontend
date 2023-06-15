const Card = ({onclick,title,btnLabel,image})=>{
  return(
    <div onClick={onclick} style={{
      cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
      borderRadius: "0.8vw", border: "2px solid #D6D8E7", height: "80%", width: "30%", flexDirection: "column"
    }}>
      <h3>{title}</h3>
      <img src={image} style={{ width: "50%", height: "50%" }} />
      <button style={{
        cursor: "pointer", width: "80%", padding: "2%", border: "none",
        backgroundColor: "#5E48E8", color: "#ffffff",
        borderRadius: "0.8vw", fontSize: "1.3rem"
      }}>{btnLabel}</button>
    </div>
  );
}
export default Card;