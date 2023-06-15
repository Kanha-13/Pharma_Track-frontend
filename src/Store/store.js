import React, { useState, createContext } from "react";
import { ACTION } from "./constants";
const StateStore = (props) => {

  const [currentWindow, setWindow] = useState("dashboard")
  const [products, setProducts] = useState([])
  const [vendors, setVendors] = useState([])

  const states = {
    currentWindow,
    products,
    vendors
  }

  const dispatch = (type, payload) => {
    switch (type) {

      case ACTION.SET_WINDOW:
        setWindow(payload)
        break;

      case ACTION.SET_PRODUCTS:
        setProducts(payload)
        break;

      case ACTION.SET_VENDORS:
        setVendors(payload)
        break;

      default:
        break;
    }
  }

  return (
    <StateContext.Provider
      value={{
        ...states,
        dispatch
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
}

export const StateContext = createContext();
export default StateStore;
