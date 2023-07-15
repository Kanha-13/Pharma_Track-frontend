import Layout from "../../Components/Layout/Layout";

import "./index.css"
import PurchaseOverview from "../../Components/PurchaseOverview/PurchaseOverview";
import SalesOverview from "../../Components/SalesOverview/SalesOverview";
import InventorySummary from "../../Components/InventorySummary/InventorySummary";
import ProductDetails from "../../Components/ProductDetails/ProductDetails";
import LastSales from "../../Components/LastSales/LastSales";
import CategoryWiseSale from "../../Components/CategoryWiseSale/CategoryWiseSale";
import DashboardGraph from "../../Components/DashboardGraph/DashboardGraph";
import { memo, useEffect, useState } from "react";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { getTradeReport } from "../../apis/trade"
import CategoryWisePurchase from "../../Components/CategoryWisePurchase/CategoryWisePurchase";
import { generateTradeAnalysis, sumAllObjectsFields } from "../../utils/billing";

const Dashboard = () => {
  const { tradeAnalysis, dispatch } = useStore();
  const [duration, setDuration] = useState("month")

  const fetchTradeAnalysis = async (durations) => {
    let query = {}
    if (durations === "month")
      query = ({ period: "month" })
    else if (durations === "year")
      query = ({ period: "year" })
    else
      query = (durations)
    try {
      const res = await getTradeReport(query)
      if (durations === "month") {
        let month_sum = sumAllObjectsFields(res.data.currentMonth)
        let report = generateTradeAnalysis(month_sum)
        dispatch(ACTION.SET_TRADE_ANALYSIS, report)
      }
      else {
        let currentMonth = sumAllObjectsFields(res.data.currentMonth)
        let sum_of_all_month = sumAllObjectsFields([...res.data.resetAllMonth, currentMonth])
        let report = generateTradeAnalysis(sum_of_all_month)
        dispatch(ACTION.SET_TRADE_ANALYSIS, report)
      }
    } catch (error) {
      console.log(error)
      alert("unable to get sales overview!")
    }
  }

  const handlechange = (value) => {
    let duration;
    dispatch(ACTION.SET_TRADE_ANALYSIS, {})
    switch (value) {
      case "month":
        duration = value
        setDuration(value)
        break;
      case "year":
        duration = value
        setDuration(value)
        break;

      default:
        duration = value
        setDuration("custom")
        break;
    }
    fetchTradeAnalysis(value);
  }

  useEffect(() => {
    if (!tradeAnalysis)
      fetchTradeAnalysis(duration);
  }, [])
  return (
    <Layout>
      <div id="dashboard-container" className="layout-body borderbox">
        <SalesOverview duration={duration} onchange={handlechange} />
        <InventorySummary />
        <PurchaseOverview duration={duration} onchange={handlechange} />
        <CategoryWiseSale duration={duration} onchange={handlechange} />
        <ProductDetails />
        <CategoryWisePurchase duration={duration} onchange={handlechange} />
        <DashboardGraph duration={duration} onchange={handlechange} />
      </div >
    </Layout>
  );
}
export default memo(Dashboard);