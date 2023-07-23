import { memo, useEffect, useState } from "react";
import { ACTION } from "../../Store/constants";
import { useStore } from "../../Store/store";
import { getExpiry } from "../../apis/expiry";
import { getProductQuery } from "../../apis/products";

const ProductDetails = () => {
  const { expiredStocks, nearExpiryStocks, dispatch } = useStore();
  const [lowStockCount, setLowStockCount] = useState(0);
  const fetchLowStockProducts = async () => {
    try {
      const res = await getProductQuery({ name: "qnty", value: 0 })
      setLowStockCount(res.data.length)
    } catch (error) {
      alert("unable to get low stock count!")
      console.log(error)
    }
  }

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

  useEffect(() => {
    if (expiredStocks.length === 0 && nearExpiryStocks.length === 0)
      fetchExpiredStocks();
    fetchLowStockProducts();
  }, [])
  return (
    <div className="dashboard-card" style={{ width: "18%", height: "22vh" }}>
      <p className="dashboard-title">Products Details</p>
      <p className="dashboard-label">Low stocks items</p>
      <p className="dashboard-value">{parseInt(lowStockCount / 10)}{lowStockCount % 10}</p>
      <p className="dashboard-label">Items Expired</p>
      <p className="dashboard-value">{parseInt(expiredStocks.length / 10)}{expiredStocks.length % 10}</p>
      <p className="dashboard-label">Items Expiry soon</p>
      <p className="dashboard-value">{parseInt(nearExpiryStocks.length / 10)}{nearExpiryStocks.length % 10}</p>
    </div>
  );
}
export default memo(ProductDetails);