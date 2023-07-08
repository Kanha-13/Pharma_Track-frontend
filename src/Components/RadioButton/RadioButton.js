const RadioButton = ({ onSwitch, title1, title2, state }) => {
  const onclick = () => {
    const btn = document.getElementById("liver")
    btn.style.transition = "transform 0.2s linear"
    if (state)
      btn.style.transform = "translateX(0px)"
    else
      btn.style.transform = "translateX(200%)"
    setTimeout(() => {
      onSwitch()
    }, 200);
  }
  return (
    <div style={{ marginLeft: "auto", width: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {title1}
      <div onClick={onclick} style={{
        backgroundColor: state ? "blue" : "green", width: "40%", margin: "1vw",
        cursor: "pointer", borderRadius: "1vw", display: "flex", alignItems: "center", overflow: "hidden"
      }}>
        <button id="liver" style={{ cursor: "pointer", height: "3vh", width: "3vh", borderRadius: "50%", border: "none", outline: "none", }}></button></div>
      {title2}
    </div>
  );
}
export default RadioButton;