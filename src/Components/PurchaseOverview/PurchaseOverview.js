import SalesCountIcon from "../../images/icons/salesCount.png"
import Growth from "../../images/icons/growth.png"
import coin from "../../images/icons/coin.png"
import ProfitGrowth from "../../images/icons/profitGrowth.png"
import { memo } from "react"
import { useStore } from "../../Store/store"
import SelectDuration from "../DashboardGraph/SelectDuration"

const PurchaseOverview = ({duration,onchange}) => {
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
    <div className="dashboard-card" style={{ width: "32%", height: "16vh", position: "relative" }}>
      <p className="dashboard-title">Purchase Overview</p>
      <SelectDuration value={duration} onchange={onchange} />
      <Card img={SalesCountIcon} bgColor="#e8dcfd" label="Total Purchase" value={tradeAnalysis?.tpc} />
      <Card img={Growth} bgColor="#d5ffd5" label="Investment" value={tradeAnalysis?.ti} />
      <Card img={coin} bgColor="#ffffbc" label={"Avg. amt"} value={tradeAnalysis?.apa} />
      <Card img={ProfitGrowth} bgColor="#ffecca" label={"Credit"} value={tradeAnalysis?.tpcr} />
    </div>
  );
}
export default memo(PurchaseOverview);