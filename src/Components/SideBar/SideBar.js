import DashBoardIcon from "../../images/icons/dashboard.png"
import Products from "../../images/icons/products.png"
import Billing from "../../images/icons/billing.png"
import Vendors from "../../images/icons/vendors.png"
import Delivery from "../../images/icons/delivery.png"
import Expiry from "../../images/icons/expiry.png"

import "./sidebar.css"

const SideBar = ({ current, onswitch }) => {
  const getBg = (name) => {
    if (current === name)
      return "#EBE8FC"
    else return "#ffffff"
  }
  const getColor = (name) => {
    if (current === name)
      return "#5E48E8"
    else return "#8C8CA1"

  }
  return (
    <div id="sidebar-container" style={{ height: "100%", width: "15vw", borderRight: "2px solid #D6D8E7", display: "flex", alignItems: "center", flexDirection: "column" }}>
      <button onClick={() => {}} style={{ textAlign: "centre", fontSize: "1rem", color: "#ffffff", width: "80%", height: "5vh", cursor: "pointer", margin: "40px 0px 30px 0px", border: "none", backgroundColor: "#5E48E8", borderRadius: "0.2rem" }}> + Quick Add</button>
      <button onClick={() => onswitch("dashboard")} style={{ textAlign: "left", fontSize: "1rem", color: getColor("dashboard"), width: "80%", height: "5vh", cursor: "pointer", marginTop: "20px", border: "none", backgroundColor: getBg("dashboard"), borderRadius: "0.2rem", display: "flex", alignItems: "center" }}><img style={{ height: "3vh", width: "3vh", backgroundSize: "contain", marginRight: "10px", }} src={DashBoardIcon} />Dashboard</button>
      <button onClick={() => onswitch("products")} style={{ textAlign: "left", fontSize: "1rem", color: getColor("products"), width: "80%", height: "5vh", cursor: "pointer", marginTop: "20px", border: "none", backgroundColor: getBg("products"), borderRadius: "0.2rem", display: "flex", alignItems: "center" }}><img style={{ height: "3vh", width: "3vh", backgroundSize: "contain", marginRight: "10px" }} src={Products} />Products</button>
      <button onClick={() => onswitch("billing")} style={{ textAlign: "left", fontSize: "1rem", color: getColor("billing"), width: "80%", height: "5vh", cursor: "pointer", marginTop: "20px", border: "none", backgroundColor: getBg("billing"), borderRadius: "0.2rem", display: "flex", alignItems: "center" }}><img style={{ height: "3vh", width: "3vh", backgroundSize: "contain", marginRight: "10px" }} src={Billing} />Billing</button>
      <button onClick={() => onswitch("vendors")} style={{ textAlign: "left", fontSize: "1rem", color: getColor("vendors"), width: "80%", height: "5vh", cursor: "pointer", marginTop: "20px", border: "none", backgroundColor: getBg("vendors"), borderRadius: "0.2rem", display: "flex", alignItems: "center" }}><img style={{ height: "3vh", width: "3vh", backgroundSize: "contain", marginRight: "10px" }} src={Vendors} />Vendors</button>
      <button onClick={() => onswitch("delivery")} style={{ textAlign: "left", fontSize: "1rem", color: getColor("delivery"), width: "80%", height: "5vh", cursor: "pointer", marginTop: "20px", border: "none", backgroundColor: getBg("delivery"), borderRadius: "0.2rem", display: "flex", alignItems: "center" }}><img style={{ height: "3vh", width: "3vh", backgroundSize: "contain", marginRight: "10px" }} src={Delivery} />Delivery</button>
      <button onClick={() => onswitch("expiry")} style={{ textAlign: "left", fontSize: "1rem", color: getColor("expiry"), width: "80%", height: "5vh", cursor: "pointer", marginTop: "20px", border: "none", backgroundColor: getBg("expiry"), borderRadius: "0.2rem", display: "flex", alignItems: "center" }}><img style={{ height: "3vh", width: "3vh", backgroundSize: "contain", marginRight: "10px" }} src={Expiry} />Expiry</button>
    </div >
  );
}
export default SideBar;