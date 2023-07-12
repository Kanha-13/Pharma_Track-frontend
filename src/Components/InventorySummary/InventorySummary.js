import Box from "../../images/icons/box.png"
import Valuation from "../../images/icons/valuation.png"
const InventorySummary = () => {
  const Card = ({ img, bgColor, label, value,w="35%" }) => {
    return (
      <div style={{ justifyContent: "space-between", display: "flex", padding: "2%", borderRadius: "0.5vw", alignItems: "center", width: "40%", height: "70%", margin: "auto", flexDirection: "column", backgroundColor: bgColor }}>
        <img src={img} style={{ width: w }} />
        <label className="dashboard-label" style={{ width: "100%", textAlign: "center" }}>{label}</label>
        <p className="dashboard-value" style={{ width: "100%", textAlign: "center" }}>{value}</p>
      </div>
    );
  }
  return (
    <div className="dashboard-card" style={{ width: "20%", height: "16vh" }}>
      <p className="dashboard-title">Inventory Summary</p>
      <Card bgColor="#f4f4f4" img={Box} label={"Qnty. in Hand"} value={45} />
      <Card bgColor="#f4f4f4" w="28%" img={Valuation} label={"Valuation"} value={4500000} />
    </div>
  );
}
export default InventorySummary;