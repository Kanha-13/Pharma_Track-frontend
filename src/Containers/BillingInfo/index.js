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
import Card from "../../Components/ManualAddProduct/Card";
import { getyyyymmdd, toddmmyy } from "../../utils/DateConverter";

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
      res.data.billingDate = getyyyymmdd(res.data.billingDate)
      setBillingInfo(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const onbillCancel = async () => {

  }
  const onbillUpdate = async () => {

  }

  const onChange = (name, value) => {
    setBillingInfo({ ...billingInfo, [name]: value })
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
        <div style={{ width: "100%", height: "10%", display: "flex", justifyContent: "space-between", alignTracks: "center" }}>
          <Card require={true} m="1vh 0px" w="12%" h="60%" pd="0px 1%" name={"invoiceNo"} label="Invoice No" value={billingInfo.invoiceNo} onchange={() => { }} type="text" />
          <Card require={true} m="1vh 0px" w="12%" h="60%" pd="0px 1%" name={"billingDate"} label="Bill Date" value={billingInfo.billingDate} onchange={onChange} type="date" />
        </div>
        <div style={{ alignItems: "center", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ overflow: "auto", width: "100%", height: "65%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
            <Header headers={BillingProductListHeader} />
            <Body headers={BillingProductListHeader} mode={"update"} dataList={billingInfo.productsDetail} onChange={() => { }} onDelete={() => { }} products={products} />
          </div>
          <div style={{ alignItems: "center", height: "20%", width: "100%", display: "flex", flexWrap: "wrap" }}>
            <Card focus={true} require={true} w="25%" h="4%" name={"prescribedBy"} label="Prescribed By" value={billingInfo.prescribedBy} onchange={onChange} type="text" />
            <Card require={true} w="25%" h="4%" name={"patientName"} label="Patient Name" value={billingInfo.patientName} onchange={onChange} type="text" />
            <Card require={true} w="25%" h="4%" name={"mobileNumber"} label="Mobile Number" value={billingInfo.mobileNumber} onchange={onChange} type="text" />
            <Card require={true} w="25%" h="4%" name={"address"} label="Address" value={billingInfo.address} onchange={onChange} type="text" />
            <Card require={true} w="25%" h="4%" name={"subTotal"} label="Sub Total" value={parseFloat(billingInfo.subTotal).toFixed(2)} onchange={() => { }} type="text" />
            <Card require={true} w="25%" h="4%" name={"discount"} label="Discount" value={billingInfo.discount} onchange={() => { }} type="text" />
            <Card require={true} w="25%" h="4%" name={"roundoff"} label="Round Off" value={billingInfo.roundoff} onchange={() => { }} type="text" />
            <Card require={true} w="25%" h="4%" name={"grandTotal"} label="Grand Total" value={billingInfo.grandTotal} onchange={() => { }} type="text" />
            <button style={{ width: "10%", margin: "0px 1.5vw", height: "30%", borderRadius: "0.4vw", backgroundColor: "#5e48e8", border: "none", color: "#ffffff", fontSize: "1rem" }}>Update Bill</button>
            <button style={{ width: "10%", height: "30%", borderRadius: "0.4vw", backgroundColor: "#ef3737", border: "none", color: "#ffffff", fontSize: "1rem" }} onClick={onbillCancel}>Cancel Bill</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default BIllingInfo;