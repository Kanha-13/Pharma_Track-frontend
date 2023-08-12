import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCompanyDetial } from '../../apis/company';
import { companydetail } from '../../Schema/company';
import { ROUTES } from '../../Constants/routes_frontend';

import Layout from '../../Components/Layout/Layout';
import Card from '../../Components/ManualAddProduct/Card';
import CompanyInfoIcon from "../../images/illustrations/vendorInfo.jpg"

import './index.css'
import { ACTION } from '../../Store/constants';
import { useStore } from '../../Store/store';

const CompanyAdd = () => {
  const { dispatch } = useStore();

  const navigate = useNavigate();
  const [companyInfo, setCompanyInfo] = useState(companydetail)

  const onchange = (name, value) => {
    setCompanyInfo({ ...companyInfo, [name]: value })
  }

  const onSubmitCompanyForm = async (data) => {
    try {
      const res = await addCompanyDetial(data)
      alert("Company added successfully! 👍")
      dispatch(ACTION.SET_COMPANIES,[])
      navigate(ROUTES.PROTECTED_ROUTER + ROUTES.COMPANY)
    } catch (error) {
      console.log(error)
    }
  }

  const oncancle = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.COMPANY)
  }

  const submitform = (e) => {
    e.preventDefault();
    onSubmitCompanyForm(companyInfo)
  }

  return (
    <Layout>
      <div id="companyform-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "5vh" }}>Add Company</p>
        <form onSubmit={submitform}>
          <div className='company-form-div-l1'>
            <img style={{ height: "80%" }} src={CompanyInfoIcon} />
          </div>
          <div className='company-form-div-l1'>
            <Card focus={true} require={true} w="60%" h="10%" onchange={onchange} label='Company name' name='companyName' type='text' value={companyInfo.companyName} />
            <Card w="60%" h="10%" onchange={onchange} label='Address' name='address' type='text' value={companyInfo.address} />
            <Card w="60%" h="10%" onchange={onchange} label='Mobile number' name='mobileNo' type='text' value={companyInfo.mobileNo} />
            <Card w="60%" h="10%" onchange={onchange} label='GST number' name='gstNo' type='text' value={companyInfo.gstNo} />
            <Card w="60%" h="10%" onchange={onchange} label='Licence number' name='licenceNo' type='text' value={companyInfo.licenceNo} />
            <div style={{ marginTop: "5vh", width: "60%", height: "18%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button className="custom-input-fields" type='submit' style={{ width: "47%", height: "70%", borderRadius: "0.8vw", cursor: "pointer", fontSize: "0.9em", border: "none", backgroundColor: "#5E48E8", color: "#ffffff" }}>Add Company</button>
              <button type='reset' onClick={oncancle} style={{ width: "47%", height: "70%", borderRadius: "0.8vw", cursor: "pointer", fontSize: "0.9em", backgroundColor: "#FFFFFF", border: "1px solid #5E48E8", color: "#5E48E8" }}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
export default CompanyAdd;