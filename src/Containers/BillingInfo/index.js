import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteCN, getBillingInfo, getCNInfo, updateBillingInfo } from "../../apis/billing";
import { BillingProductListHeader, CNListInQuotation, CNProductListHeader } from "../../Constants/billing";
import { getyyyymmdd } from "../../utils/DateConverter";
import { ROUTES } from "../../Constants/routes_frontend";

import Layout from "../../Components/Layout/Layout";
import Header from "../../Components/ProductAddForm/Header";
import Body from "../../Components/ProductAddForm/Body";
import Card from "../../Components/ManualAddProduct/Card";

import './index.css'

const BillingInfo = () => {
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();
  const [billingInfo, setBillingInfo] = useState({})
  const [btnDissable, setDisableBtn] = useState(false)
  const [dateLabel, setDateLabel] = useState("")
  const [amtLabel, setAmtLabel] = useState("")
  const [invoiceLabel, setInvoiceLabel] = useState("")
  const [title, setTitle] = useState("")
  const [isCN, setIsCN] = useState(0)
  const [tableHeaders, setTableHeaders] = useState([])

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

  const deleteProd = (index) => {
    let updateBillInfo = billingInfo

    if (updateBillInfo.removedItem)//creating a lsit for removed item
      updateBillInfo.removedItem.push({
        pId: billingInfo.productsDetail[index].pId,
        qnty: billingInfo.productsDetail[index].soldQnty,
        batch: billingInfo.productsDetail[index].batch
      })
    else
      updateBillInfo.removedItem = [{
        pId: billingInfo.productsDetail[index].pId,
        qnty: billingInfo.productsDetail[index].soldQnty,
        batch: billingInfo.productsDetail[index].batch
      }]

    let updateProdList = billingInfo.productsDetail.filter((prod, ind) => ind !== index)
    let subtotal = "0";// for total without discount
    let total = "0";//for total with discount

    //calculating new sub total, grand total , discount, amt paid
    updateProdList.map((cart, index) => {
      let mrp_per_unit = cart.mrp  // tablet or bottle
      if (/^\d+$/.test(cart.pkg))
        mrp_per_unit = cart.mrp / cart.pkg
      subtotal = parseFloat(mrp_per_unit * cart.soldQnty) + parseFloat(subtotal)
      total = parseFloat(cart.total) + parseFloat(total)
    })
    delete updateBillInfo.productsDetail
    let discountInRS = parseFloat(subtotal - total).toFixed(2)
    updateBillInfo.discount = discountInRS
    let gttl = Math.round(total)
    updateBillInfo.roundoff = parseFloat(gttl - (subtotal - discountInRS)).toFixed(2)
    updateBillInfo.subTotal = parseFloat(subtotal).toFixed(2)
    updateBillInfo.grandTotal = gttl
    updateBillInfo.amtPaid = gttl
    setBillingInfo({ ...updateBillInfo, productsDetail: updateProdList })
  }

  const fetchCNInfo = async (id) => {
    try {
      const res = await getCNInfo(id)
      setBillingInfo((prev) => {
        return { ...prev, cnList: res.data }
      })
    } catch (error) {
      console.log(error)
      alert("unable to get cn info!")
    }
  }

  useEffect(() => {
    if (billingInfo.cnId)
      fetchCNInfo(billingInfo.cnId)
  }, [billingInfo])

  useEffect(() => {
    const billingId = searchparams.get("id")

    if (billingId)
      if (window.location.pathname.includes("creditnote")) {
        fetchBillingInfo(billingId, true)
        setTitle("CN Info")
        setIsCN(true)
        setInvoiceLabel("CN No.")
        setAmtLabel("Amt. Refund")
        setDateLabel("Return Date")
        setTableHeaders(CNProductListHeader)
      } else {
        setTableHeaders(BillingProductListHeader)
        fetchBillingInfo(billingId, false)
        setInvoiceLabel("Invocie No.")
        setDateLabel("Billing Date")
        setAmtLabel("Amt. Paid")
        setTitle("Billing Info")
      }

  }, [])

  return (
    <Layout>
      <div id="billingInfo-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "1vh" }}>{title}</p>
        <div style={{ width: "100%", height: "10%", display: "flex", justifyContent: "space-between", alignTracks: "center" }}>
          <Card require={true} m="1vh 0px" w="12%" h="60%" pd="0px 1%" name={"invoiceNo"} label={invoiceLabel} value={billingInfo.invoiceNo} onchange={() => { }} type="text" />
          <Card require={true} m="1vh 0px" w="12%" h="60%" pd="0px 1%" name={"billingDate"} label={dateLabel} value={billingInfo.billingDate} onchange={onChange} type="date" />
        </div>
        <div style={{ alignItems: "center", width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ overflow: "auto", width: "100%", height: "65%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
            <Header headers={tableHeaders} />
            <Body headers={tableHeaders} mode={"add"} dataList={billingInfo.productsDetail} onChange={() => { }} onDelete={deleteProd} />
            {
              billingInfo.cnId && <div style={{ margin: "2vh 0px", borderBottom: "1px solid black", width: "100%", height: "auto", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ margin: "0px", width: "100%", marginTop: "3vh" }}>RET/EXP/DAMAGE/NON-SALABLE</p>
                <Header headers={CNListInQuotation} />
                <Body headers={CNListInQuotation} mode={"update"} dataList={billingInfo.cnList?.productsDetail} onChange={() => { }} onDelete={() => { }} />
              </div>
            }
          </div>
          <div style={{ alignItems: "center", height: "20%", width: "100%", display: "flex", flexWrap: "wrap" }}>
            <Card focus={true} require={true} w="15%" h="4%" name={"prescribedBy"} label="Prescribed By" value={billingInfo.prescribedBy} onchange={onChange} type="text" />
            <Card require={true} w="15%" h="4%" name={"patientName"} label="Patient Name" value={billingInfo.patientName} onchange={onChange} type="text" />
            <Card require={true} w="15%" h="4%" name={"mobileNumber"} label="Mobile Number" value={billingInfo.mobileNumber} onchange={onChange} type="text" />
            <Card require={true} w="20%" h="4%" name={"address"} label="Address" value={billingInfo.address} onchange={onChange} type="text" />
            <Card require={true} w="8%" h="4%" name={"subTotal"} label="Sub Total" value={parseFloat(billingInfo.subTotal).toFixed(2)} onchange={() => { }} type="text" />
            <Card require={true} w="5%" h="4%" name={"discount"} label="Discount" value={billingInfo.discount} onchange={() => { }} type="text" />
            <Card require={true} w="4%" h="4%" name={"roundoff"} label="R. Off" value={billingInfo.roundoff} onchange={() => { }} type="text" />
            <Card require={true} w="8%" h="4%" name={"creditAmt"} label="Credit Amt" value={billingInfo.creditAmt || 0} onchange={() => { }} type="text" />
            <Card require={true} w="8%" h="4%" name={"grandTotal"} label="Grand Total" value={billingInfo.grandTotal} onchange={() => { }} type="text" />
            <Card require={true} w="8%" h="4%" name={"amtPaid"} label={amtLabel} value={billingInfo.amtPaid} onchange={() => { }} type="text" />
            <Card require={true} w="5%" h="4%" name={"amtDue"} label="Amt. Due" value={billingInfo.amtDue} onchange={() => { }} type="text" />
            {
              isCN ?
                <button disabled={btnDissable} onClick={onDeleteCN} className="custom-input-fields" style={{ width: "10%", margin: "0px 1.5vw", height: "30%", borderRadius: "0.4vw", backgroundColor: "#5e48e8", border: "none", color: "#ffffff", fontSize: "1rem" }}>Delete CN</button> :
                <>
                  <button disabled={btnDissable} onClick={onbillUpdate} className="custom-input-fields" style={{ width: "10%", margin: "0px 1.5vw", height: "30%", borderRadius: "0.4vw", backgroundColor: "#5e48e8", border: "none", color: "#ffffff", fontSize: "1rem", cursor: "pointer" }}>Update Bill</button>
                  <button disabled={btnDissable} onClick={onbillCancel} style={{ width: "10%", height: "30%", borderRadius: "0.4vw", backgroundColor: "#ef3737", border: "none", color: "#ffffff", fontSize: "1rem", cursor: "pointer" }}>Cancel Bill</button>
                </>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default BillingInfo;