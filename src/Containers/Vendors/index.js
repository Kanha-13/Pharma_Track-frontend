import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../Store/store";
import { getVendors } from "../../apis/vendors";
import { ACTION } from "../../Store/constants";
import { ROUTES } from "../../Constants/routes_frontend";

import Layout from "../../Components/Layout/Layout";
import Message from "../../Components/Vendors/Message/Message";
import VendorList from "../../Components/Vendors/VendorList/VendorList";


import './index.css'

const Vendors = () => {
  const navigate = useNavigate()
  const { vendors, dispatch } = useStore()

  const fetchallvendors = async () => {
    try {
      const res = await getVendors()
      dispatch(ACTION.SET_VENDORS, res)
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  const onAddNewClick = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.VENDORS_ADD)
  }

  useEffect(() => {
    if (!vendors.length)
      fetchallvendors();
  }, [])

  return (
    <Layout>
      <div id="vendor-container" className="layout-body borderbox">
        {
          vendors.length ? <VendorList vendors={vendors} onAdd={onAddNewClick} /> :
            <Message onAdd={onAddNewClick} />
        }
      </div>
    </Layout>
  );
}
export default Vendors;