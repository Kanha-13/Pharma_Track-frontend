import { useEffect, useState } from "react"
import { PRODUCT } from "../../Schema/products"

import KEY from "../../Constants/keyCode";
import { PRODUCT_CATEGORY } from "../../Constants/productCategories";

const Card = (props) => {
  let { require = false, w = "25%", h = "15%", productDetail,
    label = "", name = "", value = "", type = "text", onchange, focus = false, options = [] } = props
  const [typee, setTyp] = useState(type);

  useEffect(() => {
    if (productDetail?.category === PRODUCT_CATEGORY.TABLET && name === PRODUCT.PACKING)
      setTyp("number")
    else if (productDetail?.category === PRODUCT_CATEGORY.BOTTLE && name === PRODUCT.PACKING)
      setTyp("text")
  }, [productDetail?.category])


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
            options.map((option) => <option key={option.name} style={{ cursor: "pointer" }}
              value={option.value}>{option.name}</option>)
          }
        </select>
      default:
        return <input className="custom-input-fields" onKeyDown={checkForEnterKey} placeholder={label}
          autoFocus={focus} required={require} value={value} type={typee}
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