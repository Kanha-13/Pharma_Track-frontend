import { useEffect, useState } from "react"
import { PRODUCT } from "../../Schema/products"

import KEY from "../../Constants/keyCode";

const Card = (props) => {
  let { require = false, w = "25%", h = "15%",
    label = "", name = "", value = "", type = "text", onchange, focus = false, options = [] } = props

  const checkForEnterKey = (event) => {
    if (event.keyCode === KEY.ENTER) {
      event.preventDefault();
      if (event.target.value === "")
        return alert("Cannot be blank!")
      const inputs = Array.from(document.getElementsByClassName('custom-input-fields'));
      const currentIndex = inputs.indexOf(event.target);
      const nextIndex = currentIndex + 1;
      if (nextIndex < inputs.length + 1) {
        const nextInput = inputs[nextIndex];
        try { nextInput.focus(); } catch (error) { }
      }
    }
  }

  const getInputType = () => {
    switch (type) {
      case "select":
        return <select value={value} className="custom-input-fields" onKeyDown={checkForEnterKey}
          required={require} style={{
            outline: "none", fontSize: "1.15rem", border: "none",
            margin: "0%", cursor: "pointer"
          }} onChange={(e) => onchange(name, e.target.value)}>
          {
            options.map((option) => <option key={option.label} style={{ cursor: "pointer" }}
              value={option.value}>{option.label}</option>)
          }
        </select>
      default:
        return <input className="custom-input-fields" onKeyDown={checkForEnterKey} placeholder={label}
          autoFocus={focus} required={require} value={value} type={type}
          onChange={(e) => onchange(name, e.target.value)} />
    }
  }

  return (
    <div className="manualadd-inputs-div" style={{ height: h, width: w }}>
      <p style={{
        padding: "0px 2%",
        position: "absolute",
        top: -25, left: 20,
        backgroundColor: "#ffffff", textAlign: "left"
      }}>{label}</p>
      {getInputType()}
    </div>
  );
}
export default Card;