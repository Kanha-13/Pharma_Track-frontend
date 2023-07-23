import { useState } from "react"
import Box from "../../images/icons/box.png"
import Valuation from "../../images/icons/valuation.png"
import { getStocksValuation } from "../../apis/stock";
const InventorySummary = () => {
  const [stocksValution, setValution] = useState("Hidden");
  const [totalStock, settotalStock] = useState("Hidden");

  const getvaluation = async () => {
    try {
      const res = await getStocksValuation();
      setValution(res.data)
    } catch (error) {
      console.log(error)
      alert("unable to get valuation!")
    }
  }

  const getTotalQnty = () => {
    // settotalStock()
  }

  const Card = ({ img, bgColor, label, value, w = "35%", onclick }) => {
    return (
      <div style={{ justifyContent: "space-between", display: "flex", padding: "2%", borderRadius: "0.5vw", alignItems: "center", width: "40%", height: "70%", margin: "auto", flexDirection: "column", backgroundColor: bgColor }}>
        <img onClick={onclick} src={img} style={{ cursor: "pointer", width: w }} />
        <label className="dashboard-label" style={{ width: "100%", textAlign: "center" }}>{label}</label>
        <p className="dashboard-value" style={{ width: "100%", textAlign: "center" }}>{value}</p>
      </div>
    );
  }
  return (
    <div className="dashboard-card" style={{ width: "20%", height: "16vh" }}>
      <p className="dashboard-title">Inventory Summary</p>
      <Card bgColor="#f4f4f4" img={Box} label={"Qnty. in Hand"} value={totalStock} onclick={getTotalQnty} />
      <Card bgColor="#f4f4f4" w="25%" img={Valuation} label={"Valuation"} value={stocksValution} onclick={getvaluation} />
    </div>
  );
}
export default InventorySummary;