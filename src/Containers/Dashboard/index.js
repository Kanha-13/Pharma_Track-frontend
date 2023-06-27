import Layout from "../../Components/Layout/Layout";
import DashboardCard from "../../Components/Dashboard/Card";
import AlertIcon from "../../images/icons/alert.png"

import "./index.css"
const Dashboard = () => {

  return (
    <Layout>
      <div id="home-container" className="layout-body borderbox">
        <div style={{ display: "flex", width: "100%", height: "20%", justifyContent: "space-between", alignItems: "center" }}>
          <DashboardCard w="20%" h="100%" icon={AlertIcon} bgColor={""} label="Expiry Alert" onclick={() => { }} />
          <DashboardCard w="20%" h="100%" bgColor={""} label="Out Of Stock" onclick={() => { }} />
          <DashboardCard w="20%" h="100%" bgColor={""} label="Bill pending" onclick={() => { }} />
          <DashboardCard w="20%" h="100%" bgColor={""} label="Delivery alert" onclick={() => { }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", width: "100%", height: "30%", borderRadius: "0.8vw" }}>
          <DashboardCard w="30%" h="100%" bgColor="#ffffff" label="Recent Sale" onclick={() => { }} />
          <DashboardCard w="30%" h="100%" bgColor="#ffffff" label="Recent Purchase" onclick={() => { }} />
          <DashboardCard w="30%" h="100%" bgColor="#ffffff" label="Recent Product" onclick={() => { }} />
        </div>
        <div style={{ width: "100%", height: "40%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: "0.8vw" }}>
          <DashboardCard w="45%" h="100%" onclick={() => { }} label="Monthly Sale" />
          <DashboardCard w="45%" h="100%" onclick={() => { }} label="Monthly Purchase" />
        </div>
      </div >
    </Layout>
  );
}
export default Dashboard;