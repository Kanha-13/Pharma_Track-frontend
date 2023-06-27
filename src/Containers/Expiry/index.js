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
  const { expiredStocks, nearExpiryStocks, dispatch, currentSettlement } = useStore();
  const navigate = useNavigate();
  const [isMenuOpen, setMenu] = useState(false);
  const [currentStock, setCurrentStock] = useState({})
  const [search, setSearch] = useState("");

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
      dispatch(ACTION.SET_EXPIRED_STOCKS, expired)
      dispatch(ACTION.SET_NEAR_EXPIRY_STOCKS, nearExpiry)
    } catch (error) {
      console.log(error)
    }
  }

  const onchange = (value) => {
    setSearch(value)
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
  }, [])

  return (
    <Layout>
      <div id="expiry-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "5vh" }}>Expiry</p>
        <div style={{ marginBottom: "2%", display: "flex", width: "100%", height: "10%", color: "#ffffff", justifyContent: "left", alignItems: "center" }}>
          <div style={{ marginRight: "3vw", display: "flex", alignItems: "center", backgroundColor: "#3d3d3d", borderRadius: "0.4vw", padding: "1vh 1vw" }}>
            <p style={{ margin: "0px", fontWeight: "bold" }}>Expired: </p>
            <p style={{ margin: "0px" }}> {expiredStocks.length || 0}</p>
          </div>
          <div style={{ marginRight: "3vw", display: "flex", alignItems: "center", backgroundColor: "#df4d4d", borderRadius: "0.4vw", padding: "1vh 1vw" }}>
            <p style={{ margin: "0px", fontWeight: "bold" }}>Expiry soon: </p>
            <p style={{ margin: "0px" }}> {nearExpiryStocks.length || 0}</p>
          </div>
          <button onClick={tosettlements} style={{ backgroundColor: "#5e48e8", border: "none", marginLeft: "auto", cursor: "pointer", width: "25vh", fontSize: "1.1rem", height: "5vh", color: "#ffffff", borderRadius: "0.4vw" }}>Pending Settlement</button>
        </div>
        <ProductsList mh="400%" h="100%" w="100%" onchange={onchange}
          onclick={onclickproduct} header={ExpiryListHeader} data={[...nearExpiryStocks, ...expiredStocks]} />
        {isMenuOpen ? <ExpiryMenu stockDetail={currentStock} onSettle={handleReturnForSettlement} onClose={handleMenuClose} onDelete={handleStockDelete} /> : <></>}
      </div>
    </Layout>
  );
}
export default Expiry;