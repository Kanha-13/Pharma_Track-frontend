import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useStore } from '../../Store/store';
import SelectDuration from '../DashboardGraph/SelectDuration';
import { calculateCategoryPercentage } from '../DashboardGraph/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryWisePurchase = ({duration,onchange}) => {
  const { tradeAnalysis } = useStore()
  const [categorywisepurchase, setCategorywisepurchase] = useState({})

  const data = {
    labels: ['ALLOPATHIC', 'AYURVEDIC', 'GENERAL', 'GENERIC', 'SURGICAL'],
    datasets: [
      {
        data: [
          categorywisepurchase.allopathic, categorywisepurchase.ayurvedic,
          categorywisepurchase.general, categorywisepurchase.generic, categorywisepurchase.surgical
        ],
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


  useEffect(() => {
    if (tradeAnalysis?.categoryWisePurchase) {
      const { allopathicPurchase, ayurvedicPurchase, generalPurchase, genericPurchase, surgicalPurchase } = tradeAnalysis.categoryWisePurchase
      const { allopathicPercent, ayurvedicPercent, generalPercent, genericPercent, surgicalPercent } = calculateCategoryPercentage(allopathicPurchase, ayurvedicPurchase, generalPurchase, genericPurchase, surgicalPurchase)
      setCategorywisepurchase({
        allopathic: allopathicPercent,
        ayurvedic: ayurvedicPercent,
        general: generalPercent,
        generic: genericPercent,
        surgical: surgicalPercent,
      })
    }
  }, [tradeAnalysis])
  return (
    <div className="dashboard-card" style={{ width: "34%", height: "22vh" }}>
      <p className="dashboard-title">Category wise Purchase</p>
      <SelectDuration value={duration} onchange={onchange} />
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
        <p className='dashboard-label'>{categorywisepurchase?.allopathic}%</p>
        <p className='dashboard-label'>{categorywisepurchase?.ayurvedic}%</p>
        <p className='dashboard-label'>{categorywisepurchase?.general}%</p>
        <p className='dashboard-label'>{categorywisepurchase?.generic}%</p>
        <p className='dashboard-label'>{categorywisepurchase?.surgical}%</p>
      </div>
    </div>
  );
}

export default CategoryWisePurchase;