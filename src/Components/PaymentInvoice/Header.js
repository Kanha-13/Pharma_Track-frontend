import { toddmmyy } from "../../utils/DateConverter";

const Header = ({ patientName="Test patient", mobileNumber="c1d56v1f65", paymentDate, paymentId }) => {
  return (
    <div style={{ borderBottom: "2px solid black", width: "100%", height: "12vh", alignItems: "center", display: "flex", flexWrap: "wrap" }}>
      <div style={{ width: "70%", padding: "0.5%", borderRight: "2px solid black", boxSizing: "border-box", height: "65%", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
        <p style={{ fontSize: "0.8rem", fontWeight: "bold", fontFamily: "Castellar", margin: "0px" }}>AGRAWAL MEDICAL & GENERAL STORE</p>
        <p style={{ margin: "0px", fontSize: "0.6rem" }}>BAJRANJ PARA, MAIN ROAD, SILIYARI RAIPUR (C.G.)</p>
        <p style={{ margin: "0px", fontSize: "0.6rem" }}>Phone :7987575131</p>
      </div>
      <div style={{ width: "30%", padding: "0.5%", fontSize: "0.7rem", height: "65%", display: "flex", boxSizing: "border-box", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
        <p style={{ margin: "0px", width: "100%" }}>Patient Name : {patientName}</p>
        <p style={{ margin: "0px", width: "100%" }}>Mobile No. : {mobileNumber}</p>
      </div>
      <div style={{ borderTop: "2px solid black", width: "100%", height: "35%", display: "flex" }}>
        <div style={{ fontSize: "0.7rem", fontSize: "0.8rem", height: "100%", flexWrap: "wrap", width: "54%", padding: "0.5%", boxSizing: "border-box", borderRight: "2px solid black", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ width: "100%", margin: "0px", fontSize: "0.6rem" }}>GSTIN NO. : 22</p>
          <p style={{ width: "100%", margin: "0px", fontSize: "0.6rem" }}>D.L.NO. : CG-RZ1-20-40016, CG-RZ1-21-40017</p>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0.5%", boxSizing: "border-box", width: "30%", height: "100%" }}>
          <p style={{ fontSize: "0.6rem", fontWeight: "bold", fontFamily: "Castellar", margin: "0px",textAlign:"center" }}>PAYMENT RECEIPT</p>
        </div>
        <div style={{ borderLeft: "2px solid black", height: "100%", width: "36%", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
          <p style={{ margin: "0px", width: "40%", fontSize: "0.6rem" }}>Payment Id</p>
          <p style={{ margin: "0px", width: "50%", fontSize: "0.6rem" }}>: {paymentId}</p>
          <p style={{ margin: "0px", width: "40%", fontSize: "0.6rem" }}>Date</p>
          <p style={{ margin: "0px", width: "50%", fontSize: "0.6rem" }}>: {toddmmyy(paymentDate)}</p>
        </div>
      </div>
    </div >
  );
}
export default Header;