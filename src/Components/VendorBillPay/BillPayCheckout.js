import { useState } from "react";
import Card from "../ManualAddProduct/Card";
import { BillPaymentMode } from "../../Constants/Purchase";
import InputDate from "../CustomDateInput/DateInput";

const BillPayCheckOut = ({ onsubmit, oncancel, billType }) => {
  const [paymentMode, setPaymentMode] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [newBillNo, setNewBillNo] = useState("");
  const [newBillDate, setBillDate] = useState()
  const [paymentDate, setPaymentDate] = useState()
  const handleSubmit = () => {
    const data = { paymentMode, paymentId, newBillDate, paymentDate, newBillNo }
    onsubmit(data)
  }
  return (
    <div onClick={(e) => e.stopPropagation()} style={{ padding: "1% 2%", top: "25%", right: "25%", border: "1px solid #5e48e8", position: "absolute", width: "40vw", height: "35vh", borderRadius: "0.4vw", backgroundColor: "#ffffff", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
      <p style={{ height: "3vh", width: "100%", borderBottom: "1px solid #d6d8e7", paddingBottom: "5px" }}>Payment Info</p>
      <InputDate require={true} m="1.5% 1%" w="30%" h="6%" pd="2%" name={"paymentDate"} label="Payment Date" value={paymentDate} onchange={(name, value) => setPaymentDate(value)} type="fulldate" />
      {billType === "CHALAN" && <Card require={true} m="1vh 0px" w="25%" h="15%" pd="0px 1%" name={"newBillDate"} label="New Bill Date" value={newBillDate} onchange={(name, value) => setBillDate(value)} type="date" />}
      <Card require={true} m="1vh 0px" w="25%" h="15%" pd="0px 1%" name="paymentMode" label="Payment Mode" value={paymentMode} onchange={(name, value) => setPaymentMode(value)} type="select" options={BillPaymentMode} />
      <Card require={true} m="1vh 0px" w="25%" h="15%" pd="0px 1%" name="paymentId" label="Payment Id" ph="payment id" value={paymentId} onchange={(name, value) => setPaymentId(value)} type="text" />
      {billType === "CHALAN" && <Card require={true} m="1vh 0px" w="25%" h="15%" pd="0px 1%" name="newBillNo" label="New Bill No." ph="bill number" value={newBillNo} onchange={(name, value) => setNewBillNo(value)} type="text" />}
      <button className="custom-input-fields" onClick={handleSubmit} style={{ cursor: "pointer", marginLeft: "55%", width: "8vw", height: "4vh", border: "none", borderRadius: "0.4vw", backgroundColor: "#5e48e8", color: "#ffffff", fontSize: "1rem" }}>Submit</button>
      <button onClick={oncancel} style={{ cursor: "pointer", marginLeft: "0%", width: "8vw", height: "4vh", border: "1px solid #5e48e8", borderRadius: "0.4vw", backgroundColor: "#ffffff", color: "#5e48e8", fontSize: "1rem" }}>Cancel</button>
    </div>
  );
}
export default BillPayCheckOut;