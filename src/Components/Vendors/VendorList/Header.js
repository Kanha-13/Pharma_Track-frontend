import { useState } from "react";
import SearchBar from "../../SearchBar/SearchBar";
import Button from "../../Button/Button";

const Header = ({ onchange, onaddclick }) => {
  const [searchValue, setSearch] = useState("");
  const onvaluechange = (val) => {
    setSearch(val)
    onchange(val)
  }
  return (
    <div style={{
      display: "flex", width: "100%",
      height: "10%", flexDirection: "row",
      alignItems: "center", justifyContent: "space-between"
    }}>
      <SearchBar m="1%" mt="0%" onchange={onvaluechange} h="45%" w="50%" placeholder="Search vendor" val={searchValue} />
      <button style={{ width: "15%", height: "5vh",borderRadius:"0.5vw",backgroundColor:"#5E48E8",border:"none",color:"#ffffff",fontSize:"0.9em",cursor:"pointer" }} onClick={onaddclick}>Add Vendor</button>
    </div>
  );
}
export default Header;