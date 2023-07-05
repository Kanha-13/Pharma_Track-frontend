import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBillingInfo } from "../../apis/billing";

import Layout from "../../Components/Layout/Layout";

import './index.css'
import Header from "../../Components/ProductAddForm/Header";
import Body from "../../Components/ProductAddForm/Body";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { getAllProducts } from "../../apis/products";
import { BillingProductListHeader } from "../../Constants/billing";

const BIllingInfo = () => {
  const { products, dispatch } = useStore()
  const [searchparams] = useSearchParams();
  const [billingInfo, setBillingInfo] = useState({})

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      dispatch(ACTION.SET_PRODUCTS, res.data)
      BillingProductListHeader[0].options = products;
    } catch (error) {
      console.log(error)
      alert("Unable To get bill information!")
    }
  }

  const fetchBillingInfo = async (id) => {
    try {
      const res = await getBillingInfo(id);
      console.log(res)
      setBillingInfo(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const onbillCancel = async () => {

  }
  const onbillUpdate = async () => {

  }

  const onChange = () => {

  }

  useEffect(() => {
    const billingId = searchparams.get("id")
    if (!products.length)
      fetchProducts()
    if (billingId)
      fetchBillingInfo(billingId)
  }, [])
  return (
    <Layout>
      <div id="billingInfo-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "1vh" }}>Billing Info</p>
        <div style={{ alignItems: "center", width: "100%", height: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <div style={{ overflow: "auto", width: "100%", height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
            <Header headers={BillingProductListHeader} />
            <Body headers={BillingProductListHeader} mode={"update"} dataList={billingInfo.productsDetail} onChange={onChange} onDelete={() => { }} products={products} />
          </div>
          <div>
            <button>Update Bill</button>
            <button onClick={onbillCancel}>Cancel Bill</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default BIllingInfo;