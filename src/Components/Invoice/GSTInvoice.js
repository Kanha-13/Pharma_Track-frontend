import { useEffect, useState } from "react";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

import './invoice.css'
const GSTInvoice = ({ data = {}, onClose }) => {
  const { productsDetail = [] } = data
  const [printState, setState] = useState(0)
  useEffect(() => {
    if (printState) {
      setTimeout(() => {
        window.print()
        onClose()
      }, 2000);
    }
  }, [printState])
  useEffect(() => {
    setState(true)
  }, [])
  return (
    <div style={{ position: "fixed", width: "100vw", top: 0, left: 0, height: "100vh" }}>
      <div id="invoice-template-wrapper">
        <div id="invoice-template">
          <Header billType={data.type === "CN" ? "CREDIT NOTE" : data.amtDue ? "CREDIT INVOICE" : "CASH INVOICE"} {...data} />
          <Body productsDetail={productsDetail} />
          <Footer {...data} />
        </div>
      </div>
    </div>
  );
}
export default GSTInvoice;