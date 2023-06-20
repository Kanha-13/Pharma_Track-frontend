import { useEffect, useState } from 'react';
import './vendorform.css'
import Card from '../../ManualAddProduct/Card';
import VenforInfoIcon from "../../../images/illustrations/vendorInfo.jpg"
import Loading from '../../Loading/Loading';
import { vendorDetail } from '../../../Schema/vendor';
import Layout from '../../Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../Constants/routes_frontend';
import { addVendor } from '../../../apis/vendors';
const VendorForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [vendorInfo, setVendorInfo] = useState(vendorDetail)

  const onchange = (name, value) => {
    setVendorInfo({ ...vendorInfo, [name]: value })
  }

  const onSubmitVendorForm = async (data) => {
    try {
      data.mobileNo = "+91" + data.mobileNo
      const res = await addVendor(data)
      alert("Party added successfully! 👍")
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 400);
  }, [])

  return (
    <Layout>
      <div id="vendorform-container" className="layout-body borderbox">
        <div style={{ width: "93%", marginLeft: "1.5vw", paddingLeft: "2vw", borderBottom: "1px solid gray", paddingBottom: "5px" }}>
          <p style={{ margin: "0px", fontSize: "1.5em" }}>Add Vendor</p>
        </div>
        <form onSubmit={submitform}>
          <div className='vendor-form-div-l1'>
            <img style={{ height: "60%" }} src={VenforInfoIcon} />
          </div>
          <div className='vendor-form-div-l1'>
            <Card focus={true} require={true} w="60%" h="5%" onchange={onchange} label='Vendor name' name='partyName' type='text' value={vendorInfo.partyName} />
            <Card require={true} w="60%" h="5%" onchange={onchange} label='Address' name='address' type='text' value={vendorInfo.address} />
            <Card require={true} w="60%" h="5%" onchange={onchange} label='Mobile number' name='mobileNo' type='text' value={vendorInfo.mobileNo} />
            <div style={{ marginTop: "5vh", width: "60%", height: "10%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button className="custom-input-fields" type='submit' style={{ width: "47%", height: "70%", borderRadius: "0.8vw", cursor: "pointer", fontSize: "0.9em", border: "none", backgroundColor: "#5E48E8", color: "#ffffff" }}>Add Vendor</button>
              <button type='reset' onClick={oncancle} style={{ width: "47%", height: "70%", borderRadius: "0.8vw", cursor: "pointer", fontSize: "0.9em", backgroundColor: "#FFFFFF", border: "1px solid #5E48E8", color: "#5E48E8" }}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
export default VendorForm;