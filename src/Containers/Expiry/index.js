import { useEffect, useState } from "react";
import DashboardCard from "../../Components/Dashboard/Card";
import Layout from "../../Components/Layout/Layout";
import SearchBar from "../../Components/SearchBar/SearchBar";

import './index.css'
import { getExpiry } from "../../apis/expiry";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import ProductsList from "../../Components/ProductsList/ProductsList";
import { ExpiryListHeader } from "../../Constants/expiry";

const Expiry = () => {
  const { expiredStocks, nearExpiryStocks, dispatch } = useStore();
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

  const onclickproduct = () => { }

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
        </div>
        <ProductsList mh="400%" h="100%" w="100%" onchange={onchange}
          onclick={onclickproduct} header={ExpiryListHeader} data={[...nearExpiryStocks, ...expiredStocks]} />
      </div>
    </Layout>
  );
}
export default Expiry;