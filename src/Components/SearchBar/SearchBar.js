import KEY from "../../Constants/keyCode";
import ProductSearch from "../../images/icons/productSearch.svg"
import './searchbar.css'
const SearchBar = ({ keyPress = () => { }, m = "1%", onEnter = () => { }, mt = "2.5%", h = "40%", w = "60%", val = "", onchange, placeholder = "", onNav = () => { } }) => {
  const handleNavToList = (event) => {
    if (event.keyCode === KEY.ENTER) {
      event.preventDefault()
      onEnter()
    }
    if (event.keyCode === KEY.ARROW_DOWN) {
      event.preventDefault()
      onNav("down")
    }
    else if (event.keyCode === KEY.ARROW_UP) {
      event.preventDefault()
      onNav("up")
    }
    keyPress(event);
  }
  return (
    <div className="search-bar-div" style={{ margin: m, marginTop: mt, width: w, height: h }}>
      <input onKeyDown={handleNavToList} onChange={(e) => onchange(e.target.value)} value={val} placeholder={placeholder} autoFocus style={{
        fontSize: "1.1rem", border: "none", outline: "none",
        height: "100%", width: "100%", paddingLeft: "10px",
        backgroundColor: "transparent"
      }} />
      <img src={ProductSearch} style={{ width: "5%", height: "100%" }} />
    </div>
  );
}
export default SearchBar;