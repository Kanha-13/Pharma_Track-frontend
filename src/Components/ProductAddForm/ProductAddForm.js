import { useEffect } from "react";
import { PurchaseProductListHeader } from "../../Constants/Purchase";
import Body from "./Body";
import Header from "./Header";
import KEY from "../../Constants/keyCode";

const ProductAddForm = ({ oncancel, mode, onSubmit, onChange, addField, deleteField, purchaseProducts, products }) => {

  const handleKeyUp = (event) => {
    switch (event.keyCode) {
      case KEY.F9:
        event.preventDefault();
        if (mode === "add") addField();
        break;
      case KEY.F10:
        event.preventDefault();
        onSubmit()
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    PurchaseProductListHeader[0].options = products;
  }, [products])
  return (
    <div style={{ width: "100%", height: "70%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ overflow: "auto", width: "100%", height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
        <Header headers={PurchaseProductListHeader} />
        <Body headers={PurchaseProductListHeader} mode={mode} dataList={purchaseProducts} onChange={onChange} onDelete={deleteField} />
      </div>
      <div style={{ width: "30%", display: "flex", justifyContent: "space-around", marginTop: "2vh" }}>
        <button onClick={onSubmit} className="custom-input-fields" style={{ border: "none", backgroundColor: "#5e48e8", fontSize: "1.2rem", cursor: "pointer", color: "#ffffff", height: "5vh", width: "9vw", borderRadius: "0.4vw" }}>{mode === "add" ? "Submit" : "Update"}</button>
        {
          mode === "add" ?
            <button onClick={addField} style={{ border: "none", backgroundColor: "#8e7fef", fontSize: "1.2rem", cursor: "pointer", color: "#ffffff", height: "5vh", width: "9vw", borderRadius: "0.4vw" }}>+ Add field</button> :
            <button onClick={oncancel} style={{ border: "none", backgroundColor: "#a5a5a5", fontSize: "1.2rem", cursor: "pointer", color: "#ffffff", height: "5vh", width: "9vw", borderRadius: "0.4vw" }}>Cancel</button>
        }
      </div>
    </div>
  );
}
export default ProductAddForm;