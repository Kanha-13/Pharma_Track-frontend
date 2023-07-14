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
    <div className="dashboard-card" style={{ width: "34%", height: "22vh" }}>
      <p className="dashboard-title">Category wise Sales</p>
      <select style={{ width: "1.3vw", border: "none", cursor: "pointer", marginLeft: "auto" }}>
        <option style={{ fontSize: "1.1rem" }}>Yearly</option>
        <option style={{ fontSize: "1.1rem" }}>Custom</option>
      </select>
      <div style={{ width: "90%", height: "80%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Doughnut style={{ width: "100%" }} data={data} options={{
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
      </div>
      <div style={{ width: "10%", height: "60%", margin: "auto", paddingBottom: "1.5vh", display: "flex", flexDirection: "column", justifyContent: 'space-between' }}>
        <p className='dashboard-label'>20%</p>
        <p className='dashboard-label'>20%</p>
        <p className='dashboard-label'>25%</p>
        <p className='dashboard-label'>20%</p>
        <p className='dashboard-label'>25%</p>
      </div>
    </div>
  );
}

export default CategoryWiseSale;