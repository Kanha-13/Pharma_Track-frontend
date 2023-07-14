import Layout from "../../Components/Layout/Layout";

import "./index.css"
import PurchaseOverview from "../../Components/PurchaseOverview/PurchaseOverview";
import SalesOverview from "../../Components/SalesOverview/SalesOverview";
import InventorySummary from "../../Components/InventorySummary/InventorySummary";
import ProductDetails from "../../Components/ProductDetails/ProductDetails";
import LastSales from "../../Components/LastSales/LastSales";
import CategoryWiseSale from "../../Components/CategoryWiseSale/CategoryWiseSale";
import DashboardGraph from "../../Components/DashboardGraph/DashboardGraph";
import { memo, useEffect } from "react";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { getTradeReport } from "../../apis/trade"

const Dashboard = () => {
  const { tradeAnalysis, dispatch } = useStore();
  // const [tradeAnalysis, setTrade] = useState({ tsc: 0, tr: 0, tpc: 0, ti: 0, apa: 0, asa: 0, tp: 0 })

  const fetchTradeAnalysis = async () => {
    try {
      const res = await getTradeReport("month", {})
      let totalSalesCount = 0;
      let totalRevenue = 0;
      let totalPurchaseCount = 0;
      let totalInvestment = 0;
      let totalProfit = 0;
      let totalSalesCredit = 0;
      let totalPurchaseCredit = 0;

      res.data.map((trade, index) => {
        totalSalesCount += trade.salesCount
        totalRevenue += trade.revenue
        totalPurchaseCount += trade.purchaseCount
        totalInvestment += trade.investment
        totalProfit += trade.profit
        totalSalesCredit += trade.salesCredit
        totalPurchaseCredit += trade.purchaseCredit
      })
      dispatch(ACTION.SET_TRADE_ANALYSIS, {
        tsc: totalSalesCount, tpc: totalPurchaseCount,
        tp: totalProfit, ti: totalInvestment, tr: totalRevenue,
        tscr: totalSalesCredit, tpcr: totalPurchaseCredit,
        asa: (totalRevenue / totalSalesCount).toFixed(2),
        apa: (totalInvestment / totalPurchaseCount).toFixed(2)
      })
    } catch (error) {
      console.log(error)
      alert("unable to get sales overview!")
    }
  }
  useEffect(() => {
    if (!tradeAnalysis)
      fetchTradeAnalysis();
  }, [])
  return (
    <Layout>
      <div id="dashboard-container" className="layout-body borderbox">
        <SalesOverview />
        <PurchaseOverview />
        <InventorySummary />
        <ProductDetails />
        <CategoryWiseSale />
        <LastSales />
        <DashboardGraph />
      </div >
    </Layout>
  );
}
export default memo(Dashboard);