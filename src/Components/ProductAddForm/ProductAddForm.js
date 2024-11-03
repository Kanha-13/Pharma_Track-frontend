import { useEffect, useState } from "react";
import { PurchaseProductListHeader } from "../../Constants/Purchase";
import Body from "./Body";
import Header from "./Header";
import KEY from "../../Constants/keyCode";
import CNForm from "./CNForm";

const ProductAddForm = ({ cndata, setCNData, resetall, oncancel, mode, onSubmit, saveinLS, onChange, addField, deleteField, purchaseProducts }) => {
  const [openCN, setCN] = useState(false)
  const handleKeyUp = (event) => {
    switch (event.keyCode) {
      case KEY.F9:
        event.preventDefault();
        if (mode === "add") addField();
        break;
      case KEY.ESC:
        event.stopPropagation();
        setCN(false)
        break;
      default:
        break;
    }
  };

  const addCN = () => {
    setCN(true);
  }

  const oncnupdate = (data) => {
    setCNData(data)
    setCN(false)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyUp);
    };
  }, []);
  return (
    <div style={{ width: "100%", height: "65%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
      {openCN ?
        <CNForm setCNData={oncnupdate} /> :
        <>
          <div style={{ overflow: "auto", width: "100%", height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
            <Header headers={PurchaseProductListHeader} />
            <Body headers={PurchaseProductListHeader} mode={mode} dataList={purchaseProducts} addField={addField} onChange={onChange} onDelete={deleteField} />
          </div>
          <div style={{ position: "absolute", bottom: "7vh", width: "60%", display: "flex", justifyContent: "space-around", marginTop: "2vh", marginRight: "15vw" }}>
            <button onClick={onSubmit} className="custom-input-fields" style={{ border: "none", backgroundColor: "#5e48e8", fontSize: "1.2rem", cursor: "pointer", color: "#ffffff", height: "5vh", width: "9vw", borderRadius: "0.4vw" }}>{mode === "add" ? "Submit" : "Update"}</button>
            {
              mode === "add" ?
                <>
                  <button onClick={addField} style={{ border: "none", backgroundColor: "#8e7fef", fontSize: "1.2rem", cursor: "pointer", color: "#ffffff", height: "5vh", width: "9vw", borderRadius: "0.4vw" }}>+ Add field</button>
                  <button disabled={cndata.cnId ? true : false} onClick={addCN} style={{ border: "none", backgroundColor: "#8e7fef", fontSize: "1.2rem", cursor: "pointer", color: "#ffffff", height: "5vh", width: "9vw", borderRadius: "0.4vw" }}>Add CN</button>
                  <button onClick={saveinLS} style={{ border: "none", backgroundColor: "#8c8c8c", fontSize: "1.2rem", cursor: "pointer", color: "#ffffff", height: "5vh", width: "12vw", borderRadius: "0.4vw" }}>Temporary save</button>
                  <button onClick={resetall} style={{ border: "none", backgroundColor: "#8c8c8c", fontSize: "1.2rem", cursor: "pointer", color: "#ffffff", height: "5vh", width: "9vw", borderRadius: "0.4vw" }}>Reset all</button>
                </> :
                <button tabIndex={-1} onClick={oncancel} style={{ border: "none", backgroundColor: "#a5a5a5", fontSize: "1.2rem", cursor: "pointer", color: "#ffffff", height: "5vh", width: "9vw", borderRadius: "0.4vw" }}>Cancel</button>
            }
          </div>
        </>
      }
    </div>
  );
}
export default ProductAddForm;