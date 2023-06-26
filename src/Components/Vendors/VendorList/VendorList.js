import { useEffect, useState } from "react";
import Body from "./Body";
import Header from "./Header";

import './vendorlist.css'
import { VENDOR } from "../../../Schema/vendor";

const VendorList = ({ vendors = [], onAdd, onclick }) => {
  const [vendorlist, setList] = useState([])
  const filterSearch = (val) => {
    if (val === "") {
      setList(vendors)
      return
    } else {
      val = val.toLowerCase()
      setList(vendors.filter((vendors) => vendors?.[VENDOR.VENDOR_NAME].toLowerCase().includes((val))))
    }
  }
  useEffect(() => {
    setList(vendors)
  }, [vendors])
  return (
    <div id="vendorlist-container" className="borderbox">
      <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "5vh" }}>Vendors</p>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", width: "100%", height: "100%" }}>
        <Header onaddclick={onAdd} onchange={filterSearch} />
        <Body onclick={onclick} vendors={vendorlist} />
      </div>
    </div>
  );
}
export default VendorList;
