import Body from "./Body";
import Header from "./Header";

const ProductAddForm = ({ onSubmit, onChange, addField, deleteField, purchaseProducts, products }) => {

  return (
    <div style={{ width: "100%", height: "80%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ overflow: "auto", width: "100%", height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
        <Header />
        <Body purchaseProducts={purchaseProducts} onChange={onChange} onDelete={deleteField} products={products} />
      </div>
      <div style={{ width: "30%", display: "flex", justifyContent: "space-around", marginTop: "2vh" }}>
        <button onClick={onSubmit} className="custom-input-fields" style={{ border: "none", backgroundColor: "#5e48e8", fontSize: "1.2rem", cursor: "pointer", color: "#ffffff", height: "5vh", width: "9vw", borderRadius: "0.4vw" }}>Submit</button>
        <button onClick={addField} style={{ border: "none", backgroundColor: "#8e7fef", fontSize: "1.2rem", cursor: "pointer", color: "#ffffff", height: "5vh", width: "9vw", borderRadius: "0.4vw" }}>Add field</button>
      </div>
    </div>
  );
}
export default ProductAddForm;