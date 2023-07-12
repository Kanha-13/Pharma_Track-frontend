import Layout from "../../Components/Layout/Layout";
import AlertIcon from "../../images/icons/alert.png"

import "./index.css"
import PurchaseOverview from "../../Components/PurchaseOverview";
import SalesOverview from "../../Components/SalesOverview/SalesOverview";
import InventorySummary from "../../Components/InventorySummary/InventorySummary";
import ProductDetails from "../../Components/ProductDetails/ProductDetails";
import LastSales from "../../Components/LastSales/LastSales";
import CategoryWiseSale from "../../Components/CategoryWiseSale/CategoryWiseSale";
import DashboardGraph from "../../Components/DashboardGraph/DashboardGraph";
import TestChart from "./TestChart";
const Dashboard = () => {

  return (
    <Layout>
      <div id="dashboard-container" className="layout-body borderbox">
        {/* <TestChart /> */}
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
export default Dashboard;