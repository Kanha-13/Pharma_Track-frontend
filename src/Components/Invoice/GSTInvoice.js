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
      window.print()
      onClose()
    }
  }, [printState])
  useEffect(() => {
    setState(true)
  }, [])
  return (
    <div style={{ position: "fixed", width: "100vw", top: 0, left: 0, height: "100vh" }}>
      <div id="invoice-template">
        <Header billType={data.amtDue ? "CREDIT INVOICE" : "CASH INVOICE"} {...data} />
        <Body productsDetail={productsDetail} />
        <Footer {...data} />
      </div>
    </div>
  );
}
export default GSTInvoice;