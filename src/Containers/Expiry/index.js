import { useState } from "react";
import DashboardCard from "../../Components/Dashboard/Card";
import Layout from "../../Components/Layout/Layout";
import SearchBar from "../../Components/SearchBar/SearchBar";

import './index.css'

const Expiry = () => {
  const [search,setSearch] = useState("");

  const onchange=(value)=>{
    setSearch(value)
  }

  return (
    <Layout>
      <div id="expiry-container" className="layout-body borderbox">
        <div style={{ marginBottom: "2%", display: "flex", width: "100%", height: "30%", justifyContent: "space-around", alignItems: "center" }}>
          <DashboardCard count="10" h="" onclick={() => { }} label="Expired" />
          <DashboardCard count="10" h="" onclick={() => { }} label="Expiry soon" />
        </div>
        <SearchBar onchange={onchange} h="10%" placeholder="Search for expiry..." val={search} w="60%" />
        <div style={{}}>

        </div>
      </div>
    </Layout>
  );
}
export default Expiry;