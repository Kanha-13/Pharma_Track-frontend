import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../Store/store";
import { getCompanies, getCompanyQuery } from "../../apis/company";
import { ACTION } from "../../Store/constants";
import { ROUTES } from "../../Constants/routes_frontend";

import Layout from "../../Components/Layout/Layout";
import Message from "../../Components/Vendors/Message/Message";

import './index.css'
import { CompanyListHeader } from "../../Constants/company";
import ProductsList from "../../Components/ProductsList/ProductsList";

const Company = () => {
  const navigate = useNavigate()
  const { companies, dispatch } = useStore()
  const [companieslist, setcompanieslist] = useState([])

  const fetchacompanys = async (key) => {
    try {
      const res = await getCompanyQuery(key)
      setcompanieslist(res.data)
      dispatch(ACTION.SET_COMPANIES, res.data)
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  const onchange = (val) => {
    fetchacompanys(val);
  }

  const onAddNewClick = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.COMPANY_ADD)
  }
  const onclickcompany = (companyId) => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.COMPANY_INFO + "id=" + companyId)
  }

  useEffect(()=>{
    fetchacompanys("a")
  },[])

  return (
    <Layout>
      <div id="company-container" className="layout-body borderbox">
        {
          companies.length ? <>
            <div style={{ width: "100%", height: "5vh", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "5vh" }}>
              <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left" }}>Companies</p>
              <button style={{ width: "15%", height: "100%", borderRadius: "0.5vw", backgroundColor: "#5E48E8", border: "none", color: "#ffffff", fontSize: "0.9em", cursor: "pointer" }} onClick={onAddNewClick}>Add Company</button>
            </div>
            <ProductsList mh="400%" h="100%" w="100%" onchange={onchange}
              onclick={onclickcompany} header={CompanyListHeader} data={companieslist} />
          </> :
            <Message onAdd={onAddNewClick} title="No Company in the list" btnLabel="Add Company" />
        }
      </div>
    </Layout >
  );
}
export default Company;