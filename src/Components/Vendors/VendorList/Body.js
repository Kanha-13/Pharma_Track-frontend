import { VENDOR } from "../../../Schema/vendor";

const Body = ({ onclick, vendors = [] }) => {
  return (
    <div style={{ width: "100%", height: "90%", display: "flex", flexDirection: "column", overflow: "auto" }}>
      <div style={{ paddingLeft: "5px", display: "flex", backgroundColor: "#ebe8fc", flexDirection: "row", width: "99%", justifyContent: "space-between", }}>
        <p style={{ textAlign: "left", width: "33.33%" }}>Vendor Name</p>
        <p style={{ textAlign: "left", width: "33.33%" }}>Mobile Number</p>
        <p style={{ textAlign: "left", width: "33.33%" }}>Address</p>
      </div>
      {
        vendors.map((vendor) => {
          return (
            <div onClick={()=>onclick(vendor._id)} style={{ paddingLeft: "5px", cursor: "pointer", borderBottom: "1px solid #D6D8E7", display: "flex", flexDirection: "row", width: "99%", justifyContent: "space-between", }}>
              <p style={{ textAlign: "left", width: "33.33%" }}>{vendor?.[VENDOR.VENDOR_NAME]}</p>
              <p style={{ textAlign: "left", width: "33.33%" }}>{vendor?.[VENDOR.VENDOR_MOBILE]}</p>
              <p style={{ textAlign: "left", width: "33.33%",fontSize:"0.8em" }}>{vendor?.[VENDOR.VENDOR_ADDRESS]}</p>
            </div>
          )
        })
      }
    </div>
  );
}
export default Body;