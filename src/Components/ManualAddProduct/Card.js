import KEY from "../../Constants/keyCode";

const Card = (props) => {
  let { keypress = () => { }, require = false, disable=false, w = "25%", h = "15%", ph = "", m = "1.5%", pd = "1.5%", fs = "1rem",
    label = "", name = "", value = "", max = "", min = 0, type = "text", onchange, focus = false, options = [] } = props

  const checkForEnterKey = (event) => {
    if (event.keyCode === KEY.ENTER) {
      event.preventDefault();
      if (event.target.value === "" && require)
        return alert("Cannot be blank!")
      const inputs = Array.from(document.getElementsByClassName('custom-input-fields'));
      const currentIndex = inputs.indexOf(event.target);
      const nextIndex = currentIndex + 1;
      if (nextIndex < inputs.length + 1) {
        const nextInput = inputs[nextIndex];
        try { nextInput.focus(); } catch (error) { }
      }
    }
    keypress(event,name)
  }

  const getInputType = () => {
    switch (type) {
      case "select":
        return <select disabled={disable} autoFocus={focus} value={value} className="custom-input-fields" onKeyDown={checkForEnterKey}
          required={require} style={{
            outline: "none", fontSize: fs, border: "none",
            margin: "0%", cursor: "pointer",
          }} onChange={(e) => onchange(name, e.target.value)}>
          {
            options.map((option, index) => <option key={option.label + index} style={{ cursor: "pointer", fontSize: fs }}
              value={option.value}>{option.label}</option>)
          }
        </select>
      default:
        return <input disabled={disable} min={min} className="custom-input-fields" style={{ fontSize: fs }} max={max} onKeyDown={checkForEnterKey} placeholder={ph || label}
          autoFocus={focus} required={require} value={value} type={type}
          onChange={(e) => onchange(name, e.target.value)} name={ph} />
    }
  }

  return (
    <div className="manualadd-inputs-div" style={{ height: h, width: w, margin: m, padding: pd }}>
      <p style={{
        padding: "0px 2%",
        position: "absolute",
        top: -25, left: 20,
        color: "#5e48e8",
        backgroundColor: "#ffffff", textAlign: "left"
      }}>{label}</p>
      {getInputType()}
    </div>
  );
}
export default Card;