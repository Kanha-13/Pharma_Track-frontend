import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";

const PaymentInvoice = ({ onClose, data = {}, totalcreditBills }) => {
  const { patientName, bills = [], paymentDetail } = data
  const [paidBillsData, setPaidBillsData] = useState([])
  const [printState, setPrintState] = useState(false)
  const [totalBalance, setTotalBal] = useState(0)
  useEffect(() => {
    if (printState) {
      setTimeout(() => {
        window.print()
        onClose()
      }, 1000);
    }
  }, [printState])
  useEffect(() => {
    setPrintState(true)
    let amt = 0;
    let billss = []
    totalcreditBills.map((bill) => {
      amt += bill.grandTotal
      if (bills.includes(bill._id))
        billss.push(bill)
    })
    setPaidBillsData(billss)
    setTotalBal(amt)
  }, [])
  return (
    <div style={{ position: "fixed", width: "100vw", top: 0, left: 0, height: "100vh" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "#ffffff" }}>
        <div style={{ width: "50vw", height: "50vh", border: "2px solid black" }}>
          <Header billType={data.amtDue ? "CREDIT INVOICE" : "CASH INVOICE"} {...data} paymentId={paymentDetail.paymentId} />
          <Body billsPaid={paidBillsData} />
          <Footer {...paymentDetail} grandTotal={totalBalance} />
        </div>
      </div>
    </div>
  );
}
export default PaymentInvoice;