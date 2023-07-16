import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../Store/store";
import { getVendors } from "../../apis/vendors";
import { ACTION } from "../../Store/constants";
import { ROUTES } from "../../Constants/routes_frontend";

import Layout from "../../Components/Layout/Layout";
import Message from "../../Components/Vendors/Message/Message";

import './index.css'
import { VendorsListHeader } from "../../Constants/vendors";
import ProductsList from "../../Components/ProductsList/ProductsList";

const Vendors = () => {
  const navigate = useNavigate()
  const { vendors, dispatch } = useStore()
  const [vendorslist, setVendorsList] = useState([])

  const fetchallvendors = async () => {
    try {
      const res = await getVendors()
      setVendorsList(res.data)
      dispatch(ACTION.SET_VENDORS, res.data)
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  const onAddNewClick = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.VENDORS_ADD)
  }
  const onclickvendor = (vendorId) => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.VENDORS_INFO + "id=" + vendorId)
  }
  const onchange = (val) => {
    const filtered = vendors.filter((vendor) => vendor.vendorName.includes((val).toUpperCase()))
    setVendorsList(filtered)
  }

  const onBillPayment = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.VENDORS_BILL_PAYMENT)
  }

  useEffect(() => {
    if (!vendors.length)
      fetchallvendors();
    else
      setVendorsList(vendors)
  }, [])

  return (
    <Layout>
      <div id="vendor-container" className="layout-body borderbox">
        {
          vendors.length ? <>
            <div style={{ width: "100%", height: "5vh", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "5vh" }}>
              <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left" }}>Vendors</p>
              <button style={{ width: "15%", height: "100%", borderRadius: "0.5vw", backgroundColor: "#5E48E8", border: "none", color: "#ffffff", fontSize: "0.9em", cursor: "pointer" }} onClick={onBillPayment}>Bill Payment</button>
              <button style={{ marginLeft: "2vw", width: "15%", height: "100%", borderRadius: "0.5vw", backgroundColor: "#5E48E8", border: "none", color: "#ffffff", fontSize: "0.9em", cursor: "pointer" }} onClick={onAddNewClick}>Add Vendors</button>
            </div>
            <ProductsList mh="400%" h="100%" w="100%" onchange={onchange}
              onclick={onclickvendor} header={VendorsListHeader} data={vendorslist} />
          </> :
            <Message onAdd={onAddNewClick} title="No Vendors in the list" btnLabel="Add Vendor" />
        }
      </div>
    </Layout>
  );
}
export default Vendors;