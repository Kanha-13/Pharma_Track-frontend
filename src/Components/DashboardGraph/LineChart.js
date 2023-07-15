import { Line } from "react-chartjs-2";

const LineChart = ({ chartData, modalClick }) => {
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
              title: {
                display: true,
                text: "Date/Month",
                padding:"0px",
                margin:"0px"
                
              }
            },
            y: {
              grid: {
                display: true,
              },
              title: {
                display: true,
                text: "Rupees ₹",
                padding:"0px",
                margin:"0px"
              }
            },
          },
          responsive: true,
        }}
      />
    </div>
  );
}

export default LineChart;