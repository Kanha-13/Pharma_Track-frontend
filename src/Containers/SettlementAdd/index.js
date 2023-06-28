import { useEffect, useState } from "react";
import { SETTLEMENT, SettlementTypes } from "../../Schema/settlement";
import { useStore } from "../../Store/store";
import { getVendors } from "../../apis/vendors";
import { addSettlement } from "../../apis/settlement";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants/routes_frontend";
import { ACTION } from "../../Store/constants";

import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/ManualAddProduct/Card";

import './index.css'

const SettlementAdd = () => {
  const { currentSettlement, dispatch, vendors } = useStore();
  const navigate = useNavigate()
  const [settlementDetail, setSettlement] = useState(currentSettlement)
  const [vendorslist, setVendorlist] = useState([]);

  const formatevendorslist = (vendorss) => {
    const vendorsoption = vendorss.map((vendor) => {
      return { label: vendor.vendorName, value: vendor._id }
    })
    setVendorlist([{ label: "Select Vendor", value: "" }, ...vendorsoption])
  }

  const fetchVendorsList = async () => {
    try {
      const res = await getVendors();
      formatevendorslist(res.data)
      dispatch(ACTION.SET_VENDORS, res.data)
    } catch (error) {
      alert("Unable to get vendors list!")
    }
  }

  const onchangeSettlementDetail = (name, value) => {
    setSettlement({ ...settlementDetail, [name]: value })
  }

  useEffect(() => {
    currentSettlement.returnQnty = currentSettlement.qnty
    currentSettlement.type = ""
    currentSettlement.vId = ""
    setSettlement(currentSettlement)
  }, [currentSettlement])

  const addsettltment = async () => {
    try {
      const data = {
        pId: settlementDetail.productDetail[0]._id,
        sId: settlementDetail._id,
        batch: settlementDetail.batch,
        mrp: settlementDetail.mrp,
        expDate: settlementDetail.expDate,
        vId: settlementDetail.vId,
        type: settlementDetail.type,
        date: settlementDetail.date,
        returnQnty: settlementDetail.returnQnty
      }
      const res = await addSettlement(data)
      dispatch(ACTION.SET_EXPIRED_STOCKS, [])
      dispatch(ACTION.SET_NEAR_EXPIRY_STOCKS, [])
      dispatch(ACTION.SET_SETTLEMENTS, [])
      dispatch(ACTION.SET_CURRENT_SETTLEMENT, {})
      navigate(ROUTES.PROTECTED_ROUTER + ROUTES.GET_SETTLEMENT)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (vendors.length) { formatevendorslist(vendors) }
    else
      fetchVendorsList();
  }, [])
  return (
    <Layout>
      <div id="settlementadd-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "5vh" }}>Add Settlement</p>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%", height: "80%" }}>
          <Card require={true} w="25%" h="4%" name={SETTLEMENT.ITEMNAME} label="Item Name" value={settlementDetail?.itemName} onchange={() => { }} type="text" />
          <Card require={true} w="25%" h="4%" name={SETTLEMENT.PURCHASED_FROM} label="Purchased from" value={settlementDetail?.vendorName} onchange={() => { }} type="text" />
          <Card focus={true} require={true} w="25%" h="4%" name={SETTLEMENT.TYPE} label="Return Type" value={settlementDetail?.type} onchange={onchangeSettlementDetail} type="select" options={SettlementTypes} />
          <Card require={true} w="25%" h="4%" name={SETTLEMENT.VID} label="Return to" value={settlementDetail?.vId} onchange={onchangeSettlementDetail} type="select" options={vendorslist} />
          <Card require={true} w="25%" h="4%" name={SETTLEMENT.DATE} label="Return Date" value={settlementDetail?.date} onchange={onchangeSettlementDetail} type="date" />
          <Card require={true} max={settlementDetail?.qnty} min={1} w="25%" h="4%" name={SETTLEMENT.RETURN_QNTY} label="Return Qnty." value={settlementDetail?.returnQnty} onchange={onchangeSettlementDetail} type="number" />
          <button className="custom-input-fields" id="stock-enter" tabIndex="" onClick={addsettltment} type="submit" style={{ height: "8vh" }}>Add Settlement</button>
        </div>
      </div>
    </Layout>
  );
}

export default SettlementAdd;