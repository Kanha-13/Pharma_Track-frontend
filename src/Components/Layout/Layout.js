import Header from "../AppHeader/Header";
import SideBar from "../SideBar/SideBar";
import './layout.css'
import { StateContext } from "../../Store/store";
import { useContext } from "react";

const Layout = (props) => {
  const { currentWindow } = useContext(StateContext)

  return (
    <div id="layout-container">
      <Header />
      <div style={{ width: "100%", height: "93%", display: "flex" }}>
        <SideBar current={currentWindow} onswitch={() => { }} />
        <div style={{ width: "85%", height: "93vh", overflow: "hidden" }}>
          {props.children}
        </div>
      </div>
    </div>
  );
}
export default Layout;