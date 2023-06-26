import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStore } from "../../Store/store";
import { ROUTES } from "../../Constants/routes_frontend";
import { validateUpdateRequest } from "../../utils/vendor";
import { ACTION } from "../../Store/constants";
import { deleteVendor, getVendor, udpateVendor } from "../../apis/vendors";
import { VENDOR,vendordetail } from "../../Schema/vendor";

import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/ManualAddProduct/Card";

import './index.css'

const VendorInfo = () => {
  const navigate = useNavigate()
  const { dispatch } = useStore();
  const [searchParams] = useSearchParams();
  const [deletePop, setDeletePop] = useState(0);
  const [vendorDetail, setVendorDetail] = useState(vendordetail);

  const onchange = (name, value) => {
    setVendorDetail({ ...vendorDetail, [name]: value })
  }

  const fetchVendor = async (pId) => {
    try {
      const res = await getVendor(pId)
      setVendorDetail(res.data)
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  const onDelete = async () => {
    try {
      const res = await deleteVendor(vendorDetail._id)
      dispatch(ACTION.SET_VENDORS, [])
      alert("Vendor deleted successfully!")
      navigate(ROUTES.PROTECTED_ROUTER + ROUTES.VENDORS)
    } catch (error) {
      alert("Unable to delete vendor!")
    }
  }
  
  const onUpdate = async () => {
    try {
      if (validateUpdateRequest(vendorDetail)) {
        const res = await udpateVendor(vendorDetail._id, vendorDetail)
        dispatch(ACTION.SET_VENDORS, [])
        alert("Vendor updated successfully!")
        navigate(ROUTES.PROTECTED_ROUTER + ROUTES.VENDORS)
      }
      else throw new Error("Fields should not be empty")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const vId = searchParams.get('id');
    fetchVendor(vId)
  }, [])

  return (
    <Layout>
      <div id="prodInfo-container" className="layout-body borderbox">
        <div style={{ width: "100%", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px" }}>
          <p style={{ margin: "0px", fontSize: "1.5em" }}>Vendor Detail</p>
        </div>
        <Card focus={true} require={true} w="25%" h="4%" name={VENDOR.VENDOR_NAME} label="Vendor Name" value={vendorDetail.vendorName} onchange={onchange} type="text" />
        <Card require={true} w="25%" h="4%" name={VENDOR.VENDOR_ADDRESS} label="Address" value={vendorDetail.address} onchange={onchange} type="text"/>
        <Card require={true} w="25%" h="4%" name={VENDOR.VENDOR_MOBILE} label="Mobile No." value={vendorDetail.mobileNo} onchange={onchange} type="text" />
        <button id="submit-add-prod" className="custom-input-fields" onClick={onUpdate} type="submit">Update Detail</button>
        <button id="submit-delete-prod" onClick={() => setDeletePop(1)} type="submit">Delete Vendor</button>
        {
          deletePop ?
            <div id="delete-pop">
              <div id="delete-pop-box">
                <label >Do you really want to delete {vendorDetail.itemName}</label>
                <button autoFocus={true} style={{ backgroundColor: "#4de671" }} onClick={() => setDeletePop(false)}>Cancel</button>
                <button style={{ backgroundColor: "#ff4343" }} onClick={onDelete}>Delete</button>
              </div>
            </div> : <></>
        }
      </div>
    </Layout>
  );
}
export default VendorInfo;