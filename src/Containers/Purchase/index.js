import { useEffect, useState } from "react";
import { useStore } from "../../Store/store";
import { getVendors } from "../../apis/vendors";
import { ACTION } from "../../Store/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants/routes_frontend";
import { getPurchases } from "../../apis/purchase";
import { PurchaseHistoryListHeader } from "../../Constants/Purchase";
import { toddmmyy } from "../../utils/DateConverter";

import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/ManualAddProduct/Card";

import './index.css'

const Purchase = () => {
  const { vendors, dispatch } = useStore();
  const navigate = useNavigate();
  const [purchaseLists, setPurchases] = useState([])
  const [billNo, setBillNumber] = useState("")
  const [vendorIdToSearch, setVendorIdToSearch] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [vendorslist, setVendorlist] = useState([])

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

  const toaddpurchase = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.PURCHASE_ADD);
  }

  const searchPurchaseHistory = async () => {
    setPurchases([])
    try {
      if (vendorIdToSearch || billNo || (fromDate && toDate)) {
        const res = await getPurchases(vendorIdToSearch, billNo, { from: fromDate, to: toDate })
        setPurchases(res.data)
      } else {
        alert("At least one field is required to search purchase history!")
      }
    } catch (error) {
      alert("Unable to get purchase history")
      console.log(error)
    }
  }

  const getValue = (item, value) => {
    if (value === "purDate")
      return toddmmyy(item[value])
    else
      return item[value]
  }

  const onEnter = (id) => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.PURCHASE_INFO + `id=${id}`)
  }

  useEffect(() => {
    if (vendors.length) { formatevendorslist(vendors) }
    else
      fetchVendorsList();
  }, [])

  return (
    <Layout>
      <div id="products-container" className="layout-body borderbox">
        <div style={{ width: "100%", height: "5vh", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "2vh" }}>
          <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left" }}>Purchase</p>
          <button style={{ width: "15%", height: "100%", borderRadius: "0.5vw", backgroundColor: "#5E48E8", border: "none", color: "#ffffff", fontSize: "0.9em", cursor: "pointer" }} onClick={toaddpurchase}>Purchase Entry</button>
        </div>
        <div style={{ alignItems: "center", width: "100%", height: "90%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Card focus={true} require={true} w="20%" h="2vh" m="0px" pd="1.1vh 0.5vw" name="vId" label="" value={vendorIdToSearch} onchange={(name, value) => setVendorIdToSearch(value)} type="select" options={vendorslist} />
          <Card require={true} w="15%" h="2vh" pd="1.1vh 0.5vw" name="billNo" label="" ph="Bill no." value={billNo} onchange={(name, value) => setBillNumber(value)} type="text" />
          <Card require={true} w="13%" h="2vh" pd="1.1vh 0.5vw" name="from" label="From" ph="From" value={fromDate} onchange={(name, value) => setFromDate(value)} type="month" />
          <Card require={true} w="13%" h="2vh" pd="1.1vh 0.5vw" name="to" label="To" ph="To" value={toDate} onchange={(name, value) => setToDate(value)} type="month" />
          <button onClick={searchPurchaseHistory} style={{ backgroundColor: "#5E48E8", border: "none", fontSize: "1rem", color: "#ffffff", borderRadius: "0.5vw", height: "4vh", width: "5vw", cursor: "pointer" }}>Search</button>

          <div style={{ width: "100%", height: "100%" }}>
            <table style={{ height: "5vh", width: "100%", borderCollapse: "collapse" }}>
              <thead style={{
                backgroundColor: "#ebe8fc", height: "5vh",
                marginBottom: "10px", borderBottom: "1px solid gray"
              }}>
                <tr >
                  {PurchaseHistoryListHeader.map((head) => <th key={head.name + "in-choose-batch"} style={{ width: head.colSize, textAlign: "left" }}>{head.name}</th>)}
                </tr>
              </thead>
            </table>
            {
              purchaseLists.length > 0 ?
                <div style={{ width: "100%", maxHeight: "65vh", overflow: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody style={{ borderCollapse: "collapse" }}>
                      {
                        purchaseLists.map((item, index) => {
                          return (
                            <tr id={`purchase-history-row${item._id}`} onClick={() => onEnter(item._id)} key={`${item._id}-stock-list`} className="purchase-history-row" style={{ height: "5vh", marginBottom: "3vh" }}>
                              {
                                PurchaseHistoryListHeader.map((head) => <td key={head.name + "in-choose-batch-row"} style={{ width: head.colSize }}>{getValue(item, head.value)}</td>)
                              }
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div> : <></>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Purchase;