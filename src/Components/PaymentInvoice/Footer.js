import { numbersInWords } from "../../utils/billing";

const Footer = ({ grandTotal = 0, amtPaid }) => {
  return (
    <div style={{ width: "100%", height: "13vh", alignItems: "center", display: "flex", flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", height: "15%", fontWeight: "bolder", margin: "0px", fontSize: "0.7em", width: "100%", textAlign: "center", borderBottom: "2px solid black" }}>Amt. in words. : {numbersInWords(grandTotal || 0)} only.</div>
      <div style={{ fontSize: "0.5rem", height: "35%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "0.5%", boxSizing: "border-box", width: "50%", borderRight: "2px solid black" }}>
        <p style={{ margin: "0px", fontSize: "0.6rem", fontWeight: "bold", borderBottom: "2px solid black" }}>Terms & Conditions</p>
        <p style={{ margin: "0px" }}>1.Goods once sold will not be taken back or exchanged.</p>
        <p style={{ margin: "0px" }}>2.All disputes subject to Raipur Jurisdication Only.</p>
      </div>
      <div style={{ fontSize: "0.5rem", height: "35%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "0.5%", boxSizing: "border-box", width: "50%" }}>
        <p style={{ margin: "0px" }}>Receiver's Signature:</p>
        <p style={{ margin: "0px" }}>Store Seal</p>
        <p style={{ margin: "0px" }}>For Agrawal Medical & General Store,Silyari</p>
        <p style={{ margin: "0px" }}>Authorized Signature</p>
      </div>
      <div style={{ borderTop: "2px solid black", fontSize: "0.6rem", flexWrap: "wrap", height: "50%", display: "flex", flexDirection: "row", justifyContent: "center", padding: "0.5%", boxSizing: "border-box", width: "100%" }}>
        <p style={{ margin: "0px", width: "50%", fontWeight: "600" }}>PAID</p>
        <p style={{ margin: "0px", width: "50%", fontWeight: "600" }}>: {amtPaid}</p>
        <p style={{ margin: "0px", width: "50%", fontWeight: "600" }}>OUTSTANDING BALANCE</p>
        <p style={{ margin: "0px", width: "50%", fontWeight: "600" }}>: {grandTotal - amtPaid}</p>
      </div>
    </div>
  );
}
export default Footer;