import { useState } from "react";
import Card from "../ManualAddProduct/Card";

const SettlementDeleteModal = ({ onDelete, oncancel }) => {
  const [settlementDate, setSettlementDate] = useState()
  const [amtRefunded, setAmt] = useState(0);
  const handleSubmit = () => {
    onDelete(settlementDate, amtRefunded)
  }
  return (
    <div onClick={(e) => e.stopPropagation()} style={{ padding: "1% 2%", top: "25%", right: "25%", border: "1px solid #5e48e8", position: "absolute", width: "40vw", height: "35vh", borderRadius: "0.4vw", backgroundColor: "#ffffff", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
      <p style={{ height: "3vh", width: "100%", borderBottom: "1px solid #d6d8e7", paddingBottom: "5px" }}>Delete Settlement</p>
      <Card focus={true} require={true} m="1vh 0px" w="25%" h="15%" pd="0px 1%" name={"settlementDate"} label="Settlement Date" value={settlementDate} onchange={(name, value) => setSettlementDate(value)} type="date" />
      <Card require={true} m="1vh 0px" w="25%" h="15%" pd="0px 1%" name="paymentId" label="amtRefunded" ph="Amt refunded" value={amtRefunded} onchange={(name, value) => setAmt(value)} type="text" />
      <button className="custom-input-fields" onClick={handleSubmit} style={{ cursor: "pointer", marginLeft: "55%", width: "8vw", height: "4vh", border: "none", borderRadius: "0.4vw", backgroundColor: "#5e48e8", color: "#ffffff", fontSize: "1rem" }}>Submit</button>
      <button onClick={oncancel} style={{ cursor: "pointer", marginLeft: "0%", width: "8vw", height: "4vh", border: "1px solid #5e48e8", borderRadius: "0.4vw", backgroundColor: "#ffffff", color: "#5e48e8", fontSize: "1rem" }}>Cancel</button>
    </div>
  );
}
export default SettlementDeleteModal