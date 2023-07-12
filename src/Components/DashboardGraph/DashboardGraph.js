import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data1, Data2, Data3 } from "./Data";
import { Line } from "react-chartjs-2";
import MinimizeIcon from "../../images/icons/minimize1.png"
Chart.register(CategoryScale);

const DashboardGraph = () => {
  const [cardStyle, setCardStyle] = useState({
    height: "26vh",
    width: "96%",
    position: "inherit"
  })
  const [data1, setData1] = useState({
    label: "",
    fill: true,
    data: Data1.map((data) => data.userGain),
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
    data: Data2.map((data) => data.userGain),
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
    data: Data3.map((data) => data.userGain),
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
        position: "inherit"
      })
  }
  const LineChart = ({ chartData }) => {
    return (
      <div onClick={(e) => modalClick(e, 1)} style={{ cursor: "pointer", width: "100%", height: "100%" }}>
        <Line
          data={chartData}
          style={{ width: "100%", height: "100%" }}
          options={{
            maintainAspectRatio: false,
            elements: {
              point: {
                radius: 1
              }
            },
            plugins: {
              title: {
                display: true,
                text: "Sales - Purchase - Profit"
              },
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: true,
                },
              },
            },
            responsive: true,
          }}
        />
      </div>
    );
  }
  const [chartData, setChartData] = useState({
    labels: Data1.map((data) => data.year),
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

  const getColor = (name) => {
    if (name) return "#5e48e8"
    else return "gray"
  }
  const getBorder = (name) => {
    if (name) return "#5e48e8"
    else return "gray"
  }
  const getBg = (name) => {
    if (name) return "#ebe8fc"
    else return "#f5f5f5"
  }

  return (
    <div id="graph" className="dashboard-card" style={{ position: cardStyle.position, height: cardStyle.height, width: cardStyle.width }}>
      <p className="dashboard-title" style={{ width: "40%" }}>Statistics</p>
      {cardStyle.position === "absolute" && <img onClick={(e) => modalClick(e, 0)} style={{ position: "absolute", right: 5, cursor: "pointer", top: 5, marginLeft: "auto", height: "4%" }} src={MinimizeIcon} />}
      <div style={{ marginLeft: "auto", width: "50%", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <button onClick={() => onclickbtn("sales")} style={{ borderRadius: "0.4vw", padding: "0.1rem 0.6rem", color: getColor(show.sales), marginRight: "1vw", cursor: "pointer", borderWidth: "2px", borderColor: getBorder(show.sales), backgroundColor: getBg(show.sales) }}>Sales</button>
        <button onClick={() => onclickbtn("purchase")} style={{ borderRadius: "0.4vw", padding: "0.1rem 0.6rem", color: getColor(show.purchase), marginRight: "1vw", cursor: "pointer", borderWidth: "2px", borderColor: getBorder(show.purchase), backgroundColor: getBg(show.purchase) }}>Purchase</button>
        <button onClick={() => onclickbtn("profit")} style={{ borderRadius: "0.4vw", padding: "0.1rem 0.6rem", color: getColor(show.profit), marginRight: "1vw", cursor: "pointer", borderWidth: "2px", borderColor: getBorder(show.profit), backgroundColor: getBg(show.profit) }}>Profit</button>
      </div>
      <div style={{ width: "100%", height: "90%" }}>
        <LineChart chartData={chartData} />
      </div>
    </div>
  );
}
export default DashboardGraph;