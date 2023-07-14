import DashBoardIcon from "../../images/icons/dashboard.png"
import Products from "../../images/icons/products.png"
import Billing from "../../images/icons/billing.png"
import Purchase from "../../images/icons/purchase.png"
import Stocks from "../../images/icons/stocks.png"
import Vendors from "../../images/icons/vendors.png"
import Company from "../../images/icons/company.png"
import Patients from "../../images/icons/patient.png"
import Expiry from "../../images/icons/expiry.png"
import LogOut from "../../images/icons/logout.png"

import "./sidebar.css"
import { handleLogout } from "../../apis/login"
import { ROUTES } from "../../Constants/routes_frontend"
import { useNavigate, useLocation } from "react-router-dom"

const SideBar = ({ onswitch }) => {
  const location = useLocation();
  const navigate = useNavigate()
  const getBg = (name) => {
    if (location.pathname === ROUTES.PROTECTED_ROUTER + name)
      return "#EBE8FC"
    else return "#ffffff"
  }
  const getColor = (name) => {
    if (location.pathname === ROUTES.PROTECTED_ROUTER + name)
      return "#5E48E8"
    else return "#8C8CA1"
  }
  const onlogout = () => {
    alert("All unsaved changes are lost!")
    localStorage.clear(process.env.REACT_APP_SESSION)
    navigate(ROUTES.PUBLIC_ROUTER + ROUTES.LOGIN, { replace: true })
    handleLogout();
  }
  return (
    <div id="sidebar-container">
      <button tabIndex={-1} className="nav-btn" onClick={() => { }} style={{ fontSize: "1rem", color: "#ffffff", width: "80%", height: "5vh", cursor: "pointer", margin: "4vh 0px 3vh 0px", backgroundColor: "#5E48E8", borderRadius: "0.2rem", justifyContent: "center" }}><span style={{ fontSize: "1.5rem", marginRight: "5px" }}>+ </span>Quick Add</button>
      <button tabIndex={-1} className="nav-btn" onClick={() => onswitch(ROUTES.DASHBOARD)} style={{ color: getColor(ROUTES.DASHBOARD), backgroundColor: getBg(ROUTES.DASHBOARD), }}><img src={DashBoardIcon} />Dashboard</button>
      <button tabIndex={-1} className="nav-btn" onClick={() => onswitch(ROUTES.PRODUCTS)} style={{ color: getColor(ROUTES.PRODUCTS), backgroundColor: getBg(ROUTES.PRODUCTS), }}><img src={Products} />Products</button>
      <button tabIndex={-1} className="nav-btn" onClick={() => onswitch(ROUTES.STOCKS)} style={{ color: getColor(ROUTES.STOCKS), backgroundColor: getBg(ROUTES.STOCKS), }}><img src={Stocks} />Stocks</button>
      <button tabIndex={-1} className="nav-btn" onClick={() => onswitch(ROUTES.PURCHASE)} style={{ color: getColor(ROUTES.PURCHASE), backgroundColor: getBg(ROUTES.PURCHASE), }}><img src={Purchase} />Purchase</button>
      <button tabIndex={-1} className="nav-btn" onClick={() => onswitch(ROUTES.BILLINGS)} style={{ color: getColor(ROUTES.BILLINGS), backgroundColor: getBg(ROUTES.BILLINGS), }}><img src={Billing} />Billing</button>
      <button tabIndex={-1} className="nav-btn" onClick={() => onswitch(ROUTES.VENDORS)} style={{ color: getColor(ROUTES.VENDORS), backgroundColor: getBg(ROUTES.VENDORS), }}><img src={Vendors} />Vendors</button>
      <button tabIndex={-1} className="nav-btn" onClick={() => onswitch(ROUTES.COMPANY)} style={{ color: getColor(ROUTES.COMPANY), backgroundColor: getBg(ROUTES.COMPANY), }}><img src={Company} />Company</button>
      <button tabIndex={-1} className="nav-btn" onClick={() => onswitch(ROUTES.PATIENTS)} style={{ color: getColor(ROUTES.PATIENTS), backgroundColor: getBg(ROUTES.PATIENTS), }}><img src={Patients} />Patients</button>
      <button tabIndex={-1} className="nav-btn" onClick={() => onswitch(ROUTES.EXPIRY)} style={{ color: getColor(ROUTES.EXPIRY), backgroundColor: getBg(ROUTES.EXPIRY), }}><img src={Expiry} />Expiry</button>
      <button tabIndex={-1} id="logout-btn" onClick={onlogout}><img src={LogOut} />Log out</button>
    </div >
  );
}
export default SideBar;