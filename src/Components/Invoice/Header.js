import { toddmmyy } from "../../utils/DateConverter";

const Header = ({ billType = "CASH INVOICE", patientName, mobileNumber, prescribedBy, address, billingDate, invoiceNo }) => {
  return (
    <div style={{ borderBottom: "2px solid black", width: "100%", height: "15vh", alignItems: "center", display: "flex", flexWrap: "wrap" }}>
      <div style={{ width: "70%", padding: "0.5%", borderRight: "2px solid black", boxSizing: "border-box", height: "65%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
        <p style={{ fontSize: "1.3rem", fontWeight: "bold", fontFamily: "Castellar", margin: "0px" }}>AGRAWAL MEDICAL AND GENERAL STORE</p>
        <p style={{ margin: "0px", fontSize: "0.8rem" }}>BAJRANJ PARA, MAIN ROAD</p>
        <p style={{ margin: "0px", fontSize: "0.8rem" }}>SILIYARI Raipur (C.G.)</p>
        <p style={{ margin: "0px", fontSize: "0.8rem" }}>Phone :7987575131</p>
      </div>
      <div style={{ width: "30%", padding: "0.5%", fontSize: "0.8rem", height: "65%", display: "flex", boxSizing: "border-box", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
        <p style={{ margin: "0px", width: "100%" }}>Patient Name : {patientName}</p>
        <p style={{ margin: "0px", width: "100%" }}>Mobile No. : {mobileNumber}</p>
        <p style={{ margin: "0px", width: "100%" }}>Dr.Name. : {prescribedBy}</p>
        <p style={{ margin: "0px", width: "100%" }}>Address : {address}</p>
      </div>
      <div style={{ borderTop: "2px solid black", width: "100%", height: "35%", display: "flex" }}>
        <div style={{ fontSize: "0.7rem", fontSize: "0.8rem", height: "100%", flexWrap: "wrap", width: "50%", padding: "0.5%", boxSizing: "border-box", borderRight: "2px solid black", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ width: "100%", margin: "0px" }}>GSTIN NO. : 22</p>
          <p style={{ width: "100%", margin: "0px" }}>D.L.NO. : CG-RZ1-20-40016, CG-RZ1-21-40017</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0.5%", boxSizing: "border-box", width: "30%", height: "100%" }}>
          <p style={{ fontSize: "1.1rem", fontWeight: "bold", fontFamily: "Castellar", margin: "0px" }}>{billType}</p>
        </div>
        <div style={{ borderLeft: "2px solid black", height: "100%", width: "40%", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
          <p style={{ margin: "0px", width: "40%" }}>Invoice No.</p>
          <p style={{ margin: "0px", width: "50%" }}>: {invoiceNo}</p>
          <p style={{ margin: "0px", width: "40%" }}>Date</p>
          <p style={{ margin: "0px", width: "50%" }}>: {toddmmyy(billingDate)}</p>
        </div>
      </div>
    </div >
  );
}
export default Header;