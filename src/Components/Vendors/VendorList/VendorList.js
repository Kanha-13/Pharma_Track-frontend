import { useEffect, useState } from "react";
import Body from "./Body";
import Header from "./Header";

import './vendorlist.css'
import { VENDOR } from "../../../Schema/vendor";

const VendorList = ({ vendors = [], onAdd }) => {
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
  const onclickvendor = () => {
    
  }
  useEffect(() => {
    setList(vendors)
  }, [vendors])
  return (
    <div id="vendorlist-container" className="borderbox">
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", width: "100%", height: "100%" }}>
        <Header onaddclick={onAdd} onchange={filterSearch} />
        <Body onClick={onclickvendor} vendors={vendorlist} />
      </div>
    </div>
  );
}
export default VendorList;
