import Growth from "../../images/icons/growth.png"
import LossIcon from "../../images/icons/loss.png"
import coin from "../../images/icons/coin.png"
import ProfitGrowth from "../../images/icons/profitGrowth.png"
import { memo } from "react"
import { useStore } from "../../Store/store"
import SelectDuration from "../DashboardGraph/SelectDuration"

const PurchaseOverview = ({ duration, onchange }) => {
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
      <Card img={Growth} bgColor="#d5ffd5" label="Investment" value={tradeAnalysis?.ti} />
      <Card img={coin} bgColor="#ffffbc" label={"Credit Taken"} value={tradeAnalysis?.tpcr} />
      <Card img={LossIcon} bgColor="#fddcdc" label="Total Loss" value={tradeAnalysis?.tl} />
      <Card img={ProfitGrowth} bgColor="#ffecca" label={"Credit Paid Off"} value={tradeAnalysis?.cpo} />
    </div>
  );
}
export default memo(PurchaseOverview);