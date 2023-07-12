import { Line } from "react-chartjs-2";
// import { Data } from "../../Components/DashboardGraph/Data";
const TestChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May','vnjfdv','vdfvbjhfbhvjf','vfvf','vfvf','vfv'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 15, 7, 12,60 ,12,12,123,12,12,1,21,29],
        fill: true,
        // borderColor: 'rgb(75, 192, 192)',
        borderWidth: 0,
        tension: 0.1,
        backgroundColor: "red"
      },
    ],
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ width: "50%", height: "25vh"}}>
        <Line data={data} style={{}} options={{
          responsive:true,
          scales:{
            x:{
              grid:{
                display:false,
                tickWidth:350,
                drawTicks:true
              },
              ticks:{
                tickWidth:50
              }
            },
          }
        }} />
      </div>
      <div style={{ width: "100%", height: "25vh"}}>
        <Line data={data} style={{}} options={{
          responsive:true,
          maintainAspectRatio:false,
          scales:{
            x:{
              grid:{
                display:false,
                tickWidth:120,
                tickLength:50,
                tickColor:"blue",
                drawTicks:false
              },
              ticks:{
                tickWidth:50
              }
            },
          }
        }} />
      </div>
    </div>
  );
}
export default TestChart;