import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addVendor } from '../../apis/vendors';
import { vendordetail } from '../../Schema/vendor';
import { ROUTES } from '../../Constants/routes_frontend';

import Layout from '../../Components/Layout/Layout';
import Card from '../../Components/ManualAddProduct/Card';
import VendorInfoIcon from "../../images/illustrations/vendorInfo.jpg"

import './index.css'

const VebdorAdd = () => {
  const navigate = useNavigate();
  const [vendorInfo, setVendorInfo] = useState(vendordetail)

  const onchange = (name, value) => {
    setVendorInfo({ ...vendorInfo, [name]: value })
  }

  const onSubmitVendorForm = async (data) => {
    try {
      const res = await addVendor(data)
      alert("Vendor added successfully! 👍")
      navigate(ROUTES.PROTECTED_ROUTER + ROUTES.VENDORS)
    } catch (error) {
      console.log(error)
    }
  }

  const oncancle = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.VENDORS)
  }

  const submitform = (e) => {
    e.preventDefault();
    onSubmitVendorForm(vendorInfo)
  }

  return (
    <Layout>
      <div id="vendorform-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "5vh" }}>Add Vendor</p>
        <form onSubmit={submitform}>
          <div className='vendor-form-div-l1'>
            <img style={{ height: "80%" }} src={VendorInfoIcon} />
          </div>
          <div className='vendor-form-div-l1'>
            <Card focus={true} require={true} w="60%" h="10%" onchange={onchange} label='Vendor name' name='vendorName' type='text' value={vendorInfo.vendorName} />
            <Card require={true} w="60%" h="10%" onchange={onchange} label='Address' name='address' type='text' value={vendorInfo.address} />
            <Card require={true} w="60%" h="10%" onchange={onchange} label='Mobile number' name='mobileNo' type='text' value={vendorInfo.mobileNo} />
            <div style={{ marginTop: "5vh", width: "60%", height: "18%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button className="custom-input-fields" type='submit' style={{ width: "47%", height: "70%", borderRadius: "0.8vw", cursor: "pointer", fontSize: "0.9em", border: "none", backgroundColor: "#5E48E8", color: "#ffffff" }}>Add Vendor</button>
              <button type='reset' onClick={oncancle} style={{ width: "47%", height: "70%", borderRadius: "0.8vw", cursor: "pointer", fontSize: "0.9em", backgroundColor: "#FFFFFF", border: "1px solid #5E48E8", color: "#5E48E8" }}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
export default VebdorAdd;