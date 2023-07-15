import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import { getBg, getBorder, getColor } from "./utils";
import { useStore } from "../../Store/store";

import Chart from "chart.js/auto";
import MinimizeIcon from "../../images/icons/minimize1.png"
import SelectDuration from "./SelectDuration";
import LineChart from "./LineChart";

Chart.register(CategoryScale);

const DashboardGraph = ({ duration, onchange }) => {
  const { tradeStatistics } = useStore();
  const [cardStyle, setCardStyle] = useState({
    height: "26vh",
    width: "96%",
    position: "relative"
  })

  const [data1, setData1] = useState({
    label: "",
    fill: true,
    data: [],
    backgroundColor: (context) => {
      const ctx = context.chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, "#5e48e870");
      gradient.addColorStop(1, "#ffffff70");
      return gradient;
    },
    borderColor: "#5e48e870",
    borderWidth: 2,
    lineTention: 0.5,
  },)

  const [data2, setData2] = useState({
    label: "",
    fill: true,
    data: [],
    backgroundColor: (context) => {
      const ctx = context.chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, "#00d0ff70");
      gradient.addColorStop(1, "#ffffff70");
      return gradient;
    },
    borderColor: "#00d0ff70",
    borderWidth: 2,
    lineTention: 0.5,
  })

  const [data3, setData3] = useState({
    label: "",
    fill: true,
    data: [],
    backgroundColor: (context) => {
      const ctx = context.chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, "#fcb68470");
      gradient.addColorStop(1, "#ffffff70");
      return gradient;
    },
    borderColor: "#fcb68470",
    borderWidth: 2,
    lineTention: 0.5,
  })

  const [show, setShow] = useState({ sales: true, purchase: true, profit: true })

  const modalClick = (e, mode) => {
    e.stopPropagation()
    if (mode)
      setCardStyle({ position: "absolute", height: "75vh", width: "86%" })
    else
      setCardStyle({
        height: "26vh",
        width: "96%",
        position: "relative"
      })
  }

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [data1, data2, data3]
  });

  const onclickbtn = (name) => {
    let updateData = []
    switch (name) {
      case "sales":
        var _ = !show.sales ? updateData.push(data1) : null;
        _ = show.purchase ? updateData.push(data2) : null;
        _ = show.profit ? updateData.push(data3) : null;
        setShow({ ...show, sales: !show.sales })
        setChartData({ ...chartData, datasets: updateData })
        break;
      case "purchase":
        var _ = show.sales ? updateData.push(data1) : null;
        _ = !show.purchase ? updateData.push(data2) : null;
        _ = show.profit ? updateData.push(data3) : null;
        setShow({ ...show, purchase: !show.purchase })
        setChartData({ ...chartData, datasets: updateData })
        break;
      default:
        var _ = show.sales ? updateData.push(data1) : null;
        _ = show.purchase ? updateData.push(data2) : null;
        _ = !show.profit ? updateData.push(data3) : null;
        setShow({ ...show, profit: !show.profit })
        setChartData({ ...chartData, datasets: updateData })
        break;
    }
  }

  useEffect(() => {
    const d1 = { ...data1, data: tradeStatistics?.map((data) => data.sales) }
    const d2 = { ...data2, data: tradeStatistics?.map((data) => data.purchase) }
    const d3 = { ...data3, data: tradeStatistics?.map((data) => data.profit) }

    setChartData({ datasets: [d1, d2, d3], labels: tradeStatistics?.map((data) => data.xLabel) })

    setData1(d1)
    setData2(d2)
    setData3(d3)
  }, [tradeStatistics])

  return (
    <div id="graph" className="dashboard-card" style={{ position: cardStyle.position, height: cardStyle.height, width: cardStyle.width }}>
      <p className="dashboard-title" style={{ width: "40%" }}>Statistics</p>
      {cardStyle.position === "absolute" && <img onClick={(e) => modalClick(e, 0)} style={{ position: "absolute", right: 0, cursor: "pointer", top: 5, marginLeft: "auto", height: "4%" }} src={MinimizeIcon} />}
      <div style={{ marginLeft: "auto", width: "15vw", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => onclickbtn("sales")} style={{ borderRadius: "0.4vw", padding: "0.1rem 0.6rem", color: getColor("sales", show.sales), marginRight: "1vw", cursor: "pointer", borderWidth: "2px", borderColor: getBorder("sales", show.sales), backgroundColor: getBg("sales", show.sales) }}>Sales</button>
        <button onClick={() => onclickbtn("purchase")} style={{ borderRadius: "0.4vw", padding: "0.1rem 0.6rem", color: getColor("purchase", show.purchase), marginRight: "1vw", cursor: "pointer", borderWidth: "2px", borderColor: getBorder("purchase", show.purchase), backgroundColor: getBg("purchase", show.purchase) }}>Purchase</button>
        <button onClick={() => onclickbtn("profit")} style={{ borderRadius: "0.4vw", padding: "0.1rem 0.6rem", color: getColor("profit", show.profit), marginRight: "0vw", cursor: "pointer", borderWidth: "2px", borderColor: getBorder("profit", show.profit), backgroundColor: getBg("profit", show.profit) }}>Profit</button>
      </div>
      <SelectDuration value={duration} onchange={onchange} />
      <div style={{ width: "100%", height: "90%" }}>
        <LineChart chartData={chartData} modalClick={modalClick} />
      </div>
    </div>
  );
}
export default DashboardGraph;