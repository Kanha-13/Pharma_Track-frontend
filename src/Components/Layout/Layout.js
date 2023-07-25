import { useStore } from "../../Store/store";
import { useEffect, useState, cloneElement } from "react";
import { ACTION } from "../../Store/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants/routes_frontend";

import Header from "../AppHeader/Header";
import SideBar from "../SideBar/SideBar";
import Loading from "../Loading/Loading";

import KEY from "../../Constants/keyCode";

import './layout.css'

const Layout = (props) => {
  const navigate = useNavigate();
  const { dispatch } = useStore();
  const [loading, setLoading] = useState(false);

  const onswitch = (window) => {
    dispatch(ACTION.SET_WINDOW, ROUTES.PROTECTED_ROUTER + window)
    navigate(ROUTES.PROTECTED_ROUTER + window)
  };

  const handleKeyUp = (event) => {
    switch (event.keyCode) {
      case KEY.F1:
        event.preventDefault();
        navigate(ROUTES.PROTECTED_ROUTER + ROUTES.BILLINGS)
        break;
      case KEY.F2:
        event.preventDefault();
        navigate(ROUTES.PROTECTED_ROUTER + ROUTES.STOCK_ADD)
        break;
      case KEY.F3:
        event.preventDefault();
        navigate(ROUTES.PROTECTED_ROUTER + ROUTES.PRODUCT_ADD_MANUAL)
        break;
      case KEY.F4:
        event.preventDefault();
        navigate(ROUTES.PROTECTED_ROUTER + ROUTES.VENDORS_ADD)
        break;
      default:
        break;
    }
  };

  const handleRouteChange = () => {
    setLoading(true)
    return setTimeout(() => {
      setLoading(false)
    }, 1000);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyUp);
    };
  }, []);

  const onLoad = () => {
    setLoading((prev) => !prev)
  }

  useEffect(() => {
    handleRouteChange()
  }, [navigate]);

  return (
    <div id="layout-container">
      <Header />
      <div style={{ width: "100vw", height: "93vh", display: "flex" }}>
        <SideBar onswitch={onswitch} />
        <div style={{ position: "relative", width: "85vw", height: "93vh", overflow: "hidden" }}>
          {cloneElement(props.children, { onLoad: onLoad })}
        </div>
        {loading ? <Loading /> : <></>}
      </div>
    </div>
  );
}
export default Layout;