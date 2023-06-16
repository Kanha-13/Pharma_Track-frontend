import Header from "../AppHeader/Header";
import SideBar from "../SideBar/SideBar";
import './layout.css'
import { StateContext } from "../../Store/store";
import { useContext, useEffect } from "react";
import { ACTION } from "../../Store/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants/routes_frontend";

const Layout = (props) => {
  const navigate = useNavigate("")
  const {  dispatch } = useContext(StateContext)
  const onswitch = (window) => {
    dispatch(ACTION.SET_WINDOW, ROUTES.PROTECTED_ROUTER + window)
    navigate(ROUTES.PROTECTED_ROUTER + window)
  }


  return (
    <div id="layout-container">
      <Header />
      <div style={{ width: "100vw", height: "93vh", display: "flex" }}>
        <SideBar onswitch={onswitch} />
        <div style={{ position: "relative", width: "85vw", height: "93vh", overflow: "hidden" }}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
export default Layout;