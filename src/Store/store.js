import React, { useState, createContext, useContext } from "react";
import { ACTION } from "./constants";
const StateStore = (props) => {

  const [products, setProducts] = useState([])
  const [companies, setCompanies] = useState([])
  const [vendors, setVendors] = useState([])
  const [stocks, setStocks] = useState([])
  const [expiredStocks, setExpiredStocks] = useState([])
  const [nearExpiryStocks, setNearExpiryStocks] = useState([])
  const [currentSettlement, setCurrentSettlementDetial] = useState({})
  const [settlements, setSettlements] = useState([])
  const [tradeAnalysis, setTradeAnalysis] = useState()

  const states = {
    products,
    vendors,
    stocks,
    expiredStocks,
    nearExpiryStocks,
    currentSettlement,
    settlements,
    tradeAnalysis,
    companies
  }

  const dispatch = (type, payload) => {
    switch (type) {
      case ACTION.SET_PRODUCTS:
        setProducts(payload)
        break;

      case ACTION.SET_VENDORS:
        setVendors(payload)
        break;

      case ACTION.SET_STOCKS:
        setStocks(payload)
        break;

      case ACTION.SET_EXPIRED_STOCKS:
        setExpiredStocks(payload)
        break;

      case ACTION.SET_NEAR_EXPIRY_STOCKS:
        setNearExpiryStocks(payload)
        break;

      case ACTION.SET_CURRENT_SETTLEMENT:
        setCurrentSettlementDetial(payload)
        break;

      case ACTION.SET_SETTLEMENTS:
        setSettlements(payload)
        break;

      case ACTION.SET_TRADE_ANALYSIS:
        setTradeAnalysis(payload)
        break;

      case ACTION.SET_COMPANIES:
        setCompanies(payload)
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
export const useStore = () => useContext(StateContext);
export default StateStore;
