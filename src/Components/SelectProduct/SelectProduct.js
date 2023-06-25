import { useRef, useState } from "react";
import ProductsList from "../ProductsList/ProductsList";
import { StockListHeader } from "../../Constants/stock";

const SelectProduct = ({ label, onchange, onclick, focus, type, checkForEnterKey, h, w, require }) => {
  const inputRef = useRef();
  const [stockList,setStockList] =useState([])

  const handleClick = () => {
    // onchange()
  }

  


  return (
    <div className="manualadd-inputs-div" style={{ height: h, width: w }}>
      <p style={{
        padding: "0px 2%",
        position: "absolute",
        top: -25, left: 20,
        backgroundColor: "#ffffff", textAlign: "left"
      }}>{label}</p>
        <input ref={inputRef} className="custom-input-fields" onKeyDown={checkForEnterKey} placeholder={label}
          autoFocus={focus} required={require} value={value} type={type}
          onChange={(e) => onchange(name, e.target.value)} />

    </div>
  );
}
export default SelectProduct;