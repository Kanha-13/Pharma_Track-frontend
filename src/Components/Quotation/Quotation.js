import { QuotationListHeader } from "../../Constants/billing";
import { addCN, cancelSaleBill, checkoutBill, getBillingInfo } from "../../apis/billing";

import Footer from "./Footer";
import CartRow from "./CartRow";

import './quotation.css'
import Card from "../ManualAddProduct/Card";
import { useEffect, useState } from "react";
import { getyyyymmdd } from "../../utils/DateConverter";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants/routes_frontend";
import CNInfo from "./CNInfo";

const Quotation = ({ isCN, oldBillId, addField, onremoveItem, openProductLists, itemsIncart = [], onchangeqnty, changeDisc, resetCart }) => {
  const navigate = useNavigate();
  const [billingDate, setBillingDate] = useState(getyyyymmdd(new Date()));
  const [invoiceNo, setInvoiceNo] = useState("")
  const [cnData, setCNdata] = useState({})

  const oncheckout = async (billInfo, resetBillInfo) => {
    let modified_prod_list = itemsIncart.map((cart) => {
      delete cart.qnty
      return cart
    })

    billInfo.billingDate = billingDate
    //below data when CN is mergend with the current bill
    billInfo.cnId = cnData._id || null
    billInfo.creditAmt = cnData.amtRefund || 0

    try {
      let data = {
        billInfo: billInfo,
        productsDetail: modified_prod_list
      }
      let res = {}
      if (oldBillId)
        res = await cancelSaleBill(oldBillId, data)
      else if (isCN)
        res = await addCN(data)
      else
        res = await checkoutBill(data)
      resetBillInfo()
      resetCart()
      addField()
      setCNdata({})
      navigate(ROUTES.PROTECTED_ROUTER + ROUTES.BILLINGS)// do not remove this it is useful to go from cancel bill to billing
    } catch (error) {
      console.log(error)
      alert("Can't process the bill, something went wrong!")
    }
  }

  const fetchBillingInfo = async (id) => {
    try {
      const res = await getBillingInfo(id);
      res.data.billingDate = getyyyymmdd(res.data.billingDate)
      setInvoiceNo(res.data.invoiceNo)
      setBillingDate(res.data.billingDate)
    } catch (error) {
      console.log(error)
      alert("Unable to cancel bill")
    }
  }

  const getTitle = () => {
    if (isCN)
      return "CREDIT NOTE"
    else
      return `INVOICE #${invoiceNo}`
  }

  useEffect(() => {
    if (oldBillId)// if routed from cancel bill
      fetchBillingInfo(oldBillId)
  }, [])

  return (
    <div id="quotation-container" className="borderbox" style={{

    }}>
      <div style={{ height: "10%", width: "100%", display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ margin: "1% 0%", width: "55%", textAlign: "right" }}>{getTitle()}</h2>
        <Card require={true} m="1vh 0px" w="12%" h="70%" pd="0px 1%" name={"billingDate"} label="Bill Date" value={billingDate} onchange={(name, value) => setBillingDate(value)} type="date" />
      </div>
      <hr width="95%" />
      <div style={{overflow:"auto", height: "70%", width: "95%", display: "flex", flexDirection: "column", borderBottom: "1px solid gray" }}>
        <div style={{ borderBottom: "1px solid gray", display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
          {QuotationListHeader.map((head) => <p key={head.name + "in-quotation-table-head"} style={{ width: head.colSize, margin: "0.5vh 0px" }}>{head.name}</p>)}
          <p style={{ margin: "0px" }}></p>
        </div>
        <div style={{ height: "auto", borderBottom: "1px solid gray", display: "flex", flexDirection: "column", width: "100%" }}>
          {
            itemsIncart.map((item, index) => <CartRow isCN={isCN} key={item._id + "billing-quotation-cartrow"} openProductLists={openProductLists} onRemove={onremoveItem} item={item} onchangedisc={changeDisc} onchange={onchangeqnty} index={index} />)
          }
        </div>
        {cnData._id && <CNInfo data={cnData} />}
      </div>
      <Footer isCN={isCN} addField={addField} oncheckout={oncheckout} carts={itemsIncart} onsetCNInfo={(data) => setCNdata(data)} />
    </div>
  );
}
export default Quotation;