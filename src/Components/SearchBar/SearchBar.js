import ProductSearch from "../../images/icons/productSearch.svg"

const SearchBar = ({m="1%", mt = "2.5%", h = "40%", w = "60%", val = "", onchange, placeholder = "" }) => {
  return (
    <div style={{
      border: "2px solid #D4ADFC", margin: m, marginTop: mt,
      borderRadius: "3vw", width: w, height: h, display: "flex", flexDirection: "row",
      alignItems: "center", justifyContent: "space-between", padding: "5px", overflow: "hidden"
    }}>
      <input onChange={(e) => onchange(e.target.value)} value={val} placeholder={placeholder} autoFocus style={{
        fontSize: "1.1rem", border: "none", outline: "none",
        height: "100%", width: "100%", paddingLeft: "10px",
        backgroundColor: "transparent"
      }} />
      <img src={ProductSearch} style={{ width: "5%", height: "100%" }} />
    </div>
  );
}
export default SearchBar;