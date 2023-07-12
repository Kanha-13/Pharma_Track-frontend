import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['ALLOPATHIC', 'AYURVEDIC', 'GENERAL', 'GENERIC', 'SURGICAL'],
  datasets: [
    {
      data: [25, 20, 20, 25, 10],
      label: '',
      backgroundColor: [
        '#7e36f4',
        '#f65dfc',
        '#00d0ff',
        '#3247d4',
        '#fcb684',
      ],
      borderWidth: 0,
    },
  ],
};

const CategoryWiseSale = () => {
  return (
    <div className="dashboard-card" style={{ width: "32%", height: "22vh" }}>
      <p className="dashboard-title">Category wise Sales</p>
      <div style={{ width: "100%", height: "80%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Doughnut style={{ width: "90%" }} data={data} options={{
          responsive: true,
          radius: "100%",
          maintainAspectRatio: false,
          plugins: {
            tooltip: {

            },
            legend: {
              position: "right",
              // display: false
            }
          }
        }} />
        <div style={{width:"10%",height:"70%",display:"flex",flexDirection:"column",justifyContent:'space-between'}}>
          <p style={{margin:"0px"}}>20%</p>
          <p style={{margin:"0px"}}>20%</p>
          <p style={{margin:"0px"}}>25%</p>
          <p style={{margin:"0px"}}>20%</p>
          <p style={{margin:"0px"}}>25%</p>
        </div>
      </div>
    </div>
  );
}

export default CategoryWiseSale;