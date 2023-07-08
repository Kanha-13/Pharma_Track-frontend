import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteCN, getBillingInfo, getCNInfo, updateBillingInfo } from "../../apis/billing";

import Layout from "../../Components/Layout/Layout";

import './index.css'
import Header from "../../Components/ProductAddForm/Header";
import Body from "../../Components/ProductAddForm/Body";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { getAllProducts } from "../../apis/products";
import { BillingProductListHeader, CNProductListHeader } from "../../Constants/billing";
import Card from "../../Components/ManualAddProduct/Card";
import { getyyyymmdd } from "../../utils/DateConverter";
import { ROUTES } from "../../Constants/routes_frontend";

const BillingInfo = () => {
  const navigate = useNavigate();
  const { products, dispatch } = useStore()
  const [searchparams] = useSearchParams();
  const [billingInfo, setBillingInfo] = useState({})
  const [btnDissable, setDisableBtn] = useState(false)
  const [dateLabel, setDateLabel] = useState("")
  const [amtLabel, setAmtLabel] = useState("")
  const [title, setTitle] = useState("")
  const [isCN, setIsCN] = useState(0)
  const [tableHeaders, setTableHeaders] = useState([])

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      dispatch(ACTION.SET_PRODUCTS, res.data)
      tableHeaders[0].options = products;
    } catch (error) {
      console.log(error)
      alert("Unable To get bill information!")
    }
  }

  const fetchBillingInfo = async (id, iscn) => {
    try {
      let res;
      if (iscn) {
        res = await getCNInfo(id);
        res.data.amtPaid = res.data.amtRefund
        res.data.invoiceNo = res.data.cnNo
      }
      else {
        res = await getBillingInfo(id);
      }
      res.data.billingDate = getyyyymmdd(res.data.billingDate)
      setBillingInfo(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const onbillCancel = async () => {
    setDisableBtn(true)
    if (window.confirm('Do you really want to cancel  this bill')) {
      const path = ROUTES.CANCEL_BILLINGS.split(":")[0]
      navigate(ROUTES.PROTECTED_ROUTER + path + billingInfo._id)
    }
    setDisableBtn(false)
  }

  const onbillUpdate = async () => {
    setDisableBtn(true)
    try {
      const res = await updateBillingInfo(billingInfo._id, billingInfo)
      alert("Bill updated successfully")
      // printBill()
      navigate(ROUTES.PROTECTED_ROUTER + ROUTES.BILLING_HISTORY)
    } catch (error) {
      alert("Unable to update the bill")
      setDisableBtn(false)
      console.log(error)
    }
  }

  const onChange = (name, value) => {
    setBillingInfo({ ...billingInfo, [name]: value })
  }

  const onDeleteCN = async () => {
    try {
      if (window.confirm("Do you really want to delete this CN ?")) {
        await deleteCN(searchparams.get("id"))
        alert("CN deleted successfully!")
        navigate(ROUTES.PROTECTED_ROUTER + ROUTES.BILLING_CN_HISTORY)
      }
    } catch (error) {
      alert("Unable to delete CN")
      console.log(error)
    }
  }

  useEffect(() => {
    const billingId = searchparams.get("id")

    if (billingId)
      if (window.location.pathname.includes("creditnote")) {
        fetchBillingInfo(billingId, true)
        setTitle("CN Info")
        setIsCN(true)
        setAmtLabel("Amt. Refund")
        setDateLabel("Return Date")
        setTableHeaders(CNProductListHeader)
      } else {
        setTableHeaders(BillingProductListHeader)
        fetchBillingInfo(billingId, false)
        setDateLabel("Billing Date")
        setAmtLabel("Amt. Paid")
        setTitle("Billing Info")
      }

  }, [])

  useEffect(() => {
    if (!products.length && tableHeaders.length)
      fetchProducts()
  }, [tableHeaders])
  return (
    <Layout>
      <div id="billingInfo-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "1vh" }}>{title}</p>
        <div style={{ width: "100%", height: "10%", display: "flex", justifyContent: "space-between", alignTracks: "center" }}>
          <Card require={true} m="1vh 0px" w="12%" h="60%" pd="0px 1%" name={"invoiceNo"} label="Invoice No" value={billingInfo.invoiceNo} onchange={() => { }} type="text" />
          <Card require={true} m="1vh 0px" w="12%" h="60%" pd="0px 1%" name={"billingDate"} label={dateLabel} value={billingInfo.billingDate} onchange={onChange} type="date" />
        </div>
        <div style={{ alignItems: "center", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ overflow: "auto", width: "100%", height: "65%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
            <Header headers={tableHeaders} />
            <Body headers={tableHeaders} mode={"update"} dataList={billingInfo.productsDetail} onChange={() => { }} onDelete={() => { }} products={products} />
          </div>
          <div style={{ alignItems: "center", height: "20%", width: "100%", display: "flex", flexWrap: "wrap" }}>
            <Card focus={true} require={true} w="15%" h="4%" name={"prescribedBy"} label="Prescribed By" value={billingInfo.prescribedBy} onchange={onChange} type="text" />
            <Card require={true} w="15%" h="4%" name={"patientName"} label="Patient Name" value={billingInfo.patientName} onchange={onChange} type="text" />
            <Card require={true} w="15%" h="4%" name={"mobileNumber"} label="Mobile Number" value={billingInfo.mobileNumber} onchange={onChange} type="text" />
            <Card require={true} w="20%" h="4%" name={"address"} label="Address" value={billingInfo.address} onchange={onChange} type="text" />
            <Card require={true} w="10%" h="4%" name={"subTotal"} label="Sub Total" value={parseFloat(billingInfo.subTotal).toFixed(2)} onchange={() => { }} type="text" />
            <Card require={true} w="5%" h="4%" name={"discount"} label="Discount" value={billingInfo.discount} onchange={() => { }} type="text" />
            <Card require={true} w="8%" h="4%" name={"roundoff"} label="Round Off" value={billingInfo.roundoff} onchange={() => { }} type="text" />
            <Card require={true} w="10%" h="4%" name={"grandTotal"} label="Grand Total" value={billingInfo.grandTotal} onchange={() => { }} type="text" />
            <Card require={true} w="10%" h="4%" name={"amtPaid"} label={amtLabel} value={billingInfo.amtPaid} onchange={() => { }} type="text" />
            <Card require={true} w="10%" h="4%" name={"amtDue"} label="Amt. Due" value={billingInfo.amtDue} onchange={() => { }} type="text" />
            {
              isCN ?
                <button disabled={btnDissable} onClick={onDeleteCN} className="custom-input-fields" style={{ width: "10%", margin: "0px 1.5vw", height: "30%", borderRadius: "0.4vw", backgroundColor: "#5e48e8", border: "none", color: "#ffffff", fontSize: "1rem" }}>Delete CN</button> :
                <>
                  <button disabled={btnDissable} onClick={onbillUpdate} className="custom-input-fields" style={{ width: "10%", margin: "0px 1.5vw", height: "30%", borderRadius: "0.4vw", backgroundColor: "#5e48e8", border: "none", color: "#ffffff", fontSize: "1rem" }}>Update Bill</button>
                  <button disabled={btnDissable} onClick={onbillCancel} style={{ width: "10%", height: "30%", borderRadius: "0.4vw", backgroundColor: "#ef3737", border: "none", color: "#ffffff", fontSize: "1rem" }}>Cancel Bill</button>
                </>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default BillingInfo;