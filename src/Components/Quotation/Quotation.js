import { QuotationListHeader } from "../../Constants/billing";
import { checkoutBill } from "../../apis/billing";

import Footer from "./Footer";
import CartRow from "./CartRow";

import './quotation.css'
import Card from "../ManualAddProduct/Card";
import { useState } from "react";
import { getyyyymmdd } from "../../utils/DateConverter";

const Quotation = ({addField, onremoveItem, openProductLists, itemsIncart = [], onchangeqnty, changeDisc, resetCart }) => {
  const [billingDate, setBillingDate] = useState(getyyyymmdd(new Date()));

  const oncheckout = async (billInfo, resetBillInfo) => {
    let modified_prod_list = itemsIncart.map((cart) => {
      delete cart.qnty
      return cart
    })
    billInfo.billingDate = billingDate
    try {
      let data = {
        billInfo: billInfo,
        productsDetail: modified_prod_list
      }
      const res = await checkoutBill(data)
      resetBillInfo()
      resetCart()
      addField()
    } catch (error) {
      console.log(error)
      alert("Can't process the bill, something went wrong!")
    }
  }

  return (
    <div id="quotation-container" className="borderbox" style={{

    }}>
      <div style={{ height: "10%", width: "100%", display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ margin: "1% 0%", width: "55%", textAlign: "right" }}>Invoice #</h2>
        <Card require={true} m="1vh 0px" w="12%" h="70%" pd="0px 1%" name={"billingDate"} label="Bill Date" value={billingDate} onchange={(name, value) => setBillingDate(value)} type="date" />
      </div>
      <hr width="95%" />
      <div style={{ height: "70%", width: "95%", display: "flex", flexDirection: "column" }}>
        <div style={{ borderBottom: "1px solid gray", display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
          {QuotationListHeader.map((head) => <p key={head.name + "in-quotation-table-head"} style={{ width: head.colSize, margin: "0.5vh 0px" }}>{head.name}</p>)}
          <p style={{margin:"0px"}}></p>
        </div>
        <div style={{height:"100%", borderBottom: "1px solid gray", display: "flex", flexDirection: "column", width: "100%" }}>
          {
            itemsIncart.map((item, index) => <CartRow openProductLists={openProductLists} onRemove={onremoveItem} item={item} onchangedisc={changeDisc} onchange={onchangeqnty} index={index} />)
          }
        </div>
      </div>
      <Footer addField={addField} oncheckout={oncheckout} carts={itemsIncart} />
    </div>
  );
}
export default Quotation;