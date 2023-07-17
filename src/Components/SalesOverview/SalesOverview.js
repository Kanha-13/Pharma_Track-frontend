import SalesCountIcon from "../../images/icons/salesCount.png"
import Growth from "../../images/icons/growth.png"
import coin from "../../images/icons/coin.png"
import ProfitGrowth from "../../images/icons/profitGrowth.png"
import { useStore } from "../../Store/store"
import { memo } from "react"
import SelectDuration from "../DashboardGraph/SelectDuration"

const SalesOverview = ({ duration, onchange }) => {
  const { tradeAnalysis } = useStore()
  const Card = ({ img, bgColor, label, value }) => {
    return (
      <div style={{ display: "flex", width: "50%", height: "35%", margin: "auto" }}>
        <div style={{ height: "90%", width: "25%", backgroundColor: bgColor, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "1vw", marginRight: "0.7vw" }}>
          <img src={img} style={{ height: "60%" }} />
        </div>
        <div>
          <label className="dashboard-label">{label}</label>
          <p className="dashboard-value">{value}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-card" style={{ width: "32%", height: "16vh" }}>
      <p className="dashboard-title">Sales Overview</p>
      <SelectDuration value={duration} onchange={onchange} />
      <Card img={Growth} bgColor="#d5ffd5" label="Renvenue" value={tradeAnalysis?.tr} />
      <Card img={coin} bgColor="#ffffbc" label={"Credit Given"} value={tradeAnalysis?.tscr} />
      <Card img={ProfitGrowth} bgColor="#ffecca" label={"Profit"} value={tradeAnalysis?.tp} />
      <Card img={SalesCountIcon} bgColor="#e8dcfd" label="Credit Collection" value={tradeAnalysis?.cc} />
      {/* <Card img={coin} bgColor="#ffffbc" label={"Avg. amt"} value={tradeAnalysis?.asa} /> */}
    </div>
  );
}
export default memo(SalesOverview);