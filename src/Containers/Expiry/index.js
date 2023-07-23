import { useEffect, useState } from "react";
import { getExpiry } from "../../apis/expiry";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { ExpiryListHeader } from "../../Constants/expiry";
import { deleteStock } from "../../apis/stock";
import { useNavigate } from "react-router-dom";

import ProductsList from "../../Components/ProductsList/ProductsList";
import ExpiryMenu from "../../Components/ExpiryMenu/ExpiryMenu";
import Layout from "../../Components/Layout/Layout";

import './index.css'
import { ROUTES } from "../../Constants/routes_frontend";

const Expiry = () => {
  const { expiredStocks, nearExpiryStocks, dispatch } = useStore();
  const navigate = useNavigate();
  const [alertStock, setAlertStock] = useState([])
  const [isMenuOpen, setMenu] = useState(false);
  const [currentStock, setCurrentStock] = useState({})

  const fetchExpiredStocks = async () => {
    const queryForExpired = { from: "", to: new Date() }

    const queryForNearExpiry = { from: new Date(), to: new Date() }
    queryForNearExpiry.to.setMonth(queryForNearExpiry.to.getMonth() + 2);//setting month 2 months ahead to get near expiry

    try {
      let expired = await getExpiry(queryForExpired)
      let nearExpiry = await getExpiry(queryForNearExpiry)
      expired = expired.data.map((row, index) => {
        return {
          ...row,
          itemName: row.productDetail[0].itemName,
          location: row.productDetail[0].location,
          pkg: row.productDetail[0].pkg,
          vendorName: row.vendorDetail[0]?.vendorName,
          status: "Expired"
        }
      })

      nearExpiry = nearExpiry.data.map((row, index) => {
        return {
          ...row,
          itemName: row.productDetail[0].itemName,
          location: row.productDetail[0].location,
          pkg: row.productDetail[0].pkg,
          vendorName: row.vendorDetail[0]?.vendorName,
          status: "Near expiry"
        }
      })
      setAlertStock([...expired,...nearExpiry])
      dispatch(ACTION.SET_EXPIRED_STOCKS, expired)
      dispatch(ACTION.SET_NEAR_EXPIRY_STOCKS, nearExpiry)
    } catch (error) {
      console.log(error)
    }
  }

  const onchange = (val) => {
    const filtered = [...expiredStocks,...nearExpiryStocks].filter((stock) => stock.itemName.includes((val).toUpperCase()))
    setAlertStock(filtered)
  }

  const onclickproduct = (stockId) => {
    setCurrentStock([...nearExpiryStocks, ...expiredStocks].filter((stock) => stock._id === stockId)[0])
    setMenu(true)
  }

  const handleMenuClose = async () => {
    setMenu(false)
  }

  const handleReturnForSettlement = async () => {
    setMenu(false)
    dispatch(ACTION.SET_CURRENT_SETTLEMENT, currentStock)
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.ADD_SETTLEMENT)
  }


  const handleStockDelete = async () => {
    setMenu(false)
    try {
      const res = await deleteStock(currentStock._id)
    } catch (error) {
      console.log(error)
    }
  }

  const tosettlements = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.GET_SETTLEMENT)
  }

  useEffect(() => {
    if (expiredStocks.length === 0 && nearExpiryStocks.length === 0)
      fetchExpiredStocks();
    else
      setAlertStock([...expiredStocks,...nearExpiryStocks])
  }, [])

  return (
    <Layout>
      <div id="expiry-container" className="layout-body borderbox">
        <div style={{ width: "100%", height: "5vh", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "5vh" }}>
          <p style={{ width: "60%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left" }}>Expiry</p>
          <div style={{ width: "10%", color: "#3d3d3d", backgroundColor: "#cfcfcf", marginRight: "3vw", display: "flex", alignItems: "center", border: "1px solid #3d3d3d", borderRadius: "0.4vw", padding: "1vh 1vw" }}>
            <p style={{ margin: "0px", fontWeight: "bold" }}>Expired:</p>
            <p style={{ margin: "0px" }}> {expiredStocks.length || 0}</p>
          </div>
          <div style={{ width: "10%", color: "#df4d4d", backgroundColor: "#ffe4e4", marginRight: "3vw", display: "flex", alignItems: "center", border: "1px solid #df4d4d", borderRadius: "0.4vw", padding: "1vh 1vw" }}>
            <p style={{ margin: "0px", fontWeight: "bold" }}>Expiry soon: </p>
            <p style={{ margin: "0px" }}> {nearExpiryStocks.length || 0}</p>
          </div>
          <button style={{ width: "15%", height: "100%", borderRadius: "0.5vw", backgroundColor: "#5E48E8", border: "none", color: "#ffffff", fontSize: "0.9em", cursor: "pointer" }} onClick={tosettlements}>Pending Settlement</button>
        </div>
        <ProductsList mh="400%" h="100%" w="100%" onchange={onchange}
          onclick={onclickproduct} header={ExpiryListHeader} data={alertStock} />
        {isMenuOpen ? <ExpiryMenu stockDetail={currentStock} onSettle={handleReturnForSettlement} onClose={handleMenuClose} onDelete={handleStockDelete} /> : <></>}
      </div>
    </Layout>
  );
}
export default Expiry;