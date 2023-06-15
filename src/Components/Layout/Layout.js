import Header from "../AppHeader/Header";
import SideBar from "../SideBar/SideBar";
import './layout.css'
import { StateContext } from "../../Store/store";
import { useContext, useEffect } from "react";
import { ACTION } from "../../Store/constants";
import { useNavigate } from "react-router-dom";
import { DEFAULT, DASHBOARD, PRODUCTS, BILLINGS, VENDORS, DELIVERY, EXPIRY } from "../../Constants/routes_frontend";

const Layout = (props) => {
  const navigate = useNavigate("")
  const { currentWindow, dispatch } = useContext(StateContext)
  const onswitch = (window) => {
    dispatch(ACTION.SET_WINDOW, window)
  }
  useEffect(() => {
    switch (currentWindow) {
      case "dashboard":
        navigate(DASHBOARD)
        break;
      case "products":
        navigate(PRODUCTS)
        break;
      case "billing":
        navigate(BILLINGS)
        break;
      case "vendors":
        navigate(VENDORS)
        break;
      case "delivery":
        navigate(DELIVERY)
        break;
      case "expiry":
        navigate(EXPIRY)
        break;

      default:
        break;
    }
  }, [currentWindow])
  return (
    <div id="layout-container">
      <Header />
      <div style={{ width: "100vw", height: "93vh", display: "flex" }}>
        <SideBar current={currentWindow} onswitch={onswitch} />
        <div style={{ width: "85vw", height: "93vh", overflow: "hidden" }}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
export default Layout;